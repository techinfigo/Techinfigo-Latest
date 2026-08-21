import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isDbConfigured } from '../../../../../lib/firestore';
import { getPageContentUncached } from '../../../../../lib/content';
import { PAGE_IDS, PAGE_LABELS, normalisePage, type PageId } from '../../../../../lib/content-schema';
import { PAGE_SPECS } from '../../../../../lib/content-fields';
import { SetupNotice } from '../../../SetupNotice';
import { ContentForm } from './ContentForm';

/**
 * One page's copy editor.
 *
 * Reads uncached, unlike the public site: the form has to show what is
 * actually stored, not what the marketing pages happen to be caching, or a
 * save that partially failed would look like it worked.
 */
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const label = (PAGE_IDS as readonly string[]).includes(page)
    ? PAGE_LABELS[page as PageId]
    : 'Content';
  return { title: `${label} copy`, robots: { index: false, follow: false } };
}

export default async function EditPageContent({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!(PAGE_IDS as readonly string[]).includes(page)) notFound();
  const pageId = page as PageId;

  const configured = isDbConfigured();
  let content = normalisePage(pageId, null);
  let failed = false;

  if (configured) {
    try {
      content = await getPageContentUncached(pageId);
    } catch (error) {
      console.error('[admin] content read failed:', error);
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
          <h1 className="text-3xl font-black uppercase tracking-tighter">{PAGE_LABELS[pageId]}</h1>
          <p className="text-white/55 text-sm font-medium max-w-2xl leading-relaxed">
            Appears on{' '}
            <span className="text-white/80">{PAGE_SPECS[pageId].route}</span>. Saving updates the
            live page immediately — no deploy. Clearing a field restores the wording the site
            shipped with rather than leaving a gap.
          </p>
        </header>
      </div>

      {!configured ? <SetupNotice /> : null}

      {failed ? (
        <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6">
          <p className="text-red-300 text-sm font-medium">
            Firestore is configured but could not be read, so the form below is showing the copy
            that ships with the site. Saving now would overwrite whatever is stored — check the
            service-account credentials first.
          </p>
        </div>
      ) : null}

      <ContentForm page={pageId} initial={content} configured={configured && !failed} />
    </main>
  );
}
