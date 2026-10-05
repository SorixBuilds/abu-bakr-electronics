export type Placeholder = {
  value: string | null;
  demoFallback: string;
  note: string;
  verified: false;
};

const placeholder = (note: string, demoFallback = ""): Placeholder => ({
  value: null,
  demoFallback,
  note,
  verified: false,
});

export const site = {
  name: "Abu Bakr Electronics",
  demoMode: true,
  /** [CLIENT TO CONFIRM] digits only, no + */
  whatsapp: "923000000000",
  phone: placeholder("Showroom phone number"),
  address: placeholder("Full showroom address + Google Maps link", "Lahore, Pakistan"),
  hours: placeholder("Opening days and hours", "Hours on request"),
  founded: placeholder("Year established (for hero eyebrow / story)"),
  warrantyStatement: placeholder("Genuine products / official brand warranty statement"),
  testRides: placeholder("Are Jinpeng test rides offered?", "Request a test ride"),
  mapsUrl: placeholder("Google Maps link for the showroom"),
  founderStory: placeholder("Founding story, year and founder's note"),
  showroomPhotos: placeholder("Showroom photography (exterior, interior, staff)", "Illustrative imagery"),
  jinpengImageRights: placeholder("Rights to use Jinpeng model imagery (dealer marketing kit)"),
  whatsappNumber: placeholder("WhatsApp Business number — demo uses a dummy number"),
  socials: {
    instagram: null as string | null,
    facebook: null as string | null,
    tiktok: null as string | null,
  },
  /** verified brand names only */
  brands: [] as string[],
  verified: { freeDeliveryLahore: true, nationwideDelivery: true },
  sorixUrl: "https://sorix.co",
};

export type PlaceholderField = {
  [K in keyof typeof site]: (typeof site)[K] extends Placeholder ? K : never;
}[keyof typeof site];

export const placeholderFields = (Object.keys(site) as (keyof typeof site)[]).filter((k): k is PlaceholderField => {
  const v = site[k] as unknown;
  return typeof v === "object" && v !== null && "verified" in v && "note" in v;
});

/** Extra review-only items that are not single fields (features, imagery, data). */
export const reviewChecklist: { label: string; note: string }[] = [
  { label: "Product range", note: "Product list with brands, models and current prices" },
  { label: "Brands stocked", note: "Verified brand names (enables the Brand Wall)" },
  { label: "Social links", note: "Instagram, Facebook, TikTok URLs" },
  { label: "Payment options", note: "COD, bank transfer, installments — which are offered?" },
  { label: "Installation", note: "Is AC installation offered, and on what terms?" },
  { label: "Jinpeng dealer status", note: "Confirm relationship with Jinpeng / JW Corporation" },
  { label: "Logo", note: "Existing logo, if any (demo uses an AB monogram)" },
];
