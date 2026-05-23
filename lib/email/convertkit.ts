import type { EmailProvider, SubscribeResult, Subscriber } from "./types";

/**
 * ConvertKit (Kit) adapter.
 *
 * Reads CONVERTKIT_API_KEY and CONVERTKIT_FORM_ID from the environment.
 * The Prologue PDF is delivered by ConvertKit's incentive email / Visual
 * Automation attached to the form — we do not serve the PDF ourselves.
 *
 * To swap ESPs: write a sibling module (e.g. beehiiv.ts) that exports an
 * object satisfying EmailProvider, then change the import in
 * app/api/subscribe/route.ts. Nothing else changes.
 */

const API_BASE = "https://api.convertkit.com/v3";

function getConfig(): { apiKey: string; formId: string } | null {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;
  if (!apiKey || !formId) return null;
  return { apiKey, formId };
}

export const convertkit: EmailProvider = {
  async subscribe({ email }: Subscriber): Promise<SubscribeResult> {
    const config = getConfig();
    if (!config) {
      return {
        ok: false,
        error: "Email service is not configured.",
        detail: "Missing CONVERTKIT_API_KEY or CONVERTKIT_FORM_ID.",
      };
    }

    try {
      const res = await fetch(`${API_BASE}/forms/${config.formId}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: config.apiKey, email }),
        // No caching on a mutation.
        cache: "no-store",
      });

      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        return {
          ok: false,
          error: "We couldn't add you just now. Please try again.",
          detail: `ConvertKit responded ${res.status}: ${detail.slice(0, 500)}`,
        };
      }

      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: "We couldn't reach the email service. Please try again.",
        detail: err instanceof Error ? err.message : String(err),
      };
    }
  },
};
