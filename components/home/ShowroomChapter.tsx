"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { home } from "@/content/home";
import { editorialMedia } from "@/content/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { SceneVisual } from "@/components/product/Media";
import { useUi } from "@/store/ui";
import { site } from "@/content/site";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** §6.10 — editorial asymmetric split; the one (subtle) parallax on the site. */
export function ShowroomChapter() {
  const ref = useRef<HTMLElement>(null);
  const set = useUi((s) => s.set);
  const desktop = useIsDesktop();
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smallY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="theme-light bg-ivory pb-[var(--section-y)]" aria-label="The showroom">
      <div className="container-lux">
        <div className="grid gap-10 border-t border-line pt-[var(--section-y)] lg:grid-cols-12 lg:gap-12">
          <ImageReveal className="-mx-[var(--gutter)] aspect-[4/5] lg:col-span-7 lg:mx-0 lg:rounded-sm">
            <SceneVisual tone="warm" image={editorialMedia.showroomLarge} alt="Showroom interior" label={site.showroomPhotos.demoFallback} />
            <ShowroomLines />
          </ImageReveal>
          <div className="flex flex-col lg:col-span-5">
            <motion.div
              className="relative hidden aspect-square w-[62%] self-end overflow-hidden rounded-sm lg:mt-[120px] lg:block"
              style={desktop && !reduced ? { y: smallY } : undefined}
            >
              <SceneVisual tone="night" shape="tv" image={editorialMedia.showroomSmall} drawingClassName="inset-x-[14%] top-[22%] bottom-[22%]" />
            </motion.div>
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
      </div>
    </section>
  );
}

/** Hint of a gallery-like retail interior: plinths and display lights, drawn in light. */
export function ShowroomLines() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {[22, 50, 78].map((x, i) => (
        <div key={x} className="absolute bottom-[18%]" style={{ left: `${x}%`, width: "16%", transform: "translateX(-50%)" }}>
          <div className="mx-auto h-[26vh] max-h-[220px] w-px bg-gradient-to-b from-[rgba(225,201,141,0.0)] to-[rgba(225,201,141,0.25)]" />
          <div className="h-3 rounded-[1px] border border-white/10 bg-white/[0.04]" style={{ boxShadow: "0 -30px 60px -10px rgba(225,201,141,0.18)" }} />
          <div className="mx-auto h-[10vh] max-h-[90px] w-[70%] border-x border-white/[0.06] bg-gradient-to-b from-white/[0.035] to-transparent" />
          <span className="sr-only">Display {i + 1}</span>
        </div>
      ))}
    </div>
  );
}
