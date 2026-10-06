// V3 asset guard — runs before `npm run build` (see "prebuild" in package.json).
// 1. Every image/video in data/photo-manifest.json must exist in public/.
// 2. Every literal /images|/video|/products path in the source must exist too.
// 3. Nothing may point at the retired stock folders (V3 §11: no stock lifestyle/room photos anywhere).
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const manifest = JSON.parse(readFileSync("data/photo-manifest.json", "utf8"));
const refs = new Map(); // public path -> where it is referenced

for (const a of manifest.assets) refs.set(a.image, `photo-manifest: ${a.id} (${a.status})`);
for (const [k, v] of Object.entries(manifest.video?.hero ?? {})) if (typeof v === "string" && v.startsWith("/")) refs.set(v, `photo-manifest: video.hero.${k}`);
for (const s of manifest.shop ?? []) refs.set(`/${s.file}`, "photo-manifest: shop");

const ROOTS = ["data", "content", "components", "app", "lib"];
const LITERAL = /["'`](\/(?:images|video|products|client-photos)\/[^"'`$\s]+\.(?:jpe?g|png|webp|avif|mp4|webm))["'`]/g;
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : /\.(ts|tsx)$/.test(name) ? [p] : [];
  });
for (const file of ROOTS.flatMap(walk)) for (const [, ref] of readFileSync(file, "utf8").matchAll(LITERAL)) if (!refs.has(ref)) refs.set(ref, file);

const banned = [...refs].filter(([ref]) => /^\/images\/(products|categories|lifestyle|showroom|hero)\//.test(ref));
const missing = [...refs].filter(([ref]) => !existsSync(path.join("public", ref)));

if (banned.length || missing.length) {
  if (banned.length) {
    console.error(`\n✗ ${banned.length} reference(s) to retired stock folders (V3 §11):`);
    for (const [ref, file] of banned) console.error(`  ${ref}   (${file})`);
  }
  if (missing.length) {
    console.error(`\n✗ ${missing.length} referenced asset(s) missing from public/ — run \`npm run prepare-cutouts\` or add the files:`);
    for (const [ref, file] of missing) console.error(`  public${ref}   (${file})`);
  }
  console.error("");
  process.exit(1);
}
const counts = manifest.assets.reduce((m, a) => ((m[a.status] = (m[a.status] ?? 0) + 1), m), {});
console.log(`✓ check-assets: all ${refs.size} referenced images/videos exist · manifest: ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(", ")}`);
