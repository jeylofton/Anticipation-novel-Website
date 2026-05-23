import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn/ui className helper: merge conditional + conflicting Tailwind classes. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
