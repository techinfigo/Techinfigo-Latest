import { isDbConfigured } from '../../../../lib/firestore';
import { getSiteSettingsUncached } from '../../../../lib/settings';
import { normalizeSettings, type SiteSettings } from '../../../../lib/settings-schema';
import { SetupNotice } from '../../SetupNotice';
import { PhotoSlots } from './PhotoSlots';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Website photos', robots: { index: false, follow: false } };

export default async function PhotosPage() {
  const configured = isDbConfigured();
  let photos: SiteSettings['photos'] = {};
  try {
    photos = configured ? (await getSiteSettingsUncached()).photos : normalizeSettings(null).photos;
  } catch {
    photos = {};
  }
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      <header className="space-y-2">
        <div className="w-10 h-[2px] bg-brandYellow" />
        <h1 className="text-3xl font-black uppercase tracking-tighter">Website photos</h1>
        <p className="text-white/55 text-sm font-medium max-w-2xl leading-relaxed">
          Real photos give the site a human touch. Upload straight from your phone: each photo is shrunk automatically so the site stays fast.
          A spot shows on the site only after you upload a photo for it. Until then that part of the page stays as it is now.
        </p>
      </header>
      {!configured ? <SetupNotice /> : null}
      <PhotoSlots initial={photos} configured={configured} />
    </main>
  );
}
