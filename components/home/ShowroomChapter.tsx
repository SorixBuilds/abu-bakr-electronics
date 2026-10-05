"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { home } from "@/content/home";
import { editorialMedia } from "@/content/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { Photo } from "@/components/product/Media";
import { useUi } from "@/store/ui";
import { site } from "@/content/site";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** V2 §7.9 — obsidian with a 3-photo mosaic; the one (subtle) parallax on the site. */
export function ShowroomChapter() {
  const ref = useRef<HTMLElement>(null);
  const set = useUi((s) => s.set);
  const desktop = useIsDesktop();
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smallY = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const parallax = desktop && !reduced;

  return (
    <section ref={ref} className="theme-dark section-y bg-obsidian" aria-label="The showroom">
      <div className="container-lux grid gap-10 lg:grid-cols-12 lg:gap-12">
        <ImageReveal className="aspect-[4/5] rounded-md lg:col-span-6">
          <Photo src={editorialMedia.showroom1} alt="A warm-lit appliance display" sizes="(max-width:1024px) 100vw, 50vw" />
          <Caption />
        </ImageReveal>
        <div className="flex flex-col lg:col-span-6">
          <div className="hidden grid-cols-2 gap-3 lg:grid">
            <motion.div className="relative aspect-[4/5] overflow-hidden rounded-md" style={parallax ? { y: smallY } : undefined}>
              <Photo src={editorialMedia.kitchenDark2} alt="A dark modern kitchen" sizes="25vw" />
            </motion.div>
            <div className="relative mt-16 aspect-[4/5] overflow-hidden rounded-md">
              <Photo src={editorialMedia.kitchenDark3} alt="A dark kitchen with marble island" sizes="25vw" />
            </div>
          </div>
          <div className="mt-auto pt-12">
            <SectionHeading eyebrow={home.showroom.eyebrow} title={home.showroom.title} support={home.showroom.support} />
            <div className="mt-8 flex flex-col gap-1 text-[15px]">
              <Placeholder field="address" />
              <Placeholder field="hours" className="text-fg-muted" />
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <LuxuryButton onClick={() => set({ visitOpen: true })} magnetic>
                Plan a Visit
              </LuxuryButton>
              {site.mapsUrl.value ? (
                <LuxuryButton variant="text" href={site.mapsUrl.value} external icon="arrow">
                  Get Directions
                </LuxuryButton>
              ) : (
                <Placeholder field="mapsUrl" reviewOnly className="text-[13px]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** "Illustrative imagery" caption; in Review Mode it asks for real showroom photos. */
function Caption() {
  return (
    <span className="absolute bottom-3 left-3 rounded-xs bg-obsidian/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-on-dark/80 backdrop-blur">
      <Placeholder field="showroomPhotos" />
    </span>
  );
}
