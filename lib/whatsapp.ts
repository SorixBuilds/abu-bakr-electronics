import { site } from "@/content/site";
import type { Product } from "@/types/product";

export const waLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const openWhatsApp = (text: string) => {
  window.open(waLink(text), "_blank", "noopener");
};

export const priceRequestText = (p: Product, f: { name: string; city: string; note?: string }) =>
  `Assalam o Alaikum, I'd like the price and availability for:\n${p.name} (${p.id})\nName: ${f.name}\nCity: ${f.city}${
    f.note ? `\n${f.note}` : ""
  }\n(Sent from the Abu Bakr Electronics website)`;

export const advisorText = (topic: string) => `Assalam o Alaikum, I'd like help choosing: ${topic}.`;

export const generalText = "Assalam o Alaikum, I'd like to speak to an advisor.";
