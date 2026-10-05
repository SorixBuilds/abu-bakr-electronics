/** V2 §5.2 — the brand name lives in the nav; the hero headline sells the promise. */
const headlineSets = {
  A: ["Home technology,", "beautifully chosen."],
  B: ["Modern technology.", "Better living."],
  C: ["The finer side of", "home technology."],
} as const;

const active: keyof typeof headlineSets = "A";

export const home = {
  hero: {
    eyebrow: "LAHORE, PAKISTAN",
    headline: headlineSets[active],
    sub: "Air conditioners, refrigerators, home appliances and Jinpeng electric bikes — delivered free across Lahore.",
    footnote: "Free delivery across Lahore · Delivering across Pakistan · Speak to an advisor on WhatsApp",
  },
  worlds: {
    eyebrow: "The Collection",
    title: ["Four worlds.", "One standard."],
    support: "From the air you breathe to the way you move.",
  },
  fridge: {
    eyebrow: "Freshness",
    title: "Cold, composed.",
    steps: [
      { n: "01", title: "Capacity, considered.", body: "Space planned around how families in Pakistan actually shop and store." },
      { n: "02", title: "Inverter efficiency.", body: "Inverter compressors adjust to demand rather than running flat out." },
      { n: "03", title: "Quiet by design.", body: "Built to disappear into the home, not to be heard from it." },
      { n: "04", title: "Finish that belongs.", body: "Brushed steel, glass or matte black — chosen to match your kitchen." },
    ],
  },
  climate: {
    eyebrow: "Climate",
    title: "Built for a Lahore June.",
    support: "The right air conditioner starts with the right size. Tell us about your room.",
  },
  collection: {
    eyebrow: "Curated",
    title: "The collection.",
    support: "A considered selection. Ask about anything you don't see.",
  },
  mobility: {
    eyebrow: "Electric Mobility · Jinpeng",
    title: "The future of everyday movement.",
    support: "Quiet, electric and ready for the city. Explore the Jinpeng range.",
  },
  finder: {
    eyebrow: "Guidance",
    title: "Not sure where to start?",
    support: "Three questions. One considered recommendation.",
  },
  delivery: {
    eyebrow: "Delivery",
    title: "From Lahore, to your door.",
  },
  standard: {
    eyebrow: "The Standard",
    title: "How we do things.",
    items: [
      { title: "Guidance first.", body: "Speak to a real advisor before you decide — on WhatsApp, by phone or in the showroom." },
      { title: "Delivered free in Lahore.", body: "Complimentary delivery across the city." },
      { title: "Delivered across Pakistan.", body: "Wherever you are, ask us about delivery to your city." },
    ],
  },
  showroom: {
    eyebrow: "The Showroom",
    title: "See it. Feel it. Choose it.",
    support: "Some things deserve to be seen in person. Visit the showroom and let us walk you through the collection.",
  },
  final: {
    title: "Let's find what's right for your home.",
  },
};
