/**
 * Tiny in-memory rate limiter keyed by IP+route. Good enough for low-volume
 * marketing/inquiry endpoints; swap for Upstash Redis in production if the
 * site is multi-instance.
 */

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetMs: number;
};

export function rateLimit({
  key,
  limit,
  windowMs
}: {
  key: string;
  limit: number;
  windowMs: number;
}): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetMs: windowMs };
  }

  existing.count += 1;
  const remaining = Math.max(0, limit - existing.count);
  const resetMs = Math.max(0, existing.resetAt - now);
  return { ok: existing.count <= limit, remaining, resetMs };
}

export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
