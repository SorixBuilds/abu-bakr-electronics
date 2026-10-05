import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { VisitBlock } from "@/components/layout/VisitBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { Photo } from "@/components/product/Media";
import { HowOrderingWorks } from "@/components/trust/HowOrderingWorks";
import { FinalCTA } from "@/components/home/FinalCTA";
import { editorialMedia } from "@/content/media";

export const metadata: Metadata = {
  title: "The Showroom",
  description: "Home technology and electric mobility under one roof in Lahore — presented properly, explained honestly, and delivered free across the city.",
};

const mosaic: { src: string; alt: string; className: string }[] = [
  { src: editorialMedia.showroom1, alt: "A warm-lit appliance display", className: "col-span-2 row-span-2 aspect-square md:aspect-auto" },
  { src: editorialMedia.kitchenDark2, alt: "A dark modern kitchen", className: "aspect-[4/5]" },
  { src: editorialMedia.kitchenDark3, alt: "A kitchen with a marble island", className: "aspect-[4/5]" },
  { src: "/images/categories/living.jpg", alt: "A living space with a wall-mounted TV", className: "aspect-[4/5]" },
  { src: editorialMedia.showroom2, alt: "A minimal retail interior", className: "aspect-[4/5]" },
];

export default function ShowroomPage() {
  return (
    <>
      <PageHero
        eyebrow="The Showroom"
        title="See it. Feel it. Choose it."
        line="Some things deserve to be seen in person."
        image={editorialMedia.showroom1}
        height="80vh"
      />

      <section className="theme-porcelain section-y bg-porcelain" aria-label="Our approach">
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

      <section className="theme-porcelain bg-porcelain pb-[var(--section-y)]" aria-label="Gallery">
        <div className="container-lux">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
            {mosaic.map((m, i) => (
              <ImageReveal key={i} className={`rounded-sm ${m.className}`} delay={i * 0.06}>
                <Photo src={m.src} alt={m.alt} sizes={i === 0 ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"} />
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
