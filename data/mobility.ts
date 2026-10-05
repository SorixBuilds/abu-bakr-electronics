import type { Product } from "@/types/product";

type Row = {
  name: string;
  topSpeedKmh: number;
  rangeKm: [number, number];
  motorW: number;
  tagline: string;
  battery?: string;
  chargeHours?: string;
  highlights?: string[];
};

/** Jinpeng homepage model-card values (jinpeng.com.pk, observed Oct 2026). Do not add colours, prices or warranty. */
const rows: Row[] = [
  { name: "Thrill", topSpeedKmh: 75, rangeKm: [140, 160], motorW: 2000, tagline: "The flagship. Longest range in the line." },
  {
    name: "Cruise",
    topSpeedKmh: 65,
    rangeKm: [120, 130],
    motorW: 1500,
    tagline: "Power and comfort, for longer rides.",
    chargeHours: "6–8 h",
    highlights: ["Dual disc brakes", "Hydraulic suspension", "Oversized cushion seat", "High-brightness LED headlight"],
  },
  { name: "Thunder", topSpeedKmh: 65, rangeKm: [100, 110], motorW: 1800, tagline: "Strong, confident acceleration." },
  {
    name: "Swift",
    topSpeedKmh: 55,
    rangeKm: [130, 140],
    motorW: 1200,
    tagline: "Built for the city, made to go far.",
    chargeHours: "6–8 h",
    highlights: ["Dual disc brakes", "Suspension system", "LED headlight"],
  },
  { name: "Sprint", topSpeedKmh: 55, rangeKm: [100, 110], motorW: 1000, tagline: "Quick, light, everyday." },
  { name: "Rush", topSpeedKmh: 55, rangeKm: [100, 110], motorW: 1000, tagline: "The practical all-rounder." },
  {
    name: "Ride",
    topSpeedKmh: 50,
    rangeKm: [110, 120],
    motorW: 1000,
    tagline: "The smart daily commute.",
    battery: "72V 30AH lithium",
    chargeHours: "6–8 h",
    highlights: ["72V 30AH lithium battery", "Dual disc brakes", "Memory-foam cushion"],
  },
  { name: "ECO", topSpeedKmh: 45, rangeKm: [80, 90], motorW: 800, tagline: "Simple, efficient, easy to own." },
  { name: "Reliance", topSpeedKmh: 45, rangeKm: [80, 90], motorW: 800, tagline: "Dependable short-distance riding." },
];

export const mobilityModels: Product[] = rows.map((r, i) => {
  const slug = r.name.toLowerCase();
  const speedBand = r.topSpeedKmh <= 50 ? "up-to-50" : r.topSpeedKmh <= 65 ? "55-65" : "75";
  const rangeBand = r.rangeKm[1] <= 110 ? "80-110" : r.rangeKm[1] <= 140 ? "110-140" : "140+";
  const use = r.rangeKm[1] <= 90 ? "short" : r.rangeKm[0] >= 130 ? "long" : "commute";
  return {
    id: `JP-${String(i + 1).padStart(2, "0")}`,
    slug,
    name: `Jinpeng ${r.name}`,
    category: "mobility",
    type: "electric-scooty",
    typeLabel: "Electric Scooty",
    brand: "Jinpeng",
    price: null,
    tagline: r.tagline,
    description: `${r.tagline} The Jinpeng ${r.name} — presented at Abu Bakr Electronics.`,
    image: null,
    gallery: [],
    shape: "scooter",
    keySpecs: [`${r.topSpeedKmh} km/h`, `${r.rangeKm[0]}–${r.rangeKm[1]} km`, `${r.motorW} W`],
    specs: [
      { group: "Performance", label: "Top speed", value: `${r.topSpeedKmh} km/h` },
      { group: "Performance", label: "Range", value: `${r.rangeKm[0]}–${r.rangeKm[1]} km` },
      { group: "Performance", label: "Motor", value: `${r.motorW} W` },
      ...(r.battery ? [{ group: "Energy" as const, label: "Battery", value: r.battery }] : []),
      ...(r.chargeHours ? [{ group: "Energy" as const, label: "Charging time", value: r.chargeHours }] : []),
    ],
    features: [],
    badge: "JINPENG",
    availability: "ask",
    tags: [use],
    filters: { speed: speedBand, range: rangeBand },
    isDemo: false,
    source: "https://jinpeng.com.pk/",
    mobility: {
      topSpeedKmh: r.topSpeedKmh,
      rangeKm: r.rangeKm,
      motorW: r.motorW,
      battery: r.battery,
      chargeHours: r.chargeHours,
      highlights: r.highlights,
    },
  };
});

export const homeSelectorOrder = ["thrill", "cruise", "swift", "ride", "eco"];

export const getModel = (slug: string) => mobilityModels.find((m) => m.slug === slug);
