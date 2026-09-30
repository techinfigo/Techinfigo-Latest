import { createHash, randomBytes } from 'node:crypto';

/**
 * "Sign in with Google" for the admin panel. NODE RUNTIME ONLY.
 *
 * Standard OAuth 2.0 authorization-code flow with PKCE, no extra library:
 *   1. /api/admin/google/start sends the visitor to Google with a random
 *      `state` and a PKCE challenge, both remembered in a short-lived cookie.
 *   2. Google sends them back to /api/admin/google/callback with a `code`.
 *   3. The callback swaps the code for an ID token by calling Google directly
 *      over TLS, checks the token belongs to this app, and lets in only the
 *      emails listed in ADMIN_ALLOWED_EMAILS.
 *
 * Because the ID token comes straight from Google's token endpoint over TLS
 * (not through the browser), its signature does not need a separate check
 * (OpenID Connect Core 1.0, section 3.1.3.7); issuer, audience, expiry and
 * email verification are still checked below.
 */

export const OAUTH_COOKIE = 'techinfigo_admin_oauth';
export const OAUTH_COOKIE_MAX_AGE = 10 * 60;

const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const ISSUERS = new Set(['accounts.google.com', 'https://accounts.google.com']);

/** Used when ADMIN_ALLOWED_EMAILS is not set. */
const DEFAULT_ALLOWED = ['thetechinfigo@gmail.com'];

export function isGoogleLoginConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function allowedEmails(): string[] {
  const raw = process.env.ADMIN_ALLOWED_EMAILS;
  const list = raw ? raw.split(',') : DEFAULT_ALLOWED;
  return list.map((e) => e.trim().toLowerCase()).filter(Boolean);
}

export function callbackUrl(origin: string): string {
  return `${origin}/api/admin/google/callback`;
}

/** Only same-origin relative paths, so ?next= can never become an open redirect. */
export function safeNext(next: string | null | undefined): string {
  return next && next.startsWith('/') && !next.startsWith('//') ? next : '/admin';
}

function base64url(bytes: Buffer): string {
  return bytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export type OAuthState = { state: string; verifier: string; next: string };

export function beginLogin(origin: string, next: string): { url: string; cookie: OAuthState } {
  const state = base64url(randomBytes(24));
  const verifier = base64url(randomBytes(48));
  const challenge = base64url(createHash('sha256').update(verifier).digest());

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? '',
    redirect_uri: callbackUrl(origin),
    response_type: 'code',
    scope: 'openid email',
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    prompt: 'select_account',
  });

  return { url: `${AUTH_URL}?${params}`, cookie: { state, verifier, next: safeNext(next) } };
}

export type LoginResult = { ok: true; email: string } | { ok: false; reason: string };

export async function finishLogin(origin: string, code: string, verifier: string): Promise<LoginResult> {
  const clientId = process.env.GOOGLE_CLIENT_ID ?? '';

  let idToken: string | undefined;
  try {
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        redirect_uri: callbackUrl(origin),
        grant_type: 'authorization_code',
        code_verifier: verifier,
      }),
      signal: AbortSignal.timeout(10000),
    });
    const data = (await response.json().catch(() => ({}))) as { id_token?: string };
    if (!response.ok) return { ok: false, reason: 'google' };
    idToken = data.id_token;
  } catch {
    return { ok: false, reason: 'google' };
  }
  if (!idToken) return { ok: false, reason: 'google' };

  let claims: Record<string, unknown>;
  try {
    const payload = idToken.split('.')[1];
    claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  } catch {
    return { ok: false, reason: 'google' };
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (!ISSUERS.has(String(claims.iss))) return { ok: false, reason: 'google' };
  if (claims.aud !== clientId) return { ok: false, reason: 'google' };
  if (typeof claims.exp !== 'number' || claims.exp < nowSeconds) return { ok: false, reason: 'google' };
  if (claims.email_verified !== true) return { ok: false, reason: 'unverified' };

  const email = String(claims.email ?? '').toLowerCase();
  if (!email || !allowedEmails().includes(email)) return { ok: false, reason: 'not-allowed' };

  return { ok: true, email };
}
