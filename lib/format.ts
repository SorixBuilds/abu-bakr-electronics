import type { Product } from "@/types/product";

const pkr = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });

export const formatPrice = (p: Pick<Product, "price">) => (p.price == null ? "Price on request" : `PKR ${pkr.format(p.price)}`);

export const brandLabel = (p: Pick<Product, "brand">) => p.brand ?? "Brand on request";

export const productHref = (p: Pick<Product, "slug" | "category">) => (p.category === "mobility" ? `/mobility/${p.slug}` : `/product/${p.slug}`);

export const productAlt = (p: Pick<Product, "name" | "typeLabel">) => `${p.name} — ${p.typeLabel}`;
