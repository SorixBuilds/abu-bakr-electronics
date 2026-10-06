import type { CategorySlug, Feature, Product, Spec } from "@/types/product";
import { img, asset } from "@/lib/media";
import { mobilityModels } from "./mobility";

/**
 * V3 §10 — one product per photo in data/photo-manifest.json.
 * Names describe what is visible; model names and prices are [CLIENT TO CONFIRM] (shown as "Price on request").
 * Specs are generic for the type and flagged `isDemo` ("Illustrative specifications").
 */
type Draft = {
  id: string;
  asset: string;
  name: string;
  category: Exclude<CategorySlug, "mobility">;
  type: string;
  typeLabel: string;
  tagline: string;
  description: string;
  keySpecs: string[];
  specs: [Spec["group"], string, string][];
  features: Feature[];
  tags: string[];
  filters?: Record<string, string>;
  newIn?: boolean;
  gallery?: string[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const make = (d: Draft): Product => ({
  id: d.id,
  slug: slugify(d.name),
  name: d.name,
  category: d.category,
  type: d.type,
  typeLabel: d.typeLabel,
  brand: null,
  price: null,
  tagline: d.tagline,
  description: d.description,
  asset: d.asset,
  image: img(d.asset),
  gallery: d.gallery ?? [img(d.asset)],
  keySpecs: d.keySpecs,
  specs: d.specs.map(([group, label, value]) => ({ group, label, value })),
  features: d.features,
  badge: d.newIn ? "NEW IN" : undefined,
  availability: "ask",
  tags: d.tags,
  filters: { type: d.type, ...d.filters },
  isDemo: true,
  photoStatus: asset(d.asset).status,
});

const energy: [Spec["group"], string, string] = ["Energy", "Energy rating", "Ask an advisor"];
const model: [Spec["group"], string, string] = ["General", "Model", "[CLIENT TO CONFIRM]"];

const drafts: Draft[] = [
  /* ───────────── Air conditioners ───────────── */
  {
    id: "AC-01",
    asset: "ac-1",
    name: "Inverter Split Air Conditioner, 1 Ton",
    category: "cooling",
    type: "split-inverter",
    typeLabel: "Split inverter",
    tagline: "Quiet, steady cooling for bedrooms and studies.",
    description:
      "A wall-mounted inverter split sized for smaller rooms. The compressor adjusts its speed to hold the temperature steadily instead of switching on and off.",
    keySpecs: ["1 ton", "Inverter", "Heat & cool"],
    specs: [model, ["General", "Type", "Wall-mounted split"], ["Performance", "Capacity", "1 ton"], ["Performance", "Compressor", "Inverter"], ["Performance", "Modes", "Cool · Heat · Dry · Fan"], energy, ["General", "Suggested room", "Up to 140 sq ft"]],
    features: [
      { title: "Sized for the room", body: "A 1 ton unit suits most bedrooms and studies. Our Room Cooling Guide helps you check." },
      { title: "Inverter compressor", body: "Runs at variable speed to hold the set temperature rather than cycling on and off." },
    ],
    tags: ["value", "efficiency"],
    filters: { tonnage: "1" },
    newIn: true,
  },
  {
    id: "AC-02",
    asset: "ac-2",
    name: "Inverter Split Air Conditioner, 1.5 Ton",
    category: "cooling",
    type: "split-inverter",
    typeLabel: "Split inverter",
    tagline: "The everyday choice for living rooms.",
    description:
      "The most common size for Lahore homes. An inverter split for living rooms and larger bedrooms, with heat and cool modes for winter evenings.",
    keySpecs: ["1.5 ton", "Inverter", "Heat & cool"],
    specs: [model, ["General", "Type", "Wall-mounted split"], ["Performance", "Capacity", "1.5 ton"], ["Performance", "Compressor", "Inverter"], ["Performance", "Modes", "Cool · Heat · Dry · Fan"], energy, ["General", "Suggested room", "140–240 sq ft"]],
    features: [
      { title: "The family size", body: "1.5 ton covers most living rooms and master bedrooms." },
      { title: "Heat & cool", body: "One unit for June afternoons and December nights." },
    ],
    tags: ["family", "efficiency"],
    filters: { tonnage: "1.5" },
  },
  {
    id: "AC-03",
    asset: "ac-3",
    name: "Split Air Conditioner, 2 Ton",
    category: "cooling",
    type: "split-inverter",
    typeLabel: "Split inverter",
    tagline: "Room-filling comfort for larger spaces.",
    description: "A 2 ton split for drawing rooms, large lounges and sunny top-floor rooms where a smaller unit would struggle.",
    keySpecs: ["2 ton", "Inverter", "Large rooms"],
    specs: [model, ["General", "Type", "Wall-mounted split"], ["Performance", "Capacity", "2 ton"], ["Performance", "Compressor", "Inverter"], ["Performance", "Modes", "Cool · Heat · Dry · Fan"], energy, ["General", "Suggested room", "240–340 sq ft"]],
    features: [
      { title: "For big rooms", body: "Made for drawing rooms, large lounges and top floors." },
      { title: "Placement, planned", body: "An advisor will talk you through where the unit should go before delivery." },
    ],
    tags: ["space", "design"],
    filters: { tonnage: "2" },
  },

  /* ───────────── Refrigerators ───────────── */
  {
    id: "RF-01",
    asset: "fridge-1",
    name: "French-Door Refrigerator with Dispenser",
    category: "refrigeration",
    type: "french-door",
    typeLabel: "French-door",
    tagline: "Four doors, one generous, organised kitchen.",
    description: "A four-door French-door refrigerator in dark stainless, with a front water and ice dispenser and a flexible lower compartment.",
    keySpecs: ["French-door", "Dispenser", "Dark stainless"],
    specs: [model, ["General", "Type", "French-door, four doors"], ["Performance", "Cooling", "No-frost"], ["General", "Finish", "Dark stainless"], ["General", "Dispenser", "Water & ice"], energy, ["Dimensions", "Capacity", "Ask an advisor"]],
    features: [
      { title: "Room for a family", body: "Wide shelves for platters and a separate lower section for everyday items." },
      { title: "Dispenser at the door", body: "Chilled water and ice without opening the doors." },
    ],
    tags: ["space", "design", "family"],
    filters: { capacityBand: "500+" },
    newIn: true,
  },
  {
    id: "RF-02",
    asset: "fridge-2",
    name: "Side-by-Side Refrigerator with Dispenser",
    category: "refrigeration",
    type: "side-by-side",
    typeLabel: "Side-by-side",
    tagline: "Freezer and fridge, side by side, at eye level.",
    description: "A graphite stainless side-by-side with a full-height freezer and fridge, and a water and ice dispenser on the freezer door.",
    keySpecs: ["Side-by-side", "Dispenser", "Graphite"],
    specs: [model, ["General", "Type", "Side-by-side"], ["Performance", "Cooling", "No-frost"], ["General", "Finish", "Graphite stainless"], ["General", "Dispenser", "Water & ice"], energy, ["Dimensions", "Capacity", "Ask an advisor"]],
    features: [
      { title: "Everything at eye level", body: "Full-height doors put both fridge and freezer within easy reach." },
      { title: "Quiet finish", body: "Graphite stainless that suits modern kitchens." },
    ],
    tags: ["family", "space"],
    filters: { capacityBand: "500+" },
  },
  {
    id: "RF-03",
    asset: "fridge-3",
    name: "Built-In Side-by-Side Refrigerator",
    category: "refrigeration",
    type: "side-by-side",
    typeLabel: "Built-in side-by-side",
    tagline: "Built into the kitchen, not standing in it.",
    description: "A built-in stainless side-by-side with a top grille, designed to sit flush with your cabinetry.",
    keySpecs: ["Built-in", "Side-by-side", "Stainless"],
    specs: [model, ["General", "Type", "Built-in side-by-side"], ["Performance", "Cooling", "No-frost"], ["General", "Finish", "Brushed stainless"], energy, ["Dimensions", "Capacity", "Ask an advisor"]],
    features: [
      { title: "Flush with your cabinets", body: "Planned with your kitchen fit-out, so it disappears into the room." },
      { title: "Ask before you build", body: "An advisor will confirm cut-out sizes for your kitchen." },
    ],
    tags: ["design", "space"],
    filters: { capacityBand: "500+" },
  },

  /* ───────────── Home appliances ───────────── */
  {
    id: "HA-01",
    asset: "washer-1",
    name: "Front-Load Washing Machine",
    category: "home-appliances",
    type: "washing-machine",
    typeLabel: "Front-load washer",
    tagline: "Gentle on clothes, easy on the week.",
    description: "A white front-load washing machine with a digital display and a large door for heavy loads such as bedding.",
    keySpecs: ["Front-load", "Digital", "White"],
    specs: [model, ["General", "Type", "Front-load, automatic"], ["Performance", "Capacity", "Ask an advisor"], ["Performance", "Programmes", "Cotton · Mixed · Quick · Wool"], energy],
    features: [
      { title: "Fully automatic", body: "Load, choose a programme and leave it to finish." },
      { title: "Big door", body: "Easier loading for bedding and heavy fabrics." },
    ],
    tags: ["laundry", "efficiency"],
    newIn: true,
  },
  {
    id: "HA-02",
    asset: "microwave-1",
    name: "Retro Microwave Oven",
    category: "home-appliances",
    type: "microwave",
    typeLabel: "Microwave",
    tagline: "A countertop classic, in cream.",
    description: "A cream retro-styled microwave with dial controls and a chrome handle, made for everyday reheating and defrosting.",
    keySpecs: ["Solo", "Dial controls", "Cream"],
    specs: [model, ["General", "Type", "Countertop microwave"], ["General", "Controls", "Mechanical dials"], ["General", "Finish", "Cream"], ["Performance", "Capacity", "Ask an advisor"]],
    features: [
      { title: "Two simple dials", body: "Power and time, nothing to learn." },
      { title: "A design piece", body: "Retro styling that looks good left out on the counter." },
    ],
    tags: ["kitchen", "design"],
  },

  /* ───────────── Electronics ───────────── */
  {
    id: "EL-01",
    asset: "tv-1",
    name: "Large Smart LED TV",
    category: "electronics",
    type: "tv",
    typeLabel: "Smart TV",
    tagline: "The big screen, made for the living room.",
    description: "A large, thin-bezel smart LED TV for the living room, wall-mounted or on a console.",
    keySpecs: ["Large screen", "Smart", "Wall-mountable"],
    specs: [model, ["General", "Type", "Smart LED TV"], ["Performance", "Screen size", "Ask an advisor"], ["General", "Mounting", "Wall or stand"]],
    features: [
      { title: "Thin bezels", body: "More picture, less frame." },
      { title: "Ask about sizes", body: "Tell us your viewing distance and we will suggest a size." },
    ],
    tags: ["family", "design"],
  },
  {
    id: "EL-02",
    asset: "tv-2",
    name: "Slim Smart LED TV",
    category: "electronics",
    type: "tv",
    typeLabel: "Smart TV",
    tagline: "Slim, simple and ready to stream.",
    description: "A slim smart LED TV that suits bedrooms and smaller living rooms.",
    keySpecs: ["Slim", "Smart", "Bedroom size"],
    specs: [model, ["General", "Type", "Smart LED TV"], ["Performance", "Screen size", "Ask an advisor"], ["General", "Mounting", "Wall or stand"]],
    features: [{ title: "Fits more rooms", body: "A slim profile for bedrooms and smaller spaces." }],
    tags: ["value"],
  },
  {
    id: "EL-03",
    asset: "soundbar-1",
    name: "Home Cinema Soundbar",
    category: "electronics",
    type: "soundbar",
    typeLabel: "Soundbar",
    tagline: "Fuller sound from one slim bar.",
    description: "A slim fabric-front soundbar that sits under the TV and brings clearer dialogue and fuller sound.",
    keySpecs: ["Soundbar", "Slim", "Fabric front"],
    specs: [model, ["General", "Type", "Soundbar"], ["Performance", "Channels", "Ask an advisor"], ["General", "Connection", "Ask an advisor"]],
    features: [{ title: "Clearer dialogue", body: "Voices stand out from music and effects." }],
    tags: ["design"],
  },
];

export const applianceProducts: Product[] = drafts.map(make);

export const products: Product[] = [...applianceProducts, ...mobilityModels];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const productsIn = (category: Product["category"]) => products.filter((p) => p.category === category);
