"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { CategorySlug } from "@/types/product";
import { categories } from "@/content/categories";
import { productsIn } from "@/data/products";
import { Stage, ProductCut } from "@/components/ui/Stage";
import { productHref } from "@/lib/format";
import { ease } from "@/lib/motion";

export type NavKey = CategorySlug;

/** Nav order and labels (V3 §7 — category names spelled out). */
export const navCategories: { key: NavKey; label: string; href: string; links: { label: string; href: string }[] }[] = [
  ...categories.map((c) => ({
    key: c.slug as NavKey,
    label: c.title,
    href: `/shop/${c.slug}`,
    links: [
      { label: `View all ${c.title.toLowerCase()}`, href: `/shop/${c.slug}` },
      { label: "Compare", href: "/compare" },
      ...(c.slug === "cooling" ? [{ label: "Room Cooling Guide", href: "/#room-guide" }] : []),
      ...(c.slug !== "cooling" ? [{ label: "Help me choose", href: "/#finder" }] : []),
    ],
  })),
  {
    key: "mobility",
    label: "Jinpeng Electric",
    href: "/mobility",
    links: [
      { label: "View all Jinpeng models", href: "/mobility" },
      { label: "Compare models", href: "/compare?ids=JP-01,JP-02,JP-04" },
      { label: "Help me choose", href: "/#finder" },
    ],
  },
];

const intro: Record<NavKey, string> = {
  cooling: "Inverter splits, sized for your room.",
  refrigeration: "From side-by-side to French-door.",
  "home-appliances": "Laundry and kitchen, beautifully made.",
  electronics: "Screens and sound for every room.",
  mobility: "Electric bikes & scooties, including Jinpeng.",
};

/** V3 §7 — hovering a category opens 3 product cutouts on that category's stage colour + quick links. */
export function MegaPanel({ active, onEnter, onLeave, onClose }: { active: NavKey; onEnter: () => void; onLeave: () => void; onClose: () => void }) {
  const cat = navCategories.find((c) => c.key === active)!;
  const items = (active === "mobility" ? ["thrill", "cruise", "swift"].map((s) => productsIn("mobility").find((p) => p.slug === s)!) : productsIn(active)).slice(0, 3);

  return (
    <motion.div
      id="mega-panel"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, ease: ease.lux }}
      className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-lift min-[1100px]:block"
    >
      <div className="container-lux grid grid-cols-[1fr_260px] gap-10 py-8">
        <ul className="grid grid-cols-3 gap-4">
          {items.map((p, i) => (
            <motion.li key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.4, ease: ease.lux }}>
              <Link href={productHref(p)} onClick={onClose} className="group block">
                <Stage category={p.category} radius="md" className="aspect-[4/3]">
                  <ProductCut id={p.asset!} sizes="300px" scale={active === "mobility" ? 0.95 : 0.95} />
                </Stage>
                <p className="mt-3 line-clamp-1 text-[15px] font-semibold text-ink">{p.name}</p>
                <p className="text-[13px] text-muted">{p.typeLabel}</p>
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="flex flex-col border-l border-line pl-8">
          <p className="text-eyebrow text-cherry">{cat.label}</p>
          <p className="mt-3 font-display text-[26px] leading-[1.1] text-ink">{intro[active]}</p>
          <ul className="mt-6 flex flex-col">
            {cat.links.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} onClick={onClose} className="group flex min-h-11 items-center justify-between text-[15px] font-medium text-ink-2 hover:text-cherry">
                  {l.label}
                  <ArrowRight size={16} strokeWidth={1.75} className="text-cherry transition-transform duration-300 group-hover:translate-x-[3px]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
