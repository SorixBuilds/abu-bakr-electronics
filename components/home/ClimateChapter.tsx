"use client";

import { home } from "@/content/home";
import { editorialMedia } from "@/content/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Photo } from "@/components/product/Media";
import { RoomGuide } from "@/components/tools/RoomGuide";

/** V2 §7.3 — porcelain chapter: the AC room photo left, the Room Cooling Guide right. */
export function ClimateChapter() {
  return (
    <section id="room-guide" className="theme-porcelain section-y scroll-mt-20 bg-porcelain" aria-label="Climate — room cooling guide">
      <div className="container-lux grid gap-12 lg:grid-cols-[50fr_50fr] lg:gap-20">
        <ImageReveal className="aspect-[4/5] rounded-md lg:sticky lg:top-24 lg:max-h-[82vh]">
          <Photo
            src={editorialMedia.climateRoom}
            alt="A calm bedroom with a wall-mounted split air conditioner"
            sizes="(max-width:1024px) 100vw, 50vw"
            grade="light"
            position="85% 40%"
          />
        </ImageReveal>
        <div className="lg:py-6">
          <SectionHeading eyebrow={home.climate.eyebrow} title={home.climate.title} support={home.climate.support} className="mb-12" />
          <RoomGuide showMatches />
        </div>
      </div>
    </section>
  );
}
