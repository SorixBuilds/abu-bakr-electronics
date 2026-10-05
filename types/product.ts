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
  /** Real photo (public path). Required — the asset guard fails the build if it is missing. */
  image: string;
  /** At least two photos; gallery[0] is usually `image`. */
  gallery: string[];
  /** CSS object-position used to vary crops of shared photos. */
  imagePosition?: string;
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
