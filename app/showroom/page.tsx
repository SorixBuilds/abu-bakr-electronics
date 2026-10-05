import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { VisitBlock } from "@/components/layout/VisitBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { SceneVisual } from "@/components/product/Media";
import { ShowroomLines } from "@/components/home/ShowroomChapter";
import { HowOrderingWorks } from "@/components/trust/HowOrderingWorks";
import { FinalCTA } from "@/components/home/FinalCTA";
import { editorialMedia } from "@/content/media";
import type { ProductShape } from "@/types/product";

export const metadata: Metadata = {
  title: "The Showroom",
  description: "Home technology and electric mobility under one roof in Lahore — presented properly, explained honestly, and delivered free across the city.",
};

const mosaic: { tone: string; shape?: ProductShape; className: string }[] = [
  { tone: "warm", className: "col-span-2 row-span-2 aspect-square md:aspect-auto" },
  { tone: "steel", shape: "fridge-french", className: "aspect-[4/5]" },
  { tone: "cool", shape: "ac-split", className: "aspect-[4/5]" },
  { tone: "night", shape: "tv", className: "aspect-[4/5]" },
  { tone: "electric", shape: "scooter", className: "aspect-[4/5]" },
];

export default function ShowroomPage() {
  return (
    <>
      <PageHero
        eyebrow="The Showroom"
        title="See it. Feel it. Choose it."
        line="Some things deserve to be seen in person."
        tone="warm"
        image={editorialMedia.showroomLarge}
        height="80vh"
      />

      <section className="theme-light section-y bg-ivory" aria-label="Our approach">
        <div className="container-lux grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Our approach" title="A showroom, not a warehouse." />
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="text-body-l">
              Abu Bakr Electronics brings home technology and electric mobility together under one roof in Lahore — presented properly, explained honestly, and
              delivered free across the city.
            </p>
            <p className="mt-6 text-fg-muted">
              <Placeholder field="founderStory" reviewOnly />
            </p>
          </Reveal>
        </div>
      </section>

      <section className="theme-light bg-ivory pb-[var(--section-y)]" aria-label="Gallery">
        <div className="container-lux">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
            {mosaic.map((m, i) => (
              <ImageReveal key={i} className={`rounded-sm ${m.className}`} delay={i * 0.06}>
                <SceneVisual tone={m.tone} shape={m.shape} drawingClassName="inset-x-[18%] top-[20%] bottom-[18%]" />
                {i === 0 && <ShowroomLines />}
              </ImageReveal>
            ))}
          </div>
          <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-muted">
            <Placeholder field="showroomPhotos" />
          </p>
        </div>
      </section>

      <section className="theme-dark section-y bg-obsidian" aria-label="Visit">
        <div className="container-lux">
          <SectionHeading eyebrow="Visit" title="Plan your visit." className="mb-14" />
          <VisitBlock />
          <HowOrderingWorks className="mt-24" />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
