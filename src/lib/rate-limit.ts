/**
 * Lightweight in-memory rate limiter (fixed window, keyed by IP + action).
 *
 * NOTE: This lives in process memory, so on a multi-instance / serverless host
 * (e.g. Vercel) each instance keeps its own counters and they reset on cold
 * start. That is enough to blunt casual brute-force / spam from a single client,
 * but for strong guarantees across instances move this to a shared store
 * (Upstash Redis, Supabase, etc.). It is defense-in-depth, not the only control:
 * the admin password strength is the primary protection for login.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 10_000; // safety cap so the map can't grow unbounded

export type RateLimitResult = { ok: boolean; retryAfter: number };

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now > existing.resetAt) {
    if (buckets.size >= MAX_KEYS) {
      // Drop expired entries before inserting a new one.
      for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (existing.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }

  existing.count += 1;
  return { ok: true, retryAfter: 0 };
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") || "unknown";
}
