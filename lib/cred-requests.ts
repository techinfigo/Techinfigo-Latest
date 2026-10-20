import { randomBytes } from 'crypto';
import { crmDb } from './crm';
import { send, type CrmUser } from './crm-push';
import { CRED_ITEMS, itemOf, type CredItemKey } from './cred-items';

export type { CredItemKey };

/**
 * "Fill your logins" links: www.techinfigo.com/c/<id>.
 *
 * The CRM creates a request for one client with the items it needs. The
 * client opens the link once, fills it and submits; the answers wait in the
 * CRM Firestore under `credentialRequests/<id>` (readable by nobody but this
 * server; the CRM reads them through the API with the owner's sign-in), the
 * CRM copies them into the client's Credentials and then deletes the request.
 *
 * Links are 24 random characters, work for one submit, and expire in 7 days.
 */

export const CRED_REQUESTS = 'credentialRequests';
const ID_RE = /^[A-Za-z0-9]{24}$/;
export const LINK_DAYS = 7;

const KEYS = CRED_ITEMS.map((i) => i.key);

export const isCredRequestId = (id: unknown): id is string => typeof id === 'string' && ID_RE.test(id);

function newId(): string {
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  return Array.from(randomBytes(24), (b) => abc[b % abc.length]).join('');
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;

export type CredAnswer = {
  key: CredItemKey;
  label: string;
  mode: 'login' | 'invite' | 'unknown';
  username?: string;
  password?: string;
  phone?: string;
  url?: string;
  notes?: string;
};

export type PublicRequest = { clientName: string; items: CredItemKey[]; inviteEmail: string; state: 'open' | 'used' | 'expired' };

/** CRM: make a new link for one client. */
export async function createRequest(user: CrmUser, raw: Record<string, unknown>): Promise<{ id: string; expiresAt: number } | null> {
  const clientId = str(raw.clientId, 100);
  const clientName = str(raw.clientName, 80);
  const items = (Array.isArray(raw.items) ? raw.items : []).filter((k): k is CredItemKey => typeof k === 'string' && (KEYS as string[]).includes(k));
  const inviteEmail = str(raw.inviteEmail, 254).toLowerCase();
  if (!clientId || !clientName || !items.length) return null;
  const id = newId();
  const expiresAt = Date.now() + LINK_DAYS * 864e5;
  await crmDb()
    .collection(CRED_REQUESTS)
    .doc(id)
    .set({
      uid: user.uid,
      email: user.email,
      clientId,
      clientName,
      items: [...new Set(items)],
      inviteEmail: EMAIL_RE.test(inviteEmail) ? inviteEmail : user.email,
      status: 'open',
      createdAt: Date.now(),
      expiresAt,
    });
  return { id, expiresAt };
}

/** Public: what the form needs to show. Never returns answers. */
export async function loadPublic(id: string): Promise<PublicRequest | null> {
  const snap = await crmDb().collection(CRED_REQUESTS).doc(id).get();
  if (!snap.exists) return null;
  const status = snap.get('status');
  const expired = Date.now() > Number(snap.get('expiresAt') || 0);
  return {
    clientName: String(snap.get('clientName') || ''),
    items: (snap.get('items') as CredItemKey[]) || [],
    inviteEmail: String(snap.get('inviteEmail') || ''),
    state: status !== 'open' ? 'used' : expired ? 'expired' : 'open',
  };
}

/** Public: the client's one-time submit. */
export async function submitAnswers(id: string, raw: unknown): Promise<'ok' | 'gone' | 'bad'> {
  const ref = crmDb().collection(CRED_REQUESTS).doc(id);
  const list = Array.isArray(raw) ? raw : [];
  let clientName = '';
  const result = await crmDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists || snap.get('status') !== 'open' || Date.now() > Number(snap.get('expiresAt') || 0)) return 'gone' as const;
    clientName = String(snap.get('clientName') || '');
    const allowed = new Set((snap.get('items') as string[]) || []);
    const answers: CredAnswer[] = [];
    for (const r of list.slice(0, 20)) {
      if (!r || typeof r !== 'object') continue;
      const a = r as Record<string, unknown>;
      const key = String(a.key) as CredItemKey;
      if (!allowed.has(key)) continue;
      const item = itemOf(key)!;
      const mode = a.mode === 'invite' && item.invite ? 'invite' : a.mode === 'unknown' ? 'unknown' : 'login';
      const answer: CredAnswer = { key, label: key === 'other' ? str(a.label, 60) || 'Other' : item.label, mode };
      if (mode === 'login') {
        const username = str(a.username, 200);
        const password = str(a.password, 200);
        const phone = str(a.phone, 20);
        const url = str(a.url, 300);
        if (username) answer.username = username;
        if (password) answer.password = password;
        if (phone) answer.phone = phone;
        if (url) answer.url = url;
      }
      const notes = str(a.notes, 500);
      if (notes) answer.notes = notes;
      answers.push(answer);
    }
    if (!answers.length) return 'bad' as const;
    tx.update(ref, { status: 'submitted', answers, submittedAt: Date.now() });
    return 'ok' as const;
  });
  if (result === 'ok') {
    await send({ title: `🔑 ${clientName || 'A client'} filled their logins`, body: 'Open the CRM. They are saved in the client’s Credentials.', path: '/', tag: `creds-${id}` }).catch(() => 0);
  }
  return result;
}

export type OwnerRequest = {
  id: string;
  clientId: string;
  clientName: string;
  items: CredItemKey[];
  status: 'open' | 'submitted' | 'expired';
  createdAt: number;
  expiresAt: number;
  submittedAt?: number;
  answers?: CredAnswer[];
};

/** CRM: this user's links, with answers for the submitted ones. Old unused links are removed. */
export async function listForOwner(user: CrmUser): Promise<OwnerRequest[]> {
  const snap = await crmDb().collection(CRED_REQUESTS).where('uid', '==', user.uid).get();
  const out: OwnerRequest[] = [];
  const now = Date.now();
  for (const d of snap.docs) {
    const status = d.get('status') as string;
    const expiresAt = Number(d.get('expiresAt') || 0);
    // Unused links are deleted 3 days after they expire.
    if (status === 'open' && now > expiresAt + 3 * 864e5) {
      await d.ref.delete().catch(() => 0);
      continue;
    }
    out.push({
      id: d.id,
      clientId: String(d.get('clientId') || ''),
      clientName: String(d.get('clientName') || ''),
      items: (d.get('items') as CredItemKey[]) || [],
      status: status === 'submitted' ? 'submitted' : now > expiresAt ? 'expired' : 'open',
      createdAt: Number(d.get('createdAt') || 0),
      expiresAt,
      ...(status === 'submitted' ? { submittedAt: Number(d.get('submittedAt') || 0), answers: (d.get('answers') as CredAnswer[]) || [] } : {}),
    });
  }
  return out.sort((a, b) => b.createdAt - a.createdAt);
}

/** CRM: remove a link (cancel), or a submitted one after the CRM has saved it. */
export async function removeRequest(user: CrmUser, id: string): Promise<boolean> {
  const ref = crmDb().collection(CRED_REQUESTS).doc(id);
  const snap = await ref.get();
  if (!snap.exists) return true;
  if (snap.get('uid') !== user.uid) return false;
  await ref.delete();
  return true;
}
