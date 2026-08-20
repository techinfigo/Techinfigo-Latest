import { unstable_cache, revalidatePath, revalidateTag } from 'next/cache';
import { getDb, isDbConfigured } from './firestore';
import {
  DEFAULT_SETTINGS,
  normalizeSettings,
  type BrandAssetKind,
  type SiteSettings,
} from './settings-schema';
import type { StoredBrandAsset } from './brand-assets';

/**
 * Editable site settings, stored in Firestore at `settings/site`.
 *
 * NODE RUNTIME ONLY — it reaches firebase-admin. Never import this from
 * middleware.ts or from a client component; import lib/settings-schema.ts for
 * the types and defaults instead, the same split lib/leads-schema.ts already
 * makes for leads.
 *
 * CACHING CONTRACT. The marketing pages are statically generated and must stay
 * that way, so nothing here may be read per request. Every read goes through
 * unstable_cache tagged SITE_SETTINGS_TAG: pages are prerendered against the
 * cached value at build time, and saving in the admin panel calls
 * revalidateSiteSettings(), which drops the tag and makes the affected pages
 * regenerate on their next request. Pages regenerate on save, not on traffic.
 */

const COLLECTION = 'settings';
const DOCUMENT = 'site';

/** The cache tag every settings read is filed under, and what a save invalidates. */
export const SITE_SETTINGS_TAG = 'site-settings';

/**
 * Bumped only if the stored shape changes incompatibly. unstable_cache keys on
 * this, so a bump orphans the old entries rather than letting a stale value of
 * the previous shape be served against the new code.
 */
const CACHE_KEY = 'site-settings-v1';

type SettingsDocument = Record<string, unknown> & {
  brand?: { logo?: StoredBrandAsset | null; favicon?: StoredBrandAsset | null };
};

function settingsRef() {
  return getDb().collection(COLLECTION).doc(DOCUMENT);
}

/**
 * Raw document, or null when there is nothing to read.
 *
 * Missing credentials and a missing document are the same answer — null, "use
 * the defaults" — because they mean the same thing to a caller. A Firestore
 * error is *not* swallowed here; it propagates so the cache does not store a
 * fallback value as though it were the truth.
 */
async function readDocument(): Promise<SettingsDocument | null> {
  if (!isDbConfigured()) return null;
  const snapshot = await settingsRef().get();
  if (!snapshot.exists) return null;
  return (snapshot.data() as SettingsDocument) ?? null;
}

/**
 * The cached read. Throws on a Firestore failure by design: a rejected promise
 * is not cached, so a transient outage falls back for that render only instead
 * of pinning the defaults in place until the next save.
 */
const readCachedSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const document = await readDocument();
    // normalizeSettings fills every field from config/site.ts, so a missing or
    // empty document produces exactly the defaults.
    return normalizeSettings(document);
  },
  [CACHE_KEY],
  { tags: [SITE_SETTINGS_TAG] },
);

/**
 * The one read the whole public site uses.
 *
 * Never throws and never returns a partial object. If Firestore is unconfigured,
 * empty or broken, this is the hardcoded config/site.ts content — the same
 * reliability floor the inbox mirror gives lead capture. A database problem
 * must never blank the public site.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    return await readCachedSettings();
  } catch (error) {
    console.error('[settings] read failed; falling back to config/site.ts defaults:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Uncached read for the admin panel.
 *
 * The form must show what is actually stored, not what the public site is
 * currently caching, or a save that partially failed would look like it worked.
 */
export async function getSiteSettingsUncached(): Promise<SiteSettings> {
  const document = await readDocument();
  return normalizeSettings(document);
}

/**
 * The bytes behind /api/brand/logo and /api/brand/favicon.
 *
 * Cached under the same tag as the settings themselves, so one upload
 * invalidates both the metadata the pages render and the bytes this serves.
 * Kept out of getSiteSettings() deliberately: that value is serialised into
 * every prerendered page, and base64 image data has no business being there.
 */
const readCachedBrandAsset = unstable_cache(
  async (kind: BrandAssetKind): Promise<{ data: string; mime: string; hash: string } | null> => {
    const document = await readDocument();
    const asset = document?.brand?.[kind];
    if (!asset || typeof asset.data !== 'string' || !asset.data) return null;
    return { data: asset.data, mime: asset.mime, hash: asset.hash };
  },
  ['site-brand-v1'],
  { tags: [SITE_SETTINGS_TAG] },
);

/** Returns null for "nothing uploaded" and for any failure — the route then serves public/. */
export async function getBrandAsset(
  kind: BrandAssetKind,
): Promise<{ data: string; mime: string; hash: string } | null> {
  try {
    return await readCachedBrandAsset(kind);
  } catch (error) {
    console.error(`[settings] brand asset read failed for ${kind}; serving bundled file:`, error);
    return null;
  }
}

/**
 * Persist the editable fields. Brand assets are written separately by
 * saveBrandAsset() so that saving text never rewrites — or drops — the images.
 *
 * `merge: true` creates the document on first save; there is no migration step.
 */
export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  const { brand: _brand, ...editable } = settings;
  await settingsRef().set({ ...editable, updatedAt: new Date().toISOString() }, { merge: true });
}

/** Write one image. The other slot is untouched — dotted paths would need FieldPath escaping. */
export async function saveBrandAsset(
  kind: BrandAssetKind,
  asset: StoredBrandAsset,
): Promise<void> {
  await settingsRef().set({ brand: { [kind]: asset } }, { merge: true });
}

/** Clear one image, reverting that slot to the file bundled in public/. */
export async function clearBrandAsset(kind: BrandAssetKind): Promise<void> {
  await settingsRef().set({ brand: { [kind]: null } }, { merge: true });
}

/**
 * Make the change visible.
 *
 * revalidateTag drops every cached settings read, which is what marks the
 * statically generated pages that consumed it as needing regeneration.
 *
 * `{ expire: 0 }` is the profile argument Next 16 added — it means "expire now"
 * rather than "go stale and refresh eventually", which is the whole point here:
 * someone has just pressed Save and wants to check the page. Passing no profile
 * would mean the same thing but is deprecated, and the named profiles ('max'
 * and friends) all keep serving the old value for a while. `updateTag` is not
 * an option: it only works inside a Server Action, and this runs in a route
 * handler.
 *
 * revalidatePath('/', 'layout') then covers the whole tree explicitly — the
 * footer and the favicon live in the root layout, so a settings change touches
 * every page, not only the homepage.
 */
export function revalidateSiteSettings(): void {
  revalidateTag(SITE_SETTINGS_TAG, { expire: 0 });
  revalidatePath('/');
  revalidatePath('/', 'layout');
}
