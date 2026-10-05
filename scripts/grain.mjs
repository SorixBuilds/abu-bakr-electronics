// node scripts/grain.mjs — generates the 200×200 film grain tile (A-17)
import sharp from "sharp";
const s = 200, buf = Buffer.alloc(s * s * 4);
for (let i = 0; i < s * s; i++) { const v = Math.random() * 255; buf.set([v, v, v, 255], i * 4); }
await sharp(buf, { raw: { width: s, height: s, channels: 4 } }).png().toFile("public/images/grain.png");
