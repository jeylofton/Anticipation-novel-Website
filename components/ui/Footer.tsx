import { Wordmark } from "./Wordmark";
import { footer } from "@/lib/copy";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink px-6 py-16 text-center">
      <Wordmark className="text-3xl tracking-wide" />
      <p className="mt-5 font-sans text-[12px] uppercase tracking-[0.2em] text-smoke">
        {footer.line}
      </p>
    </footer>
  );
}
