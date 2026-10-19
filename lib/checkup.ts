/**
 * Free Business Check-up (www.techinfigo.com/checkup).
 *
 * The questions a business owner actually thinks about (his problem, his
 * customers, his money), in simple Hinglish, with an instant reply for every
 * answer. Pure data and maths only: used by the form in the browser and by
 * the lead API on the server (which re-checks everything the browser sends).
 *
 * Every number shown to the visitor is an estimate.
 */

export type BizKey = 'coaching' | 'clinic' | 'gym' | 'restaurant' | 'salon' | 'shop' | 'd2c' | 'other';
export type ServiceKey = 'website' | 'gbp' | 'growth' | 'seo' | 'social' | 'ads';

export type Biz = {
  key: BizKey;
  emoji: string;
  label: string;
  /** English label for the CRM. */
  crmLabel: string;
  /** Hinglish word for one buyer / many buyers. */
  one: string;
  many: string;
  /** English word the proposal uses. */
  customerWord: string;
  /** The "did you know" line shown after picking. */
  tip: string;
  /** Value chips (₹ per buyer). */
  values: number[];
  valueNote: string;
};

export const BIZ: Biz[] = [
  { key: 'coaching', emoji: '🎓', label: 'Coaching', crmLabel: 'Coaching', one: 'student', many: 'students', customerWord: 'students', tip: 'Zyada tar parents coaching pehle Google Maps pe dhoondte hain, phir call karte hain.', values: [5000, 10000, 25000, 50000], valueNote: 'saal ki fees' },
  { key: 'clinic', emoji: '🏥', label: 'Clinic', crmLabel: 'Clinic', one: 'patient', many: 'patients', customerWord: 'patients', tip: 'Naye patients doctor chunne se pehle Google pe reviews padhte hain.', values: [500, 2000, 10000, 50000], valueNote: '' },
  { key: 'gym', emoji: '💪', label: 'Gym', crmLabel: 'Gym', one: 'member', many: 'members', customerWord: 'members', tip: 'Log gym join karne se pehle Instagram pe photos aur reels dekhte hain.', values: [1000, 3000, 8000, 15000], valueNote: '' },
  { key: 'restaurant', emoji: '🍽️', label: 'Restaurant', crmLabel: 'Restaurant', one: 'customer', many: 'customers', customerWord: 'guests', tip: '"Near me" search karne wale zyada tar log usi din khaane aate hain.', values: [300, 800, 2000, 5000], valueNote: 'ek bill' },
  { key: 'salon', emoji: '💇', label: 'Salon', crmLabel: 'Salon', one: 'customer', many: 'customers', customerWord: 'clients', tip: 'Salon chunne se pehle log photos aur reviews zaroor dekhte hain.', values: [500, 1500, 5000, 15000], valueNote: '' },
  { key: 'shop', emoji: '🛍️', label: 'Dukaan', crmLabel: 'Shop', one: 'customer', many: 'customers', customerWord: 'customers', tip: 'Aaj kal log dukaan jaane se pehle Google pe timing aur photos dekhte hain.', values: [500, 2000, 10000, 25000], valueNote: '' },
  { key: 'd2c', emoji: '📦', label: 'Online brand', crmLabel: 'D2C brand', one: 'order', many: 'orders', customerWord: 'buyers', tip: 'Online khareedne wale pehle Instagram pe brand dekhte hain, phir order karte hain.', values: [500, 1000, 2500, 5000], valueNote: 'ek order' },
  { key: 'other', emoji: '✨', label: 'Kuch aur', crmLabel: 'Other', one: 'customer', many: 'customers', customerWord: 'customers', tip: 'Zyada tar naye customers aapko pehle phone pe Google ya Instagram pe dhoondte hain.', values: [500, 2000, 10000, 25000], valueNote: '' },
];

export const bizOf = (k: string | undefined): Biz => BIZ.find((b) => b.key === k) || BIZ[BIZ.length - 1];

/** A red card ("problem mila") and its green fix. */
export type Finding = {
  problem: string;
  loss: string;
  fix: string;
  services: ServiceKey[];
  /** Matching problem titles in the CRM proposal builder. */
  proposalProblems: string[];
};

export type Option = { id: string; emoji: string; label: string };

export type StepId = 'biz' | 'pain' | 'sources' | 'website' | 'goal' | 'value' | 'budget' | 'when';
export const STEP_IDS: StepId[] = ['biz', 'pain', 'sources', 'website', 'goal', 'value', 'budget', 'when'];

export type Answers = {
  biz?: BizKey;
  pain?: string;
  sources?: string[];
  website?: string;
  goal?: string;
  value?: string;
  budget?: string;
  when?: string;
  /** Their website link, for the free audit (goes to the lead, not scored). */
  websiteUrl?: string;
};

