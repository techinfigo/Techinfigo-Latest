import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { SignJWT, jwtVerify } from 'jose';
import { crmDb } from './crm';
import { send, type CrmUser } from './crm-push';

/**
 * Client portal (www.techinfigo.com/portal).
 *
 * The CRM keeps everything; it sends each client only *their* snapshot
 * (calendar, invoices, services, proposal links) to `portals/<clientId>` in the
 * CRM Firestore, which only this server can read. Clients sign in with their
 * phone number and a password Sachin sets in the CRM. Approvals and change
 * requests are written into the snapshot at once (so the client sees them) and
 * queued in `portalActions` for the CRM to pull into its calendar.
 */

export const PORTALS = 'portals';
export const PORTAL_ACTIONS = 'portalActions';
export const PORTAL_COOKIE = 'tf_portal';
const SESSION_DAYS = 30;

/* ---------------------------------------------------------------- types */

import type { PortalPlan, PortalLead, PortalSnapshot } from './portal-types';
export type { PortalPlan, PortalInvoice, PortalService, PortalDoc, PortalLead, PortalSnapshot } from './portal-types';

/* ------------------------------------------------------------- helpers */

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const num = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.max(0, Math.min(1e9, Math.round(n * 100) / 100)) : 0;
};
const day = (v: unknown) => (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v) ? v.slice(0, 10) : '');
const httpUrl = (v: unknown) => {
  const s = str(v, 500);
  return /^https:\/\/[^\s<>"]+$/i.test(s) ? s : '';
};
const STATUSES = ['Idea', 'Making', 'Approved', 'Done'] as const;
const CONTENT = ['Post', 'Reel', 'Story', 'Ad'];
export const isContentKind = (k: string) => CONTENT.includes(k);
export const isClientId = (v: unknown): v is string => typeof v === 'string' && /^[\w-]{1,80}$/.test(v);

/** 10-digit Indian mobile, or null. */
export function cleanPhone(v: unknown): string | null {
  const d = String(v ?? '').replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 32).toString('hex')}`;
}
function checkPassword(password: string, stored: string): boolean {
  const [salt, hash] = (stored || '').split(':');
  if (!salt || !hash || hash.length !== 64) return false;
  const expected = Buffer.from(hash, 'hex');
  return timingSafeEqual(expected, scryptSync(password, salt, expected.length));
}

/** Snapshot from the CRM, cleaned and capped. Only plain text, numbers and https links. */
export function cleanSnapshot(raw: unknown): PortalSnapshot {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const arr = (v: unknown, max: number) => (Array.isArray(v) ? v.slice(0, max) : []) as Record<string, unknown>[];
  return {
    business: str(r.business, 80),
    person: str(r.person, 60),
    plans: arr(r.plans, 400)
      .map((p) => ({
        id: str(p.id, 80),
        date: day(p.date),
        ...(str(p.time, 5) ? { time: str(p.time, 5) } : {}),
        kind: str(p.kind, 12) || 'Other',
        title: str(p.title, 140),
        platforms: arr(p.platforms, 8).map((x) => str(x, 20)).filter(Boolean),
        status: (STATUSES as readonly string[]).includes(String(p.status)) ? (p.status as PortalPlan['status']) : 'Idea',
        ...(httpUrl(p.previewUrl) ? { previewUrl: httpUrl(p.previewUrl) } : {}),
        ...(str(p.clientComment, 500) ? { clientComment: str(p.clientComment, 500) } : {}),
        ...(p.changeRequested ? { changeRequested: true } : {}),
      }))
      .filter((p) => p.id && p.date && p.title),
    invoices: arr(r.invoices, 120)
      .map((i) => ({ id: str(i.id, 80), number: str(i.number, 40), issueDate: day(i.issueDate), dueDate: day(i.dueDate), total: num(i.total), paid: num(i.paid), due: num(i.due), status: str(i.status, 20) }))
      .filter((i) => i.id),
    services: arr(r.services, 30)
      .map((s) => ({ name: str(s.name, 80), cost: num(s.cost), billingType: str(s.billingType, 20) }))
      .filter((s) => s.name),
    docs: arr(r.docs, 20)
      .map((d) => ({ title: str(d.title, 80), url: httpUrl(d.url), ...(day(d.date) ? { date: day(d.date) } : {}) }))
      .filter((d) => d.title && d.url),
    leads: arr(r.leads, 500)
      .map((l) => ({
        id: str(l.id, 80),
        name: str(l.name, 120) || 'Lead',
        ...(str(l.phone, 20) ? { phone: str(l.phone, 20) } : {}),
        ...(str(l.email, 120) ? { email: str(l.email, 120) } : {}),
        ...(str(l.source, 40) ? { source: str(l.source, 40) } : {}),
        status: (['New', 'Contacted', 'Converted', 'Lost'] as readonly string[]).includes(String(l.status)) ? (l.status as PortalLead['status']) : 'New',
        ...(str(l.note, 500) ? { note: str(l.note, 500) } : {}),
        ...(str(l.at, 40) ? { at: str(l.at, 40) } : {}),
        ...(str(l.nextFollowUp, 40) ? { nextFollowUp: str(l.nextFollowUp, 40) } : {}),
        ...(Array.isArray(l.activity)
          ? {
              activity: (l.activity as Record<string, unknown>[])
                .slice(0, 20)
                .map((a) => ({ type: str(a.type, 20) || 'Other', note: str(a.note, 500), at: str(a.at, 40) }))
                .filter((a) => a.note || a.at),
            }
          : {}),
      }))
      .filter((l) => l.id),
    upiId: /^[\w.\-]{2,64}@[\w.\-]{2,64}$/.test(str(r.upiId, 130)) ? str(r.upiId, 130) : '',
    contactName: str(r.contactName, 60),
    contactPhone: str(r.contactPhone, 20),
  };
}

/* ------------------------------------------------------------- session */

function sessionKey(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('ADMIN_SESSION_SECRET is not set.');
  // A key of its own, so a portal cookie can never be read as an admin one.
  return createHash('sha256').update(`techinfigo-client-portal:${secret}`).digest();
}

export async function makeSession(clientId: string, passVersion: number): Promise<string> {
  return new SignJWT({ pv: passVersion })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(clientId)
    .setAudience('client-portal')
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(sessionKey());
}

export const portalCookie = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_DAYS * 86400,
};

export type PortalSession = { clientId: string; snapshot: PortalSnapshot; syncedAt: number; phone: string };

/** The signed-in client's portal, or null (bad/expired cookie, access switched off, password changed). */
export async function readPortal(token: string | undefined): Promise<PortalSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, sessionKey(), { algorithms: ['HS256'], audience: 'client-portal' });
    const clientId = String(payload.sub || '');
    if (!isClientId(clientId)) return null;
    const snap = await crmDb().collection(PORTALS).doc(clientId).get();
    if (!snap.exists || !snap.get('enabled') || Number(snap.get('passVersion') || 0) !== Number(payload.pv)) return null;
    return { clientId, snapshot: cleanSnapshot(snap.get('snapshot')), syncedAt: Number(snap.get('syncedAt') || 0), phone: String(snap.get('phone') || '') };
  } catch {
    return null;
  }
}

/** Phone + password → session token, or null. */
export async function login(phoneRaw: unknown, password: unknown): Promise<string | null> {
  const phone = cleanPhone(phoneRaw);
  if (!phone || typeof password !== 'string' || !password || password.length > 200) return null;
  const docs = await crmDb().collection(PORTALS).where('phone', '==', phone).limit(3).get();
  // Same work whether or not the number exists, so timing says nothing.
  if (docs.empty) checkPassword(password, `${'0'.repeat(32)}:${'0'.repeat(64)}`);
  for (const d of docs.docs) {
    if (d.get('enabled') && checkPassword(password, String(d.get('passHash') || ''))) {
      return makeSession(d.id, Number(d.get('passVersion') || 0));
    }
  }
  return null;
}

/** Client changes their own password; returns a fresh session token. */
export async function changePassword(clientId: string, oldPass: string, newPass: string): Promise<string | 'wrong' | 'weak'> {
  if (typeof newPass !== 'string' || newPass.length < 6 || newPass.length > 100) return 'weak';
  const ref = crmDb().collection(PORTALS).doc(clientId);
  const snap = await ref.get();
  if (!snap.exists || !checkPassword(String(oldPass || ''), String(snap.get('passHash') || ''))) return 'wrong';
  const pv = Number(snap.get('passVersion') || 0) + 1;
  await ref.update({ passHash: hashPassword(newPass), passVersion: pv, passChangedByClientAt: Date.now() });
  return makeSession(clientId, pv);
}

/* ------------------------------------------------------- client actions */

/** Approve a calendar item, or ask for a change with a comment. */
export async function clientAction(clientId: string, planId: string, action: 'approve' | 'change', comment: string): Promise<'ok' | 'bad'> {
  const ref = crmDb().collection(PORTALS).doc(clientId);
  let owner = '';
  let business = '';
  let title = '';
  const ok = await crmDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists || !snap.get('enabled')) return false;
    const s = cleanSnapshot(snap.get('snapshot'));
    const p = s.plans.find((x) => x.id === planId);
    if (!p || !isContentKind(p.kind) || p.status === 'Done') return false;
    if (action === 'change' && !comment) return false;
    if (action === 'approve') {
      p.status = 'Approved';
      delete p.changeRequested;
      if (comment) p.clientComment = comment;
      else delete p.clientComment;
    } else {
      p.changeRequested = true;
      p.clientComment = comment;
    }
    owner = String(snap.get('uid') || '');
    business = s.business;
    title = p.title;
    tx.update(ref, { snapshot: s });
    tx.set(crmDb().collection(PORTAL_ACTIONS).doc(), { uid: owner, clientId, planId, action, comment, at: Date.now() });
    return true;
  });
  if (!ok) return 'bad';
  await send({
    title: action === 'approve' ? `✅ ${business || 'Client'} approved: ${title}` : `✏️ ${business || 'Client'} wants a change: ${title}`,
    body: action === 'approve' ? (comment ? `“${comment}”` : 'Marked Approved in your calendar.') : `“${comment}”`,
    path: '/',
    tag: `portal-${clientId}`,
  }).catch(() => 0);
  return 'ok';
}

/** Signed-in client updates one of their leads (status / note). */
export async function clientLeadAction(clientId: string, leadId: string, status: string, note: string): Promise<'ok' | 'bad'> {
  const ref = crmDb().collection(PORTALS).doc(clientId);
  let owner = '';
  let business = '';
  let leadName = '';
  const ok = await crmDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists || !snap.get('enabled')) return false;
    const s = cleanSnapshot(snap.get('snapshot'));
    const l = s.leads.find((x) => x.id === leadId);
    if (!l) return false;
    if (status === 'New' || status === 'Contacted' || status === 'Converted' || status === 'Lost') l.status = status as typeof l.status;
    if (note) l.note = note;
    owner = String(snap.get('uid') || '');
    business = s.business;
    leadName = l.name;
    tx.update(ref, { snapshot: s });
    tx.set(crmDb().collection(PORTAL_ACTIONS).doc(), { uid: owner, clientId, leadId, leadStatus: status, leadNote: note, at: Date.now() });
    return true;
  });
  if (!ok) return 'bad';
  await send({
    title: `\uD83C\uDFAF ${business || 'Client'} updated a lead: ${leadName}`,
    body: note ? `${status} — \u201C${note}\u201D` : `Marked ${status}.`,
    path: '/',
    tag: `portal-lead-${clientId}`,
  }).catch(() => 0);
  return 'ok';
}

/** Client logs an activity and/or sets the next follow-up on a lead. */
export async function clientLeadFollowUp(clientId: string, leadId: string, next: string, actType: string, actNote: string): Promise<'ok' | 'bad'> {
  const ref = crmDb().collection(PORTALS).doc(clientId);
  let owner = '';
  let business = '';
  let leadName = '';
  const nowIso = new Date().toISOString();
  const ok = await crmDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists || !snap.get('enabled')) return false;
    const s = cleanSnapshot(snap.get('snapshot'));
    const l = s.leads.find((x) => x.id === leadId);
    if (!l) return false;
    if (next) l.nextFollowUp = next;
    if (actNote) {
      const item = { type: actType || 'Other', note: actNote, at: nowIso };
      l.activity = [item, ...(l.activity || [])].slice(0, 20);
      if (l.status === 'New') l.status = 'Contacted';
    }
    owner = String(snap.get('uid') || '');
    business = s.business;
    leadName = l.name;
    tx.update(ref, { snapshot: s });
    tx.set(crmDb().collection(PORTAL_ACTIONS).doc(), { uid: owner, clientId, leadId, leadNextFollowUp: next, leadActivityType: actType, leadActivityNote: actNote, at: Date.now() });
    return true;
  });
  if (!ok) return 'bad';
  await send({
    title: `🎯 ${business || 'Client'} — follow-up on ${leadName}`,
    body: actNote ? `${actType || 'Note'}: “${actNote}”` : `Next follow-up set.`,
    path: '/',
    tag: `portal-lead-${clientId}`,
  }).catch(() => 0);
  return 'ok';
}

/** Signed-in client adds their own lead (walk-in, phone call). */
export async function clientAddLead(clientId: string, name: string, phone: string, note: string): Promise<'ok' | 'bad'> {
  const ref = crmDb().collection(PORTALS).doc(clientId);
  const leadId = `plead-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  let owner = '';
  let business = '';
  const ok = await crmDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists || !snap.get('enabled')) return false;
    const s = cleanSnapshot(snap.get('snapshot'));
    s.leads.unshift({ id: leadId, name: name || 'Lead', phone: phone || '', source: 'Added by you', status: 'New', ...(note ? { note } : {}), at: new Date().toISOString() });
    owner = String(snap.get('uid') || '');
    business = s.business;
    tx.update(ref, { snapshot: s });
    tx.set(crmDb().collection(PORTAL_ACTIONS).doc(), { uid: owner, clientId, leadId, leadNew: true, leadName: name, leadPhone: phone, leadNote: note, leadStatus: 'New', at: Date.now() });
    return true;
  });
  if (!ok) return 'bad';
  await send({
    title: `\uD83C\uDFAF ${business || 'Client'} added a lead: ${name}`,
    body: phone ? `${phone}${note ? ' — ' + note : ''}` : (note || 'New lead added from portal.'),
    path: '/',
    tag: `portal-lead-${clientId}`,
  }).catch(() => 0);
  return 'ok';
}

