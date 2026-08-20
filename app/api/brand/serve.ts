import { NextResponse } from 'next/server';
import { getBrandAsset } from '../../../lib/settings';
import type { BrandAssetKind } from '../../../lib/settings-schema';

/**
 * Shared handler behind /api/brand/logo and /api/brand/favicon.
 *
 * Brand images live base64 inside the settings document rather than in Firebase
 * Storage — one less console to configure — so they cannot be served as static
 * files and need this route instead.
 *
 * CACHING. The tension is that these want to be cached hard but must change the
 * instant someone uploads a replacement. Both are satisfied by the content hash:
 * callers link to `/api/brand/logo?v=<hash>`, which changes on every upload, so
 * a hashed URL is safe to mark immutable for a year and a browser physically
 * cannot serve the old image against the new URL. A request without a matching
 * ?v= is treated as unversioned and gets a short lifetime plus an ETag, so a
 * hand-typed URL or a stale reference still picks the new upload up in a minute
 * — and revalidates with a 304 rather than re-downloading.
 */

const YEAR_SECONDS = 31_536_000;

/** Enough hash to be collision-proof in a URL without making it unreadable. */
const VERSION_LENGTH = 16;

function bundledFallback(kind: BrandAssetKind): string {
  return kind === 'logo' ? '/logo.png' : '/favicon.png';
}

export async function serveBrandAsset(request: Request, kind: BrandAssetKind) {
  const asset = await getBrandAsset(kind);

  // Nothing uploaded, or the database is unreachable: hand back the file that
  // ships in public/. The site keeps its logo either way.
  if (!asset) {
    return NextResponse.redirect(new URL(bundledFallback(kind), request.url), {
      status: 307,
      headers: { 'Cache-Control': 'public, max-age=60, must-revalidate' },
    });
  }

  const etag = `"${asset.hash}"`;
  const requestedVersion = new URL(request.url).searchParams.get('v');
  const versioned = requestedVersion === asset.hash.slice(0, VERSION_LENGTH);

  const headers = new Headers({
    'Content-Type': asset.mime,
    ETag: etag,
    'Cache-Control': versioned
      ? `public, max-age=${YEAR_SECONDS}, immutable`
      : 'public, max-age=60, must-revalidate',
    // An uploaded SVG is markup and could carry a <script>. Only a signed-in
    // admin can upload one, but serving it from our own origin would put that
    // script on our origin, so the sandbox and nosniff close that off.
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
  });

  // Revalidation hit: the browser already holds these exact bytes.
  if (request.headers.get('if-none-match') === etag) {
    return new NextResponse(null, { status: 304, headers });
  }

  const body = Buffer.from(asset.data, 'base64');
  headers.set('Content-Length', String(body.length));
  return new NextResponse(body, { status: 200, headers });
}
