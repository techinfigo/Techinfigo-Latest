import { NextResponse } from 'next/server';
import { isCrmConfigured } from '../../../../lib/crm';
import { clientKey, rateLimit } from '../../../../lib/rate-limit';
import { PORTAL_COOKIE, login, portalCookie } from '../../../../lib/portal';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const H = { 'Cache-Control': 'no-store' };
  if (!isCrmConfigured()) return NextResponse.json({ ok: false, error: 'Abhi login band hai. Thodi der baad try karein.' }, { status: 503, headers: H });
  if (!rateLimit(`portallogin:${clientKey(request)}`, 10, 15 * 60 * 1000).allowed)
    return NextResponse.json({ ok: false, error: 'Bahut baar try ho gaya. 15 minute baad try karein, ya Techinfigo ko WhatsApp karein.' }, { status: 429, headers: H });
  const body = (await request.json().catch(() => null)) as { phone?: unknown; password?: unknown } | null;
  const token = await login(body?.phone, body?.password).catch((e) => {
    console.error('[portal login]', e);
    return null;
  });
  if (!token) return NextResponse.json({ ok: false, error: 'Mobile number ya password galat hai.' }, { status: 401, headers: H });
  const res = NextResponse.json({ ok: true }, { headers: H });
  res.cookies.set(PORTAL_COOKIE, token, portalCookie);
  return res;
}
