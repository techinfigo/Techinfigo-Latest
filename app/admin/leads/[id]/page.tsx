import Link from 'next/link';
import { notFound } from 'next/navigation';
import { asc, eq } from 'drizzle-orm';
import { getDb, isDbConfigured } from '../../../../lib/db';
import { leadNotes, leads, type Lead, type LeadNote } from '../../../../lib/db/schema';
import { SetupNotice } from '../../SetupNotice';
import { formatTimestamp } from '../../format';
import { LeadControls } from './LeadControls';

export const dynamic = 'force-dynamic';

async function loadLead(id: number): Promise<{ lead: Lead; notes: LeadNote[] } | null> {
  const db = getDb();

  const found = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  if (!found.length) return null;

  const notes = await db
    .select()
    .from(leadNotes)
    .where(eq(leadNotes.leadId, id))
    .orderBy(asc(leadNotes.createdAt));

  return { lead: found[0], notes };
}

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
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  if (!isDbConfigured()) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <Link href="/admin" className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">
          ← Pipeline
        </Link>
        <SetupNotice />
      </main>
    );
  }

  let data: Awaited<ReturnType<typeof loadLead>>;
  try {
    data = await loadLead(id);
  } catch (error) {
    console.error('[admin] lead detail query failed:', error);
    return (
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <Link href="/admin" className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">
          ← Pipeline
        </Link>
        <p className="text-red-300 text-sm font-medium">
          Could not load this lead. Check the database connection.
        </p>
      </main>
    );
  }

  if (!data) notFound();
  const { lead, notes } = data;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      <div className="space-y-4">
        <Link href="/admin" className="text-white/40 text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-colors">
          ← Pipeline
        </Link>
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tighter">{lead.name}</h1>
          <p className="text-white/40 text-sm font-medium">
            Received {formatTimestamp(lead.createdAt)} UTC
          </p>
        </div>
      </div>

      <LeadControls leadId={lead.id} status={lead.status} />

      <section className="grid sm:grid-cols-2 gap-6">
        <div className="border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">Details</h2>
          <dl className="space-y-2">
            {DETAILS.map(([label, key]) => (
              <div key={key} className="flex justify-between gap-4 text-sm">
                <dt className="text-white/40 font-medium">{label}</dt>
                <dd className="text-white/80 font-medium text-right break-all">
                  {(lead[key] as string | null) ?? '—'}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
            Attribution
          </h2>
          <dl className="space-y-2">
            {ATTRIBUTION.map(([label, key]) => (
              <div key={key} className="flex justify-between gap-4 text-sm">
                <dt className="text-white/40 font-medium">{label}</dt>
                <dd className="text-white/80 font-medium text-right break-all">
                  {(lead[key] as string | null) ?? '—'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {lead.message ? (
        <section className="border border-white/10 rounded-2xl p-6 space-y-3">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">Message</h2>
          <p className="text-white/70 text-sm font-medium leading-relaxed whitespace-pre-wrap">
            {lead.message}
          </p>
        </section>
      ) : null}

      <section className="space-y-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
          Notes ({notes.length})
        </h2>
        {notes.length === 0 ? (
          <p className="text-white/30 text-sm font-medium">No notes yet.</p>
        ) : (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li key={note.id} className="border border-white/10 rounded-xl p-4 space-y-2">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
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
