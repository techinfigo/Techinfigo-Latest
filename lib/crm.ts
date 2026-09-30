import { cert, getApps, initializeApp } from 'firebase-admin/app';
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

function crmDb(): Firestore {
  if (db) return db;
  const existing = getApps().find((a) => a.name === APP_NAME);
  const app =
    existing ??
    initializeApp(
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
  db = getFirestore(app);
  return db;
}

/** Firestore rejects undefined values, so they become null. */
function clean<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v === undefined ? null : v]));
}

export async function sendToCrm(
  lead: NewLead,
  extra: { status: EnquiryStatus; spamReasons: string[]; needs: string[] },
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
  return ref.id;
}