/* ---------------------------------------------------------------- options */

export const PAIN: Option[] = [
  { id: 'few', emoji: '😟', label: 'Naye customers kam aate hain' },
  { id: 'convert', emoji: '📞', label: 'Log poochte hain, par aate nahi' },
  { id: 'found', emoji: '🔍', label: 'Online koi dhoondh nahi pata' },
  { id: 'rivals', emoji: '⚔️', label: 'Competition aage nikal raha hai' },
  { id: 'time', emoji: '⏰', label: 'Marketing ka time hi nahi milta' },
];

export const SOURCES: Option[] = [
  { id: 'referral', emoji: '🗣️', label: 'Jaan-pehchaan se' },
  { id: 'google', emoji: '🗺️', label: 'Google' },
  { id: 'social', emoji: '📱', label: 'Instagram / Facebook' },
  { id: 'banner', emoji: '📰', label: 'Banner / pamphlet' },
  { id: 'walkin', emoji: '🚶', label: 'Walk-in (dukaan ke saamne se)' },
];

export const WEBSITE: Option[] = [
  { id: 'good', emoji: '✅', label: 'Haan, achhi website hai' },
  { id: 'old', emoji: '😕', label: 'Hai, par purani / kaam ki nahi' },
  { id: 'none', emoji: '❌', label: 'Nahi hai' },
];

/* Slider steps (drag low → high). Nice round numbers, not every rupee. */
const NICE = [100, 200, 300, 500, 750, 1000, 1500, 2000, 3000, 4000, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000, 150000, 200000, 300000, 500000];
/** ₹ per customer, from a little below to well above this business's usual range. */
export const valueSteps = (b: Biz) => NICE.filter((n) => n >= Math.max(100, b.values[0] / 5) && n <= b.values[b.values.length - 1] * 4);
export const valueDefault = (b: Biz) => b.values[1];
export const GOAL_STEPS = [1, 2, 3, 5, 7, 10, 15, 20, 25, 30, 40, 50, 75, 100];
export const GOAL_DEFAULT = 10;
export const BUDGET_STEPS = [0, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000];
export const BUDGET_DEFAULT = 10000;

export const WHEN: Option[] = [
  { id: 'now', emoji: '🔥', label: 'Abhi, jaldi se jaldi' },
  { id: 'month', emoji: '📅', label: 'Is mahine' },
  { id: 'browsing', emoji: '👀', label: 'Bas dekh raha hoon' },
];

/* --------------------------------------------------------------- findings */

export function painFinding(id: string | undefined, b: Biz): Finding | null {
  switch (id) {
    case 'few':
      return { problem: `Naye ${b.many} kam aa rahe hain`, loss: 'Business ek jagah ruk gaya hai', fix: 'Google Maps + chhote budget ke ads, sirf aapke area ke sahi logon tak', services: ['gbp', 'ads'], proposalProblems: ['Not on Google Maps', 'No ads running'] };
    case 'convert':
      return { problem: 'Log poochte hain, par aate nahi', loss: 'Har missed enquiry = paisa haath se gaya', fix: 'Har enquiry ka turant WhatsApp reply + follow-up system. Koi enquiry miss nahi hogi', services: ['website'], proposalProblems: ['Enquiries not tracked'] };
    case 'found':
      return { problem: 'Log aapko online dhoondh nahi pa rahe', loss: 'Har mahine ≈ 20 log aapke paas aate aate reh jaate hain', fix: 'Google Maps pe aapka business, photos aur reviews ke saath (7 din mein)', services: ['gbp'], proposalProblems: ['Not on Google Maps'] };
    case 'rivals':
      return { problem: 'Competition aage nikal raha hai', loss: `Jo zyada dikhta hai, ${b.many} usi ke paas jaate hain`, fix: 'Aap unse zyada trusted dikho: reviews, reels aur ads', services: ['gbp', 'social', 'ads'], proposalProblems: ['Very few Google reviews', 'Social media inactive'] };
    case 'time':
      return { problem: 'Marketing ka time nahi milta', loss: 'Marketing ruki, toh naye customers bhi ruke', fix: 'Poora kaam hamari team karegi. Aap sirf approve karo (hafte mein 5 minute)', services: ['social', 'gbp'], proposalProblems: ['Social media inactive'] };
    default:
      return null;
  }
}

