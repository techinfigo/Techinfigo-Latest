import { NextResponse } from 'next/server';
import { getPhoto } from '../../../../lib/site-photos';
import { isPhotoSlot } from '../../../../lib/settings-schema';

/**
 * GET /api/photo/<slot>?v=<hash> — an uploaded website photo (WebP).
 * Pages link with the content hash, so a versioned request is cached for a
 * year (a new upload is a new URL); an unversioned one only for a minute.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const YEAR = 31_536_000;

export async function GET(request: Request, { params }: { params: Promise<{ slot: string }> }) {
  const { slot } = await params;
  if (!isPhotoSlot(slot)) return new NextResponse('Not found', { status: 404 });
  const photo = await getPhoto(slot);
  if (!photo) return new NextResponse('Not found', { status: 404, headers: { 'Cache-Control': 'public, max-age=60' } });

  const etag = `"${photo.hash}"`;
  const versioned = new URL(request.url).searchParams.get('v') === photo.hash.slice(0, 16);
  const headers = new Headers({
    'Content-Type': 'image/webp',
    ETag: etag,
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': versioned ? `public, max-age=${YEAR}, s-maxage=${YEAR}, immutable` : 'public, max-age=60, s-maxage=60, must-revalidate',
  });
  if (versioned) headers.set('CDN-Cache-Control', `public, max-age=${YEAR}, immutable`);
  if (request.headers.get('if-none-match') === etag) return new NextResponse(null, { status: 304, headers });
  const body = Buffer.from(photo.data, 'base64');
  headers.set('Content-Length', String(body.length));
  return new NextResponse(new Uint8Array(body), { status: 200, headers });
}
