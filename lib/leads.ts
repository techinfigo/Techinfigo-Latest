import type { NewLead } from './db/schema';

/** Per-column caps. Postgres text is unbounded; these stop a bot posting a novel. */
export const FIELD_LIMITS = {
  name: 200,
  email: 320,
  phone: 50,
  brandName: 200,
  website: 500,
  monthlyRevenue: 120,
  adSpend: 120,
  message: 5000,
  sourceForm: 100,
  landingPage: 500,
  submittedFrom: 500,
  utmSource: 200,
  utmMedium: 200,
  utmCampaign: 200,
  utmContent: 200,
  utmTerm: 200,
  referrer: 500,
} as const;

/** Trim, drop empties, and cap. Returns null for anything unusable. */
export function clean(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

/** Deliberately permissive: rejecting real addresses costs more than a junk row. */
export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export type LeadInput = Record<string, unknown>;

/**
 * The complementary `?: undefined` members are what make this narrow under
 * this project's non-strict tsconfig; a bare discriminated union does not.
 */
export type ParsedLead =
  | { ok: true; lead: NewLead; error?: undefined }
  | { ok: false; lead?: undefined; error: string };

export function parseLead(input: LeadInput): ParsedLead {
  const name = clean(input.name, FIELD_LIMITS.name);
  const email = clean(input.email, FIELD_LIMITS.email);

  if (!name) return { ok: false, error: 'name is required' };
  if (!email) return { ok: false, error: 'email is required' };
  if (!looksLikeEmail(email)) return { ok: false, error: 'email is not a valid address' };

  return {
    ok: true,
    lead: {
      name,
      email,
      phone: clean(input.phone, FIELD_LIMITS.phone),
      brandName: clean(input.brandName, FIELD_LIMITS.brandName),
      website: clean(input.website, FIELD_LIMITS.website),
      monthlyRevenue: clean(input.monthlyRevenue, FIELD_LIMITS.monthlyRevenue),
      adSpend: clean(input.adSpend, FIELD_LIMITS.adSpend),
      message: clean(input.message, FIELD_LIMITS.message),
      sourceForm: clean(input.sourceForm, FIELD_LIMITS.sourceForm) ?? 'unknown',
      landingPage: clean(input.landingPage, FIELD_LIMITS.landingPage),
      submittedFrom: clean(input.submittedFrom, FIELD_LIMITS.submittedFrom),
      utmSource: clean(input.utmSource, FIELD_LIMITS.utmSource),
      utmMedium: clean(input.utmMedium, FIELD_LIMITS.utmMedium),
      utmCampaign: clean(input.utmCampaign, FIELD_LIMITS.utmCampaign),
      utmContent: clean(input.utmContent, FIELD_LIMITS.utmContent),
      utmTerm: clean(input.utmTerm, FIELD_LIMITS.utmTerm),
      referrer: clean(input.referrer, FIELD_LIMITS.referrer),
    },
  };
}

const MIRROR_ENDPOINT = 'https://formsubmit.co/ajax/contact@techinfigo.com';

/**
 * Mirror every submission to the existing inbox.
 *
 * This is the reliability floor: the database is new and the inbox is what the
 * team already watches, so a lead must reach the inbox whether or not the DB
 * write succeeds. Never throws — a failed mirror is logged, not surfaced.
 */
export async function mirrorToInbox(lead: NewLead): Promise<boolean> {
  try {
    const response = await fetch(MIRROR_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `New lead — ${lead.name} (${lead.sourceForm})`,
        ...lead,
      }),
      // Without a timeout a hanging third party would hold the request open
      // until the platform kills it, and the visitor sees a spinner forever.
      signal: AbortSignal.timeout(8000),
    });
    return response.ok;
  } catch (error) {
    console.error('[leads] inbox mirror failed:', error);
    return false;
  }
}
