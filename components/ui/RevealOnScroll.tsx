"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + lifts children into view once when they enter the viewport.
 * Respects prefers-reduced-motion (renders immediately, no transform).
 */
export function RevealOnScroll({
  children,
  className = "",
  delayMs = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  as?: "div" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLElement>}
      data-visible={visible}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
      className={`motion-safe:translate-y-[30px] motion-safe:opacity-0 motion-safe:transition-[opacity,transform] motion-safe:duration-1000 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] data-[visible=true]:motion-safe:translate-y-0 data-[visible=true]:motion-safe:opacity-100 ${className}`}
    >
      {children}
    </Tag>
  );
}
