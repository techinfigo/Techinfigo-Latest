import { serveBrandAsset } from '../serve';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/brand/logo — the uploaded logo, or a redirect to public/logo.png. */
export async function GET(request: Request) {
  return serveBrandAsset(request, 'logo');
}
