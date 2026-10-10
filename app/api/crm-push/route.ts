import { NextResponse } from 'next/server';
import { removeDevice, saveDevice, sendTest, verifyCrmUser } from '../../../lib/crm-push';
import { clientKey, rateLimit } from '../../../lib/rate-limit';

/**
 * Phone alerts for the CRM.
 *  POST   { idToken, token, origin, device }  → turn alerts on for this device
 *  POST ?test=1 { idToken, token }            → send a test alert to this device
 *  DELETE { idToken, token }                  → turn alerts off for this device
 *
 * Called from the CRM app (a different domain), so it answers CORS. No cookies
 * are used: every call is authorised by the CRM user's Firebase ID token.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function cors(request: Request): Record<string, string> {
  const origin = request.headers.get('origin');
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 204, headers: cors(request) });
}

async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  const body = await request.json().catch(() => null);
  return body && typeof body === 'object' ? (body as Record<string, unknown>) : null;
}

export async function POST(request: Request) {
  const headers = cors(request);
  const limit = rateLimit(`crm-push:${clientKey(request)}`, 30, 60 * 60 * 1000);
  if (!limit.allowed) return NextResponse.json({ ok: false, error: 'Too many requests.' }, { status: 429, headers });

  const body = await readBody(request);
  if (!body) return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400, headers });

  const email = await verifyCrmUser(body.idToken);
  if (!email) return NextResponse.json({ ok: false, error: 'Only the CRM owner can turn on alerts.' }, { status: 403, headers });

  try {
    if (new URL(request.url).searchParams.get('test') === '1') {
      const sent = typeof body.token === 'string' ? await sendTest(body.token) : 0;
      return NextResponse.json({ ok: sent > 0 }, { status: sent > 0 ? 200 : 404, headers });
    }
    const saved = await saveDevice(email, body.token, body.origin, body.device);
    return NextResponse.json({ ok: saved }, { status: saved ? 200 : 400, headers });
  } catch (error) {
    console.error('[crm-push] failed:', error);
    return NextResponse.json({ ok: false, error: 'Could not save alerts.' }, { status: 500, headers });
  }
}

export async function DELETE(request: Request) {
  const headers = cors(request);
  const body = await readBody(request);
  const email = body ? await verifyCrmUser(body.idToken) : null;
  if (!email) return NextResponse.json({ ok: false }, { status: 403, headers });
  await removeDevice(body!.token).catch(() => {});
  return NextResponse.json({ ok: true }, { headers });
}
