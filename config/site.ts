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
