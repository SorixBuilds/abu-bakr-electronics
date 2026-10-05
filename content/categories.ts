import type { CategorySlug } from "@/types/product";
import { categoryImages } from "./media";

export type ShopCategory = Exclude<CategorySlug, "mobility">;

export interface CategoryInfo {
  slug: ShopCategory;
  title: string;
  line: string;
  /** Short line used on home tiles / mega panel */
  tileLine: string;
  image: string;
  filters: { key: string; label: string; options: { value: string; label: string }[] }[];
}

export const categories: CategoryInfo[] = [
  {
    slug: "cooling",
    title: "Climate",
    line: "Air conditioners, sized for your room.",
    tileLine: "Air conditioners for every room.",
    image: categoryImages["cooling"],
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
    image: categoryImages["refrigeration"],
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
    image: categoryImages["home-appliances"],
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
    image: categoryImages["electronics"],
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

/** Home "Four Worlds" tiles and hero showcase cards */
export const worlds = [
  {
    key: "climate",
    title: "Climate",
    label: "Air Conditioners",
    line: "Air conditioners for every room.",
    href: "/shop/cooling",
    image: categoryImages.cooling,
    onWine: false,
  },
  {
    key: "freshness",
    title: "Freshness",
    label: "Refrigerators",
    line: "Refrigeration, from compact to grand.",
    href: "/shop/refrigeration",
    image: categoryImages.refrigeration,
    onWine: false,
  },
  {
    key: "living",
    title: "Living",
    label: "Home & Electronics",
    line: "Home appliances & electronics.",
    href: "/shop/home-appliances",
    image: categoryImages["home-appliances"],
    onWine: false,
    secondary: { label: "Electronics", href: "/shop/electronics" },
  },
  {
    key: "mobility",
    title: "Mobility",
    label: "Jinpeng Electric",
    line: "Electric bikes & scooties, including Jinpeng.",
    href: "/mobility",
    image: categoryImages.mobility,
    onWine: true,
  },
];
