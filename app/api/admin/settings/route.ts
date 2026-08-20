import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, readSession } from '../../../../lib/auth';
import { isDbConfigured } from '../../../../lib/firestore';
import {
  clearBrandAsset,
  getSiteSettingsUncached,
  revalidateSiteSettings,
  saveBrandAsset,
  saveSiteSettings,
} from '../../../../lib/settings';
import {
  BRAND_ASSET_KINDS,
  normalizeSettings,
  type BrandAssetKind,
} from '../../../../lib/settings-schema';
import { validateBrandUpload } from '../../../../lib/brand-assets';

/**
 * Read and write the editable site settings. Admin only.
 *
 * The auth check is the same shape as the leads routes — a cookie session, 401
 * without one — rather than middleware: middleware.ts matches `/admin/:path*`
 * and deliberately does not reach into /api, because it runs on the Edge and
 * must not touch anything Node-only.
 *
 * Nothing the client sends is trusted. Every payload is run through
 * normalizeSettings(), the same function that sanitises a document read back
 * out of Firestore, so an out-of-range slot count or a `javascript:` LinkedIn
 * URL is clamped or dropped here rather than reaching a page.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function requireSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return Boolean(await readSession(cookieStore.get(SESSION_COOKIE)?.value));
}

const UNAUTHORIZED = { ok: false, error: 'unauthorized' } as const;
const NOT_CONFIGURED = {
  ok: false,
  error:
    'Firestore is not configured, so there is nowhere to save. Set FIREBASE_PROJECT_ID, ' +
    'FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY, then restart the server.',
} as const;

function isBrandKind(value: unknown): value is BrandAssetKind {
  return (BRAND_ASSET_KINDS as readonly string[]).includes(value as string);
}

/** GET — the stored settings, uncached, so the form shows what is really saved. */
export async function GET() {
  if (!(await requireSession())) {
    return NextResponse.json(UNAUTHORIZED, { status: 401 });
  }

  if (!isDbConfigured()) {
    // Not an error: the form is still usable, it just shows the defaults it
    // would be editing once a database exists.
    return NextResponse.json({ ok: true, configured: false, settings: normalizeSettings(null) });
  }

  try {
    const settings = await getSiteSettingsUncached();
    return NextResponse.json({ ok: true, configured: true, settings });
  } catch (error) {
    console.error('[settings] read failed:', error);
    return NextResponse.json({ ok: false, error: 'Could not read settings.' }, { status: 500 });
  }
}

/** PUT — save the editable fields. Brand images are handled by POST. */
export async function PUT(request: Request) {
  if (!(await requireSession())) {
    return NextResponse.json(UNAUTHORIZED, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(NOT_CONFIGURED, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'Expected a JSON body.' }, { status: 400 });
  }

  // Clamping rather than rejecting: the form already constrains these, so an
  // out-of-range value here is a bug or a hand-crafted request, and the useful
  // answer in both cases is "the nearest legal value", returned so the form can
  // show what was actually stored.
  const settings = normalizeSettings(body);

  try {
    await saveSiteSettings(settings);
    revalidateSiteSettings();
    return NextResponse.json({ ok: true, settings });
  } catch (error) {
    console.error('[settings] save failed:', error);
    return NextResponse.json(
      { ok: false, error: 'Firestore rejected the write. Check the service-account credentials.' },
      { status: 500 },
    );
  }
}

/**
 * POST — upload a brand image as multipart/form-data (`kind` + `file`).
 *
 * Multipart rather than base64-in-JSON so the raw bytes arrive intact and can
 * be sniffed. The file's name and browser-reported type are ignored entirely.
 */
export async function POST(request: Request) {
  if (!(await requireSession())) {
    return NextResponse.json(UNAUTHORIZED, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(NOT_CONFIGURED, { status: 503 });
  }

  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json(
      { ok: false, error: 'Expected a multipart form upload.' },
      { status: 400 },
    );
  }

  const kind = form.get('kind');
  if (!isBrandKind(kind)) {
    return NextResponse.json(
      { ok: false, error: 'Upload must say whether it is the logo or the favicon.' },
      { status: 400 },
    );
  }

  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'No file was attached.' }, { status: 400 });
  }

  const label = kind === 'logo' ? 'Logo' : 'Favicon';
  const bytes = new Uint8Array(await file.arrayBuffer());
  const result = validateBrandUpload(bytes, label);

  // 413 for "too large", 415 for anything unreadable — the two refusals a
  // caller handles differently. The message already names the actual size.
  if (!result.ok) {
    const status = result.reason === 'too-large' ? 413 : 415;
    return NextResponse.json({ ok: false, error: result.error }, { status });
  }

  try {
    await saveBrandAsset(kind, result.asset);
    revalidateSiteSettings();
    const { data: _data, ...meta } = result.asset;
    return NextResponse.json({ ok: true, kind, asset: meta });
  } catch (error) {
    console.error(`[settings] ${kind} upload failed:`, error);
    return NextResponse.json(
      {
        ok: false,
        error:
          'Firestore rejected the image. It may push the settings document over the 1 MB limit — ' +
          'try a smaller file.',
      },
      { status: 500 },
    );
  }
}

/** DELETE — drop an uploaded image so that slot falls back to the file in public/. */
export async function DELETE(request: Request) {
  if (!(await requireSession())) {
    return NextResponse.json(UNAUTHORIZED, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(NOT_CONFIGURED, { status: 503 });
  }

  const kind = new URL(request.url).searchParams.get('kind');
  if (!isBrandKind(kind)) {
    return NextResponse.json(
      { ok: false, error: 'Say which image to remove: ?kind=logo or ?kind=favicon.' },
      { status: 400 },
    );
  }

  try {
    await clearBrandAsset(kind);
    revalidateSiteSettings();
    return NextResponse.json({ ok: true, kind });
  } catch (error) {
    console.error(`[settings] ${kind} removal failed:`, error);
    return NextResponse.json({ ok: false, error: 'Could not remove the image.' }, { status: 500 });
  }
}
