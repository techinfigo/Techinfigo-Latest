import { serveBrandAsset } from '../api/brand/serve';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * /favicon.ico: the address Google and many browsers request on their own,
 * whatever the page's <link rel="icon"> says. Serves the same icon as
 * /api/brand/favicon (the uploaded one, or public/favicon.png).
 */
export async function GET(request: Request) {
  return serveBrandAsset(request, 'favicon');
}
