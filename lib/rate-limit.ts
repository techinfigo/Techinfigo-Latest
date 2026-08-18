/**
 * Minimal in-memory fixed-window rate limiter for the login endpoint.
 *
 * Deliberately not Redis: this guards one password field on one admin panel.
 * The tradeoff is that each serverless instance keeps its own counter and the
 * window resets on cold start, so it raises the cost of brute force without
 * being an absolute barrier. The scrypt hash is what actually protects the
 * password; this just stops a naive script.
 */
type Window = { count: number; resetAt: number };

const buckets = new Map<string, Window>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  const allowed = existing.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - existing.count),
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

/** Called after a successful login so one good password clears the counter. */
export function resetRateLimit(key: string): void {
  buckets.delete(key);
}

/**
 * Best-effort client IP. Behind Vercel/Cloudflare x-forwarded-for is set; the
 * fallback keeps local development working rather than bucketing everyone
 * under one key in production.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}
