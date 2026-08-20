import { serveBrandAsset } from '../serve';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/brand/favicon — the uploaded favicon, or a redirect to public/favicon.png. */
export async function GET(request: Request) {
  return serveBrandAsset(request, 'favicon');
}
