/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Good enough for a single-instance landing page (max 5 requests / minute / IP).
 * On serverless this resets per cold start and is per-instance — acceptable for
 * a low-traffic signup form. For stronger guarantees, swap in Upstash Redis.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function rateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return { allowed: false };
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return { allowed: true };
}
