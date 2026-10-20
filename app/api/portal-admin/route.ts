import { NextResponse } from 'next/server';
import { verifyCrmUser } from '../../../lib/crm-push';
import { isCrmConfigured } from '../../../lib/crm';
import { clientKey, rateLimit } from '../../../lib/rate-limit';
import { ackActions, isClientId, portalStatus, pullActions, setupPortal, syncPortal } from '../../../lib/portal';

/**
 * Client portal, CRM side (another domain: CORS; signed in with the CRM
 * user's Firebase ID token, no cookies).
 *  setup  { clientId, phone, password?, enabled }   create / update access
 *  sync   { clientId, snapshot }                      latest calendar, invoices…
 *  status {}                                          which clients have access
 *  pull   {}                                          client approvals / change requests
 *  ack    { ids }                                     remove pulled actions
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
  const bad = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status, headers });
  if (!isCrmConfigured()) return bad('Not set up.', 503);
  if (!rateLimit(`portaladmin:${clientKey(request)}`, 600, 60 * 60 * 1000).allowed) return bad('Too many requests.', 429);
  const text = await request.text().catch(() => '');
  if (!text || text.length > 400_000) return bad('Bad request.');
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text);
  } catch {
    return bad('Bad request.');
  }
  const user = await verifyCrmUser(body.idToken);
  if (!user) return bad('Please sign in to the CRM again.', 401);

  try {
    switch (body.action) {
      case 'setup': {
        const r = await setupPortal(user, body);
        return typeof r === 'string' ? bad(r) : NextResponse.json({ ok: true, portal: r }, { headers });
      }
      case 'sync':
        if (!isClientId(body.clientId)) return bad('Bad client.');
        return (await syncPortal(user, body.clientId, body.snapshot)) ? NextResponse.json({ ok: true }, { headers }) : bad('No portal for this client.', 404);
      case 'status':
        return NextResponse.json({ ok: true, portals: await portalStatus(user) }, { headers });
      case 'pull':
        return NextResponse.json({ ok: true, actions: await pullActions(user) }, { headers });
      case 'ack':
        await ackActions(user, body.ids);
        return NextResponse.json({ ok: true }, { headers });
      default:
        return bad('Bad request.');
    }
  } catch (error) {
    console.error('[portal-admin]', error);
    return bad('Something went wrong. Try again.', 500);
  }
}
