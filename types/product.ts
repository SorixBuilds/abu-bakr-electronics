export type CategorySlug = "cooling" | "refrigeration" | "home-appliances" | "electronics" | "mobility";

export type SpecGroup = "Dimensions" | "Performance" | "Energy" | "General";

export interface Spec {
  label: string;
  value: string;
  group: SpecGroup;
}

export interface Feature {
  title: string;
  body: string;
  image?: string;
}

/** Visual family used by ProductPlaceholder line drawings when no photo exists. */
export type ProductShape =
  | "ac-split"
  | "ac-floor"
  | "fridge-sbs"
  | "fridge-french"
  | "fridge-top"
  | "fridge-single"
  | "freezer"
  | "washer-front"
  | "washer-top"
  | "microwave"
  | "air-fryer"
  | "dispenser"
  | "vacuum"
  | "tv"
  | "soundbar"
  | "speaker"
  | "smart-speaker"
  | "scooter";

export interface MobilitySpec {
  topSpeedKmh: number;
  rangeKm: [number, number];
  motorW: number;
  battery?: string;
  chargeHours?: string;
  highlights?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  type: string;
  typeLabel: string;
  brand: string | null;
  price: number | null;
  tagline: string;
  description: string;
  /** null → ProductPlaceholder renders the line drawing for `shape`. */
  image: string | null;
  gallery: string[];
  shape: ProductShape;
  keySpecs: string[];
  specs: Spec[];
  features: Feature[];
  badge?: "NEW IN" | "DEMO" | "ASK FOR AVAILABILITY" | "JINPENG";
  availability: "ask";
  tags: string[];
  filters: Record<string, string>;
  isDemo: boolean;
  source?: string;
  mobility?: MobilitySpec;
}
