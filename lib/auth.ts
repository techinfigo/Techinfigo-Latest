import { SignJWT, jwtVerify } from 'jose';

/**
 * EDGE-SAFE. This module is imported by middleware.ts, which runs on the Edge
 * runtime. It must never import node:crypto, node:buffer or anything else
 * Node-only — not even behind a dynamic import, because Turbopack analyses the
 * module graph statically and a single node: specifier anywhere in the graph
 * breaks the Edge bundle. Password hashing lives in lib/auth-node.ts.
 */

export const SESSION_COOKIE = 'techinfigo_admin_session';

/** 12h: long enough for a working day, short enough that a stolen cookie expires. */
const SESSION_TTL_HOURS = 12;
export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_HOURS * 60 * 60;

export type SessionPayload = {
  sub: string;
};

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      'ADMIN_SESSION_SECRET is not set. Generate one with `npm run admin:hash -- "<password>"`.',
    );
  }
  if (secret.length < 32) {
    throw new Error(
      `ADMIN_SESSION_SECRET must be at least 32 characters (got ${secret.length}).`,
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(subject = 'admin'): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(subject)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_HOURS}h`)
    .sign(getSecret());
}

/**
 * Returns null rather than throwing on any failure — bad signature, expired
 * token, and also a missing or too-short secret. getSecret() is inside the try
 * deliberately: middleware calls this on every /admin request, and a
 * misconfigured secret should send the visitor to the login page, not return a
 * 500 that also makes the login page itself unreachable. createSession still
 * throws loudly, so the misconfiguration surfaces the moment someone signs in.
 */
export async function readSession(token: string | undefined | null): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ['HS256'] });
    if (typeof payload.sub !== 'string' || !payload.sub) return null;
    return { sub: payload.sub };
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_MAX_AGE_SECONDS,
};
