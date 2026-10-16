import { NextResponse } from 'next/server';
import { verifyCrmUser } from '../../../lib/crm-push';
import { isCrmConfigured } from '../../../lib/crm';
import { clientKey, rateLimit } from '../../../lib/rate-limit';
import { cleanDesign, publishProposal } from '../../../lib/proposals';
import { SITE } from '../../../config/site';

/**
 * Proposal links for the CRM.
 *  POST { idToken, id?, data } → saves the proposal and returns { id, url }.
 * Called from the CRM app (another domain), so it answers CORS; authorised by
 * the CRM user's Firebase ID token, no cookies.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function cors(request: Request): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 204, headers: cors(request) });
}

export async function POST(request: Request) {
  const headers = cors(request);
  if (!isCrmConfigured()) return NextResponse.json({ ok: false, error: 'Not set up.' }, { status: 503, headers });
  const limit = rateLimit(`proposals:${clientKey(request)}`, 60, 60 * 60 * 1000);
  if (!limit.allowed) return NextResponse.json({ ok: false, error: 'Too many requests.' }, { status: 429, headers });

  const text = await request.text().catch(() => '');
  if (!text || text.length > 60_000) return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400, headers });
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400, headers });
  }

  const user = await verifyCrmUser(body.idToken);
  if (!user) return NextResponse.json({ ok: false, error: 'Please sign in to the CRM again.' }, { status: 401, headers });
  const data = cleanDesign(body.data);
  if (!data) return NextResponse.json({ ok: false, error: 'Add a business name and at least one service.' }, { status: 400, headers });

  try {
    const id = await publishProposal(user, data, body.id);
    if (!id) return NextResponse.json({ ok: false, error: 'Not allowed.' }, { status: 403, headers });
    return NextResponse.json({ ok: true, id, url: `${SITE.url.replace(/\/$/, '')}/p/${id}` }, { headers });
  } catch (error) {
    console.error('[proposals] save failed:', error);
    return NextResponse.json({ ok: false, error: 'Could not save. Try again.' }, { status: 500, headers });
  }
}
