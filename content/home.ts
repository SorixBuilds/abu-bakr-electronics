import type { CategorySlug } from "@/types/product";

/** A cutout placed on the hero stage. Values are % of the stage box (left = horizontal centre). */
export type HeroItem = { id: string; left: number; bottom: number; width: number; height: number; z?: number };

export type HeroSlide = {
  key: string;
  category: CategorySlug;
  nav: string;
  eyebrow: string;
  headline: string;
  italic: string;
  line: string;
  primary: { label: string; href: string };
  secondary: { label: string; action: "room-guide" | "whatsapp" | "test-ride" };
  items: HeroItem[];
};

/** V3 §8 copy. Headlines ≤ 6 words, one italic word each. */
export const home = {
  hero: {
    trust: "Free delivery across Lahore · Delivering across Pakistan",
    slides: [
      {
        key: "ac",
        category: "cooling",
        nav: "Air Conditioners",
        eyebrow: "Air conditioners",
        headline: "Cooling, perfected.",
        italic: "perfected.",
        line: "Quiet, efficient comfort for every room.",
        primary: { label: "Explore ACs", href: "/shop/cooling" },
        secondary: { label: "Find my AC size", action: "room-guide" },
        items: [{ id: "ac-1", left: 50, bottom: 30, width: 92, height: 54 }],
      },
      {
        key: "fridge",
        category: "refrigeration",
        nav: "Refrigerators",
        eyebrow: "Refrigerators",
        headline: "Freshness, by design.",
        italic: "by design.",
        line: "From compact to grand, chosen for your kitchen.",
        primary: { label: "Explore refrigerators", href: "/shop/refrigeration" },
        secondary: { label: "WhatsApp us", action: "whatsapp" },
        items: [{ id: "fridge-1", left: 50, bottom: 9, width: 70, height: 82 }],
      },
      {
        key: "home",
        category: "home-appliances",
        nav: "Home & Electronics",
        eyebrow: "Home & electronics",
        headline: "Everyday, elevated.",
        italic: "elevated.",
        line: "Appliances and screens that belong in a beautiful home.",
        primary: { label: "Explore the collection", href: "/shop/home-appliances" },
        secondary: { label: "WhatsApp us", action: "whatsapp" },
        items: [
          { id: "washer-1", left: 60, bottom: 9, width: 56, height: 72, z: 1 },
          { id: "microwave-1", left: 27, bottom: 9, width: 40, height: 30, z: 2 },
        ],
      },
      {
        key: "jinpeng",
        category: "mobility",
        nav: "Jinpeng Electric",
        eyebrow: "Jinpeng Electric",
        headline: "The future of everyday movement.",
        italic: "future",
        line: "Electric bikes & scooties, presented properly.",
        primary: { label: "Explore Jinpeng", href: "/mobility" },
        secondary: { label: "Request a test ride", action: "test-ride" },
        items: [{ id: "jinpeng-thrill", left: 50, bottom: 10, width: 92, height: 70 }],
      },
    ] satisfies HeroSlide[],
  },
  trust: [
    { icon: "truck", title: "Free delivery across Lahore", line: "Complimentary, citywide." },
    { icon: "pin", title: "Delivering across Pakistan", line: "Ask about your city." },
    { icon: "chat", title: "Real advice on WhatsApp", line: "Talk to a person before you buy." },
  ],
  bento: { eyebrow: "The collection", title: "Five worlds, one showroom.", italic: "one" },
  spotlight: { eyebrow: "Spotlight" },
  climate: {
    eyebrow: "Room Cooling Guide",
    title: "Built for a Lahore June.",
    italic: "Lahore",
    support: "The right air conditioner starts with the right size. Tell us about your room.",
  },
  collection: { eyebrow: "The collection", title: "Chosen for you.", italic: "for you." },
  finder: { eyebrow: "Appliance Finder", title: "Not sure where to start?", italic: "to start?", support: "Three questions. One considered shortlist." },
  showroom: {
    eyebrow: "The showroom",
    title: "See it. Feel it. Choose it.",
    italic: "Choose it.",
    support: "Visit us in Lahore and see the collection in person.",
  },
  delivery: { eyebrow: "Delivery", title: "From Lahore, to your door.", italic: "to your door." },
  final: { title: "Let's find what's right for your home.", italic: "right" },
};
