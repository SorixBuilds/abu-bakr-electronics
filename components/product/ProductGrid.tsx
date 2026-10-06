"use client";

import { Fragment, type ReactNode } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/cn";

/** Product grid — 3 columns desktop, 2 on phones (V3 §9.3). Plain CSS fade-in per card; no layout animation (keeps hydration light). */
export function ProductGrid({
  products,
  columns = 3,
  editorialSlot,
  editorialAfter = 6,
  compactMobile = true,
}: {
  products: Product[];
  columns?: 2 | 3;
  editorialSlot?: ReactNode;
  editorialAfter?: number;
  compactMobile?: boolean;
}) {
  return (
    <ul className={cn("grid gap-3 sm:gap-5", compactMobile ? "grid-cols-2" : "grid-cols-1", "md:grid-cols-2", columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2")}>
      {products.map((p, i) => (
        <Fragment key={p.id}>
          <li className="animate-[grid-in_500ms_cubic-bezier(.2,.8,.2,1)_both]" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
            <ProductCard product={p} headingAs="h2" priority={i < 3} dense={compactMobile} sizes="(max-width:768px) 50vw, (max-width:1280px) 33vw, 420px" />
          </li>
          {editorialSlot && i === editorialAfter - 1 && products.length > editorialAfter && <li className="col-span-full my-4 md:my-6">{editorialSlot}</li>}
        </Fragment>
      ))}
    </ul>
  );
}
