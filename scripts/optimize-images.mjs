// One-off: re-encode the heavy source photos to sized WebP.
// Run: node scripts/optimize-images.mjs
import sharp from "sharp";
import { statSync } from "node:fs";
import { join } from "node:path";

const DIR = join(process.cwd(), "public", "images");

// [source, output, maxWidth, quality]
const jobs = [
  ["balcony.png", "balcony.webp", 1920, 72], // hero, darkened bg
  ["envelope.png", "envelope.webp", 1400, 80], // ~half-width panel
  ["divider.png", "divider.webp", 1920, 74], // full-width band
  ["ring.png", "ring.webp", 1920, 72], // full-bleed, darkened bg
  ["author.jpg", "author.webp", 640, 82], // small circular portrait
];

const kb = (p) => (statSync(p).size / 1024).toFixed(0) + " KB";

for (const [src, out, width, quality] of jobs) {
  const srcPath = join(DIR, src);
  const outPath = join(DIR, out);
  const before = kb(srcPath);
  await sharp(srcPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outPath);
  console.log(`${src} (${before})  ->  ${out} (${kb(outPath)})`);
}
