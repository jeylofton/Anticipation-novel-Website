import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { reveal } from "@/lib/copy";
import { SectionTag } from "@/components/ui/SectionTag";
import { CtaLink } from "@/components/ui/CtaLink";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Reveal() {
  return (
    <section className="bg-ink">
      <div className="grid items-center gap-0 lg:grid-cols-2">
        {/* Transparent envelope cutout, floating on the dark scene */}
        <div className="relative h-[55vh] min-h-[360px] lg:h-[80vh]">
          <Image
            src="/images/envelope.png"
            alt={reveal.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-8 drop-shadow-[0_30px_55px_rgba(0,0,0,0.6)] sm:p-12"
          />
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
            className="mt-8 inline-flex items-center gap-2 font-sans text-[13px] uppercase tracking-[0.18em] text-wine-soft no-underline transition-colors hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
          >
            {reveal.ctaLink}
            <ArrowRight className="size-4" aria-hidden />
          </CtaLink>
        </RevealOnScroll>
      </div>
    </section>
  );
}
