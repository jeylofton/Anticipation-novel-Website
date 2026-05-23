import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex w-full rounded-sm border border-input bg-ink/60 px-4 py-3.5 font-sans text-[15px] text-bone outline-none transition-colors placeholder:text-smoke/70 focus:border-wine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
