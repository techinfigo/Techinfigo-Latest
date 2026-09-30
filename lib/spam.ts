/**
 * Spam screening for public form submissions. NODE RUNTIME ONLY (server).
 *
 * Every submission gets one of three verdicts:
 *   - 'reject': certainly a bot (failed the invisible check, filled the hidden
 *     trap, or submitted faster than a person can). Nothing is stored and the
 *     bot is told "ok" so it learns nothing.
 *   - 'spam':   probably junk (bad phone number, links in the name, gibberish).
 *     Stored, but marked spam so it never mixes with real enquiries.
 *   - 'ok':     a real enquiry.
 */

export type Verdict = { verdict: 'ok' | 'spam' | 'reject'; reasons: string[] };

const TURNSTILE_VERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/** Faster than this from page open to submit is not a human. */
const MIN_FILL_MS = 3000;

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  if (typeof token !== 'string' || !token) return false;
  try {
    const response = await fetch(TURNSTILE_VERIFY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY ?? '',
        response: token,
        remoteip: ip,
      }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await response.json().catch(() => ({}))) as { success?: boolean };
    return data.success === true;
  } catch {
    // If Cloudflare itself is unreachable, do not lose a possibly real lead:
    // the remaining checks still apply and anything odd is marked spam.
    return true;
  }
}

/** Digits only; accepts +91 / 91 / 0 prefixes. Null when not an Indian mobile. */
export function normaliseIndianMobile(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  if (!/^[6-9]\d{9}$/.test(digits)) return null;
  // 9999999999, 9876543210-style patterns people type to skip the field.
  if (/^(\d)\1{9}$/.test(digits) || digits === '9876543210' || digits === '9123456789') return null;
  return digits;
}

const LINK = /(https?:\/\/|www\.|\.(com|ru|xyz|top|info|biz)\b|<a\s)/i;

/** Long runs without vowels, or random-case strings like "sDfKjhQwe". */
function looksLikeGibberish(text: string): boolean {
  const t = text.trim();
  if (t.length < 2) return true;
  if (/[bcdfghjklmnpqrstvwxz]{6,}/i.test(t.replace(/\s/g, ''))) return true;
  const letters = t.replace(/[^a-z]/gi, '');
  if (letters.length >= 8) {
    const switches = letters.split('').filter((c, i, a) => i > 0 && (c === c.toUpperCase()) !== (a[i - 1] === a[i - 1].toUpperCase())).length;
    if (switches / letters.length > 0.45) return true;
  }
  return false;
}

export async function screen(
  body: Record<string, unknown>,
  ip: string,
  fields: { name: string; phone: string | null; businessName: string | null; message: string | null },
): Promise<Verdict> {
  // 1. Hidden trap field: people never see it, bots fill it.
  if (typeof body._gotcha === 'string' && body._gotcha.trim() !== '') {
    return { verdict: 'reject', reasons: ['bot-trap'] };
  }

  // 2. Every form on the site reports how long the page was open. A request
  //    without it did not come from the website at all (a script posting
  //    straight to the API), and one faster than a person can type is a bot.
  if (typeof body._elapsedMs !== 'number') {
    return { verdict: 'reject', reasons: ['not-from-website'] };
  }
  if (body._elapsedMs < MIN_FILL_MS) {
    return { verdict: 'reject', reasons: ['too-fast'] };
  }

  const reasons: string[] = [];

  // 3. Invisible Cloudflare check, once it is set up. A token that fails is a
  //    bot; a missing token can also be a real person whose browser blocked
  //    Cloudflare, so that is kept, but in the spam folder.
  if (isTurnstileConfigured()) {
    if (typeof body._turnstile !== 'string' || !body._turnstile) {
      reasons.push('bot-check-missing');
    } else if (!(await verifyTurnstile(body._turnstile, ip))) {
      return { verdict: 'reject', reasons: ['bot-check-failed'] };
    }
  }

  // 4. Content checks: stored, but marked spam.
  if (fields.phone !== null && !normaliseIndianMobile(fields.phone)) reasons.push('invalid-phone');
  const text = [fields.name, fields.businessName ?? '', fields.message ?? ''].join(' ');
  if (LINK.test(fields.name) || LINK.test(fields.businessName ?? '')) reasons.push('link-in-name');
  if (looksLikeGibberish(fields.name)) reasons.push('gibberish-name');
  if (/(crypto|bitcoin|casino|loan approval|seo backlinks|viagra)/i.test(text)) reasons.push('spam-words');

  return reasons.length ? { verdict: 'spam', reasons } : { verdict: 'ok', reasons: [] };
}
