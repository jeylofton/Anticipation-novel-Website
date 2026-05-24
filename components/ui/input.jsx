import * as React from "react";

import { cn } from "@/lib/utils";

// forwardRef so react-hook-form's register() ref reaches the native input
// (React 18 does not pass `ref` through as a normal prop).
const Input = React.forwardRef(function Input({ className, type, ...props }, ref) {
  return (
    <input
      type={type}
      ref={ref}
      data-slot="input"
      className={cn(
        "flex w-full rounded-sm border border-input bg-ink/60 px-4 py-3.5 font-sans text-[15px] text-bone outline-none transition-colors placeholder:text-smoke/70 focus:border-wine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});

export { Input };
