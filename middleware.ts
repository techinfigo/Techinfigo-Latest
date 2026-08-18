import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, readSession } from './lib/auth';

const LOGIN_PATH = '/admin/login';

/**
 * Gate for the whole /admin tree.
 *
 * Only lib/auth.ts is imported here — it is jose-only and Edge-safe. Importing
 * lib/auth-node.ts (or anything reaching node:crypto) would break the build.
 */
export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const session = await readSession(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === LOGIN_PATH) {
    // Already signed in — no reason to show the form again.
    if (session) return NextResponse.redirect(new URL('/admin', request.url));
    return NextResponse.next();
  }

  if (!session) {
    const url = new URL(LOGIN_PATH, request.url);
    // Preserve where they were heading so login can send them back.
    url.searchParams.set('next', `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
