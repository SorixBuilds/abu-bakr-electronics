/**
 * V3 §3.3 — turns the photo manifest into finished product cutouts.
 *
 *   npm run prepare-cutouts            (all assets that have a "source")
 *   npm run prepare-cutouts -- ac-1    (one asset)
 *
 * Per asset (all coordinates are % of the source image, before any flip):
 *   mask      "model"   → alpha from public/client-photos/cutouts/<id>.png, clipped to "polygon" if given
 *             "polygon" → alpha from "polygon" only (crisp edges for box-shaped appliances)
 *   radius    corner rounding for "polygon", % of the long edge
 *   retouch   [[x, y, w, h], …] areas (logos, stickers) rebuilt from the surrounding finish
 *   screen    [x, y, w, h] TV screen area filled with the house Bordeaux screen
 *   grade     { saturation, brightness } — unifies different cameras to one neutral look
 *   flip      mirror horizontally so every product in a category faces the same way
 * Output: trimmed, 6% padding, 1600px long edge → public/<image> (e.g. /products/ac-1-cut.png)
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const pub = path.join(root, "public");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "data/photo-manifest.json"), "utf8"));
const only = process.argv.slice(2);

const assets = manifest.assets.filter((a) => a.source && (!only.length || only.includes(a.id)));

for (const a of assets) {
  const src = path.join(pub, a.source);
  const { data, info } = await sharp(src).rotate().removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const px = (v, total) => Math.round((v / 100) * total);

  // RGB working copy
  const rgb = Buffer.from(data);

  for (const [x, y, w, h] of a.retouch ?? []) retouch(rgb, W, H, px(x, W), px(y, H), px(w, W), px(h, H));
  if (a.screen) paintScreen(rgb, W, px(a.screen[0], W), px(a.screen[1], H), px(a.screen[2], W), px(a.screen[3], H));
  grade(rgb, a.grade ?? {});

  // Alpha
  let alpha;
  if (a.mask === "polygon") {
    alpha = await polygonMask(a.polygon, a.radius ?? 0, W, H);
  } else {
    const cut = path.join(pub, "client-photos/cutouts", `${a.id}.png`);
    if (!fs.existsSync(cut)) throw new Error(`${a.id}: missing ${cut} (run the background remover or add a cutout)`);
    alpha = await sharp(cut).resize(W, H, { fit: "fill" }).extractChannel("alpha").raw().toBuffer();
    for (let i = 0; i < alpha.length; i++) alpha[i] = alpha[i] < 24 ? 0 : alpha[i] > 232 ? 255 : alpha[i];
    if (a.polygon) {
      const clip = await polygonMask(a.polygon, 0, W, H);
      for (let i = 0; i < alpha.length; i++) alpha[i] = Math.round((alpha[i] * clip[i]) / 255);
    }
  }

  const rgba = Buffer.alloc(W * H * 4);
  for (let i = 0, j = 0; i < W * H; i++, j += 3) {
    rgba[i * 4] = rgb[j];
    rgba[i * 4 + 1] = rgb[j + 1];
    rgba[i * 4 + 2] = rgb[j + 2];
    rgba[i * 4 + 3] = alpha[i];
  }

  let img = sharp(rgba, { raw: { width: W, height: H, channels: 4 } });
  if (a.flip) img = img.flop();
  const trimmed = await img.png().toBuffer().then((b) => sharp(b).trim({ threshold: 1 }).png().toBuffer({ resolveWithObject: true }));
  const pad = Math.round(Math.max(trimmed.info.width, trimmed.info.height) * 0.06);
  const out = path.join(pub, a.image);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(trimmed.data)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize(1600, 1600, { fit: "inside" })
    .png({ compressionLevel: 9, palette: false })
    .toFile(out);
  console.log(`✓ ${a.id.padEnd(12)} ${a.status.padEnd(9)} → public${a.image}`);
}

/** Rebuilds a rectangle from its borders: average of horizontal and vertical interpolation (keeps shading gradients). */
function retouch(buf, W, H, x0, y0, w, h) {
  const x1 = Math.min(W - 1, x0 + w), y1 = Math.min(H - 1, y0 + h);
  const L = Math.max(0, x0 - 2), R = Math.min(W - 1, x1 + 2), T = Math.max(0, y0 - 2), B = Math.min(H - 1, y1 + 2);
  const get = (x, y, c) => buf[(y * W + x) * 3 + c];
  const out = [];
  for (let y = y0; y <= y1; y++)
    for (let x = x0; x <= x1; x++) {
      const tx = (x - L) / (R - L), ty = (y - T) / (B - T);
      const v = [0, 1, 2].map((c) => {
        const hor = get(L, y, c) * (1 - tx) + get(R, y, c) * tx;
        const ver = get(x, T, c) * (1 - ty) + get(x, B, c) * ty;
        return Math.round((hor + ver) / 2);
      });
      out.push([x, y, v]);
    }
  for (const [x, y, v] of out) for (let c = 0; c < 3; c++) buf[(y * W + x) * 3 + c] = v[c];
}

/** House screen: deep ink with a Bordeaux bloom and a Cherry glow, plus a faint diagonal sheen. */
function paintScreen(buf, W, x0, y0, w, h) {
  const ink = [18, 10, 13], bord = [92, 15, 34], cherry = [200, 16, 46];
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const u = x / w, v = y / h;
      const g1 = Math.max(0, 1 - Math.hypot((u - 0.72) / 0.75, (v - 0.78) / 0.9)); // bordeaux bloom
      const g2 = Math.max(0, 1 - Math.hypot((u - 0.28) / 0.38, (v - 0.3) / 0.5)) ** 1.6; // cherry glow
      const sheen = Math.max(0, 1 - Math.abs(u + v * 0.6 - 0.55) / 0.08) * 0.05;
      const i = ((y0 + y) * W + (x0 + x)) * 3;
      for (let c = 0; c < 3; c++) {
        let val = ink[c] + (bord[c] - ink[c]) * g1 * 0.95;
        val += (cherry[c] - val) * g2 * 0.55;
        val += (255 - val) * sheen;
        buf[i + c] = Math.round(val);
      }
    }
}

function grade(buf, { saturation = 1, brightness = 1 }) {
  for (let i = 0; i < buf.length; i += 3) {
    const r = buf[i], g = buf[i + 1], b = buf[i + 2];
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    for (let c = 0; c < 3; c++) {
      const v = (l + (buf[i + c] - l) * saturation) * brightness;
      buf[i + c] = Math.max(0, Math.min(255, Math.round(v)));
    }
  }
}

async function polygonMask(poly, radiusPct, W, H) {
  const r = (radiusPct / 100) * Math.max(W, H);
  const pts = poly.map(([x, y]) => [(x / 100) * W, (y / 100) * H]);
  const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  // Inset by r, then stroke with round joins of width 2r → rounded corners on the original outline.
  const inset = r ? pts.map(([x, y]) => [x + Math.sign(cx - x) * r, y + Math.sign(cy - y) * r]) : pts;
  const d = inset.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ") + " Z";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="black"/><path d="${d}" fill="white" stroke="white" stroke-width="${2 * r}" stroke-linejoin="round"/></svg>`;
  return sharp(Buffer.from(svg)).blur(0.6).extractChannel(0).raw().toBuffer();
}
