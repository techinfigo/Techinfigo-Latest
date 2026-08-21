import Link from 'next/link';
import { isDbConfigured } from '../../../../lib/firestore';
import { PAGE_IDS, PAGE_LABELS } from '../../../../lib/content-schema';
import { PAGE_SPECS } from '../../../../lib/content-fields';
import { getAllCaseStudies } from '../../../../lib/content';
import { SetupNotice } from '../../SetupNotice';

/**
 * The index for everything editable.
 *
 * Exists so nothing under /admin/content is an orphan route: every editor is
 * reachable from here, and this is reachable from the sidebar. A sub-page you
 * can only find by typing the URL is a page nobody will ever edit.
 */
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Content',
  robots: { index: false, follow: false },
};

export default async function ContentIndexPage() {
  const configured = isDbConfigured();
  let studyCount = 0;
  let draftCount = 0;
  let failed = false;

  if (configured) {
    try {
      const studies = await getAllCaseStudies();
      studyCount = studies.length;
      draftCount = studies.filter((s) => !s.published).length;
    } catch {
      failed = true;
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <header className="space-y-2">
        <div className="w-10 h-[2px] bg-brandYellow" />
        <h1 className="text-3xl font-black uppercase tracking-tighter">Content</h1>
        <p className="text-white/55 text-sm font-medium max-w-2xl leading-relaxed">
          The copy on the public website. Changes go live on the next visit to the page you edited
          — there is no rebuild and no deploy. Anything left blank falls back to the wording the
          site shipped with, so a page can never end up empty.
        </p>
      </header>

      {!configured ? <SetupNotice /> : null}

      <section className="space-y-3">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
          Page copy
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {PAGE_IDS.map((id) => {
            const spec = PAGE_SPECS[id];
            const fieldCount = spec.fields.length;
            const listCount = spec.lists.length;
            return (
              <Link
                key={id}
                href={`/admin/content/${id}`}
                className="border border-white/15 rounded-xl p-5 hover:border-brandYellow/30 transition-colors space-y-2"
              >
                <p className="font-bold text-sm">{PAGE_LABELS[id]}</p>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
                  {spec.route}
                </p>
                <p className="text-white/55 text-xs font-medium">
                  {fieldCount} field{fieldCount === 1 ? '' : 's'}
                  {listCount ? ` · ${listCount} list${listCount === 1 ? '' : 's'}` : ''}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brandYellow">
          Case studies
        </h2>
        <Link
          href="/admin/content/case-studies"
          className="block border border-white/15 rounded-xl p-5 hover:border-brandYellow/30 transition-colors space-y-2"
        >
          <p className="font-bold text-sm">Case studies</p>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/55">
            /case-studies
          </p>
          <p className="text-white/55 text-xs font-medium">
            {failed
              ? 'Could not be read — check the Firestore credentials.'
              : `${studyCount} total${draftCount ? ` · ${draftCount} unpublished draft${draftCount === 1 ? '' : 's'}` : ''}`}
          </p>
        </Link>
      </section>

      <p className="text-white/55 text-xs font-medium leading-relaxed max-w-2xl">
        Not editable here: legal pages, form labels, navigation and page titles for search engines.
        Those change rarely and changing them can break links or lead capture, so they stay in
        code.
      </p>
    </main>
  );
}