/* ---------------------------------------------------------- CRM (owner) */

export type PortalSetup = { clientId: string; enabled: boolean; phone: string; syncedAt: number; hasPassword: boolean };

/** Create / update access. Password is only changed when one is given. */
export async function setupPortal(user: CrmUser, raw: Record<string, unknown>): Promise<PortalSetup | string> {
  const clientId = raw.clientId;
  if (!isClientId(clientId)) return 'Bad client.';
  const phone = cleanPhone(raw.phone);
  if (!phone) return 'Enter the client’s 10-digit mobile number.';
  const password = typeof raw.password === 'string' ? raw.password : '';
  if (password && (password.length < 6 || password.length > 100)) return 'Password must be at least 6 characters.';
  const ref = crmDb().collection(PORTALS).doc(clientId);
  const snap = await ref.get();
  if (snap.exists && snap.get('uid') !== user.uid) return 'Not allowed.';
  if (!snap.exists && !password) return 'Set a password for the first login.';
  const clash = await crmDb().collection(PORTALS).where('phone', '==', phone).limit(3).get();
  if (clash.docs.some((d) => d.id !== clientId)) return 'This mobile number already logs in to another client’s portal.';
  const enabled = raw.enabled !== false;
  const update: Record<string, unknown> = { uid: user.uid, clientId, phone, enabled, updatedAt: Date.now() };
  if (!snap.exists) Object.assign(update, { createdAt: Date.now(), passVersion: 1, snapshot: cleanSnapshot({}) });
  if (password) Object.assign(update, { passHash: hashPassword(password), passVersion: Number(snap.get('passVersion') || 0) + 1 });
  if (!enabled) update.passVersion = Number(snap.get('passVersion') || 0) + 1; // signs everyone out
  await ref.set(update, { merge: true });
  return { clientId, enabled, phone, syncedAt: Number(snap.get('syncedAt') || 0), hasPassword: true };
}

