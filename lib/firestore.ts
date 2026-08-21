import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import {
  Timestamp,
  type CollectionReference,
  type DocumentData,
  type Firestore,
  type Query,
  type QueryDocumentSnapshot,
} from 'firebase-admin/firestore';
import { getFirestore } from 'firebase-admin/firestore';
import {
  LEAD_STATUSES,
  isQualifiedStatus,
  type Lead,
  type LeadNote,
  type LeadStatus,
  type NewLead,
  type StatusChange,
} from './leads-schema';

/**
 * NODE RUNTIME ONLY. firebase-admin reaches node:crypto, node:http2 and gRPC.
 * Never import this from middleware.ts or from any module middleware.ts can
 * reach — a single node: specifier in that graph breaks the Edge bundle. The
 * same rule that keeps lib/auth-node.ts out of middleware applies here.
 *
 * Shapes and status values live in lib/leads-schema.ts so client components can
 * import LEAD_STATUSES without dragging firebase-admin into the browser bundle.
 */

/** Named so a hot reload can find the app it already created instead of re-initialising. */
const APP_NAME = 'techinfigo-admin';

const LEADS = 'leads';
const NOTES = 'notes';

/**
 * In dev, Next hot-reload re-evaluates modules. Parking the handle on
 * globalThis keeps exactly one Firestore client — and one gRPC channel — alive
 * across edits, the same reason the Postgres pool was parked here.
 */
const globalForDb = globalThis as unknown as { __techinfigoFirestore?: Firestore };

let dbClient: Firestore | undefined = globalForDb.__techinfigoFirestore;

/** True only when all three credentials are present. Lets callers degrade instead of throwing. */
export function isDbConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY,
  );
}

/**
 * Lazy singleton. Deliberately does NOT initialise at module load: `next build`
 * imports every route module, so initialising here would make the build fail on
 * any machine without Firebase credentials — including CI and preview deploys
 * that never touch the admin panel. Same contract the Postgres client had.
 */
export function getDb(): Firestore {
  if (dbClient) return dbClient;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Firebase credentials are not set. Copy .env.example to .env.local and fill in ' +
        'FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.',
    );
  }

  // A single-line env value cannot hold real newlines, so the PEM travels with
  // literal \n escapes and is unescaped here. Already-real newlines (some hosts
  // and dotenv's quoted form expand them) pass through untouched.
  const pem = privateKey.replace(/\\n/g, '\n');

  // getApps() is the hot-reload guard: initializeApp with a name that already
  // exists throws, and in dev this module is re-evaluated on every edit.
  const existing: App | undefined = getApps().find((app) => app.name === APP_NAME);
  const app =
    existing ??
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey: pem }) }, APP_NAME);

  dbClient = getFirestore(app);

  // parseLead emits null for absent fields, never undefined, but a stray
  // undefined would otherwise throw at write time instead of being dropped.
  if (!existing) dbClient.settings({ ignoreUndefinedProperties: true });

  if (process.env.NODE_ENV !== 'production') {
    globalForDb.__techinfigoFirestore = dbClient;
  }

  return dbClient;
}

function leadsCollection(): CollectionReference<DocumentData> {
  return getDb().collection(LEADS);
}

/**
 * Firestore document ids are opaque strings, not serial integers. Reject the
 * shapes the SDK would throw on so a bad URL is a 400/404, never a 500.
 */
export function isValidLeadId(id: unknown): id is string {
  return (
    typeof id === 'string' &&
    id.length > 0 &&
    id.length <= 1500 &&
    !id.includes('/') &&
    id !== '.' &&
    id !== '..' &&
    !/^__.*__$/.test(id)
  );
}

/** Firestore hands back Timestamps; the UI's formatTimestamp() wants a JS Date. */
function toDate(value: unknown): Date {
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  return new Date(0);
}

function toStatus(value: unknown): LeadStatus {
  return (LEAD_STATUSES as readonly string[]).includes(value as string)
    ? (value as LeadStatus)
    : 'new';
}

function text(value: unknown): string | null {
  return typeof value === 'string' && value !== '' ? value : null;
}

/**
 * Document → Lead. Every Timestamp is converted at this boundary, so nothing
 * downstream — including anything crossing a server/client component boundary —
 * ever holds a non-serialisable Firestore value.
 */
