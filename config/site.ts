/**
 * Single source of truth for founder, contact and positioning details.
 *
 * Empty strings are intentional: consumers below treat "" as "not set yet"
 * and omit the corresponding UI or structured-data field rather than
 * rendering a placeholder. Fill these in and the UI appears automatically.
 */
export const site = {
  founder: {
    /** TODO: not supplied yet. Rendered in components/FounderSection.tsx. */
    name: '',
    role: 'Chief Profit Strategist',
    /** TODO: not supplied yet. While empty the LinkedIn button is hidden. */
    linkedin: '',
  },

  /** TODO: not supplied yet. While empty, "telephone" is omitted from the LocalBusiness JSON-LD. */
  phone: '',

  /** Target customer revenue band, without the /mo or /month suffix. */
  icpBand: '₹20L–₹2Cr',
} as const;

/**
 * Canonical site identity.
 *
 * Kept separate from `site` above so that block can stay a pure "fill these in"
 * TODO list, while metadata, JSON-LD and OG tags read the host, locale and
 * share image from one authoritative place instead of hardcoding them per file.
 */
export const SITE = {
  name: 'Techinfigo',
  url: 'https://www.techinfigo.com',
  locale: 'en_IN',
  themeColor: '#001d21',
  ogImage: '/og-image.jpg',
} as const;

/** Calendar quarter (1-4) and year for a given date. */
function quarterOf(date: Date) {
  return { quarter: Math.floor(date.getMonth() / 3) + 1, year: date.getFullYear() };
}

/**
 * Availability and scarcity messaging.
 *
 * Slot counts and batch labels were hardcoded across five components and had
 * already gone stale ("Q3", "June 2026") — a visitor in August 2026 was being
 * told to join a batch that closed months earlier. The batch names are now
 * derived from the current date, and every scarcity claim sits behind
 * `showScarcity`, which stays false until there is a real waitlist to back it.
 */
export const CAPACITY = {
  showScarcity: false,
  slotsOpen: 2,
  /** e.g. "Q3 2026" — the batch currently being filled. */
  get currentBatch() {
    const { quarter, year } = quarterOf(new Date());
    return `Q${quarter} ${year}`;
  },
  /** The following quarter, rolling over to Q1 of the next year after Q4. */
  get nextBatch() {
    const { quarter, year } = quarterOf(new Date());
    return quarter === 4 ? `Q1 ${year + 1}` : `Q${quarter + 1} ${year}`;
  },
} as const;

/**
 * Positioning statements that replaced invented statistics.
 *
 * The site previously claimed "we decline 80% of inquiries" and "audit accuracy
 * 94%". Neither number was measured, so neither could survive a prospect asking
 * how it was calculated. These say the same thing without inventing a figure.
 */
export const CLAIMS = {
  selectivity: 'We cap active partnerships to protect delivery quality.',
} as const;

/**
 * Whether the headline figures represent delivered client outcomes ('client')
 * or industry targets we work toward ('benchmark'). While it is 'benchmark' the
 * UI labels them as targets and prints PROOF_DISCLAIMER, so we never imply a
 * case-study result we cannot name a client for. Flip to 'client' only once
 * there is an attributable engagement behind the numbers.
 */
export const PROOF_MODE: 'benchmark' | 'client' = 'benchmark';

/** Shown wherever benchmark figures appear, so the framing is unambiguous. */
export const PROOF_DISCLAIMER =
  'Target benchmark based on published D2C industry data — not a delivered client result.';

/**
 * Analytics IDs, read from NEXT_PUBLIC_* env vars at build time.
 *
 * Each defaults to an empty string, and components/Analytics.tsx renders a
 * given vendor's script only when its ID is non-empty. That keeps the site
 * shippable with no analytics configured — an unset var means no script tag,
 * not a broken tag pointed at an undefined ID.
 */
export const ANALYTICS = {
  ga4: process.env.NEXT_PUBLIC_GA4_ID ?? '',
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '',
  clarity: process.env.NEXT_PUBLIC_CLARITY_ID ?? '',
} as const;
