import { randomBytes } from 'crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { crmDb } from './crm';
import { send, type CrmUser } from './crm-push';
import { PROPOSAL_SERVICES, type ProposalDesign, type ProposalIcon, type ProposalServiceKey } from './proposal-design';

/**
 * Client-facing proposal links: www.techinfigo.com/p/<id>.
 * The CRM sends the proposal's details (not HTML); they are cleaned here and
 * stored in the CRM Firestore under `publicProposals/<id>`. The page is drawn
 * from them on every visit, so only plain text and numbers ever reach it.
 */

export const PUBLIC_PROPOSALS = 'publicProposals';
const ID_RE = /^[A-Za-z0-9]{10,24}$/;
const ICONS: ProposalIcon[] = ['pin', 'globe', 'insta', 'mega', 'chat', 'chart', 'star', 'zap', 'list', 'search', 'repeat', 'key', 'check', 'cal', 'arrow', 'goal'];
const KEYS = PROPOSAL_SERVICES.map((s) => s.key);

export const isProposalId = (id: unknown): id is string => typeof id === 'string' && ID_RE.test(id);

function newId(): string {
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  return Array.from(randomBytes(12), (b) => abc[b % abc.length]).join('');
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const num = (v: unknown, min: number, max: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : 0;
};
const day = (v: unknown) => (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : new Date().toISOString().slice(0, 10));

/** Keeps only the fields the design uses, with sane lengths and ranges. */
export function cleanDesign(raw: unknown): ProposalDesign | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, any>;
  const business = str(r.business, 80);
  if (!business) return null;
  const services = (Array.isArray(r.services) ? r.services : [])
    .filter((s: any) => s && KEYS.includes(s.key))
    .slice(0, 6)
    .map((s: any) => ({
      key: s.key as ProposalServiceKey,
      title: str(s.title, 40) || 'Service',
      price: num(s.price, 0, 10_000_000),
      billing: s.billing === 'monthly' ? ('monthly' as const) : ('one-time' as const),
      ticks: (Array.isArray(s.ticks) ? s.ticks : []).slice(0, 4).map((t: unknown) => str(t, 48)).filter(Boolean),
      recommended: !!s.recommended,
    }));
  if (!services.length) return null;
  const roi = r.roi && typeof r.roi === 'object' ? r.roi : {};
  const contact = r.contact && typeof r.contact === 'object' ? r.contact : {};
  return {
    v: 1,
    number: str(r.number, 30),
    date: day(r.date),
    validUntil: day(r.validUntil),
    business,
    person: str(r.person, 60),
    customerWord: str(r.customerWord, 20).toLowerCase() || 'customers',
    score: r.score === null || r.score === undefined || r.score === '' ? null : num(r.score, 0, 100),
    problems: (Array.isArray(r.problems) ? r.problems : []).slice(0, 4).map((p: any) => ({
      icon: ICONS.includes(p?.icon) ? p.icon : 'check',
      title: str(p?.title, 60),
      cost: str(p?.cost, 60),
      level: (p?.level === 'yellow' ? 'yellow' : 'red') as 'red' | 'yellow',
    })).filter((p: { title: string }) => p.title),
    services,
    roi: {
      enabled: !!roi.enabled,
      avgValue: num(roi.avgValue, 0, 100_000_000),
      valueNote: str(roi.valueNote, 16),
      profitPct: num(roi.profitPct, 0, 100),
      joinPct: num(roi.joinPct, 0, 100),
      adBudget: num(roi.adBudget, 0, 10_000_000),
    },
    ctaLine: str(r.ctaLine, 80),
    contact: {
      name: str(contact.name, 60),
      phone: str(contact.phone, 20),
      address: str(contact.address, 80),
      upiId: /^[\w.\-]{2,64}@[\w.\-]{2,64}$/.test(str(contact.upiId, 130)) ? str(contact.upiId, 130) : '',
    },
  };
}

/** Creates or updates a proposal link. Returns its id, or null if not allowed. */
export async function publishProposal(user: CrmUser, data: ProposalDesign, existingId?: unknown): Promise<string | null> {
  const col = crmDb().collection(PUBLIC_PROPOSALS);
  if (isProposalId(existingId)) {
    const ref = col.doc(existingId);
    const snap = await ref.get();
    if (snap.exists) {
      if (snap.get('uid') !== user.uid) return null;
      await ref.update({ data, updatedAt: FieldValue.serverTimestamp() });
      return existingId;
    }
  }
  const id = newId();
  await col.doc(id).set({ data, uid: user.uid, email: user.email, views: 0, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
  return id;
}

export async function loadProposal(id: string): Promise<ProposalDesign | null> {
  const snap = await crmDb().collection(PUBLIC_PROPOSALS).doc(id).get();
  if (!snap.exists) return null;
  return cleanDesign(snap.get('data'));
}

const BOT = /bot|crawl|spider|preview|facebookexternalhit|whatsapp|telegram|slack|discord|skype|linkedin|twitter/i;

/**
 * Counts a real visit and tells the owner's phone ("Gyan Path opened your
 * proposal") — at most once an hour per proposal. Link previews (WhatsApp
 * fetching the page to show a card) are not counted.
 */
export async function recordView(id: string, userAgent: string): Promise<void> {
  if (!userAgent || BOT.test(userAgent)) return;
  const ref = crmDb().collection(PUBLIC_PROPOSALS).doc(id);
  const snap = await ref.get();
  if (!snap.exists) return;
  const last = (snap.get('lastAlertAt') as number | undefined) || 0;
  const now = Date.now();
  const alert = now - last > 60 * 60 * 1000;
  await ref.update({ views: FieldValue.increment(1), lastViewedAt: now, ...(alert ? { lastAlertAt: now } : {}) });
  if (alert) {
    const d = cleanDesign(snap.get('data'));
    const views = ((snap.get('views') as number) || 0) + 1;
    await send({
      title: `👀 ${d?.business || 'A client'} opened your proposal`,
      body: views > 1 ? `Opened ${views} times. Good time to call.` : 'Good time to call or WhatsApp them.',
      path: '/',
      tag: `proposal-${id}`,
    }).catch(() => 0);
  }
}
