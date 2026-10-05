"use client";

import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useState } from "react";
import type { Product } from "@/types/product";
import { Tabs } from "@/components/ui/Tabs";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ReviewOnly, ReviewTag } from "@/components/ui/Placeholder";
import { SpecTrio } from "./SpecTrio";
import Image from "next/image";
import { useUi } from "@/store/ui";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** V2 §7.4 — automotive model selector on wine with real Jinpeng photos. User-driven only, no auto-advance. */
export function ModelSelector({ models, variant = "home" }: { models: Product[]; variant?: "home" | "full" }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const set = useUi((s) => s.set);
  const reduced = useReducedMotionSafe();
  const m = models[i];
  const name = m.name.replace("Jinpeng ", "");

  const select = (n: number) => {
    if (n === i) return;
    setDir(n > i ? 1 : -1);
    setI(n);
  };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 && i < models.length - 1) select(i + 1);
    else if (info.offset.x > 60 && i > 0) select(i - 1);
  };

  return (
    <div>
      <Tabs
        label="Jinpeng models"
        tabs={models.map((x, n) => ({ value: String(n), label: x.name.replace("Jinpeng ", "") }))}
        value={String(i)}
        onChange={(v) => select(Number(v))}
        variant="underline"
        className="justify-start md:justify-center"
        idPrefix={`models-${variant}`}
      />

      <div id={`models-${variant}-panel`} role="tabpanel" aria-labelledby={`models-${variant}-tab-${i}`}>
        {/* Stage */}
        <div className="relative mt-6 h-[clamp(260px,44vw,580px)] overflow-hidden md:mt-10">
          {/* floor shadow */}
          <div className="pointer-events-none absolute inset-x-[22%] bottom-[2%] h-[12%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,0,0,0.55),transparent_70%)]" />
          <AnimatePresence initial={false}>
            <motion.span
              key={name}
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-[6%] select-none text-center text-[20vw] font-semibold uppercase leading-none tracking-[-0.03em] text-white/[0.06] lg:text-[16vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {name}
            </motion.span>
          </AnimatePresence>
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={m.id}
              custom={dir}
              className="absolute inset-0 flex cursor-grab items-end justify-center pb-[5%] active:cursor-grabbing"
              drag={reduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
              variants={{
                enter: (d: number) => ({ x: reduced ? 0 : 60 * d, opacity: 0 }),
                center: { x: 0, opacity: 1, transition: { duration: 0.6, ease: ease.outExpo, delay: 0.1 } },
                exit: (d: number) => ({ x: reduced ? 0 : -60 * d, opacity: 0, transition: { duration: 0.4, ease: ease.in } }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="relative h-[94%] w-[min(94%,900px)] md:w-[62%]">
                <Image
                  src={m.image}
                  alt={`${m.name} electric scooty`}
                  fill
                  sizes="(max-width:768px) 92vw, 60vw"
                  className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]"
                  draggable={false}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <SpecTrio spec={m.mobility!} className="mx-auto mt-6 max-w-[880px]" />

        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <p className="text-lede text-on-dark/90">{m.tagline}</p>
          <p className="max-w-[60ch] text-[12.5px] text-fg-muted">{copy.jinpeng}</p>
          <ReviewOnly>
            <ReviewTag note={site.jinpengImageRights.note}>Model imagery</ReviewTag>
          </ReviewOnly>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <LuxuryButton href={`/mobility/${m.slug}`} variant="light" icon="arrow" magnetic>
            Explore {name}
          </LuxuryButton>
          <LuxuryButton variant="ghost" onClick={() => set({ requestPriceId: m.id })}>
            Request Price
          </LuxuryButton>
        </div>
      </div>
    </div>
  );
}
