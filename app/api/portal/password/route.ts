import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { rateLimit } from '../../../../lib/rate-limit';
import { PORTAL_COOKIE, changePassword, portalCookie, readPortal } from '../../../../lib/portal';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const H = { 'Cache-Control': 'no-store' };
  const session = await readPortal((await cookies()).get(PORTAL_COOKIE)?.value);
  if (!session) return NextResponse.json({ ok: false, error: 'Dobara login karein.' }, { status: 401, headers: H });
  if (!rateLimit(`portalpass:${session.clientId}`, 10, 60 * 60 * 1000).allowed) return NextResponse.json({ ok: false, error: 'Thodi der baad try karein.' }, { status: 429, headers: H });
  const body = (await request.json().catch(() => null)) as { old?: unknown; next?: unknown } | null;
  const r = await changePassword(session.clientId, String(body?.old ?? ''), String(body?.next ?? ''));
  if (r === 'wrong') return NextResponse.json({ ok: false, error: 'Purana password galat hai.' }, { status: 400, headers: H });
  if (r === 'weak') return NextResponse.json({ ok: false, error: 'Naya password kam se kam 6 letters ka rakhiye.' }, { status: 400, headers: H });
  const res = NextResponse.json({ ok: true }, { headers: H });
  res.cookies.set(PORTAL_COOKIE, r, portalCookie);
  return res;
}
