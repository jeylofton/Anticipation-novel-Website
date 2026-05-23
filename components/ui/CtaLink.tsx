"use client";

import { track, type CtaLocation } from "@/lib/analytics";

/**
 * Anchor that fires a typed cta_clicked event before navigating to the target.
 */
export function CtaLink({
  href,
  location,
  children,
  className = "",
}: {
  href: string;
  location: CtaLocation;
  children: React.ReactNode;
  className?: string;
}) {
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
