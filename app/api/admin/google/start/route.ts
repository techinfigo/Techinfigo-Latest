import { NextResponse } from 'next/server';
import { OAUTH_COOKIE, OAUTH_COOKIE_MAX_AGE, beginLogin, isGoogleLoginConfigured } from '../../../../../lib/google-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Sends the visitor to Google's account picker. */
export async function GET(request: Request) {
  const url = new URL(request.url);

  if (!isGoogleLoginConfigured()) {
    return NextResponse.redirect(new URL('/admin/login?error=not-configured', url.origin));
  }

  const { url: googleUrl, cookie } = beginLogin(url.origin, url.searchParams.get('next') ?? '/admin');
  const response = NextResponse.redirect(googleUrl);
  response.cookies.set(OAUTH_COOKIE, JSON.stringify(cookie), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/api/admin/google',
    maxAge: OAUTH_COOKIE_MAX_AGE,
  });
  return response;
}