/** CRM sends the latest snapshot. Client actions not yet pulled are kept on top. */
export async function syncPortal(user: CrmUser, clientId: string, raw: unknown): Promise<boolean> {
  const ref = crmDb().collection(PORTALS).doc(clientId);
  const snap = await ref.get();
  if (!snap.exists || snap.get('uid') !== user.uid) return false;
  const s = cleanSnapshot(raw);
  const pending = await crmDb().collection(PORTAL_ACTIONS).where('clientId', '==', clientId).get();
  for (const a of pending.docs.sort((x, y) => Number(x.get('at')) - Number(y.get('at')))) {
    const p = s.plans.find((x) => x.id === a.get('planId'));
    if (!p) continue;
    if (a.get('action') === 'approve') {
      if (p.status === 'Idea' || p.status === 'Making') p.status = 'Approved';
      delete p.changeRequested;
    } else {
      p.changeRequested = true;
      p.clientComment = String(a.get('comment') || '');
    }
  }
  for (const a of pending.docs.filter((d) => d.get('leadId')).sort((x, y) => Number(x.get('at')) - Number(y.get('at')))) {
    let l = s.leads.find((x) => x.id === a.get('leadId'));
    if (!l && a.get('leadNew')) {
      l = { id: String(a.get('leadId')), name: String(a.get('leadName') || 'Lead'), phone: String(a.get('leadPhone') || ''), source: 'Added by you', status: 'New', at: new Date(Number(a.get('at')) || Date.now()).toISOString() };
      s.leads.unshift(l);
    }
    if (!l) continue;
    const st = String(a.get('leadStatus') || '');
    if (st === 'New' || st === 'Contacted' || st === 'Converted' || st === 'Lost') l.status = st;
    const note = String(a.get('leadNote') || '');
    if (note) l.note = note;
  }
  await ref.update({ snapshot: s, syncedAt: Date.now() });
  return true;
}

