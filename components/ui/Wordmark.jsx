import { hero } from "@/lib/copy";

/**
 * The "Antici" (roman bone) + "pation" (italic wine) split treatment.
 * Sizing is controlled entirely by the caller via className font-size.
 */
export function Wordmark({ className = "", as: Tag = "span" }) {
  return (
    <Tag className={`font-serif font-medium leading-none ${className}`}>
      <span className="text-bone">{hero.titleRoman}</span>
      <span className="italic text-wine">{hero.titleItalic}</span>
    </Tag>
  );
}
