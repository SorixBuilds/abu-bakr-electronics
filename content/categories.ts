import type { CategorySlug } from "@/types/product";

export type ShopCategory = Exclude<CategorySlug, "mobility">;

export interface CategoryInfo {
  slug: ShopCategory;
  title: string;
  line: string;
  /** Short line used on home tiles / mega panel */
  tileLine: string;
  /** Poetic world name used in headings (V3 §7: nav spells categories out; poetry moves to headings) */
  world: string;
  heading: string;
  italic: string;
  /** Manifest cutouts shown in the mega panel / category header (first = lead) */
  assets: string[];
  filters: { key: string; label: string; options: { value: string; label: string }[] }[];
}

export const categories: CategoryInfo[] = [
  {
    slug: "cooling",
    title: "Air Conditioners",
    line: "Air conditioners, sized for your room.",
    tileLine: "Air conditioners for every room.",
    world: "Climate",
    heading: "Cooling, perfected.",
    italic: "perfected",
    assets: ["ac-2", "ac-1", "ac-3"],
    filters: [
      {
        key: "type",
        label: "Type",
        options: [
          { value: "split-inverter", label: "Split inverter" },
          { value: "split-non-inverter", label: "Split non-inverter" },
          { value: "floor-standing", label: "Floor-standing" },
          { value: "window", label: "Window" },
        ],
      },
      {
        key: "tonnage",
        label: "Capacity",
        options: [
          { value: "1", label: "1 ton" },
          { value: "1.5", label: "1.5 ton" },
          { value: "2", label: "2 ton" },
          { value: "2.5+", label: "2.5+ ton" },
        ],
      },
    ],
  },
  {
    slug: "refrigeration",
    title: "Refrigerators",
    line: "Refrigerators and freezers, from compact to grand.",
    tileLine: "Refrigeration, from compact to grand.",
    world: "Freshness",
    heading: "Freshness, by design.",
    italic: "by design",
    assets: ["fridge-1", "fridge-2", "fridge-3"],
    filters: [
      {
        key: "type",
        label: "Type",
        options: [
          { value: "top-mount", label: "Top-mount" },
          { value: "side-by-side", label: "Side-by-side" },
          { value: "french-door", label: "French-door" },
          { value: "single-door", label: "Single-door" },
          { value: "deep-freezer", label: "Deep freezer" },
        ],
      },
      {
        key: "capacityBand",
        label: "Capacity",
        options: [
          { value: "under-300", label: "Under 300 L" },
          { value: "300-499", label: "300–499 L" },
          { value: "500+", label: "500 L +" },
        ],
      },
    ],
  },
  {
    slug: "home-appliances",
    title: "Home Appliances",
    line: "Laundry, kitchen and everyday home appliances.",
    tileLine: "Home appliances & electronics.",
    world: "Living",
    heading: "Everyday, elevated.",
    italic: "elevated",
    assets: ["washer-1", "microwave-1"],
    filters: [
      {
        key: "type",
        label: "Type",
        options: [
          { value: "washing-machine", label: "Washing machine" },
          { value: "microwave", label: "Microwave" },
          { value: "air-fryer", label: "Air fryer" },
          { value: "water-dispenser", label: "Water dispenser" },
          { value: "vacuum", label: "Vacuum" },
          { value: "geyser", label: "Geyser" },
        ],
      },
    ],
  },
  {
    slug: "electronics",
    title: "Electronics",
    line: "Screens, sound and everyday technology.",
    tileLine: "Screens, sound and everyday technology.",
    world: "Electronics",
    heading: "Screens and sound, considered.",
    italic: "considered",
    assets: ["tv-1", "soundbar-1", "tv-2"],
    filters: [
      {
        key: "type",
        label: "Type",
        options: [
          { value: "tv", label: "LED / Smart TV" },
          { value: "soundbar", label: "Soundbar" },
          { value: "speaker", label: "Speaker" },
        ],
      },
    ],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const categoryTitle = (slug: CategorySlug) => (slug === "mobility" ? "Jinpeng Electric" : (getCategory(slug)?.title ?? slug));

export const categoryHref = (slug: CategorySlug) => (slug === "mobility" ? "/mobility" : `/shop/${slug}`);

