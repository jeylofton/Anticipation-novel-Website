/**
 * The orange uppercase eyebrow with a leading hairline.
 * Used as the small label above section headlines.
 */
export function SectionTag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-3.5 font-sans text-[11px] font-medium uppercase tracking-eyebrow text-ember ${className}`}
    >
      <span aria-hidden className="h-px w-8 bg-ember" />
      {children}
    </span>
  );
}
