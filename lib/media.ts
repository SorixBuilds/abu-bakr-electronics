import manifest from "@/data/photo-manifest.json";
import type { CategorySlug } from "@/types/product";

/**
 * Every product image on the site resolves through data/photo-manifest.json (user rule 6).
 * Swapping a stand-in for the client's photo = replace the file + change "status"; no code changes.
 */
export type AssetStatus = "client" | "stand-in" | "manufacturer";

export interface Asset {
  id: string;
  status: AssetStatus;
  category: CategorySlug;
  subject: string;
  image: string;
}

const assets = manifest.assets as unknown as Asset[];
const byId = new Map(assets.map((a) => [a.id, a]));

export function asset(id: string): Asset {
  const a = byId.get(id);
  if (!a) throw new Error(`photo-manifest: unknown asset "${id}"`);
  return a;
}

export const img = (id: string) => asset(id).image;

/** Hero background video (desktop 16:9 + portrait mobile cut). */
export const heroVideo = (manifest as unknown as { video: { hero: { desktop: string; mobile: string; poster: string; posterMobile: string } } }).video.hero;

/** Shop / showroom photos (Mode B framing). Empty until the client sends them — sections that need them hide. */
export const shopPhotos = (manifest as { shop?: { file: string; alt: string }[] }).shop ?? [];

/** Stage colour per category (V3 §4.2). */
export const stageColor: Record<CategorySlug, string> = {
  cooling: "var(--stage-ice)",
  refrigeration: "var(--stage-frost)",
  "home-appliances": "var(--stage-sand)",
  electronics: "var(--stage-graphite)",
  mobility: "var(--stage-bordeaux)",
};

export const darkStage = (c: CategorySlug) => c === "electronics" || c === "mobility";

/**
 * Same scale per category (user rule 4): the share of the stage a cutout may occupy.
 * Cutouts are trimmed + padded identically, so one box per category gives one scale per category.
 */
export const stageFit: Record<string, { w: number; h: number; floor: number; floorW: number }> = {
  cooling: { w: 84, h: 52, floor: 30, floorW: 62 },
  refrigeration: { w: 64, h: 80, floor: 9, floorW: 58 },
  washer: { w: 66, h: 70, floor: 11, floorW: 60 },
  microwave: { w: 78, h: 50, floor: 24, floorW: 70 },
  tv: { w: 88, h: 58, floor: 22, floorW: 70 },
  soundbar: { w: 90, h: 22, floor: 38, floorW: 80 },
  mobility: { w: 90, h: 70, floor: 12, floorW: 74 },
};

export function fitFor(id: string) {
  const a = asset(id);
  if (id.startsWith("washer")) return stageFit.washer;
  if (id.startsWith("microwave")) return stageFit.microwave;
  if (id.startsWith("tv")) return stageFit.tv;
  if (id.startsWith("soundbar")) return stageFit.soundbar;
  return stageFit[a.category] ?? stageFit.refrigeration;
}
