"use client";

import { AnimatePresence, motion } from "motion/react";
import { Fragment, type ReactNode } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

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
    <ul
      className={cn(
        "grid gap-x-3 gap-y-10 sm:gap-x-5 md:gap-y-12",
        compactMobile ? "grid-cols-2" : "grid-cols-1",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
        "md:grid-cols-2",
      )}
    >
      <AnimatePresence mode="popLayout">
        {products.map((p, i) => (
          <Fragment key={p.id}>
            <motion.li
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
              transition={{ duration: 0.6, ease: ease.outExpo, delay: Math.min(i, 8) * 0.04 }}
            >
              <ProductCard product={p} headingAs="h2" priority={i < 3} sizes="(max-width:768px) 50vw, (max-width:1280px) 33vw, 420px" />
            </motion.li>
            {editorialSlot && i === editorialAfter - 1 && products.length > editorialAfter && (
              <motion.li key="editorial" layout className="col-span-full my-6">
                {editorialSlot}
              </motion.li>
            )}
          </Fragment>
        ))}
      </AnimatePresence>
    </ul>
  );
}
