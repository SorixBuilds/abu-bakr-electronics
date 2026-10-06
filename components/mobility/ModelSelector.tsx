"use client";

import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";
import { Tabs } from "@/components/ui/Tabs";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ReviewOnly, ReviewTag } from "@/components/ui/Placeholder";
import { SpecTrio } from "./SpecTrio";
import { useUi } from "@/store/ui";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** V3 §8.7 — model pills, the real Jinpeng photo on a lighter Bordeaux floor, spec trio, two actions. User-driven only. */
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
        variant="pills"
        className="justify-start md:justify-center"
        idPrefix={`models-${variant}`}
      />

      <div id={`models-${variant}-panel`} role="tabpanel" aria-labelledby={`models-${variant}-tab-${i}`}>
        <div className="relative mt-6 h-[clamp(240px,46vw,560px)] md:mt-8">
          {/* lighter Bordeaux floor */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_85%,rgba(232,52,78,0.25),transparent_60%)]" />
          <div aria-hidden className="pointer-events-none absolute inset-x-[20%] bottom-[4%] h-[10%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.45),transparent_70%)]" />
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={m.id}
              custom={dir}
              className="absolute inset-0 flex cursor-grab items-end justify-center pb-[6%] active:cursor-grabbing"
              drag={reduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
              variants={{
                enter: (d: number) => ({ x: reduced ? 0 : 60 * d, opacity: 0, scale: reduced ? 1 : 0.96 }),
                center: { x: 0, opacity: 1, scale: 1, transition: { duration: reduced ? 0.15 : 0.8, ease: ease.lux, delay: 0.05 } },
                exit: (d: number) => ({ x: reduced ? 0 : -40 * d, opacity: 0, transition: { duration: reduced ? 0.15 : 0.4, ease: ease.in } }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="relative h-[92%] w-[min(94%,880px)] md:w-[64%]">
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

        <SpecTrio spec={m.mobility!} className="mx-auto mt-4 max-w-[760px]" />

        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <p className="font-display text-[22px] italic text-white/90 md:text-[26px]">{m.tagline}</p>
          <p className="max-w-[60ch] text-[13px] text-white/70">{copy.jinpeng}</p>
          <ReviewOnly>
            <ReviewTag note={site.jinpengImageRights.note}>Model imagery</ReviewTag>
          </ReviewOnly>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LuxuryButton href={`/mobility/${m.slug}`} variant="light" icon="arrow">
            Explore {name}
          </LuxuryButton>
          <LuxuryButton variant="ghost" onClick={() => set({ requestPriceId: m.id })}>
            Request price
          </LuxuryButton>
        </div>
      </div>
    </div>
  );
}
