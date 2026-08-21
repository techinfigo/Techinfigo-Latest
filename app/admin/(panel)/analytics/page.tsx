import Link from 'next/link';
import { isDbConfigured, queryLeads } from '../../../../lib/firestore';
import { type Lead } from '../../../../lib/leads-schema';
import {
  MIN_SAMPLE,
  STALE_DAYS,
  WEEKS,
  UNATTRIBUTED,
  summarize,
  formatRate,
  type AnalyticsSummary,
  type Rate,
  type SourceRow,
  type WeekBucket,
} from '../../../../lib/analytics';
import { SetupNotice } from '../../SetupNotice';
import { formatTimestamp } from '../../format';

/**
 * What the pipeline adds up to.
 *
 * Every figure is computed in lib/analytics.ts from one ordered fetch of the
 * leads collection — no aggregation queries, no composite indexes, nothing
 * per-lead. At this volume that is not a compromise: reading a few hundred
 * documents once and counting them in memory is cheaper than the round trips
 * the alternative would need. ADMIN.md records the same reasoning for the
 * pipeline's filters.
 *
 * Rates are never rendered below MIN_SAMPLE observations — see <Figure>, which
 * is the only place a percentage is printed and refuses to print one when the
 * Rate says the sample was too small.
 */
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Analytics',
  robots: { index: false, follow: false },
};

/**
 * One fetch, ordered, capped. High enough that this project will not reach it,
 * low enough to bound the read if something ever bulk-imports; hitting it sets
 * `truncated` so the page says the figures are a floor rather than quietly
 * reporting a subset as the whole.
 */
const LEAD_CAP = 1000;

/**
 * Diagonal hatching for the in-progress week, in the page's own surface colour
 * so the stripes read as gaps rather than as a second ink. Uses the @theme
 * token rather than a literal hex, so it follows the palette if it moves.
 */
const HATCH =
  'repeating-linear-gradient(45deg, transparent 0 3px, var(--color-brandSurface) 3px 6px)';

/** Hours → the coarsest unit that still reads precisely. */
function formatDuration(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  if (hours < 48) return `${hours} h`;
  return `${Math.round(hours / 24)} days`;
}

async function loadSummary(
  now: Date,
): Promise<{ summary: AnalyticsSummary | null; failed: boolean }> {
  try {
    const rows: Lead[] = await queryLeads({}, LEAD_CAP);
    return { summary: summarize(rows, now, { truncated: rows.length >= LEAD_CAP }), failed: false };
  } catch (error) {
    console.error('[admin] analytics query failed:', error);
    return { summary: null, failed: true };
  }
}

// --- shared bits ------------------------------------------------------------

function Card({
  title,
  period,
  children,
}: {
  title: string;
  period: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-white/15 rounded-2xl p-6 space-y-5">
      <div className="space-y-1">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
          {title}
        </h2>
        {/* Every metric carries its period. A number with no window attached is
            not a measurement, it is a rumour. */}
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">{period}</p>
      </div>
      {children}
    </section>
  );
}

/**
 * The only place a percentage is printed.
 *
 * A suppressed Rate renders its raw counts and says why, so a reader can still
 * see what happened without being handed a proportion the sample cannot carry.
 */