function leadFromDoc(doc: QueryDocumentSnapshot<DocumentData>): Lead {
  const d = doc.data();
  return {
    id: doc.id,
    name: typeof d.name === 'string' ? d.name : '',
    email: typeof d.email === 'string' ? d.email : '',
    phone: text(d.phone),
    brandName: text(d.brandName),
    website: text(d.website),
    monthlyRevenue: text(d.monthlyRevenue),
    adSpend: text(d.adSpend),
    message: text(d.message),
    sourceForm: typeof d.sourceForm === 'string' ? d.sourceForm : 'unknown',
    landingPage: text(d.landingPage),
    submittedFrom: text(d.submittedFrom),
    utmSource: text(d.utmSource),
    utmMedium: text(d.utmMedium),
    utmCampaign: text(d.utmCampaign),
    utmContent: text(d.utmContent),
    utmTerm: text(d.utmTerm),
    referrer: text(d.referrer),
    status: toStatus(d.status),
    createdAt: toDate(d.createdAt),
    updatedAt: toDate(d.updatedAt),
    statusHistory: parseHistory(d.statusHistory),
    // Absent on every lead written before this field existed. Deliberately not
    // defaulted to createdAt or updatedAt: null means "unknown", and inventing
    // a value here would put a fabricated response time into the median.
    firstContactedAt: d.firstContactedAt ? toDate(d.firstContactedAt) : null,
    // null, not false, when the field is absent — the analytics layer needs to
    // tell "did not qualify" apart from "predates the flag" and fall back to
    // the current status only for the latter.
    reachedQualified: typeof d.reachedQualified === 'boolean' ? d.reachedQualified : null,
  };
}

/**
 * Stored transitions → StatusChange[], oldest first.
 *
 * Entries whose statuses are not recognised are dropped rather than coerced:
 * a timeline is a record of what happened, and a malformed entry shown as
 * 'new → new' would be a claim the data does not support.
 */
function parseHistory(value: unknown): StatusChange[] {
  if (!Array.isArray(value)) return [];
  const known = LEAD_STATUSES as readonly string[];
  return value
    .filter(
      (entry): entry is DocumentData =>
        Boolean(entry) &&
        typeof entry === 'object' &&
        known.includes((entry as DocumentData).from) &&
        known.includes((entry as DocumentData).to),
    )
    .map((entry) => ({
      from: entry.from as LeadStatus,
      to: entry.to as LeadStatus,
      at: toDate(entry.at),
    }))
    .sort((a, b) => a.at.getTime() - b.at.getTime());
}

function noteFromDoc(leadId: string, doc: QueryDocumentSnapshot<DocumentData>): LeadNote {
  const d = doc.data();
  return {
    id: doc.id,
    // Not stored on the document — a note's parent is its position in the tree.
    // Reconstructed here so LeadNote keeps the shape the UI already consumes.
    leadId,
    body: typeof d.body === 'string' ? d.body : '',
    createdAt: toDate(d.createdAt),
  };
}

/** Insert one lead. Returns the generated document id. */
export async function createLead(lead: NewLead): Promise<string> {
  const now = Timestamp.now();
  const status = lead.status ?? 'new';
  const ref = await leadsCollection().add({
    ...lead,
    status,
    createdAt: now,
    updatedAt: now,
    // Creation is not a transition, so the history starts empty — the timeline
    // renders the arrival from createdAt. What matters is that these three
    // fields exist from the first write, so a lead created from here on can
    // never be mistaken for one that predates the recording.
    statusHistory: [],
    firstContactedAt: null,
    reachedQualified: isQualifiedStatus(status),
  });
  return ref.id;
}

export type LeadFilters = {
  status?: string | null;
  source?: string | null;
  /** Trailing window in days. Anything non-finite or <= 0 is ignored. */
  days?: number | null;
};

/**
 * Pipeline query: filter, then newest first.
 *
 * Firestore needs a declared composite index for every equality+orderBy
 * combination (see firestore.indexes.json). If one has not been deployed yet
 * the SDK fails with FAILED_PRECONDITION — so rather than 500 the panel, that
 * case falls back to a single ordered fetch filtered in memory. At this volume
 * (well under 500 leads) the fallback is cheap enough to be a real answer, not
 * just a safety net.
 */
export async function queryLeads(filters: LeadFilters, max: number): Promise<Lead[]> {
  const status = (LEAD_STATUSES as readonly string[]).includes(filters.status ?? '')
    ? (filters.status as LeadStatus)
    : null;
  const source = filters.source || null;
  const days = Number(filters.days);
  const since =
    Number.isFinite(days) && days > 0 ? new Date(Date.now() - days * 86_400_000) : null;

  let query: Query<DocumentData> = leadsCollection();
  if (status) query = query.where('status', '==', status);
  if (source) query = query.where('sourceForm', '==', source);
  if (since) query = query.where('createdAt', '>=', Timestamp.fromDate(since));

  try {
    const snapshot = await query.orderBy('createdAt', 'desc').limit(max).get();
    return snapshot.docs.map(leadFromDoc);
  } catch (error) {
    if (!isMissingIndex(error)) throw error;

    console.warn(
      '[leads] composite index missing for this filter combination; ' +
        'falling back to in-memory filtering. Deploy firestore.indexes.json to remove this.',
    );

    const snapshot = await leadsCollection().orderBy('createdAt', 'desc').limit(500).get();
    return snapshot.docs
      .map(leadFromDoc)
      .filter((lead) => (status ? lead.status === status : true))
      .filter((lead) => (source ? lead.sourceForm === source : true))
      .filter((lead) => (since ? lead.createdAt >= since : true))
      .slice(0, max);
  }
}