/** Reply to "where do customers come from": praise or a finding. */
export function sourcesFinding(ids: string[] | undefined): Finding | null {
  const s = new Set(ids || []);
  if (!s.size) return null;
  const google = s.has('google');
  const social = s.has('social');
  if (google && social) return null;
  if (!google && !social)
    return { problem: 'Naye log sirf jaan-pehchaan / saamne se aate hain', loss: 'Isse business bahut slow badhta hai', fix: 'Google + Instagram se roz naye log, aapke area se', services: ['gbp', 'social'], proposalProblems: ['Not on Google Maps', 'Social media inactive'] };
  if (!google)
    return { problem: 'Google se koi nahi aa raha', loss: 'Jo log "near me" search karte hain, wo rivals ke paas jaate hain', fix: 'Google Maps pe aapka business, photos aur reviews ke saath', services: ['gbp'], proposalProblems: ['Not on Google Maps'] };
  return { problem: 'Instagram / Facebook se koi nahi aa raha', loss: 'Naye log aapko yaad hi nahi rakhte', fix: 'Har mahine 12 post + 4 reels, aap sirf approve karo', services: ['social'], proposalProblems: ['Social media inactive'] };
}

export function websiteFinding(id: string | undefined): Finding | null {
  if (id === 'none') return { problem: 'Website nahi hai', loss: 'Log bharosa nahi karte, aur rival ko chun lete hain', fix: '5 page ki website, WhatsApp + call button ke saath, 7 din mein live', services: ['website'], proposalProblems: ['No website or WhatsApp button'] };
  if (id === 'old') return { problem: 'Website purani hai, phone pe theek nahi chalti', loss: 'Log 3 second mein wapas chale jaate hain', fix: 'Nayi fast website, WhatsApp + call button ke saath (7 din mein)', services: ['website'], proposalProblems: ['Website slow / old on phones'] };
  return null;
}

export const PRAISE: Partial<Record<StepId, string>> = {
  sources: 'Great! 🔥 Google aur Instagram dono se log aa rahe hain. Ab inhe aur badhana hai.',
  website: 'Great! 👏 Ab bas usse zyada logon tak le jaana hai.',
};

/* ------------------------------------------------------------------ maths */

export const rupees = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
export const rupeesShort = (n: number) => (n >= 100000 ? `₹${(n / 100000).toFixed(1).replace(/\.0$/, '')}L` : n >= 1000 ? `₹${Math.round(n / 1000)}K` : rupees(n));

/** Usual share of enquiries that become customers (local businesses). */
const JOIN = 0.15;
/** Rough cost of one enquiry from ads, ₹. */
const PER_ENQUIRY = 150;
const ORGANIC: Partial<Record<ServiceKey, number>> = { gbp: 12, website: 6, social: 4, seo: 5 };

export const enquiriesNeeded = (goal: number) => Math.round(goal / JOIN);
export const adEnquiries = (budget: number) => Math.round(budget / PER_ENQUIRY);
export const budgetOf = (v: string | undefined) => Math.max(0, Number(v) || 0);

export function findingsOf(a: Answers): Finding[] {
  const b = bizOf(a.biz);
  return [painFinding(a.pain, b), sourcesFinding(a.sources), websiteFinding(a.website)].filter((f): f is Finding => !!f);
}

export type Result = {
  score: number;
  findings: Finding[];
  services: ServiceKey[];
  problems: string[];
  enquiries: number;
  low: number;
  high: number;
  lowMoney: number;
  highMoney: number;
  goal: number;
};

export function computeResult(a: Answers): Result {
  const b = bizOf(a.biz);
  const findings = findingsOf(a);
  const src = new Set(a.sources || []);
  let score = 20;
  score += a.website === 'good' ? 30 : a.website === 'old' ? 12 : 0;
  if (src.has('google')) score += 25;
  if (src.has('social')) score += 20;
  if (src.has('banner') || src.has('referral')) score += 5;

  const budget = budgetOf(a.budget);
  const want = new Set(findings.flatMap((f) => f.services));
  if (!want.size) want.add('ads');
  // No ad money: ads come out, Google + content stay.
  if (!budget) {
    want.delete('ads');
    want.add('gbp');
  }
  const monthly = (['gbp', 'social', 'ads'] as ServiceKey[]).filter((k) => want.has(k)).length;
  let services: ServiceKey[];
  if (budget && monthly >= 2) {
    services = ['growth'];
    if (want.has('website')) services.unshift('website');
  } else {
    services = (['website', 'gbp', 'social', 'ads'] as ServiceKey[]).filter((k) => want.has(k));
  }

  const organic = services.reduce((n, k) => n + (k === 'growth' ? (ORGANIC.gbp || 0) + (ORGANIC.social || 0) : ORGANIC[k] || 0), 0);
  const enquiries = Math.max(5, organic + (services.includes('growth') || services.includes('ads') ? adEnquiries(budget) : 0));
  const low = Math.max(1, Math.round(enquiries * JOIN * 0.6));
  const high = Math.max(low + 1, Math.round(enquiries * JOIN * 1.2));
  const value = Number(a.value) || b.values[1];
  return {
    score: Math.min(100, score),
    findings,
    services,
    problems: [...new Set(findings.flatMap((f) => f.proposalProblems))].slice(0, 4),
    enquiries,
    low,
    high,
    lowMoney: low * value,
    highMoney: high * value,
    goal: Number(a.goal) || 0,
  };
}

