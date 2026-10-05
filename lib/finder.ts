import { products } from "@/data/products";
import type { CategorySlug, Product } from "@/types/product";

export type FinderCategory = "cooling" | "refrigeration" | "home-appliances" | "electronics" | "mobility";

export const step1: { value: FinderCategory; label: string; line: string }[] = [
  { value: "cooling", label: "Cooling", line: "Air conditioners" },
  { value: "refrigeration", label: "Refrigeration", line: "Refrigerators & freezers" },
  { value: "home-appliances", label: "Laundry & home", line: "Washing, kitchen, everyday" },
  { value: "electronics", label: "Entertainment", line: "Screens & sound" },
  { value: "mobility", label: "Electric ride", line: "Bikes & scooties" },
];

type Opt = { value: string; label: string };

export const step2: Record<FinderCategory, { question: string; options: Opt[] }> = {
  cooling: {
    question: "Which room is it for?",
    options: [
      { value: "value", label: "Small room (bedroom)" },
      { value: "family", label: "Living room" },
      { value: "space", label: "Large hall / office" },
    ],
  },
  refrigeration: {
    question: "Who is it for?",
    options: [
      { value: "value", label: "1–2 people" },
      { value: "family", label: "Family of 3–5" },
      { value: "space", label: "Large household / joint family" },
    ],
  },
  "home-appliances": {
    question: "Which part of the home?",
    options: [
      { value: "laundry", label: "Laundry" },
      { value: "kitchen", label: "Kitchen" },
      { value: "home", label: "Everyday home" },
    ],
  },
  electronics: {
    question: "Where will you use it?",
    options: [
      { value: "value", label: "Bedroom" },
      { value: "family", label: "Living room" },
      { value: "design", label: "Home cinema" },
    ],
  },
  mobility: {
    question: "How will you ride?",
    options: [
      { value: "short", label: "Short city trips" },
      { value: "commute", label: "Daily commute" },
      { value: "long", label: "Long distance" },
    ],
  },
};

export const step3: Opt[] = [
  { value: "efficiency", label: "Energy efficiency" },
  { value: "space", label: "Space & capacity" },
  { value: "design", label: "Design & finish" },
  { value: "value", label: "Value" },
];

const homeTypeFor: Record<string, string[]> = {
  laundry: ["washing-machine"],
  kitchen: ["microwave", "air-fryer"],
  home: ["water-dispenser", "vacuum"],
};

export function recommend(cat: FinderCategory, s2: string, s3: string): Product[] {
  const scored = products.map((p, i) => {
    let score = p.category === (cat as CategorySlug) ? 10 : -100;
    if (cat === "home-appliances") {
      if (homeTypeFor[s2]?.includes(p.type)) score += 3;
    } else if (p.tags.includes(s2)) {
      score += 3;
    }
    if (p.tags.includes(s3)) score += 5;
    if (cat === "mobility" && p.mobility) {
      // Priority mapping for rides: efficiency → lower motor, space → range, design/value → mid
      if (s3 === "space") score += p.mobility.rangeKm[1] / 100;
      if (s3 === "efficiency") score += (2000 - p.mobility.motorW) / 1000;
    }
    return { p, score, i };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, 3)
    .map((s) => s.p);
}
