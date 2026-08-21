import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLeadWithNotes, isDbConfigured, isValidLeadId } from '../../../../../lib/firestore';
import { type Lead } from '../../../../../lib/leads-schema';
import { SetupNotice } from '../../../SetupNotice';
import { formatTimestamp } from '../../../format';
import { LeadControls } from './LeadControls';

export const dynamic = 'force-dynamic';

/** Attribution fields, in the order they are useful when qualifying a lead. */
const ATTRIBUTION: ReadonlyArray<[label: string, key: keyof Lead]> = [
  ['Source form', 'sourceForm'],
  ['Landing page', 'landingPage'],
  ['Submitted from', 'submittedFrom'],
  ['UTM source', 'utmSource'],
  ['UTM medium', 'utmMedium'],
  ['UTM campaign', 'utmCampaign'],
  ['UTM content', 'utmContent'],
  ['UTM term', 'utmTerm'],
  ['Referrer', 'referrer'],
];

const DETAILS: ReadonlyArray<[label: string, key: keyof Lead]> = [
  ['Email', 'email'],
  ['Phone', 'phone'],
  ['Brand', 'brandName'],
  ['Website', 'website'],
  ['Monthly revenue', 'monthlyRevenue'],
  ['Ad spend', 'adSpend'],
];

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Firestore document ids are opaque strings, not serial integers.
  const id = (await params).id;
  if (!isValidLeadId(id)) notFound();

  if (!isDbConfigured()) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <Link href="/admin" className="text-white/55 text-xs font-black uppercase tracking-[0.2em]">
          ← Pipeline
        </Link>
        <SetupNotice />
      </main>
    );
  }

  let data: Awaited<ReturnType<typeof getLeadWithNotes>>;
  try {
    data = await getLeadWithNotes(id);
  } catch (error) {
    console.error('[admin] lead detail query failed:', error);
    return (
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <Link href="/admin" className="text-white/55 text-xs font-black uppercase tracking-[0.2em]">
          ← Pipeline
        </Link>
        <p className="text-red-300 text-sm font-medium">
          Could not load this lead. Check the Firestore connection.
        </p>
      </main>
    );
  }

  if (!data) notFound();
  const { lead, notes } = data;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      <div className="space-y-4">
        <Link href="/admin" className="text-white/55 text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-colors">
          ← Pipeline
        </Link>
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tighter">{lead.name}</h1>
          <p className="text-white/55 text-sm font-medium">
            Received {formatTimestamp(lead.createdAt)} UTC
          </p>
        </div>
      </div>

      <LeadControls leadId={lead.id} status={lead.status} />

      <section className="grid sm:grid-cols-2 gap-6">
        <div className="border border-white/15 rounded-2xl p-6 space-y-3">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">Details</h2>
          <dl className="space-y-2">
            {DETAILS.map(([label, key]) => (
              <div key={key} className="flex justify-between gap-4 text-sm">
                <dt className="text-white/55 font-medium">{label}</dt>
                <dd className="text-white/80 font-medium text-right break-all">
                  {(lead[key] as string | null) ?? '—'}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border border-white/15 rounded-2xl p-6 space-y-3">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
            Attribution
          </h2>
          <dl className="space-y-2">
            {ATTRIBUTION.map(([label, key]) => (
              <div key={key} className="flex justify-between gap-4 text-sm">
                <dt className="text-white/55 font-medium">{label}</dt>
                <dd className="text-white/80 font-medium text-right break-all">
                  {(lead[key] as string | null) ?? '—'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {lead.message ? (
        <section className="border border-white/15 rounded-2xl p-6 space-y-3">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">Message</h2>
          <p className="text-white/70 text-sm font-medium leading-relaxed whitespace-pre-wrap">
            {lead.message}
          </p>
        </section>
      ) : null}

      {/* Status history sits beside the notes because they answer the same
          question from two directions — what was done, and what changed. */}
      <section className="space-y-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
          Status history
        </h2>
        <ol className="border border-white/15 rounded-2xl p-6 space-y-4">
          {/* Arrival is not a transition and is not stored as one, so it is
              rendered from createdAt rather than faked into the history. */}
          <li className="flex gap-4 items-baseline">
            <span className="w-40 shrink-0 text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
              {formatTimestamp(lead.createdAt)} UTC
            </span>
            <span className="text-white/80 text-sm font-medium">
              Arrived via <span className="font-bold text-white">{lead.sourceForm}</span>
            </span>
          </li>

          {lead.statusHistory.map((change, index) => (
            <li
              key={`${change.at.toISOString()}-${index}`}
              className="flex gap-4 items-baseline"
            >
              <span className="w-40 shrink-0 text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
                {formatTimestamp(change.at)} UTC
              </span>
              <span className="text-white/80 text-sm font-medium">
                <span className="text-white/55">{change.from}</span>
                <span aria-hidden className="px-2 text-white/55">
                  →
                </span>
                <span className="font-bold text-white">{change.to}</span>
              </span>
            </li>
          ))}

          {lead.statusHistory.length === 0 ? (
            <li className="flex gap-4 items-baseline">
              <span className="w-40 shrink-0 text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
                —
              </span>
              <span className="text-white/55 text-sm font-medium leading-relaxed">
                {lead.status === 'new'
                  ? 'No status change yet — this lead has not been picked up.'
                  : `This lead reached "${lead.status}" before status changes were recorded, so the steps it took are not known.`}
              </span>
            </li>
          ) : null}
        </ol>

        {lead.firstContactedAt ? (
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
            First contacted {formatTimestamp(lead.firstContactedAt)} UTC
            {lead.reachedQualified ? ' · reached qualified' : null}
          </p>
        ) : null}
      </section>

      <section className="space-y-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
          Notes ({notes.length})
        </h2>
        {notes.length === 0 ? (
          <p className="text-white/60 text-sm font-medium">No notes yet.</p>
        ) : (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li key={note.id} className="border border-white/15 rounded-xl p-4 space-y-2">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
                  {formatTimestamp(note.createdAt)} UTC
                </p>
                <p className="text-white/70 text-sm font-medium whitespace-pre-wrap">{note.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
