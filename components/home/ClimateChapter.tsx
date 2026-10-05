"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { home } from "@/content/home";
import { editorialMedia } from "@/content/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { SceneVisual } from "@/components/product/Media";
import { RoomGuide } from "@/components/tools/RoomGuide";

/** §6.4 — first light chapter. Image left, Room Cooling Guide right. */
export function ClimateChapter() {
  const [tons, setTons] = useState(1.5);
  // Decorative cool-air overlay: opacity 0.05 → 0.18 with tonnage
  const air = 0.05 + ((Math.min(tons, 4) - 1) / 3) * 0.13;

  return (
    <section id="room-guide" className="theme-light section-y scroll-mt-20 bg-ivory" aria-label="Climate — room cooling guide">
      <div className="container-lux grid gap-12 lg:grid-cols-[55fr_45fr] lg:gap-20">
        <ImageReveal className="aspect-[4/3] rounded-sm lg:sticky lg:top-24 lg:aspect-auto lg:h-[min(78vh,760px)]">
          <SceneVisual
            tone="ivory"
            shape="ac-split"
            image={editorialMedia.climateRoom}
            alt="A calm living room with a split air conditioner"
            drawingClassName="inset-x-[18%] top-[6%] bottom-[44%]"
          />
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{ opacity: air }}
            transition={{ duration: 0.6 }}
            style={{ background: "linear-gradient(180deg, rgba(77,141,255,0.9) 0%, rgba(77,141,255,0.25) 45%, transparent 75%)" }}
          />
          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">Illustrative</span>
        </ImageReveal>
        <div className="lg:py-6">
          <SectionHeading eyebrow={home.climate.eyebrow} title={home.climate.title} support={home.climate.support} className="mb-12" />
          <RoomGuide onTons={setTons} />
        </div>
      </div>
    </section>
  );
}
