import { Fragment } from "react";

/**
 * Renders copy that uses {em} ... {/em} markers, highlighting the wrapped
 * phrases in wine. Keeps the highlight styling out of lib/copy.ts so Jey
 * edits plain text.
 */
export function EmphasizedText({ text }: { text: string }) {
  const parts = text.split(/(\{em\}.*?\{\/em\})/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\{em\}(.*?)\{\/em\}$/);
        if (match) {
          return (
            <span key={i} className="text-wine">
              {match[1]}
            </span>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
