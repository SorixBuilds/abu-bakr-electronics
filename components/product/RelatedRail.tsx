"use client";

import type { Product } from "@/types/product";
import { Rail } from "@/components/ui/Rail";
import { ProductCard } from "./ProductCard";

export function RelatedRail({ products, title = "You may also like" }: { products: Product[]; title?: string }) {
  if (!products.length) return null;
  return (
    <div>
      <h2 className="mb-8 text-h2 md:mb-10">{title}</h2>
      <Rail label={title} slideClassName="basis-[76%] py-2 sm:basis-[45%] lg:basis-[calc((100%-60px)/4)]" arrowsClassName="-top-[76px]">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} sizes="(max-width:768px) 78vw, 30vw" />
        ))}
      </Rail>
    </div>
  );
}
