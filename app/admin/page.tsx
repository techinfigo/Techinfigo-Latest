import Link from 'next/link';
import { isDbConfigured, queryLeads } from '../../lib/firestore';
import { LEAD_STATUSES, type Lead, type LeadStatus } from '../../lib/leads-schema';
import { SetupNotice } from './SetupNotice';
import { SignOutButton } from './SignOutButton';
import { formatTimestamp } from './format';

export const dynamic = 'force-dynamic';

type Search = { status?: string; source?: string; days?: string };

async function loadLeads(search: Search): Promise<{ rows: Lead[]; failed: boolean }> {
  try {
    const rows = await queryLeads(
      { status: search.status, source: search.source, days: Number(search.days) },
      200,
    );
    return { rows, failed: false };
  } catch (error) {
    console.error('[admin] lead query failed:', error);
    return { rows: [], failed: true };
  }
}

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: 'bg-brandYellow/15 text-brandYellow',
  contacted: 'bg-blue-400/15 text-blue-300',
  qualified: 'bg-purple-400/15 text-purple-300',
  proposal: 'bg-orange-400/15 text-orange-300',
  won: 'bg-emerald-400/15 text-emerald-300',
  lost: 'bg-white/10 text-white/40',
};

export default async function AdminPage({ searchParams }: { searchParams: Promise<Search> }) {
  const search = await searchParams;
  const configured = isDbConfigured();
  const { rows, failed } = configured ? await loadLeads(search) : { rows: [], failed: false };

  const counts = LEAD_STATUSES.map((status) => ({
    status,
    count: rows.filter((row) => row.status === status).length,
  }));

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      <header className="flex flex-wrap justify-between items-end gap-4">
        <div className="space-y-2">
          <div className="w-10 h-[2px] bg-brandYellow" />
          <h1 className="text-3xl font-black uppercase tracking-tighter">Lead Pipeline</h1>
          <p className="text-white/40 text-sm font-medium">
            {configured
              ? `${rows.length} lead${rows.length === 1 ? '' : 's'} in view`
              : 'Read-only until a database is configured'}
          </p>
        </div>
        <SignOutButton />
      </header>

      {!configured ? <SetupNotice /> : null}

      {failed ? (
        <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6">
          <p className="text-red-300 text-sm font-medium">
            Firestore is configured but the query failed. Check the service-account credentials and
            that the Firestore database exists in this project.
          </p>
        </div>
      ) : null}

      {configured && !failed ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {counts.map(({ status, count }) => (
              <Link
                key={status}
                href={`/admin?status=${status}`}
                className="border border-white/10 rounded-xl p-4 hover:border-brandYellow/30 transition-colors"
              >
                <p className="text-2xl font-black">{count}</p>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mt-1">
                  {status}
                </p>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
            <Link
              href="/admin"
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              All
            </Link>
            {[7, 30, 90].map((days) => (
              <Link
                key={days}
                href={`/admin?days=${days}`}
                className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                Last {days}d
              </Link>
            ))}
          </div>

          {rows.length === 0 ? (
            <p className="text-white/40 text-sm font-medium py-12 text-center border border-white/10 rounded-2xl">
              No leads match this view.
            </p>
          ) : (
            <div className="overflow-x-auto border border-white/10 rounded-2xl">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.03] text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
                  <tr>
                    <th className="text-left px-4 py-3">Lead</th>
                    <th className="text-left px-4 py-3">Source</th>
                    <th className="text-left px-4 py-3">Campaign</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {rows.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="font-bold hover:text-brandYellow transition-colors"
                        >
                          {lead.name}
                        </Link>
                        <p className="text-white/40 text-xs">{lead.email}</p>
                      </td>
                      <td className="px-4 py-3 text-white/60 text-xs">{lead.sourceForm}</td>
                      <td className="px-4 py-3 text-white/60 text-xs">
                        {lead.utmCampaign ?? lead.utmSource ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${STATUS_STYLES[lead.status]}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">
                        {formatTimestamp(lead.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : null}
    </main>
  );
}
