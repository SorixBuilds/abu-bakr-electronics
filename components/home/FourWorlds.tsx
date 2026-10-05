"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { worlds } from "@/content/categories";
import { home } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/product/Media";
import { Rail } from "@/components/ui/Rail";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** V2 §7.1 — porcelain section, full-bleed photo tiles; expanding accordion on desktop, snap rail on mobile. */
export function FourWorlds() {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotionSafe();

  return (
    <section className="theme-porcelain bg-porcelain pb-[var(--section-y)] pt-20 md:pt-28" aria-label="Four worlds">
      <div className="container-lux">
        <SectionHeading eyebrow={home.worlds.eyebrow} title={home.worlds.title} support={home.worlds.support} className="mb-12 md:mb-16" />

        <motion.ul
          className="hidden h-[min(72vh,640px)] gap-3 md:flex"
          onMouseLeave={() => setActive(null)}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: ease.outExpo }}
        >
          {worlds.map((w, i) => {
            const on = active === i;
            return (
              <motion.li
                key={w.key}
                className="relative min-w-0 overflow-hidden rounded-md"
                animate={{ flexGrow: on ? 1.8 : 1 }}
                transition={{ duration: reduced ? 0 : 0.7, ease: ease.inOut }}
                style={{ flexBasis: 0 }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <Tile w={w} on={on} index={i} />
              </motion.li>
            );
          })}
        </motion.ul>

        <div className="md:hidden">
          <Rail label="Four worlds" slideClassName="basis-[78vw]" showArrows={false}>
            {worlds.map((w, i) => (
              <div key={w.key} className="relative aspect-[3/4] overflow-hidden rounded-md">
                <Tile w={w} on index={i} />
              </div>
            ))}
          </Rail>
        </div>
      </div>
    </section>
  );
}

function Tile({ w, on, index }: { w: (typeof worlds)[number]; on: boolean; index: number }) {
  return (
    <>
      <Link href={w.href} className="group absolute inset-0 block">
        <div className={cn("absolute inset-0 transition-transform duration-700 ease-in-out-lux", on && "scale-[1.04]")}>
          <Photo
            src={w.image}
            alt=""
            sizes="(max-width:768px) 78vw, 40vw"
            contain={w.onWine}
            className={cn(w.onWine && "bg-[radial-gradient(ellipse_at_50%_35%,var(--wine-500),var(--wine-900)_75%)] px-[8%] pb-[38%] pt-[12%]")}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,10,12,0)_40%,rgba(11,10,12,0.72)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
          <span className="font-mono text-[11px] tracking-[0.16em] text-gold">0{index + 1}</span>
          <h3 className="mt-3 text-[28px] font-medium leading-none tracking-[-0.01em] text-on-dark lg:text-[32px]">{w.title}</h3>
          <p
            className={cn(
              "mt-3 max-w-[30ch] text-[15px] text-on-dark/80 transition-all duration-500",
              on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            {w.line}
          </p>
          <span className="mt-5 flex size-9 items-center justify-center rounded-full bg-cherry text-white transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight size={15} strokeWidth={1.5} />
          </span>
        </div>
      </Link>
      {"secondary" in w && w.secondary && (
        <Link
          href={w.secondary.href}
          className={cn(
            "absolute bottom-6 right-6 z-10 min-h-11 content-center text-[13px] text-on-dark/80 transition-opacity duration-500 hover:text-on-dark lg:bottom-8 lg:right-8",
            on ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          tabIndex={on ? 0 : -1}
        >
          <span className="link-lux">{w.secondary.label} →</span>
        </Link>
      )}
    </>
  );
}
