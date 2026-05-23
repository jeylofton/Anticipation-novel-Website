// One-off: generate cinematic vertical-gradient PNG placeholders at the exact
// paths the site expects. Replace these files with real photos (same names)
// and no code changes are needed. Safe to delete this script afterward.
import zlib from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "images");
mkdirSync(OUT, { recursive: true });

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
  }
  return (~c) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

// Vertical gradient between two [r,g,b] colors, with a faint horizontal vignette.
function gradientPng(width, height, top, bottom) {
  const raw = Buffer.alloc((width * 3 + 1) * height);
  let p = 0;
  for (let y = 0; y < height; y++) {
    raw[p++] = 0; // filter: none
    const t = y / (height - 1);
    for (let x = 0; x < width; x++) {
      const vig = 1 - 0.18 * Math.abs(x / (width - 1) - 0.5) * 2;
      for (let c = 0; c < 3; c++) {
        const v = top[c] + (bottom[c] - top[c]) * t;
        raw[p++] = Math.max(0, Math.min(255, Math.round(v * vig)));
      }
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: truecolor
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const ink = [10, 14, 20];
const night = [20, 26, 35];
const night2 = [26, 33, 44];
const copper = [80, 30, 24];
const ember = [60, 36, 28];

const files = [
  ["balcony.png", 1920, 1280, [34, 40, 52], [10, 13, 19]],
  ["envelope.png", 1200, 1400, night2, ink],
  ["divider.png", 1920, 600, night, ink],
  ["ring.png", 1920, 1280, [40, 26, 22], ink],
  ["og-image.png", 1200, 630, [34, 40, 52], [12, 16, 22]],
];

for (const [name, w, h, top, bottom] of files) {
  writeFileSync(join(OUT, name), gradientPng(w, h, top, bottom));
  console.log("wrote", name, `${w}x${h}`);
}
