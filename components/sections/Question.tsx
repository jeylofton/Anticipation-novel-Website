import { question } from "@/lib/copy";
import { EmphasizedText } from "@/components/ui/EmphasizedText";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Question() {
  return (
    <section id="prologue" className="bg-ink px-6 py-32 sm:py-40">
      <RevealOnScroll className="mx-auto max-w-prose text-center">
        <p className="font-sans text-[11px] uppercase tracking-eyebrow text-gold">
          {question.eyebrow}
        </p>
        <blockquote className="mt-8 font-serif text-[clamp(26px,4.5vw,40px)] italic leading-snug text-bone">
          <EmphasizedText text={question.quote} />
        </blockquote>
        <p className="mt-10 font-sans text-[11px] uppercase tracking-[0.25em] text-smoke">
          {question.attribution}
        </p>
      </RevealOnScroll>
    </section>
  );
}
