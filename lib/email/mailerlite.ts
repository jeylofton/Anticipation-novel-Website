import type { EmailProvider, SubscribeResult, Subscriber } from "./types";

/**
 * MailerLite adapter — hosted-form (JSONP) endpoint.
 *
 * Posts server-side to the same endpoint a MailerLite embedded form uses:
 *   https://assets.mailerlite.com/jsonp/{accountId}/forms/{formId}/subscribe
 *
 * Doing it server-side (rather than from the browser) means no CORS dance, the
 * honeypot + rate limiter still apply, and we read the real HTTP status so the
 * success/error states are trustworthy.
 *
 * Reads MAILERLITE_ACCOUNT_ID and MAILERLITE_FORM_ID from the environment.
 * These IDs are not secret (they're visible in any embedded form).
 *
 * The Prologue PDF is delivered by the automation / autoresponder you attach to
 * this form inside MailerLite — we don't serve the PDF ourselves.
 */

function getConfig(): { accountId: string; formId: string } | null {
  const accountId = process.env.MAILERLITE_ACCOUNT_ID;
  const formId = process.env.MAILERLITE_FORM_ID;
  if (!accountId || !formId) return null;
  return { accountId, formId };
}

export const mailerlite: EmailProvider = {
  async subscribe({ email }: Subscriber): Promise<SubscribeResult> {
    const config = getConfig();
    if (!config) {
      return {
        ok: false,
        error: "Email service is not configured.",
        detail: "Missing MAILERLITE_ACCOUNT_ID or MAILERLITE_FORM_ID.",
      };
    }

    const url = `https://assets.mailerlite.com/jsonp/${config.accountId}/forms/${config.formId}/subscribe`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          "fields[email]": email,
          "ml-submit": "1",
          anticsrf: "true",
        }),
        cache: "no-store",
      });

      const text = await res.text().catch(() => "");
      let payload: { success?: boolean } | null = null;
      try {
        payload = text ? (JSON.parse(text) as { success?: boolean }) : null;
      } catch {
        payload = null;
      }

      if (!res.ok || payload?.success === false) {
        return {
          ok: false,
          error: "We couldn't add you just now. Please try again.",
          detail: `MailerLite responded ${res.status}: ${text.slice(0, 500)}`,
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
