"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Fades + lifts children into view once, the first time they enter the viewport.
 * Powered by Framer Motion's whileInView. Respects prefers-reduced-motion
 * (renders immediately with no transform).
 *
 * Props:
 *   as       — "div" (default) or "section"
 *   delayMs  — stagger delay in milliseconds
 */
export function RevealOnScroll({
  children,
  className = "",
  delayMs = 0,
  as = "div",
}) {
  const reduce = useReducedMotion();
  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: delayMs / 1000,
      }}
    >
      {children}
    </MotionTag>
  );
}
