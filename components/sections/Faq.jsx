import { ChevronDown } from "lucide-react";
import { faq } from "@/lib/copy";
import { SectionTag } from "@/components/ui/SectionTag";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// FAQ structured data — can earn FAQ rich results in Google. Built from the
// same copy in lib/copy.js so it never drifts out of sync.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  return (
    <section id="faq" className="bg-ink px-6 py-28 sm:py-36">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <RevealOnScroll className="mx-auto max-w-[680px]">
        <div className="text-center">
          <SectionTag>{faq.eyebrow}</SectionTag>
          <h2 className="mt-6 font-serif text-[clamp(28px,4vw,42px)] italic leading-tight text-bone">
            {faq.heading}
          </h2>
        </div>

        <div className="mt-10 border-y border-white/10">
          {faq.items.map((item, i) => (
            <details
              key={i}
              className="group border-b border-white/10 last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl text-bone transition-colors hover:text-bone-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <ChevronDown
                  className="size-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="-mt-1 pb-6 pr-10 font-sans text-[15px] leading-relaxed text-bone-2">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
