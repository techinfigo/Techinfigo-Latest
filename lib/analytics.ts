import { LEAD_STATUSES, type Lead, type LeadStatus } from './leads-schema';

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
 * Statuses that mean the lead got past qualification.
 *
 * Deliberately excludes 'lost'. A lead that qualified and then lost did reach
 * this bar, but nothing in the stored shape records that it ever did — only
 * its current status survives. Counting 'lost' here would inflate the figure
 * with leads that may never have qualified at all, so the number is defined as
 * "currently at or past qualified" and labelled that way in the UI.
 */
export const QUALIFIED_PLUS: readonly LeadStatus[] = ['qualified', 'proposal', 'won'];

export type SourceRow = {
  key: string;
  total: number;
  /** Currently at or past 'qualified'. */
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
    const qualified = group.filter((l) => QUALIFIED_PLUS.includes(l.status)).length;
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
 */
export type TimeToFirstContact =
  | { available: true; medianHours: number; sample: number; reason?: undefined }
  | { available: false; medianHours?: undefined; sample?: undefined; reason: string };

/**
 * Median createdAt → first status change away from 'new'.
 *
 * Not computable from what is stored, and deliberately not approximated. The
 * lead document carries `createdAt`, `updatedAt` and the *current* `status`;
 * there is no status history and no first-contacted timestamp. `updatedAt` is
 * the last write of any kind, so on a lead that moved new → contacted →
 * qualified it describes the qualification, not the contact — using it would
 * report a number that looks precise and is wrong.
 *
 * The notes subcollection has its own createdAt and would proxy "when someone
 * first wrote something down", but a note is not a status change, and reading
 * one subcollection per lead is exactly the per-lead query the analytics page
 * is built to avoid.
 *
 * Recording `firstContactedAt` in updateLeadStatus() on the first move off
 * 'new' would make this a one-line median from then on. Until something stores
 * it, this returns the reason instead of a figure.
 */
function timeToFirstContact(_leads: readonly Lead[]): TimeToFirstContact {
  return {
    available: false,
    reason:
      'Lead documents store createdAt, updatedAt and the current status — but no status ' +
      'history, so the moment a lead first moved off "new" was never recorded. updatedAt is ' +
      'the most recent change of any kind, which is a different thing and would overstate ' +
      'how fast contact happened on any lead that has moved more than once.',
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
  const qualified = leads.filter((l) => QUALIFIED_PLUS.includes(l.status)).length;

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
    staleNew: staleNew(leads, now),
  };
}