/** Firestore reports a missing composite index as FAILED_PRECONDITION (code 9). */
function isMissingIndex(error: unknown): boolean {
  const e = error as { code?: unknown; message?: unknown };
  const message = typeof e?.message === 'string' ? e.message : '';
  return e?.code === 9 || /requires an index/i.test(message);
}

export async function getLead(id: string): Promise<Lead | null> {
  const doc = await leadsCollection().doc(id).get();
  if (!doc.exists) return null;
  return leadFromDoc(doc as QueryDocumentSnapshot<DocumentData>);
}

/**
 * Moves a lead along the pipeline, recording the move. Returns null when the
 * lead does not exist.
 *
 * Runs in a transaction because two of the three things written here are
 * write-once invariants — firstContactedAt must never be overwritten and
 * reachedQualified must never be unset — and a read-then-write outside a
 * transaction cannot promise that. The history append is inside the same
 * transaction so an entry can never be recorded without the status it
 * describes actually landing.
 *
 * A no-op update (same status resubmitted) writes nothing at all: it is not a
 * transition, and recording it would put a phantom step in the timeline and,
 * worse, could stamp firstContactedAt on a lead nobody contacted.
 */
export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead | null> {
  const ref = leadsCollection().doc(id);

  const found = await getDb().runTransaction(async (tx) => {
    const doc = await tx.get(ref);
    if (!doc.exists) return false;

    const data = doc.data() ?? {};
    const current = toStatus(data.status);
    if (current === status) return true;

    const now = Timestamp.now();
    const update: DocumentData = {
      status,
      updatedAt: now,
      statusHistory: [
        ...toStatusHistory(data.statusHistory),
        // Stored as a Timestamp like every other instant in the document, so
        // the read path converts it the same way.
        { from: current, to: status, at: now },
      ],
    };

    // First move off 'new', and only if nothing was stamped before — a lead
    // pushed back to 'new' and picked up again keeps its original response
    // time rather than resetting it to look faster.
    if (current === 'new' && !data.firstContactedAt) update.firstContactedAt = now;

    // Sticky: only ever written true. Nothing in this function writes false,
    // so a later move to 'lost' cannot erase that the lead qualified.
    if (isQualifiedStatus(status)) update.reachedQualified = true;

    tx.update(ref, update);
    return true;
  });

  if (!found) return null;

  const updated = await ref.get();
  return leadFromDoc(updated as QueryDocumentSnapshot<DocumentData>);
}

/** Stored transitions → StatusChange[], dropping anything malformed. */
function toStatusHistory(value: unknown): DocumentData[] {
  return Array.isArray(value) ? (value as DocumentData[]) : [];
}

/**
 * Notes live in a `notes` subcollection under their lead, so deleting a lead
 * is the only thing that can orphan them — the same containment the Postgres
 * foreign key gave. Append-only, oldest first.
 */
export async function listNotes(leadId: string): Promise<LeadNote[]> {
  const snapshot = await leadsCollection()
    .doc(leadId)
    .collection(NOTES)
    .orderBy('createdAt', 'asc')
    .get();
  return snapshot.docs.map((doc) => noteFromDoc(leadId, doc));
}

/**
 * Append one note. Returns null when the lead does not exist — a subcollection
 * write under a missing parent otherwise succeeds silently, which is exactly
 * what the foreign key used to prevent.
 */
export async function addNote(leadId: string, body: string): Promise<LeadNote | null> {
  const leadRef = leadsCollection().doc(leadId);
  const lead = await leadRef.get();
  if (!lead.exists) return null;

  const createdAt = Timestamp.now();
  const ref = await leadRef.collection(NOTES).add({ body, createdAt });
  return { id: ref.id, leadId, body, createdAt: createdAt.toDate() };
}

/** Load a lead and its notes together — the detail page needs both or neither. */
export async function getLeadWithNotes(
  id: string,
): Promise<{ lead: Lead; notes: LeadNote[] } | null> {
  const lead = await getLead(id);
  if (!lead) return null;
  return { lead, notes: await listNotes(id) };
}

// Re-exported so storage callers have one import. Client components must import
// from lib/leads-schema.ts directly — see the note at the top of this file.
export {
  LEAD_STATUSES,
  QUALIFIED_STATUSES,
  isQualifiedStatus,
  type Lead,
  type LeadNote,
  type LeadStatus,
  type NewLead,
  type StatusChange,
} from './leads-schema';

