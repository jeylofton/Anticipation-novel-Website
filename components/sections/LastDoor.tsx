"use client";

import Image from "next/image";
import { lastDoor } from "@/lib/copy";
import { BLUR_DATA_URL } from "@/lib/blur";
import { track } from "@/lib/analytics";

export function LastDoor() {
  function goToForm() {
    track("cta_clicked", { location: "last_door" });
    const target = document.getElementById("invitation");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    // Focus the email input once the scroll settles (no-op if already submitted).
    const input = document.getElementById("signup-email");
    if (input) {
      window.setTimeout(() => input.focus({ preventScroll: true }), reduce ? 0 : 600);
    }
  }

  return (
    <section className="relative flex min-h-[100vh] min-h-[100dvh] items-center justify-center overflow-hidden px-6 text-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/ring.png"
          alt={lastDoor.imageAlt}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
      </div>

      <div className="relative max-w-2xl">
        <h2 className="font-serif text-[clamp(40px,7vw,84px)] font-medium leading-[0.95] text-bone">
          {lastDoor.headlineLine1}
          <br />
          <span className="italic text-ember">{lastDoor.headlineLine2}</span>
        </h2>
        <button
          type="button"
          onClick={goToForm}
          className="mt-10 rounded-sm border border-ember px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-ember transition-colors hover:bg-ember hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
        >
          {lastDoor.cta}
        </button>
      </div>
    </section>
  );
}
