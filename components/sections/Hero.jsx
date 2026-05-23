import Image from "next/image";
import { hero } from "@/lib/copy";
import { BLUR_DATA_URL } from "@/lib/blur";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100vh] min-h-[100dvh] flex-col justify-center overflow-hidden px-6 py-28 sm:px-12"
    >
      {/* Full-bleed drifting background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/balcony.png"
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover brightness-[0.7] contrast-[1.05] motion-safe:animate-hero-drift"
        />
        {/* Heavier gradient on the left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div className="relative max-w-3xl">
        <p className="flex items-center gap-4 font-sans text-[11px] font-medium uppercase tracking-eyebrow text-gold">
          <span aria-hidden className="h-px w-8 bg-gold" />
          {hero.eyebrow}
        </p>

        <h1 className="mt-6 font-serif font-medium leading-[0.9] text-[clamp(64px,14vw,180px)]">
          <span className="text-bone">{hero.titleRoman}</span>
          <span className="italic text-wine">{hero.titleItalic}</span>
        </h1>

        <p className="mt-6 font-serif text-2xl leading-snug text-bone-2 sm:text-3xl">
          {hero.hookLine1}
          <br />
          <span className="italic text-wine">{hero.hookLine2}</span>
        </p>
      </div>

      {/* Scroll cue */}
      <a
        href="#prologue"
        aria-label={hero.scrollCue}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-sans text-[10px] uppercase tracking-[0.3em] text-smoke no-underline motion-safe:animate-scroll-pulse"
      >
        {hero.scrollCue}
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden>
          <path
            d="M7 1v18m0 0l-5-5m5 5l5-5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </a>
    </section>
  );
}
