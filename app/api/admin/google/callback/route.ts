import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, createSession, sessionCookieOptions } from '../../../../../lib/auth';
import { OAUTH_COOKIE, finishLogin, safeNext, type OAuthState } from '../../../../../lib/google-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Google sends the visitor back here after they pick an account. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const cookieStore = await cookies();
  const fail = (reason: string) => {
    const response = NextResponse.redirect(new URL(`/admin/login?error=${reason}`, url.origin));
    response.cookies.delete({ name: OAUTH_COOKIE, path: '/api/admin/google' });
    return response;
  };

  // The visitor pressed "Cancel" on Google's screen.
  if (url.searchParams.get('error')) return fail('cancelled');

  let saved: OAuthState | null = null;
  try {
    saved = JSON.parse(cookieStore.get(OAUTH_COOKIE)?.value ?? 'null');
  } catch {
    saved = null;
  }

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  // A missing or mismatched state means this response did not start from our
  // own sign-in button (or took longer than 10 minutes), so it is refused.
  if (!saved || !code || !state || state !== saved.state) return fail('expired');

  const result = await finishLogin(url.origin, code, saved.verifier);
  if (result.ok === false) return fail(result.reason);

  const token = await createSession(result.email);
  const response = NextResponse.redirect(new URL(safeNext(saved.next), url.origin));
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  response.cookies.delete({ name: OAUTH_COOKIE, path: '/api/admin/google' });
  return response;
}
