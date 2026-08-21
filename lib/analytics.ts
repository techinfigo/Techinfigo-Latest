import { LEAD_STATUSES, isQualifiedStatus, type Lead, type LeadStatus } from './leads-schema';

/**
 * Turns a list of leads into the figures the analytics page renders.
 *
 * CLIENT-SAFE, like lib/leads-schema.ts: pure functions over a Lead[] and a
 * `now`, with no Firestore import anywhere in the graph. The page fetches the
 * leads and calls summarize() — this module never reads anything itself, which
 * is also what makes every number here checkable without a database.
 *
 * `now` is always a parameter, never Date.now(): a metric that reads the clock
 * internally cannot be tested, and "leads older than 7 days" is exactly the
 * kind of thing that has to be verifiable against a fixed instant.
 *
 * Everything is bucketed in UTC, matching app/admin/format.ts — the panel
 * already labels its timestamps UTC, and a server-local week boundary would
 * silently move the chart depending on where the app is deployed.
 */

/**
 * Below this many observations a rate is noise, so callers render the raw
 * counts instead. One won lead out of one is not a 100% win rate, and showing
 * it as one invites a decision the data cannot support.
 */
export const MIN_SAMPLE = 5;

/** Leads in 'new' older than this are surfaced as needing attention. */
export const STALE_DAYS = 7;

/** How many weeks the volume chart covers, including the current partial one. */
export const WEEKS = 12;

const DAY_MS = 86_400_000;
const WEEK_MS = 7 * DAY_MS;

/**
 * A proportion that knows whether it is allowed to be shown as one.
 *
 * `value` is null when the denominator is under MIN_SAMPLE; the numerator and
 * denominator are always carried so the UI can print "2 of 3" instead. This is
 * the shape rather than a bare number precisely so that a caller cannot
 * accidentally render a percentage without having considered the sample size.
 */
export type Rate = {
  value: number | null;
  numerator: number;
  denominator: number;
  /** True when the sample was too small to express as a percentage. */
  suppressed: boolean;
};

export function rate(numerator: number, denominator: number): Rate {
  const enough = denominator >= MIN_SAMPLE;
  return {
    value: enough && denominator > 0 ? numerator / denominator : null,
    numerator,
    denominator,
    suppressed: !enough,
  };
}

/** Formats a Rate for display, or null when it must not be shown as a percentage. */
export function formatRate(r: Rate): string | null {
  if (r.value === null) return null;
  return `${Math.round(r.value * 100)}%`;
}

// --- weekly volume ----------------------------------------------------------

export type WeekBucket = {
  /** Monday 00:00 UTC. */
  start: Date;
  count: number;
  /** The week in progress — fewer days have elapsed, so a lower bar is expected. */
  partial: boolean;
};

/** Monday 00:00 UTC of the week containing `date`. */
export function weekStart(date: Date): Date {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  // getUTCDay() is Sunday-0; shift so Monday is 0 and weeks break where the
  // working week does rather than mid-weekend.
  const dayOfWeek = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dayOfWeek);
  return d;
}

function weeklyVolume(leads: readonly Lead[], now: Date): WeekBucket[] {
  const current = weekStart(now);
  const buckets: WeekBucket[] = [];
  for (let i = WEEKS - 1; i >= 0; i--) {
    buckets.push({
      start: new Date(current.getTime() - i * WEEK_MS),
      count: 0,
      partial: i === 0,
    });
  }

  const firstStart = buckets[0].start.getTime();
  for (const lead of leads) {
    const t = lead.createdAt.getTime();
    const index = Math.floor((t - firstStart) / WEEK_MS);
    // Older than the window, or — with a clock skew or a backdated import —
    // beyond it. Either way it belongs in no bucket rather than the edge one.
    if (index < 0 || index >= buckets.length) continue;
    buckets[index].count += 1;
  }
  return buckets;
}

// --- source performance -----------------------------------------------------

