/**
 * Free Business Check-up (www.techinfigo.com/checkup).
 *
 * Questions, answers and the "problem → fix" cards, in simple Hinglish.
 * Pure data and maths only: used by the form in the browser and by the lead
 * API on the server (to clean what the browser sends).
 *
 * Every number shown to the visitor is an estimate ("andaaza").
 */

export type BizKey = 'coaching' | 'clinic' | 'gym' | 'restaurant' | 'salon' | 'shop' | 'd2c' | 'other';
export type ServiceKey = 'website' | 'gbp' | 'growth' | 'seo' | 'social' | 'ads';
export type QuestionId = 'maps' | 'site' | 'reviews' | 'insta' | 'ads' | 'value';

export type Biz = {
  key: BizKey;
  emoji: string;
  label: string;
  /** Hinglish word for one buyer / many buyers. */
  one: string;
  many: string;
  /** English word the proposal uses. */
  customerWord: string;
  /** What people type on Google. */
  search: string;
  /** The "did you know" line shown after picking. */
  tip: string;
  /** Value chips (₹ per buyer). */
  values: number[];
  valueNote: string;
};

export const BIZ: Biz[] = [
  { key: 'coaching', emoji: '🎓', label: 'Coaching', one: 'student', many: 'students', customerWord: 'students', search: 'coaching near me', tip: 'Zyada tar parents coaching pehle Google Maps pe dhoondte hain, phir call karte hain.', values: [5000, 10000, 25000, 50000], valueNote: 'saal ki fees' },
  { key: 'clinic', emoji: '🏥', label: 'Clinic', one: 'patient', many: 'patients', customerWord: 'patients', search: 'doctor near me', tip: 'Naye patients doctor chunne se pehle Google pe reviews padhte hain.', values: [500, 2000, 10000, 50000], valueNote: '' },
  { key: 'gym', emoji: '💪', label: 'Gym', one: 'member', many: 'members', customerWord: 'members', search: 'gym near me', tip: 'Log gym join karne se pehle Instagram pe photos aur reels dekhte hain.', values: [1000, 3000, 8000, 15000], valueNote: '' },
  { key: 'restaurant', emoji: '🍽️', label: 'Restaurant', one: 'customer', many: 'customers', customerWord: 'guests', search: 'restaurant near me', tip: '"Near me" search karne wale zyada tar log usi din khaane aate hain.', values: [300, 800, 2000, 5000], valueNote: 'ek bill' },
  { key: 'salon', emoji: '💇', label: 'Salon', one: 'customer', many: 'customers', customerWord: 'clients', search: 'salon near me', tip: 'Salon chunne se pehle log photos aur reviews zaroor dekhte hain.', values: [500, 1500, 5000, 15000], valueNote: '' },
  { key: 'shop', emoji: '🛍️', label: 'Dukaan', one: 'customer', many: 'customers', customerWord: 'customers', search: 'shop near me', tip: 'Aaj kal log dukaan jaane se pehle Google pe timing aur photos dekhte hain.', values: [500, 2000, 10000, 25000], valueNote: '' },
  { key: 'd2c', emoji: '📦', label: 'Online brand', one: 'order', many: 'orders', customerWord: 'buyers', search: 'aapka product', tip: 'Online khareedne wale pehle Instagram pe brand dekhte hain, phir order karte hain.', values: [500, 1000, 2500, 5000], valueNote: 'ek order' },
  { key: 'other', emoji: '✨', label: 'Kuch aur', one: 'customer', many: 'customers', customerWord: 'customers', search: 'aapka kaam near me', tip: 'Zyada tar naye customers aapko pehle phone pe Google ya Instagram pe dhoondte hain.', values: [500, 2000, 10000, 25000], valueNote: '' },
];

export const bizOf = (k: string | undefined): Biz => BIZ.find((b) => b.key === k) || BIZ[BIZ.length - 1];

export type Option = { id: string; emoji: string; label: string; good: boolean; points: number };

/** A red card ("problem mila") and its green fix. */
export type Finding = {
  problem: string;
  loss: string;
  fix: string;
  service: ServiceKey;
  /** Matching problem title in the CRM proposal builder. */
  proposalProblem: string;
  /** Enquiries a month this fix usually brings (for the estimate). */
  enquiries: number;
};

export type Question = {
  id: Exclude<QuestionId, 'value'>;
  ask: (b: Biz) => string;
  options: Option[];
  /** Shown when the answer is a good one. */
  praise: (b: Biz) => string;
  finding: (b: Biz) => Finding;
};

