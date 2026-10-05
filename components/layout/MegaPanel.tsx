"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { categories } from "@/content/categories";
import { SceneVisual } from "@/components/product/Media";
import { ease } from "@/lib/motion";

const tones = ["cool", "steel", "warm", "night"];

export function MegaPanel({ onEnter, onLeave, onClose }: { onEnter: () => void; onLeave: () => void; onClose: () => void }) {
  return (
    <motion.div
      id="mega-panel"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.45, ease: ease.outExpo }}
      className="absolute inset-x-0 top-full hidden border-b border-[rgba(255,255,255,0.08)] bg-[rgba(10,11,13,0.94)] backdrop-blur-[16px] lg:block"
    >
      <div className="container-lux grid grid-cols-[1fr_280px] gap-12 py-10">
        <ul className="grid grid-cols-4 gap-3">
          {categories.map((c, i) => (
            <motion.li
              key={c.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.5, ease: ease.outExpo }}
            >
              <Link href={`/shop/${c.slug}`} onClick={onClose} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
                    <SceneVisual tone={tones[i]} shape={c.shape} image={c.image} />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[17px] font-medium text-ivory">{c.title}</span>
                  <ArrowRight size={14} strokeWidth={1.25} className="text-gold transition-transform duration-250 group-hover:translate-x-1" />
                </div>
                <p className="mt-1 text-[13px] text-ivory/55">{c.tileLine}</p>
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="flex flex-col justify-between border-l border-line pl-10">
          <div className="flex flex-col gap-1">
            <span className="mb-3 text-eyebrow text-ivory/60">Guidance</span>
            {[
              { href: "/#finder", label: "Appliance Finder" },
              { href: "/#room-guide", label: "Room Cooling Guide" },
              { href: "/compare", label: "Compare products" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                className="group flex min-h-11 items-center justify-between text-[15px] text-ivory/80 hover:text-ivory"
              >
                <span className="link-lux">{l.label}</span>
                <ArrowRight
                  size={14}
                  strokeWidth={1.25}
                  className="text-gold opacity-0 transition-all duration-250 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>
            ))}
          </div>
          <Link href="/shop" onClick={onClose} className="mt-8 text-eyebrow text-gold link-lux self-start pb-1">
            View the full collection →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
