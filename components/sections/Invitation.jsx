"use client";

import { useState } from "react";
import { invitation } from "@/lib/copy";
import { SectionTag } from "@/components/ui/SectionTag";
import { SignupForm } from "@/components/ui/SignupForm";

export function Invitation() {
  const [done, setDone] = useState(false);

  return (
    <section id="invitation" className="bg-ink px-6 py-28 sm:py-36">
      <div className="relative mx-auto max-w-[560px] overflow-hidden rounded-md border border-white/10 bg-[linear-gradient(160deg,#1a212c,#141a23)] px-7 py-12 sm:px-12 sm:py-16">
        {/* 2px wine gradient line across the top */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-wine to-transparent"
        />

        {done ? (
          <div className="text-center motion-safe:animate-fade-up">
            <SectionTag className="text-smoke">
              {invitation.success.eyebrow}
            </SectionTag>
            <h2 className="mt-6 font-serif text-[clamp(28px,4vw,40px)] italic leading-tight text-bone">
              {invitation.success.headline}
            </h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-bone-2">
              {invitation.success.body}
            </p>
            <p className="mt-8 font-serif text-xl italic text-wine-soft">
              {invitation.success.signoff}
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <SectionTag>{invitation.eyebrow}</SectionTag>
              <h2 className="mt-6 font-serif text-[clamp(28px,4vw,42px)] italic leading-tight text-bone">
                {invitation.headline}
              </h2>
              <p className="mx-auto mt-5 max-w-md font-sans text-[15px] leading-relaxed text-bone-2">
                {invitation.sub}
              </p>
            </div>

            <ul className="mt-9 flex flex-wrap justify-center gap-x-8 gap-y-4 border-y border-white/10 py-6">
              {invitation.included.map((item) => (
                <li key={item.label} className="text-center">
                  <span className="block font-serif text-lg italic text-bone">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-sans text-[10px] uppercase tracking-[0.2em] text-smoke">
                    {item.meta}
                  </span>
                </li>
              ))}
            </ul>

            <SignupForm onSuccess={() => setDone(true)} />

            <p className="mt-4 text-center font-sans text-[12px] leading-relaxed text-smoke">
              {invitation.fineprint}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
