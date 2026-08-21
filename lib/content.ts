import { unstable_cache, revalidatePath, revalidateTag } from 'next/cache';
import { getDb, isDbConfigured } from './firestore';
import {
  DEFAULT_CASE_STUDY_LIST,
  DEFAULT_SITE_CONTENT,
  normaliseCaseStudy,
  normalisePage,
  publishedCaseStudies,
  type CaseStudy,
  type PageId,
  type SiteContent,
} from './content-schema';

/**
 * Editable page copy, stored in Firestore at `content/{pageId}`, and case
 * studies in the `caseStudies` collection.
 *
 * NODE RUNTIME ONLY — it reaches firebase-admin. Never import this from
 * middleware.ts or from a client component; import lib/content-schema.ts for
 * the types and defaults instead, the same split lib/settings.ts already makes.
 *
 * CACHING CONTRACT — the reason this file exists in this shape. The marketing
 * pages are statically generated and must stay that way, so nothing here may
 * be read per request. Every read goes through unstable_cache tagged per
 * content type: pages are prerendered against the cached value at build time,
 * and saving in the admin panel drops that one tag, so only the pages that
 * consumed it regenerate. Editing the Agra FAQ does not rebuild the homepage.
 *
 * If any public route flips from ○ to ƒ in the build output, something in here
 * was called outside the cache — that is the regression to look for.
 */

const COLLECTION = 'content';
const CASE_STUDIES = 'caseStudies';

/** One tag per page, so a save invalidates that page and nothing else. */
export function pageTag(page: PageId): string {
  return `content:${page}`;
}

export const CASE_STUDIES_TAG = 'content:case-studies';

/**
 * Bumped only if a stored shape changes incompatibly. unstable_cache keys on
 * this, so a bump orphans the old entries rather than serving a stale value of
 * the previous shape against new code.
 */
const CACHE_VERSION = 'v1';

function pageRef(page: PageId) {
  return getDb().collection(COLLECTION).doc(page);
}

/**
 * Raw document, or null when there is nothing to read.
 *
 * Missing credentials and a missing document are the same answer — null, "use
 * the defaults" — because they mean the same thing to a caller. A Firestore
 * error is *not* swallowed here; it propagates so the cache does not store a
 * fallback as though it were the truth.
 */
async function readPageDocument(page: PageId): Promise<unknown> {
  if (!isDbConfigured()) return null;
  const snapshot = await pageRef(page).get();
  return snapshot.exists ? snapshot.data() : null;
}

async function readCaseStudyDocuments(): Promise<CaseStudy[] | null> {
  if (!isDbConfigured()) return null;
  // One ordered fetch, no composite index: `order` alone is a single-field
  // index Firestore maintains automatically. The published filter is applied
  // in memory so that the admin panel and the public site can share this read.
  const snapshot = await getDb().collection(CASE_STUDIES).orderBy('order', 'asc').get();
  if (snapshot.empty) return null;
  return snapshot.docs.map((doc) => normaliseCaseStudy(doc.data(), doc.id));
}

/**
 * The cached read for one page. Throws on a Firestore failure by design: a
 * rejected promise is not cached, so a transient outage falls back for that
 * render only instead of pinning the defaults in place until the next save.
 */
function cachedPage<K extends PageId>(page: K) {
  return unstable_cache(
    async (): Promise<SiteContent[K]> => normalisePage(page, await readPageDocument(page)),
    [`content-${page}-${CACHE_VERSION}`],
    { tags: [pageTag(page)] },
  );
}

/**
 * The one read the public pages use.
 *
 * Never throws and never returns partial copy. If Firestore is unconfigured,
 * empty or broken, this is the content that shipped in config/content.ts — the
 * same reliability floor the settings document has. A database problem must
 * never blank a marketing page.
 */
export async function getPageContent<K extends PageId>(page: K): Promise<SiteContent[K]> {
  try {
    return await cachedPage(page)();
  } catch (error) {
    console.error(`[content] read failed for "${page}"; falling back to config/content.ts:`, error);
    return DEFAULT_SITE_CONTENT[page];
  }
}

const cachedCaseStudies = unstable_cache(
  async (): Promise<CaseStudy[]> => (await readCaseStudyDocuments()) ?? DEFAULT_CASE_STUDY_LIST,
  [`content-case-studies-${CACHE_VERSION}`],
  { tags: [CASE_STUDIES_TAG] },
);

/** Every case study, published or not. Admin only — the public site must not call this. */
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    return await cachedCaseStudies();
  } catch (error) {
    console.error('[content] case study read failed; falling back to config/content.ts:', error);
    return DEFAULT_CASE_STUDY_LIST;
  }
}

/**
 * What the public site renders: published only, in order.
 *
 * The filter lives here rather than in the query so an unpublished draft can
 * never reach a page through a caller that forgot to filter — the public
 * entry point simply does not return drafts.
 */
export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  return publishedCaseStudies(await getAllCaseStudies());
}

// --- writes -----------------------------------------------------------------

/** Uncached read for the admin form — it must show what is stored, not what is cached. */
export async function getPageContentUncached<K extends PageId>(page: K): Promise<SiteContent[K]> {
  return normalisePage(page, await readPageDocument(page));
}

/** `merge: true` creates the document on first save; there is no migration step. */
export async function savePageContent<K extends PageId>(
  page: K,
  content: SiteContent[K],
): Promise<void> {
  await pageRef(page).set({ ...content, updatedAt: new Date().toISOString() }, { merge: true });
}

export async function saveCaseStudy(id: string | null, study: CaseStudy): Promise<string> {
  const { id: _ignored, ...data } = study;
  const collection = getDb().collection(CASE_STUDIES);
  const ref = id ? collection.doc(id) : collection.doc();
  await ref.set({ ...data, updatedAt: new Date().toISOString() }, { merge: true });
  return ref.id;
}

export async function deleteCaseStudy(id: string): Promise<void> {
  await getDb().collection(CASE_STUDIES).doc(id).delete();
}

// --- revalidation -----------------------------------------------------------

/**
 * Make an edit visible.
 *
 * revalidateTag drops the cached read for that one content type, which marks
 * the statically generated pages that consumed it as needing regeneration.
 * Pages regenerate on save, not on traffic.
 *
 * `{ expire: 0 }` is Next 16's profile argument — "expire now" rather than "go
 * stale and refresh eventually", which is the whole point: someone just
 * pressed Save and wants to check the page. The named profiles all keep
 * serving the old copy for a while, and `updateTag` is not an option because
 * it only works inside a Server Action, not a route handler.
 *
 * revalidatePath is deliberately narrow here, unlike revalidateSiteSettings():
 * settings touch the footer and favicon on every page, but page copy touches
 * one route. Rebuilding the whole tree for an FAQ edit would throw away every
 * other page's cache for nothing.
 */
export function revalidatePageContent(page: PageId, paths: string[]): void {
  revalidateTag(pageTag(page), { expire: 0 });
  for (const path of paths) revalidatePath(path);
}

export function revalidateCaseStudies(paths: string[]): void {
  revalidateTag(CASE_STUDIES_TAG, { expire: 0 });
  for (const path of paths) revalidatePath(path);
}
