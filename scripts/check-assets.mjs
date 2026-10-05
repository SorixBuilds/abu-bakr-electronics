// V2 §4.6 — fail the build if any referenced photo or video is missing from public/.
// Runs automatically before `npm run build` (see "prebuild" in package.json).
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const ROOTS = ["data", "content", "components", "app", "lib"];
const LITERAL = /["'`](\/(?:images|video)\/[^"'`$\s]+\.(?:jpe?g|png|webp|avif|mp4|webm))["'`]/g;

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : /\.(ts|tsx)$/.test(name) ? [p] : [];
  });

const refs = new Map(); // public path -> first file that references it
for (const file of ROOTS.flatMap(walk)) {
  for (const [, ref] of readFileSync(file, "utf8").matchAll(LITERAL)) if (!refs.has(ref)) refs.set(ref, file);
}

// Jinpeng model images are built from the model name: `/images/mobility/${slug}.png`
const mobility = readFileSync("data/mobility.ts", "utf8");
for (const [, name] of mobility.matchAll(/\{ name: "([^"]+)"/g)) refs.set(`/images/mobility/${name.toLowerCase()}.png`, "data/mobility.ts");

const missing = [...refs].filter(([ref]) => !existsSync(path.join("public", ref)));
if (missing.length) {
  console.error(`\n✗ ${missing.length} referenced asset(s) missing from public/ — no illustration fallback exists, add the files:\n`);
  for (const [ref, file] of missing) console.error(`  public${ref}   (referenced in ${file})`);
  console.error("");
  process.exit(1);
}
console.log(`✓ check-assets: all ${refs.size} referenced photos/videos exist in public/`);
