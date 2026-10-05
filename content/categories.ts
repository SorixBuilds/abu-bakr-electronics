import type { CategorySlug, ProductShape } from "@/types/product";

export type ShopCategory = Exclude<CategorySlug, "mobility">;

export interface CategoryInfo {
  slug: ShopCategory;
  title: string;
  line: string;
  /** Short line used on home tiles / mega panel */
  tileLine: string;
  /** null → atmospheric gradient + line drawing */
  image: string | null;
  shape: ProductShape;
  filters: { key: string; label: string; options: { value: string; label: string }[] }[];
}

export const categories: CategoryInfo[] = [
  {
    slug: "cooling",
    title: "Climate",
    line: "Air conditioners, sized for your room.",
    tileLine: "Air conditioners for every room.",
    image: null,
    shape: "ac-split",
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
    title: "Freshness",
    line: "Refrigerators and freezers, from compact to grand.",
    tileLine: "Refrigeration, from compact to grand.",
    image: null,
    shape: "fridge-sbs",
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
    title: "Living",
    line: "Laundry, kitchen and everyday home appliances.",
    tileLine: "Home appliances & electronics.",
    image: null,
    shape: "washer-front",
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
    image: null,
    shape: "tv",
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

export const categoryTitle = (slug: CategorySlug) => (slug === "mobility" ? "Electric Mobility" : (getCategory(slug)?.title ?? slug));

export const categoryHref = (slug: CategorySlug) => (slug === "mobility" ? "/mobility" : `/shop/${slug}`);

/** Home "Four Worlds" tiles */
export const worlds = [
  {
    key: "climate",
    title: "Climate",
    line: "Air conditioners for every room.",
    href: "/shop/cooling",
    shape: "ac-split" as ProductShape,
    image: null as string | null,
    tone: "cool",
  },
  {
    key: "freshness",
    title: "Freshness",
    line: "Refrigeration, from compact to grand.",
    href: "/shop/refrigeration",
    shape: "fridge-sbs" as ProductShape,
    image: null as string | null,
    tone: "steel",
  },
  {
    key: "living",
    title: "Living",
    line: "Home appliances & electronics.",
    href: "/shop/home-appliances",
    shape: "washer-front" as ProductShape,
    image: null as string | null,
    tone: "warm",
    secondary: { label: "Electronics", href: "/shop/electronics" },
  },
  {
    key: "mobility",
    title: "Mobility",
    line: "Electric bikes & scooties, including Jinpeng.",
    href: "/mobility",
    shape: "scooter" as ProductShape,
    image: null as string | null,
    tone: "electric",
  },
];
