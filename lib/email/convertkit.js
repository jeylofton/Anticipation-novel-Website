/**
 * ConvertKit (Kit) adapter — kept as a reference for swapping ESPs.
 *
 * An email provider adapter is any object with an async `subscribe({ email })`
 * method that resolves to either { ok: true } or
 * { ok: false, error, detail? }. `error` is shown to the user; `detail` is
 * logged server-side only.
 *
 * Reads CONVERTKIT_API_KEY and CONVERTKIT_FORM_ID from the environment.
 * The Prologue PDF is delivered by ConvertKit's incentive email / Visual
 * Automation attached to the form — we do not serve the PDF ourselves.
 */

const API_BASE = "https://api.convertkit.com/v3";

function getConfig() {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;
  if (!apiKey || !formId) return null;
  return { apiKey, formId };
}

export const convertkit = {
  async subscribe({ email }) {
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
