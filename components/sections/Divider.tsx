import Image from "next/image";
import { divider } from "@/lib/copy";
import { BLUR_DATA_URL } from "@/lib/blur";

export function Divider() {
  return (
    <section
      aria-hidden
      className="relative h-[240px] w-full overflow-hidden bg-ink sm:h-[380px]"
    >
      <Image
        src="/images/divider.png"
        alt={divider.imageAlt}
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover"
      />
      {/* Fade to ink at top and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
    </section>
  );
}
