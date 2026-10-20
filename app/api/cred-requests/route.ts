import { NextResponse } from 'next/server';
import { verifyCrmUser } from '../../../lib/crm-push';
import { isCrmConfigured } from '../../../lib/crm';
import { clientKey, rateLimit } from '../../../lib/rate-limit';
import { createRequest, isCredRequestId, listForOwner, removeRequest } from '../../../lib/cred-requests';
import { SITE } from '../../../config/site';

/**
 * "Fill your logins" links, for the CRM (another domain, so CORS; signed in
 * with the CRM user's Firebase ID token, no cookies).
 *  POST { idToken, action: 'create', clientId, clientName, items, inviteEmail } → { id, url, expiresAt }
 *  POST { idToken, action: 'list' }   → { requests } (answers included for submitted ones)
 *  POST { idToken, action: 'remove', id }
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function cors(request: Request): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-store',
    Vary: 'Origin',
  };
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 204, headers: cors(request) });
}

export async function POST(request: Request) {
  const headers = cors(request);
  if (!isCrmConfigured()) return NextResponse.json({ ok: false, error: 'Not set up.' }, { status: 503, headers });
  const limit = rateLimit(`credreq:${clientKey(request)}`, 240, 60 * 60 * 1000);
  if (!limit.allowed) return NextResponse.json({ ok: false, error: 'Too many requests.' }, { status: 429, headers });

  const text = await request.text().catch(() => '');
  if (!text || text.length > 20_000) return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400, headers });
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400, headers });
  }

  const user = await verifyCrmUser(body.idToken);
  if (!user) return NextResponse.json({ ok: false, error: 'Please sign in to the CRM again.' }, { status: 401, headers });

  try {
    if (body.action === 'create') {
      const made = await createRequest(user, body);
      if (!made) return NextResponse.json({ ok: false, error: 'Pick at least one item.' }, { status: 400, headers });
      return NextResponse.json({ ok: true, ...made, url: `${SITE.url.replace(/\/$/, '')}/c/${made.id}` }, { headers });
    }
    if (body.action === 'list') {
      return NextResponse.json({ ok: true, requests: await listForOwner(user) }, { headers });
    }
    if (body.action === 'remove' && isCredRequestId(body.id)) {
      const done = await removeRequest(user, body.id);
      return NextResponse.json({ ok: done }, { status: done ? 200 : 403, headers });
    }
    return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400, headers });
  } catch (error) {
    console.error('[cred-requests]', error);
    return NextResponse.json({ ok: false, error: 'Something went wrong. Try again.' }, { status: 500, headers });
  }
}