/* ---------------------------------------------------------------- payload */

/** What the browser sends with the lead (and the CRM stores). */
export type CheckupPayload = {
  v: 2;
  biz: BizKey;
  customerWord: string;
  pain: string;
  sources: string[];
  website: string;
  goal: number;
  value: number;
  budget: string;
  adBudget: number;
  when: string;
  hot: boolean;
  score: number;
  problems: string[];
  services: ServiceKey[];
  estimate: { enquiries: number; low: number; high: number };
};

export function buildPayload(a: Answers): CheckupPayload {
  const b = bizOf(a.biz);
  const r = computeResult(a);
  return {
    v: 2,
    biz: b.key,
    customerWord: b.customerWord,
    pain: a.pain || '',
    sources: a.sources || [],
    website: a.website || '',
    goal: Number(a.goal) || 0,
    value: Number(a.value) || 0,
    budget: a.budget || '',
    adBudget: budgetOf(a.budget),
    when: a.when || '',
    hot: a.when === 'now',
    score: r.score,
    problems: r.problems,
    services: r.services,
    estimate: { enquiries: r.enquiries, low: r.low, high: r.high },
  };
}

const pick = (v: unknown, opts: { id: string }[]) => (typeof v === 'string' && opts.some((o) => o.id === v) ? v : undefined);

/**
 * Server side: rebuild the payload from the raw answers only, so whatever a
 * browser claims about score, services or estimate is never trusted.
 */
export function cleanCheckup(raw: unknown): CheckupPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const biz = BIZ.find((b) => b.key === r.biz)?.key;
  if (!biz) return null;
  const goal = Number(r.goal);
  const value = Number(r.value);
  const budget = Number(r.budget);
  const a: Answers = {
    biz,
    pain: pick(r.pain, PAIN),
    sources: Array.isArray(r.sources) ? [...new Set(r.sources.filter((s): s is string => !!pick(s, SOURCES)))] : [],
    website: pick(r.website, WEBSITE),
    goal: Number.isFinite(goal) && goal >= 1 && goal <= 1000 ? String(Math.round(goal)) : undefined,
    value: Number.isFinite(value) && value > 0 && value <= 10_000_000 ? String(Math.round(value)) : undefined,
    budget: Number.isFinite(budget) && budget >= 0 && budget <= 10_000_000 ? String(Math.round(budget)) : undefined,
    when: pick(r.when, WHEN),
  };
  return buildPayload(a);
}

const labelOf = (opts: Option[], id: string) => opts.find((o) => o.id === id)?.label || '—';

export const SERVICE_NAMES: Record<ServiceKey, string> = {
  website: 'Website',
  gbp: 'Google profile',
  growth: 'Local Growth Plan',
  seo: 'SEO',
  social: 'Social media',
  ads: 'Ads',
};

/** Plain summary for the CRM notes and the email copy. */
export function checkupSummary(p: CheckupPayload): string {
  const b = bizOf(p.biz);
  return [
    `${p.hot ? '🔥 HOT LEAD (wants to start now) · ' : ''}Free check-up: ${b.crmLabel} · score ${p.score}/100`,
    `Biggest problem: ${labelOf(PAIN, p.pain)}`,
    `Customers come from: ${p.sources.length ? p.sources.map((s) => labelOf(SOURCES, s)).join(', ') : '—'}`,
    `Website: ${labelOf(WEBSITE, p.website)}`,
    `Wants: ${p.goal ? `${p.goal} new ${b.many} a month` : '—'}`,
    `Value of one ${b.one}: ${p.value ? rupees(p.value) + (b.valueNote ? ` (${b.valueNote})` : '') : '—'}`,
    `Marketing budget: ${p.budget === '' ? '—' : p.adBudget ? `${rupees(p.adBudget)} a month` : 'Nothing right now'}`,
    `Wants to start: ${labelOf(WHEN, p.when)}`,
    `Suggested: ${p.services.map((s) => SERVICE_NAMES[s]).join(' + ')}`,
    `Estimate shown to them: ≈ ${p.estimate.low}–${p.estimate.high} new ${b.many} a month (from ≈ ${p.estimate.enquiries} enquiries)`,
  ].join('\n');
}