export const QUESTIONS: Question[] = [
  {
    id: 'maps',
    ask: (b) => (b.key === 'd2c' ? 'Koi Google pe aapka product dhoondhe, toh kya aapki website upar aati hai?' : `Koi "${b.search}" search kare, toh kya aap Google Maps pe dikhte ho?`),
    options: [
      { id: 'yes', emoji: '✅', label: 'Haan', good: true, points: 25 },
      { id: 'no', emoji: '❌', label: 'Nahi', good: false, points: 0 },
      { id: 'unsure', emoji: '🤔', label: 'Pata nahi', good: false, points: 5 },
    ],
    praise: () => 'Badhiya! 👏 Google pe dikhna sabse zaroori cheez hai.',
    finding: (b) =>
      b.key === 'd2c'
        ? { problem: 'Google pe log aapko dhoondh nahi pa rahe', loss: `Har mahine ≈ 10 ${b.many} rivals ke paas chale jaate hain`, fix: 'Google search pe aapki website upar laayenge (SEO)', service: 'seo', proposalProblem: 'Not on Google Maps', enquiries: 6 }
        : { problem: 'Log aapko Google pe dhoondh nahi pa rahe', loss: `Har mahine ≈ 20 log aapke paas aate aate reh jaate hain`, fix: 'Google Maps pe aapka business, photos aur reviews ke saath (7 din mein)', service: 'gbp', proposalProblem: 'Not on Google Maps', enquiries: 12 },
  },
  {
    id: 'site',
    ask: () => 'Kya koi ek click mein aapko WhatsApp ya call kar sakta hai? (website / page se)',
    options: [
      { id: 'yes', emoji: '✅', label: 'Haan', good: true, points: 20 },
      { id: 'no', emoji: '❌', label: 'Nahi', good: false, points: 0 },
      { id: 'unsure', emoji: '🤔', label: 'Pata nahi', good: false, points: 5 },
    ],
    praise: () => 'Shabaash! 🙌 Aasaan rasta = zyada enquiry.',
    finding: () => ({ problem: 'Interested log bina pooche chale jaate hain', loss: 'Roz kuch enquiry chhoot jaati hai', fix: 'Website jisme WhatsApp aur call ka button ho (7 din mein live)', service: 'website', proposalProblem: 'No website or WhatsApp button', enquiries: 6 }),
  },
  {
    id: 'reviews',
    ask: () => 'Google pe aapke kitne reviews hain?',
    options: [
      { id: 'low', emoji: '😟', label: '0 – 10', good: false, points: 0 },
      { id: 'mid', emoji: '🙂', label: '10 – 50', good: true, points: 8 },
      { id: 'high', emoji: '🤩', label: '50+', good: true, points: 15 },
    ],
    praise: () => 'Wah! ⭐ Reviews se log aap pe bharosa karte hain.',
    finding: (b) => ({ problem: 'Reviews kam hain, log bharosa nahi kar pate', loss: `Naye ${b.many} zyada reviews wale rival ko chun lete hain`, fix: 'Review QR code + har khush customer se review maangne ka aasaan tareeka', service: 'gbp', proposalProblem: 'Very few Google reviews', enquiries: 4 }),
  },
  {
    id: 'insta',
    ask: () => 'Pichhle mahine Instagram pe kitni post daali?',
    options: [
      { id: 'none', emoji: '😴', label: '0', good: false, points: 0 },
      { id: 'few', emoji: '🙂', label: '1 – 4', good: false, points: 7 },
      { id: 'many', emoji: '🔥', label: '5+', good: true, points: 15 },
    ],
    praise: () => 'Zabardast! 🔥 Active page se log aapko yaad rakhte hain.',
    finding: () => ({ problem: 'Page band jaisa lagta hai', loss: 'Rivals zyada active dikhte hain, log unhe chunte hain', fix: 'Har mahine 12 post + 4 reels, aap sirf approve karo', service: 'social', proposalProblem: 'Social media inactive', enquiries: 4 }),
  },
  {
    id: 'ads',
    ask: () => 'Kya aap Facebook / Instagram / Google pe ads chalate ho?',
    options: [
      { id: 'yes', emoji: '✅', label: 'Haan', good: true, points: 15 },
      { id: 'no', emoji: '❌', label: 'Nahi', good: false, points: 0 },
      { id: 'tried', emoji: '😕', label: 'Chalaye, kaam nahi aaye', good: false, points: 5 },
    ],
    praise: () => 'Badhiya! 🚀 Ab bas sahi logon tak pahunchna hai.',
    finding: (b) => ({ problem: 'Naye log aap tak pahunch hi nahi rahe', loss: `Rivals ads se aapke area ke ${b.many} le ja rahe hain`, fix: 'Chhote budget ke ads, sirf aapke area ke sahi logon ko', service: 'ads', proposalProblem: 'No ads running', enquiries: 20 }),
  },
];

export const BASE_POINTS = 10;

export type Answers = Partial<Record<QuestionId, string>>;

export const rupees = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
export const rupeesShort = (n: number) => (n >= 100000 ? `₹${(n / 100000).toFixed(n >= 1000000 ? 0 : 1).replace(/\.0$/, '')}L` : n >= 1000 ? `₹${Math.round(n / 1000)}K` : rupees(n));

