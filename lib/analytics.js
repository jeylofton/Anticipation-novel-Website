/**
 * Plausible event helpers.
 *
 * Plausible is loaded as a script in app/layout.jsx and exposes window.plausible.
 * These helpers are safe to call on the server or before the script loads —
 * they no-op when window.plausible is unavailable.
 *
 * Known events: signup_submitted, signup_success, signup_error ({ reason }),
 * cta_clicked ({ location: "topbar" | "reveal" | "last_door" }), scroll_depth_75.
 */

export function track(event, props) {
  if (typeof window === "undefined" || typeof window.plausible !== "function") {
    return;
  }
  window.plausible(event, props ? { props } : undefined);
}
