import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { FieldValue, getFirestore, type Firestore } from 'firebase-admin/firestore';
import type { NewLead } from './leads-schema';

/**
 * Delivers website enquiries into the Techinfigo CRM's own Firebase project
 * (techinfigocrm), a different project from the website's. NODE RUNTIME ONLY.
 *
 * The CRM shows the `websiteEnquiries` collection as an inbox; the owner then
 * adds an enquiry to the leads pipeline with one click. Only this server can
 * create documents there (firebase-admin bypasses security rules, and the
 * CRM's rules deny creation from browsers).
 */

const APP_NAME = 'techinfigo-crm';
export const ENQUIRIES = 'websiteEnquiries';

export type EnquiryStatus = 'new' | 'spam';

let db: Firestore | undefined;

export function isCrmConfigured(): boolean {
  return Boolean(
    process.env.CRM_FIREBASE_PROJECT_ID &&
      process.env.CRM_FIREBASE_CLIENT_EMAIL &&
      process.env.CRM_FIREBASE_PRIVATE_KEY,
  );
}

/** The firebase-admin app for the CRM project (also used for phone alerts). */
export function crmApp(): App {
  const existing = getApps().find((a) => a.name === APP_NAME);
  if (existing) return existing;
  return initializeApp(
    {
      credential: cert({
        projectId: process.env.CRM_FIREBASE_PROJECT_ID,
        clientEmail: process.env.CRM_FIREBASE_CLIENT_EMAIL,
        // Vercel stores the key with literal \n escapes.
        privateKey: (process.env.CRM_FIREBASE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
      }),
    },
    APP_NAME,
  );
}

export function crmDb(): Firestore {
  if (db) return db;
  db = getFirestore(crmApp());
  return db;
}

/** Firestore rejects undefined values, so they become null. */
function clean<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v === undefined ? null : v]));
}

export async function sendToCrm(
  lead: NewLead,
  extra: { status: EnquiryStatus; spamReasons: string[]; needs: string[]; sourceName?: string | null },
): Promise<string> {
  const ref = await crmDb()
    .collection(ENQUIRIES)
    .add(
      clean({
        name: lead.name,
        phone: lead.phone,
        email: lead.email || null,
        businessName: lead.brandName,
        website: lead.website,
        message: lead.message,
        needs: extra.needs,
        sourceForm: lead.sourceForm,
        sourceName: extra.sourceName ?? null,
        landingPage: lead.landingPage,
        submittedFrom: lead.submittedFrom,
        utmSource: lead.utmSource,
        utmMedium: lead.utmMedium,
        utmCampaign: lead.utmCampaign,
        utmContent: lead.utmContent,
        utmTerm: lead.utmTerm,
        referrer: lead.referrer,
        status: extra.status,
        spamReasons: extra.spamReasons,
        createdAt: FieldValue.serverTimestamp(),
      }),
    );
  // Phone alert to the owner's devices. Never throws: a failed alert must not
  // lose or delay the enquiry itself. Spam is stored silently.
  if (extra.status === 'new') {
    const { notifyNewEnquiry } = await import('./crm-push');
    await notifyNewEnquiry({
      id: ref.id,
      name: lead.name,
      businessName: lead.brandName,
      source: extra.sourceName || sourceLabel(lead.sourceForm),
    });
  }
  return ref.id;
}

/** Plain-language source for the alert text. */
function sourceLabel(sourceForm: string | null | undefined): string {
  const f = (sourceForm || '').toLowerCase();
  if (f.includes('website-offer')) return '₹9,999 website page';
  if (f.includes('meta') || f.includes('facebook')) return 'Facebook/Instagram ad';
  if (f.includes('google')) return 'Google ad';
  if (f.includes('careers')) return 'Careers';
  return 'Website';
}

/* ------------------------------------------------------------------------ */
/* Integrations (managed from the CRM's "Integrations & Webhooks" page)      */
/* ------------------------------------------------------------------------ */

export const INTEGRATIONS = 'integrations';
export const INTEGRATION_STATS = 'integrationStats';

export type Connection = {
  id: string;
  kind: 'webhook' | 'google-ads';
  name: string;
  enabled: boolean;
};

/** Finds the connection that owns this secret token (URL token or Google Ads key). */
export async function findConnection(token: string, kind: Connection['kind']): Promise<Connection | null> {
  if (!isCrmConfigured() || !/^[a-f0-9]{24,64}$/.test(token)) return null;
  const snap = await crmDb()
    .collection(INTEGRATIONS)
    .where('token', '==', token)
    .limit(1)
    .get();
  const doc = snap.docs[0];
  if (!doc) return null;
  const d = doc.data();
  if (d.kind !== kind) return null;
  return { id: doc.id, kind, name: typeof d.name === 'string' && d.name ? d.name : 'Connection', enabled: d.enabled !== false };
}

/**
 * Counts a received lead for the Integrations page ("last lead 5 min ago").
 * Key: 'website', 'google-ads', 'meta', or a connection id. Never throws:
 * a failed counter must not lose the lead itself.
 */
export async function recordReceived(key: string, isTest = false): Promise<void> {
  if (!isCrmConfigured()) return;
  try {
    // Test leads only prove the connection works; they do not count as leads.
    const update = isTest
      ? { lastTestAt: FieldValue.serverTimestamp() }
      : { receivedCount: FieldValue.increment(1), lastReceivedAt: FieldValue.serverTimestamp() };
    await crmDb().collection(INTEGRATION_STATS).doc(key).set(update, { merge: true });
  } catch (error) {
    console.error('[crm] stats update failed:', error);
  }
}
