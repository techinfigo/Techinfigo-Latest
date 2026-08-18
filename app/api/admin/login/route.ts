import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, createSession, sessionCookieOptions } from '../../../../lib/auth';
import { verifyPassword, isAdminPasswordConfigured } from '../../../../lib/auth-node';
import { clientKey, rateLimit, resetRateLimit } from '../../../../lib/rate-limit';

// verifyPassword uses node:crypto — this must not run on the Edge.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  const key = `login:${clientKey(request)}`;
  const limit = rateLimit(key, MAX_ATTEMPTS, WINDOW_MS);

  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'too many attempts, try again later' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'admin password is not configured on the server' },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!verifyPassword(password)) {
    // Same message and status for wrong password and malformed body, so the
    // response never tells an attacker which part they got right.
    return NextResponse.json({ ok: false, error: 'invalid credentials' }, { status: 401 });
  }

  const token = await createSession();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, sessionCookieOptions);

  // One correct password clears the counter for this client.
  resetRateLimit(key);

  return NextResponse.json({ ok: true });
}
