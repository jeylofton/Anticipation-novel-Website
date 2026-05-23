"use client";

import { track } from "@/lib/analytics";

/**
 * Anchor that fires a cta_clicked event before navigating to the target.
 * `location` is one of "topbar" | "reveal" | "last_door".
 */
export function CtaLink({ href, location, children, className = "" }) {
  return (
    <a
      href={href}
      onClick={() => track("cta_clicked", { location })}
      className={className}
    >
      {children}
    </a>
  );
}
