"use client";

import { Wordmark } from "./Wordmark";
import { Button } from "./button";
import { nav } from "@/lib/copy";
import { track } from "@/lib/analytics";

export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-ink/85 to-transparent px-5 py-4 backdrop-blur-[2px] sm:px-8 sm:py-[18px]">
      <a href="#top" className="flex items-baseline gap-3 no-underline">
        <Wordmark className="text-lg tracking-wide" />
        <span className="hidden font-sans text-[10px] uppercase tracking-[0.22em] text-smoke sm:inline">
          {nav.tagline}
        </span>
      </a>
      <Button
        asChild
        variant="ghost"
        className="hidden h-auto rounded-sm px-4 py-2 text-[11px] uppercase tracking-[0.18em] no-underline min-[480px]:inline-flex"
      >
        <a
          href="#invitation"
          onClick={() => track("cta_clicked", { location: "topbar" })}
        >
          {nav.cta}
        </a>
      </Button>
    </header>
  );
}