/**
 * Whether a lead ever reached qualification.
 *
 * Prefers the sticky reachedQualified flag, which survives a later move to
 * 'lost' — that was the whole point of recording it. Leads written before the
 * flag existed carry null, and only those fall back to their current status,
 * which undercounts them exactly where it always did: a lead that qualified
 * and then lost looks like it never qualified. qualifiedIsInferred() counts
 * how many leads are on that older footing so the page can say so.
 */
export function everQualified(lead: Lead): boolean {
  return lead.reachedQualified ?? isQualifiedStatus(lead.status);
}

/** True when the answer came from the current status rather than a recorded flag. */
export function qualifiedIsInferred(lead: Lead): boolean {
  return lead.reachedQualified === null || lead.reachedQualified === undefined;
}

export type SourceRow = {
  key: string;
  total: number;
  /** Ever reached qualified — sticky flag where recorded, current status otherwise. */
  qualified: number;
  qualifiedRate: Rate;
  won: number;
  lost: number;
  /** won / (won + lost) — leads still in flight are excluded from both sides. */
  winRate: Rate;
};

/** The bucket a lead with no value for the grouping field falls into. */
export const UNATTRIBUTED = 'unattributed';

function groupBy(leads: readonly Lead[], keyOf: (lead: Lead) => string | null): SourceRow[] {
  const groups = new Map<string, Lead[]>();
  for (const lead of leads) {
    const key = keyOf(lead) || UNATTRIBUTED;
    const bucket = groups.get(key);
    if (bucket) bucket.push(lead);
    else groups.set(key, [lead]);
  }

  const rows: SourceRow[] = [];
  for (const [key, group] of groups) {
    const qualified = group.filter(everQualified).length;
    const won = group.filter((l) => l.status === 'won').length;
    const lost = group.filter((l) => l.status === 'lost').length;
    rows.push({
      key,
      total: group.length,
      qualified,
      qualifiedRate: rate(qualified, group.length),
      won,
      lost,
      winRate: rate(won, won + lost),
    });
  }

  // Sorted by volume as specified; the key breaks ties so the order is stable
  // between renders rather than depending on Map insertion.
  return rows.sort((a, b) => b.total - a.total || a.key.localeCompare(b.key));
}

// --- time to first contact --------------------------------------------------

/**
 * The complementary `?: undefined` members are what make this narrow under
 * this project's non-strict tsconfig — the same reason BrandValidation in
 * lib/brand-assets.ts is shaped this way.
 *
 * `excluded` is on both arms deliberately: leads that were contacted before
 * firstContactedAt existed are missing from the median whether or not one can
 * be computed, and that count has to be shown either way.
 */
export type TimeToFirstContact =
  | {
      available: true;
      medianHours: number;
      sample: number;
      excluded: number;
      reason?: undefined;
    }
  | {
      available: false;
      medianHours?: undefined;
      sample?: undefined;
      excluded: number;
      reason: string;
    };

/**
 * Median createdAt → firstContactedAt.
 *
 * Only leads carrying a recorded firstContactedAt contribute. Two other groups
 * exist and are handled differently on purpose:
 *
 *  - Still in 'new': never contacted, so they are not a gap in the data. They
 *    belong outside the sample and are not counted as excluded — a lead that
 *    has not been contacted has no response time to be missing.
 *  - Moved off 'new' with no firstContactedAt: contacted before the field
 *    existed. These *are* a gap, they are counted in `excluded`, and the page
 *    prints that count. Dropping them silently would quietly bias the median
 *    toward whatever happened after the change shipped.
 *
 * Nothing here falls back to updatedAt. It is the last write of any kind, so
 * on a lead that moved twice it describes the wrong event entirely.
 */
