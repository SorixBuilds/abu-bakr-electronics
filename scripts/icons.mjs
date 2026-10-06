// node scripts/icons.mjs — V3 §4.7 monogram: "AB" in a serif inside a Bordeaux circle with a champagne ring → app/icon.png + app/apple-icon.png
import sharp from "sharp";
const svg = (s, bg) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 40 40">
  ${bg ? `<rect width="40" height="40" fill="${bg}"/>` : ""}
  <circle cx="20" cy="20" r="${bg ? 17 : 20}" fill="#5C0F22"/>
  <circle cx="20" cy="20" r="${bg ? 15 : 17.5}" fill="none" stroke="#B89A62" stroke-width="0.6"/>
  <text x="20" y="25.4" text-anchor="middle" font-family="'Bodoni 72', Didot, Georgia, 'Times New Roman', serif" font-size="15" fill="#FFFFFF">AB</text>
</svg>`;
await sharp(Buffer.from(svg(512))).png().toFile("app/icon.png");
await sharp(Buffer.from(svg(180, "#F7F4F0"))).png().toFile("app/apple-icon.png");
console.log("icons written");
