import { NextResponse } from 'next/server';
import { PORTAL_COOKIE, portalCookie } from '../../../../lib/portal';

export const runtime = 'nodejs';

export async function POST() {
  const res = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  res.cookies.set(PORTAL_COOKIE, '', { ...portalCookie, maxAge: 0 });
  return res;
}