export type Result = {
  score: number;
  findings: Finding[];
  services: ServiceKey[];
  enquiries: number;
  low: number;
  high: number;
  lowMoney: number;
  highMoney: number;
};

/** Score, problems found, suggested services and the (estimated) result. */
export function computeResult(bizKey: string | undefined, answers: Answers): Result {
  const b = bizOf(bizKey);
  let score = BASE_POINTS;
  const findings: Finding[] = [];
  for (const q of QUESTIONS) {
    const opt = q.options.find((o) => o.id === answers[q.id]);
    if (!opt) continue;
    score += opt.points;
    if (!opt.good) findings.push(q.finding(b));
  }
  // Services: three or more monthly needs → the bundled Local Growth Plan.
  const want = new Set(findings.map((f) => f.service));
  const monthlyNeeds = (['gbp', 'social', 'ads'] as ServiceKey[]).filter((k) => want.has(k)).length;
  let services: ServiceKey[];
  if (monthlyNeeds >= 2) {
    services = ['growth'];
    if (want.has('website')) services.unshift('website');
    if (want.has('seo')) services.push('seo');
  } else {
    services = [...want];
  }
  if (!services.length) services = ['growth'];

  const enquiries = Math.max(5, findings.reduce((a, f) => a + f.enquiries, 0));
  const join = 0.15;
  const low = Math.max(1, Math.round(enquiries * join * 0.6));
  const high = Math.max(low + 1, Math.round(enquiries * join * 1.2));
  const value = Number(answers.value) || b.values[1];
  return { score: Math.min(100, score), findings, services, enquiries, low, high, lowMoney: low * value, highMoney: high * value };
}

/** What the browser sends with the lead. */
export type CheckupPayload = {
  v: 1;
  biz: BizKey;
  customerWord: string;
  answers: Answers;
  value: number;
  score: number;
  problems: string[];
  services: ServiceKey[];
  estimate: { enquiries: number; low: number; high: number };
};

const SERVICE_KEYS: ServiceKey[] = ['website', 'gbp', 'growth', 'seo', 'social', 'ads'];

export function buildPayload(bizKey: BizKey, answers: Answers): CheckupPayload {
  const b = bizOf(bizKey);
  const r = computeResult(bizKey, answers);
  return {
    v: 1,
    biz: b.key,
    customerWord: b.customerWord,
    answers,
    value: Number(answers.value) || 0,
    score: r.score,
    problems: [...new Set(r.findings.map((f) => f.proposalProblem))],
    services: r.services,
    estimate: { enquiries: r.enquiries, low: r.low, high: r.high },
  };
}

/**
 * Server side: rebuild the payload from the raw answers only, so whatever a
 * browser claims about score or services is never trusted.
 */
export function cleanCheckup(raw: unknown): CheckupPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const biz = BIZ.find((b) => b.key === r.biz)?.key;
  if (!biz) return null;
  const a = (r.answers && typeof r.answers === 'object' ? r.answers : {}) as Record<string, unknown>;
  const answers: Answers = {};
  for (const q of QUESTIONS) {
    const v = a[q.id];
    if (typeof v === 'string' && q.options.some((o) => o.id === v)) answers[q.id] = v;
  }
  const value = Number(a.value);
  if (Number.isFinite(value) && value > 0 && value <= 10_000_000) answers.value = String(Math.round(value));
  const p = buildPayload(biz, answers);
  return { ...p, services: p.services.filter((s) => SERVICE_KEYS.includes(s)) };
}

/** Plain-English summary for the CRM notes and the email copy. */
export function checkupSummary(p: CheckupPayload): string {
  const b = bizOf(p.biz);
  const label = (id: QuestionId) => {
    const q = QUESTIONS.find((x) => x.id === id);
    return q?.options.find((o) => o.id === p.answers[id])?.label || '—';
  };
  return [
    `Free check-up: ${b.label} · score ${p.score}/100`,
    `On Google: ${label('maps')} · One-click WhatsApp/call: ${label('site')} · Reviews: ${label('reviews')} · Insta posts last month: ${label('insta')} · Ads: ${label('ads')}`,
    p.value ? `Value of one ${b.one}: ${rupees(p.value)}${b.valueNote ? ` (${b.valueNote})` : ''}` : '',
    p.problems.length ? `Problems found: ${p.problems.join(', ')}` : 'No big problems found',
    `Estimate shown to them: ≈ ${p.estimate.low}–${p.estimate.high} new ${b.many} a month (from ≈ ${p.estimate.enquiries} enquiries)`,
  ]
    .filter(Boolean)
    .join('\n');
}

export const SERVICE_NAMES: Record<ServiceKey, string> = {
  website: 'Website',
  gbp: 'Google profile',
  growth: 'Local Growth Plan',
  seo: 'SEO',
  social: 'Social media',
  ads: 'Ads',
};
