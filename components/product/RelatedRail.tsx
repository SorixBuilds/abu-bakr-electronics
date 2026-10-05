"use client";

import type { Product } from "@/types/product";
import { Rail } from "@/components/ui/Rail";
import { ProductCard } from "./ProductCard";

export function RelatedRail({ products, title = "You may also consider" }: { products: Product[]; title?: string }) {
  if (!products.length) return null;
  return (
    <div>
      <h2 className="mb-12 text-h2">{title}</h2>
      <Rail label={title} slideClassName="basis-[78%] sm:basis-[45%] lg:basis-[calc((100%-60px)/3.5)]">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} sizes="(max-width:768px) 78vw, 30vw" />
        ))}
      </Rail>
    </div>
  );
}
