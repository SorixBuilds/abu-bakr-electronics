import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { categories } from "@/content/categories";
import { productHref } from "@/lib/format";

// TODO(production): add JSON-LD Store schema once address and phone are verified (§20.11).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const paths = ["/", "/shop", "/mobility", "/showroom", "/contact", "/compare", ...categories.map((c) => `/shop/${c.slug}`), ...products.map(productHref)];
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly", priority: p === "/" ? 1 : 0.7 }));
}
