// node scripts/icons.mjs — exports the AB monogram on obsidian as app/icon.png + app/apple-icon.png (§4.2)
import sharp from "sharp";
const svg = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 40 40">
  <rect width="40" height="40" fill="#0A0B0D"/>
  <circle cx="20" cy="20" r="15.5" fill="none" stroke="#C9A96A" stroke-width="0.7"/>
  <text x="20" y="24.6" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="13" letter-spacing="0.4" fill="#F4F1EA">AB</text>
</svg>`;
await sharp(Buffer.from(svg(512))).png().toFile("app/icon.png");
await sharp(Buffer.from(svg(180))).png().toFile("app/apple-icon.png");
console.log("icons written");