function Figure({ r, unit, dominant = false }: { r: Rate; unit: string; dominant?: boolean }) {
  const percent = formatRate(r);
  const size = dominant ? 'text-3xl' : 'text-xl';

  if (percent === null) {
    return (
      <div className="space-y-1">
        <p className={`${size} font-black text-white/80 leading-none`}>
          {r.numerator}
          <span className="text-white/55 text-sm font-black"> / {r.denominator}</span>
        </p>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
          {unit} · under {MIN_SAMPLE}, no %
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <p className={`${size} font-black text-brandYellow leading-none`}>{percent}</p>
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
        {unit} · {r.numerator} of {r.denominator}
      </p>
    </div>
  );
}

// --- weekly volume ----------------------------------------------------------

function WeeklyVolume({ weeks }: { weeks: WeekBucket[] }) {
  const peak = Math.max(1, ...weeks.map((w) => w.count));

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-1.5 h-32">
        {weeks.map((week) => {
          const height = (week.count / peak) * 100;
          return (
            <div key={week.start.toISOString()} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[9px] font-black text-white/55 leading-none">{week.count}</span>
              <div className="w-full flex-1 flex items-end">
                {/* Bars are plain divs — the shape is a rectangle, which needs
                    no charting dependency. min-height keeps an empty week
                    visible as a baseline rather than nothing at all.

                    The partial week is hatched rather than dimmed. A dimmer
                    fill was the obvious choice and it does not work: any tone
                    faint enough to read as "provisional" falls under 3:1
                    against the surface, and any tone strong enough to clear
                    that is indistinguishable from a full bar. Pattern carries
                    the meaning at full contrast instead — the same reason the
                    sidebar's active state is not colour-only. */}
                <div
                  className="w-full rounded-t bg-brandYellow"
                  style={{
                    height: `${Math.max(height, 2)}%`,
                    backgroundImage: week.partial ? HATCH : undefined,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-1.5">
        {weeks.map((week) => (
          <span
            key={week.start.toISOString()}
            className="flex-1 text-center text-[9px] font-black uppercase tracking-[0.1em] text-white/55"
          >
            {week.start.toISOString().slice(5, 10).replace('-', '/')}
          </span>
        ))}
      </div>

      {/* The current week is hatched *and* labelled — a bar that is short only
          because the week is not over yet must not read as a decline, and the
          hatching alone would not say why. */}
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
        <span
          className="inline-block w-3 h-[6px] bg-brandYellow align-middle mr-2 rounded-sm"
          style={{ backgroundImage: HATCH }}
          aria-hidden
        />
        Rightmost bar is the current week, still in progress — partial by
        definition, not a drop
      </p>
    </div>
  );
}

// --- source performance -----------------------------------------------------

function SourceTable({ rows, empty }: { rows: SourceRow[]; empty: string }) {
  if (rows.length === 0) {
    return <p className="text-white/55 text-sm font-medium">{empty}</p>;
  }
  const peak = Math.max(...rows.map((r) => r.total));

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div
          key={row.key}
          className="border border-white/15 rounded-xl p-4 flex items-center gap-6"
        >
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-bold text-sm truncate">
                {row.key === UNATTRIBUTED ? (
                  <span className="text-white/55">unattributed</span>
                ) : (
                  row.key
                )}
              </p>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55 shrink-0">
                {row.total} lead{row.total === 1 ? '' : 's'}
              </p>
            </div>
            {/* Volume is the bar; conversion is the number. A channel that is
                all bar and no number is the one worth acting on, and that
                contrast is the whole point of the row. */}
            <div className="h-1.5 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-white/60"
                style={{ width: `${(row.total / peak) * 100}%` }}
              />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
              {row.won} won · {row.lost} lost ·{' '}
              {row.winRate.value === null
                ? `win rate needs ${MIN_SAMPLE} closed`
                : `${formatRate(row.winRate)} win rate`}
            </p>
          </div>

          <div className="w-32 shrink-0 text-right">
            <Figure r={row.qualifiedRate} unit="qualified+" dominant />
          </div>
        </div>
      ))}
    </div>
  );
}

// --- page -------------------------------------------------------------------

export default async function AnalyticsPage() {
  const now = new Date();
  const configured = isDbConfigured();
  const { summary, failed } = configured
    ? await loadSummary(now)
    : { summary: null, failed: false };

  const asOf = `as of ${formatTimestamp(now)} UTC`;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      <header className="space-y-2">
        <div className="w-10 h-[2px] bg-brandYellow" />
        <h1 className="text-3xl font-black uppercase tracking-tighter">Analytics</h1>
        <p className="text-white/55 text-sm font-medium max-w-2xl leading-relaxed">
          {summary && summary.totalLeads > 0
            ? `${summary.totalLeads} lead${summary.totalLeads === 1 ? '' : 's'} from ${formatTimestamp(
                summary.firstLeadAt as Date,
              )} to ${formatTimestamp(summary.lastLeadAt as Date)} UTC. Percentages are withheld below ${MIN_SAMPLE} leads.`
            : 'What the pipeline adds up to.'}
        </p>
      </header>

      {!configured ? <SetupNotice /> : null}

      {failed ? (
        <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6">
          <p className="text-red-300 text-sm font-medium">
            Firestore is configured but the lead query failed, so nothing below could be computed.
            Check the service-account credentials and that the Firestore database exists in this
            project.
          </p>
        </div>
      ) : null}

      {summary && summary.truncated ? (
        <div className="border border-white/15 rounded-2xl p-6">
          <p className="text-white/80 text-sm font-medium">
            Reading stopped at {LEAD_CAP} leads, so every figure below is a floor rather than a
            total.
          </p>
        </div>
      ) : null}

      {summary && summary.totalLeads === 0 ? (
        <Card title="Nothing to measure yet" period="no leads recorded">
          <div className="space-y-3 text-sm font-medium text-white/80 leading-relaxed max-w-2xl">
            <p>
              This page fills in on its own as leads arrive through the site&apos;s forms. Once
              they do, it will show:
            </p>
            <ul className="space-y-2 text-white/80">
              <li>· Lead volume per week for the last {WEEKS} weeks</li>
              <li>
                · Which source form and which utm_source produced them, how many reached qualified
                or beyond, and the win rate for each
              </li>
              <li>· How the pipeline is distributed across stages</li>
              <li>· Any lead sitting in &quot;new&quot; for more than {STALE_DAYS} days</li>
            </ul>
            <p className="text-white/55">
              Percentages appear once a group has at least {MIN_SAMPLE} leads behind it. Until then
              the raw counts are shown, because a rate from two leads describes those two leads and
              nothing else.
            </p>
          </div>
        </Card>
      ) : null}

      {summary && summary.totalLeads > 0 ? (
        <>
          {/* First on the page because it is the only section that asks for an
              action rather than describing the past. */}
          <Card
            title={`Sitting in "new" over ${STALE_DAYS} days`}
            period={`${asOf} · all leads to date`}
          >
            {summary.staleNew.length === 0 ? (
              <p className="text-white/80 text-sm font-medium">
                Nothing is waiting. Every lead in &quot;new&quot; arrived within the last{' '}
                {STALE_DAYS} days.
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-3xl font-black text-brandYellow leading-none">
                  {summary.staleNew.length}
                </p>
                <ul className="divide-y divide-white/10 pt-2">
                  {summary.staleNew.map((lead) => (
                    <li key={lead.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="font-bold text-sm hover:text-brandYellow transition-colors"
                        >
                          {lead.name || lead.email}
                        </Link>
                        <p className="text-white/55 text-xs font-medium truncate">
                          {lead.email} · {lead.sourceForm}
                        </p>
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/80 shrink-0">
                        {lead.ageDays} day{lead.ageDays === 1 ? '' : 's'} old
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          <Card
            title="Source performance — by source form"
            period={`all leads to date · n = ${summary.totalLeads}`}
          >
            <SourceTable rows={summary.bySourceForm} empty="No leads carry a source form." />
          </Card>

          <Card
            title="Source performance — by utm_source"
            period={`all leads to date · n = ${summary.totalLeads}`}
          >
            <SourceTable
              rows={summary.byUtmSource}
              empty="No leads carry a utm_source."
            />
          </Card>

          <Card
            title={`Lead volume, last ${WEEKS} weeks`}
            period="weeks begin Monday 00:00 UTC"
          >
            <WeeklyVolume weeks={summary.weeks} />
          </Card>

          <Card title="Pipeline" period={`${asOf} · all leads to date`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {summary.stages.map(({ status, count }) => (
                <Link
                  key={status}
                  href={`/admin?status=${status}`}
                  className="border border-white/15 rounded-xl p-4 hover:border-brandYellow/30 transition-colors"
                >
                  <p className="text-2xl font-black">{count}</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55 mt-1">
                    {status}
                  </p>
                </Link>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
                  Win rate · closed leads only
                </p>
                <Figure r={summary.winRate} unit="won of won + lost" />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
                  Reached qualified or beyond
                </p>
                <Figure r={summary.qualifiedRate} unit="of all leads" />
                {summary.qualifiedInferredFor > 0 ? (
                  <p className="text-white/55 text-xs font-medium leading-relaxed pt-1">
                    {summary.qualifiedInferredFor} of these predate the sticky flag, so{' '}
                    {summary.qualifiedInferredFor === 1 ? 'it counts' : 'they count'} only if
                    currently at or past qualified — one that qualified and then lost looks like
                    it never did.
                  </p>
                ) : null}
              </div>
            </div>
          </Card>

          <Card
            title="Median time to first contact"
            period={
              summary.timeToFirstContact.available
                ? `created → first move off "new" · ${summary.timeToFirstContact.sample} lead${
                    summary.timeToFirstContact.sample === 1 ? '' : 's'
                  } with a recorded time`
                : 'not available yet — see below'
            }
          >
            <div className="space-y-3 max-w-2xl">
              {summary.timeToFirstContact.available ? (
                <>
                  <p className="text-3xl font-black text-brandYellow leading-none">
                    {formatDuration(summary.timeToFirstContact.medianHours)}
                  </p>
                  {/* A median is not a rate, so MIN_SAMPLE does not suppress it —
                      but a median of two observations is still two observations,
                      and saying so costs nothing. */}
                  {summary.timeToFirstContact.sample < MIN_SAMPLE ? (
                    <p className="text-white/80 text-sm font-medium leading-relaxed">
                      From {summary.timeToFirstContact.sample} lead
                      {summary.timeToFirstContact.sample === 1 ? '' : 's'} — too few to describe a
                      habit yet, so read it as those {summary.timeToFirstContact.sample} and
                      nothing more.
                    </p>
                  ) : null}
                </>
              ) : (
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  {summary.timeToFirstContact.reason}
                </p>
              )}

              {/* The exclusion count is the honest part. These leads were
                  contacted; nobody wrote down when, and no median should quietly
                  pretend they were never in the pool. */}
              {summary.timeToFirstContact.excluded > 0 ? (
                <p className="text-white/55 text-sm font-medium leading-relaxed">
                  Excludes {summary.timeToFirstContact.excluded} lead
                  {summary.timeToFirstContact.excluded === 1 ? '' : 's'} that moved off
                  &quot;new&quot; before first-contact times were recorded. That moment cannot be
                  recovered for {summary.timeToFirstContact.excluded === 1 ? 'it' : 'them'}, so{' '}
                  {summary.timeToFirstContact.excluded === 1 ? 'it is' : 'they are'} left out
                  rather than guessed at.
                </p>
              ) : null}
            </div>
          </Card>
        </>
      ) : null}
    </main>
  );
}
