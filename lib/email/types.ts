/**
 * ESP-agnostic types. The adapter contract below is what app/api/subscribe
 * depends on — swap convertkit.ts for beehiiv.ts or mailerlite.ts and the
 * route never changes.
 */

export interface Subscriber {
  email: string;
  /** Optional UTM / referrer context we may pass along to the ESP later. */
  referrer?: string;
}

export type SubscribeResult =
  | { ok: true }
  | { ok: false; error: string; /** Internal-only detail, never sent to client. */ detail?: string };

/**
 * Every email provider adapter implements this single function.
 * Keep provider-specific config (API keys, form IDs) inside the adapter module,
 * read from environment variables — not passed in from the route.
 */
export interface EmailProvider {
  subscribe(subscriber: Subscriber): Promise<SubscribeResult>;
}
