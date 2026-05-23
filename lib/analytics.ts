/**
 * Typed Plausible event helpers.
 *
 * Plausible is loaded as a script in app/layout.tsx and exposes window.plausible.
 * These helpers are safe to call on the server or before the script loads —
 * they no-op when window.plausible is unavailable.
 */

export type CtaLocation = "topbar" | "reveal" | "last_door";

type PlausibleEventMap = {
  signup_submitted: undefined;
  signup_success: undefined;
  signup_error: { reason: string };
  cta_clicked: { location: CtaLocation };
  scroll_depth_75: undefined;
};

type PlausibleFn = (
  event: string,
  options?: { props?: Record<string, string | number | boolean> },
) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

export function track<E extends keyof PlausibleEventMap>(
  event: E,
  ...args: PlausibleEventMap[E] extends undefined
    ? []
    : [props: PlausibleEventMap[E]]
): void {
  if (typeof window === "undefined" || typeof window.plausible !== "function") {
    return;
  }
  const props = args[0] as Record<string, string | number | boolean> | undefined;
  window.plausible(event, props ? { props } : undefined);
}
