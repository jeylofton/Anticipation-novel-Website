import Image from "next/image";
import { about } from "@/lib/copy";
import { SectionTag } from "@/components/ui/SectionTag";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function About() {
  return (
    <section className="bg-night-2/40 px-6 py-28 sm:py-36">
      <RevealOnScroll className="mx-auto grid max-w-4xl items-center gap-12 md:grid-cols-[260px_1fr]">
        <div className="mx-auto w-full max-w-[260px]">
          <div className="relative aspect-square overflow-hidden rounded-full shadow-[0_20px_60px_-20px_rgba(125,32,32,0.22)]">
            <Image
              src="/images/author.jpeg"
              alt={about.portraitAlt}
              fill
              sizes="260px"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <SectionTag>{about.tag}</SectionTag>
          <h2 className="mt-6 font-serif text-[clamp(26px,3.5vw,40px)] italic leading-tight text-bone">
            {about.headline}
          </h2>
          <div className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-bone-2">
            {about.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <p className="mt-6 font-serif text-xl italic text-wine-soft">
            {about.signature}
          </p>
        </div>
      </RevealOnScroll>
    </section>
  );
}
