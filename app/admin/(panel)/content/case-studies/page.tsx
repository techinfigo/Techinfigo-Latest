import Link from 'next/link';
import { isDbConfigured } from '../../../../../lib/firestore';
import { getAllCaseStudies } from '../../../../../lib/content';
import { DEFAULT_CASE_STUDY_LIST, type CaseStudy } from '../../../../../lib/content-schema';
import { SetupNotice } from '../../../SetupNotice';
import { CaseStudyManager } from './CaseStudyManager';

/**
 * Case studies: the one repeatable content type.
 *
 * Reads every study, drafts included — this is the admin view. The public page
 * calls getPublishedCaseStudies(), which filters, so a draft cannot leak by a
 * caller forgetting to check the flag.
 */
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Case studies',
  robots: { index: false, follow: false },
};

export default async function CaseStudiesAdminPage() {
  const configured = isDbConfigured();
  let studies: CaseStudy[] = DEFAULT_CASE_STUDY_LIST;
  let failed = false;

  if (configured) {
    try {
      studies = await getAllCaseStudies();
    } catch (error) {
      console.error('[admin] case study read failed:', error);
      failed = true;
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      <div className="space-y-6">
        <Link
          href="/admin/content"
          className="text-white/55 text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-colors"
        >
          ← Content
        </Link>
        <header className="space-y-2">
          <div className="w-10 h-[2px] bg-brandYellow" />
          <h1 className="text-3xl font-black uppercase tracking-tighter">Case studies</h1>
          <p className="text-white/55 text-sm font-medium max-w-2xl leading-relaxed">
            Appears on <span className="text-white/80">/case-studies</span>. Drafts are saved but
            never shown publicly. Publishing puts one live immediately — no deploy.
          </p>
        </header>
      </div>

      {!configured ? <SetupNotice /> : null}

      {failed ? (
        <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6">
          <p className="text-red-300 text-sm font-medium">
            Firestore is configured but could not be read, so the list below shows the examples
            that ship with the site. Check the service-account credentials before saving.
          </p>
        </div>
      ) : null}

      <CaseStudyManager initial={studies} configured={configured && !failed} />
    </main>
  );
}
