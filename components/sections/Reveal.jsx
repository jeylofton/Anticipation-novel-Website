import Image from "next/image";
import { reveal } from "@/lib/copy";
import { BLUR_DATA_URL } from "@/lib/blur";
import { SectionTag } from "@/components/ui/SectionTag";
import { CtaLink } from "@/components/ui/CtaLink";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Reveal() {
  return (
    <section className="bg-ink">
      <div className="grid items-center gap-0 lg:grid-cols-2">
        {/* Image — bleeds into the text side on desktop */}
        <div className="relative h-[60vh] min-h-[420px] lg:h-[80vh]">
          <Image
            src="/images/envelope.png"
            alt={reveal.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink" />
        </div>

        {/* Text */}
        <RevealOnScroll className="px-6 py-20 sm:px-12 lg:py-24 lg:pr-16">
          <SectionTag>{reveal.tag}</SectionTag>
          <h2 className="mt-6 max-w-xl font-serif text-[clamp(28px,4vw,46px)] italic leading-tight text-bone">
            {reveal.headline}
          </h2>
          <div className="mt-8 max-w-xl space-y-5 font-serif text-lg leading-relaxed text-bone-2">
            {reveal.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <CtaLink
            href="#invitation"
            location="reveal"
            className="mt-8 inline-flex items-center gap-2 font-sans text-[13px] uppercase tracking-[0.18em] text-wine-soft no-underline transition-colors hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
          >
            {reveal.ctaLink} <span aria-hidden>→</span>
          </CtaLink>
        </RevealOnScroll>
      </div>
    </section>
  );
}
