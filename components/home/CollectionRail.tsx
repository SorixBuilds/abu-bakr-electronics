"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { home } from "@/content/home";
import { productsIn } from "@/data/products";
import { categories, type ShopCategory } from "@/content/categories";
import { Container, Section, SectionIntro } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";
import { Rail } from "@/components/ui/Rail";
import { ProductCard } from "@/components/product/ProductCard";
import { Stage, ProductCut } from "@/components/ui/Stage";

const tabs = categories.map((c) => ({ value: c.slug, label: c.title }));

/** V3 §8.6 — porcelain, "Chosen for you.", pill tabs, rail of product cards: 4 visible on desktop, 1.3 on mobile, arrows + drag. */
export function CollectionRail() {
  const [tab, setTab] = useState<ShopCategory>("cooling");
  const items = productsIn(tab);
  const cat = categories.find((c) => c.slug === tab)!;

  return (
    <Section tone="porcelain" id="chosen" aria-label="Chosen for you">
      <Container>
        <SectionIntro eyebrow={home.collection.eyebrow} title={home.collection.title} italic={home.collection.italic} />
        <Tabs
          label="Collection category"
          tabs={tabs}
          value={tab}
          onChange={(v) => setTab(v as ShopCategory)}
          variant="pills"
          className="-mx-[var(--gutter)] mt-8 px-[var(--gutter)] md:mx-0 md:px-0"
          idPrefix="collection"
        />
        <div id="collection-panel" role="tabpanel" aria-labelledby={`collection-tab-${tab}`} className="mt-8 md:mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <Rail
                label={`${cat.title}`}
                slideClassName="basis-[76%] sm:basis-[45%] lg:basis-[calc((100%-60px)/4)] py-2"
                arrowsClassName="-top-[84px]"
              >
                {[
                  ...items.map((p) => <ProductCard key={p.id} product={p} />),
                  <Link
                    key="all"
                    href={`/shop/${tab}`}
                    className="group flex h-full flex-col overflow-hidden rounded-md bg-white p-2.5 shadow-card transition-shadow duration-300 hover:shadow-lift"
                  >
                    <Stage category={tab} radius="md" className="aspect-[4/5]">
                      <ProductCut id={cat.assets[cat.assets.length - 1]} sizes="300px" />
                    </Stage>
                    <span className="flex flex-1 flex-col justify-end px-1.5 pb-2 pt-4">
                      <span className="text-[13px] text-muted">View all</span>
                      <span className="mt-1 flex items-center gap-2 font-display text-[26px] leading-tight text-ink">
                        {cat.title}
                        <ArrowRight size={20} strokeWidth={1.75} className="text-cherry transition-transform group-hover:translate-x-[3px]" />
                      </span>
                    </span>
                  </Link>,
                ]}
              </Rail>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