export async function portalStatus(user: CrmUser): Promise<PortalSetup[]> {
  const docs = await crmDb().collection(PORTALS).where('uid', '==', user.uid).get();
  return docs.docs.map((d) => ({ clientId: d.id, enabled: !!d.get('enabled'), phone: String(d.get('phone') || ''), syncedAt: Number(d.get('syncedAt') || 0), hasPassword: !!d.get('passHash') }));
}

export type PortalAction = { id: string; clientId: string; planId: string; action: 'approve' | 'change'; comment: string; at: number; leadId?: string; leadStatus?: string; leadNote?: string; leadNew?: boolean; leadName?: string; leadPhone?: string };

export async function pullActions(user: CrmUser): Promise<PortalAction[]> {
  const docs = await crmDb().collection(PORTAL_ACTIONS).where('uid', '==', user.uid).get();
  return docs.docs
    .map((d) => ({ id: d.id, clientId: String(d.get('clientId')), planId: String(d.get('planId') || ''), action: d.get('action') === 'change' ? ('change' as const) : ('approve' as const), comment: String(d.get('comment') || ''), at: Number(d.get('at') || 0), ...(d.get('leadId') ? { leadId: String(d.get('leadId')), leadStatus: String(d.get('leadStatus') || ''), leadNote: String(d.get('leadNote') || ''), ...(d.get('leadNew') ? { leadNew: true, leadName: String(d.get('leadName') || ''), leadPhone: String(d.get('leadPhone') || '') } : {}) } : {}) }))
    .sort((a, b) => a.at - b.at);
}

export async function ackActions(user: CrmUser, ids: unknown): Promise<void> {
  const list = (Array.isArray(ids) ? ids : []).filter((x): x is string => typeof x === 'string' && /^[\w-]{1,40}$/.test(x)).slice(0, 200);
  const col = crmDb().collection(PORTAL_ACTIONS);
  await Promise.all(
    list.map(async (id) => {
      const ref = col.doc(id);
      const snap = await ref.get();
      if (snap.exists && snap.get('uid') === user.uid) await ref.delete();
    }),
  );
}
