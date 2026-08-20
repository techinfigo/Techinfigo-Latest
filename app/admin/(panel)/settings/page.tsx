import { isDbConfigured } from '../../../../lib/firestore';
import { getSiteSettingsUncached } from '../../../../lib/settings';
import { normalizeSettings, type SiteSettings } from '../../../../lib/settings-schema';
import { SetupNotice } from '../../SetupNotice';
import { BrandUpload } from './BrandUpload';
import { SettingsForm } from './SettingsForm';

/**
 * Editable site settings, sitting under /admin so it inherits the panel's
 * layout chrome and the middleware auth gate that matches /admin/:path*.
 *
 * Reads uncached, unlike the public site: the form has to show what is actually
 * stored, not what the marketing pages happen to be caching.
 */
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Settings',
  robots: { index: false, follow: false },
};

async function loadSettings(): Promise<{ settings: SiteSettings; failed: boolean }> {
  if (!isDbConfigured()) {
    // Still render the form, populated with the defaults from config/site.ts,
    // so it is clear what is editable once a database exists.
    return { settings: normalizeSettings(null), failed: false };
  }
  try {
    return { settings: await getSiteSettingsUncached(), failed: false };
  } catch (error) {
    console.error('[admin] settings read failed:', error);
    return { settings: normalizeSettings(null), failed: true };
  }
}

export default async function SettingsPage() {
  const configured = isDbConfigured();
  const { settings, failed } = await loadSettings();

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <header className="space-y-2">
        <div className="w-10 h-[2px] bg-brandYellow" />
        <h1 className="text-3xl font-black uppercase tracking-tighter">Site Settings</h1>
        <p className="text-white/40 text-sm font-medium max-w-2xl leading-relaxed">
          Everything here appears on the public website. Changes go live on the next visit to a
          page — there is no rebuild and no deploy.
        </p>
      </header>

      {!configured ? <SetupNotice /> : null}

      {failed ? (
        <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6">
          <p className="text-red-300 text-sm font-medium">
            Firestore is configured but could not be read, so the form below is showing the
            built-in defaults. Saving now would overwrite whatever is stored — check the
            service-account credentials first.
          </p>
        </div>
      ) : null}

      <SettingsForm initial={settings} configured={configured} />

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-black uppercase tracking-tighter">Brand assets</h2>
          <p className="text-white/40 text-sm font-medium max-w-2xl leading-relaxed">
            Images are stored in the database, not in the code, so replacing one takes effect
            without a deploy. Remove an upload and the site falls back to the image it ships with.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <BrandUpload kind="logo" meta={settings.brand.logo} configured={configured} />
          <BrandUpload kind="favicon" meta={settings.brand.favicon} configured={configured} />
        </div>
      </section>
    </main>
  );
}
