"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { home } from "@/content/home";
import { homeSelectorOrder, mobilityModels } from "@/data/mobility";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ModelSelector } from "@/components/mobility/ModelSelector";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { wineGradient } from "@/lib/brand";

const models = homeSelectorOrder.map((s) => mobilityModels.find((m) => m.slug === s)!);

/** V2 §7.4 — the wine room, entered through a clip-path wipe (desktop). */
export function MobilityChapter() {
  const ref = useRef<HTMLElement>(null);
  const desktop = useIsDesktop();
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.15"] });
  const clip = useTransform(scrollYProgress, (p) => {
    const k = 1 - p;
    return `inset(${8 * k}% ${4 * k}% 0% ${4 * k}% round ${24 * k}px)`;
  });
  const wipe = desktop && !reduced;

  return (
    <div className="bg-ivory">
      <motion.section
        ref={ref}
        className="theme-wine section-y relative overflow-hidden"
        style={{ background: wineGradient, ...(wipe ? { clipPath: clip } : {}) }}
        aria-label="Electric mobility — Jinpeng"
      >
        <div className="grain pointer-events-none absolute inset-0" />
        <div className="container-lux relative">
          <SectionHeading
            eyebrow={home.mobility.eyebrow}
            title={home.mobility.title}
            support={home.mobility.support}
            align="center"
            className="mb-12 md:mb-16"
          />
          <ModelSelector models={models} />
        </div>
      </motion.section>
    </div>
  );
}
