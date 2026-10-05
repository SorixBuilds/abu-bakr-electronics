"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { home } from "@/content/home";
import { productsIn } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { Rail } from "@/components/ui/Rail";
import { ProductCard } from "@/components/product/ProductCard";
import type { ShopCategory } from "@/content/categories";

const tabs: { value: ShopCategory; label: string }[] = [
  { value: "cooling", label: "Climate" },
  { value: "refrigeration", label: "Freshness" },
  { value: "home-appliances", label: "Living" },
  { value: "electronics", label: "Electronics" },
];

/** §6.5 — tabbed horizontal rail. Desktop shows 3.5 cards; mobile 1.2. */
export function CollectionRail() {
  const [tab, setTab] = useState<ShopCategory>("cooling");
  const items = productsIn(tab).slice(0, 6);

  return (
    <section className="theme-light bg-ivory pb-[var(--section-y)]" aria-label="The collection">
      <div className="container-lux">
        <div className="border-t border-line pt-[var(--section-y)]">
          <SectionHeading eyebrow={home.collection.eyebrow} title={home.collection.title} support={home.collection.support} />
          <Tabs label="Collection category" tabs={tabs} value={tab} onChange={(v) => setTab(v as ShopCategory)} className="mt-12" idPrefix="collection" />
        </div>
        <div id="collection-panel" role="tabpanel" aria-labelledby={`collection-tab-${tab}`} className="mt-10 md:mt-[88px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial="out"
              animate="in"
              exit="out"
              variants={{ in: { transition: { staggerChildren: 0.05 } }, out: { transition: { staggerChildren: 0.03 } } }}
            >
              <Rail
                label={`${tabs.find((t) => t.value === tab)?.label} collection`}
                slideClassName="basis-[82%] sm:basis-[45%] lg:basis-[calc((100%-60px)/3.5)]"
              >
                {[
                  ...items.map((p) => (
                    <motion.div key={p.id} variants={{ out: { opacity: 0, y: 12 }, in: { opacity: 1, y: 0 } }} transition={{ duration: 0.35 }}>
                      <ProductCard product={p} sizes="(max-width:768px) 82vw, 30vw" />
                    </motion.div>
                  )),
                  <motion.div key="all" variants={{ out: { opacity: 0, y: 12 }, in: { opacity: 1, y: 0 } }} className="h-full">
                    <Link href={`/shop/${tab}`} className="group flex aspect-[4/5] flex-col justify-end rounded-sm bg-stone p-8">
                      <span className="text-eyebrow text-fg-muted">View all</span>
                      <span className="mt-3 flex items-center gap-3 text-h3">
                        {tabs.find((t) => t.value === tab)?.label}
                        <ArrowRight size={20} strokeWidth={1.25} className="text-accent-text transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </motion.div>,
                ]}
              </Rail>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