function timeToFirstContact(leads: readonly Lead[]): TimeToFirstContact {
  const contacted = leads.filter((lead) => lead.firstContactedAt);
  const excluded = leads.filter(
    (lead) => !lead.firstContactedAt && lead.status !== 'new',
  ).length;

  if (contacted.length === 0) {
    return {
      available: false,
      excluded,
      reason:
        excluded > 0
          ? `No lead yet carries a recorded first-contact time. ${excluded} lead${
              excluded === 1 ? ' was' : 's were'
            } contacted before that was being recorded, so ${
              excluded === 1 ? 'its' : 'their'
            } response time cannot be recovered — the figure will fill in as leads move off "new" from now on.`
          : 'No lead has moved off "new" yet, so there is no response time to measure.',
    };
  }

  const hours = contacted
    .map((lead) => (lead.firstContactedAt.getTime() - lead.createdAt.getTime()) / 3_600_000)
    .sort((a, b) => a - b);

  // Even count takes the mean of the middle pair, which is what "median" means
  // for an even sample — not the lower of the two.
  const mid = Math.floor(hours.length / 2);
  const median = hours.length % 2 === 0 ? (hours[mid - 1] + hours[mid]) / 2 : hours[mid];

  return {
    available: true,
    medianHours: Math.round(median * 10) / 10,
    sample: contacted.length,
    excluded,
  };
}

// --- stale leads ------------------------------------------------------------

export type StaleLead = {
  id: string;
  name: string;
  email: string;
  sourceForm: string;
  createdAt: Date;
  ageDays: number;
};

function staleNew(leads: readonly Lead[], now: Date): StaleLead[] {
  const cutoff = now.getTime() - STALE_DAYS * DAY_MS;
  return leads
    .filter((lead) => lead.status === 'new' && lead.createdAt.getTime() < cutoff)
    .map((lead) => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      sourceForm: lead.sourceForm,
      createdAt: lead.createdAt,
      ageDays: Math.floor((now.getTime() - lead.createdAt.getTime()) / DAY_MS),
    }))
    .sort((a, b) => b.ageDays - a.ageDays);
}

// --- summary ----------------------------------------------------------------

export type AnalyticsSummary = {
  totalLeads: number;
  /** True when the fetch hit its cap, so every figure is a floor, not a total. */
  truncated: boolean;
  firstLeadAt: Date | null;
  lastLeadAt: Date | null;
  weeks: WeekBucket[];
  bySourceForm: SourceRow[];
  byUtmSource: SourceRow[];
  stages: { status: LeadStatus; count: number }[];
  winRate: Rate;
  qualifiedRate: Rate;
  timeToFirstContact: TimeToFirstContact;
  /** Leads whose qualified-or-beyond answer came from current status, not the sticky flag. */
  qualifiedInferredFor: number;
  staleNew: StaleLead[];
};

export function summarize(
  leads: readonly Lead[],
  now: Date,
  options: { truncated?: boolean } = {},
): AnalyticsSummary {
  const times = leads.map((l) => l.createdAt.getTime());
  const won = leads.filter((l) => l.status === 'won').length;
  const lost = leads.filter((l) => l.status === 'lost').length;
  const qualified = leads.filter((l) => everQualified(l)).length;

  return {
    totalLeads: leads.length,
    truncated: Boolean(options.truncated),
    firstLeadAt: times.length ? new Date(Math.min(...times)) : null,
    lastLeadAt: times.length ? new Date(Math.max(...times)) : null,
    weeks: weeklyVolume(leads, now),
    bySourceForm: groupBy(leads, (lead) => lead.sourceForm),
    byUtmSource: groupBy(leads, (lead) => lead.utmSource),
    stages: LEAD_STATUSES.map((status) => ({
      status,
      count: leads.filter((lead) => lead.status === status).length,
    })),
    winRate: rate(won, won + lost),
    qualifiedRate: rate(qualified, leads.length),
    timeToFirstContact: timeToFirstContact(leads),
    qualifiedInferredFor: leads.filter(qualifiedIsInferred).length,
    staleNew: staleNew(leads, now),
  };
}
