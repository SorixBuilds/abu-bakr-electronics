import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { VisitBlock } from "@/components/layout/VisitBlock";
import { Container, Section, SectionIntro } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { HowOrderingWorks } from "@/components/trust/HowOrderingWorks";
import { ShowroomChapter } from "@/components/home/ShowroomChapter";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "The Showroom",
  description: "Home technology and electric mobility under one roof in Lahore — presented properly, explained honestly, and delivered free across the city.",
};

/** Showroom page. Real shop photos only (V3 §3.5) — the gallery appears once the client's photos are in the manifest; never stock. */
export default function ShowroomPage() {
  return (
    <>
      <PageHero
        eyebrow="The showroom"
        title="See it. Feel it. Choose it."
        italic="Choose it."
        line="Some things deserve to be seen in person. Visit us in Lahore."
        assets={["fridge-2", "tv-2", "washer-1"]}
      />

      <Section tone="white" aria-label="Our approach">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionIntro eyebrow="Our approach" title="A showroom, not a warehouse." italic="showroom," />
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="text-body-l text-ink-2">
              Abu Bakr Electronics brings home technology and electric mobility together under one roof in Lahore — presented properly, explained honestly, and
              delivered free across the city.
            </p>
            <p className="mt-6 text-muted">
              <Placeholder field="founderStory" reviewOnly />
            </p>
            <p className="mt-4 text-muted">
              <Placeholder field="showroomPhotos" reviewOnly />
            </p>
          </Reveal>
        </Container>
      </Section>

      <ShowroomChapter />

      <Section tone="porcelain" aria-label="Visit">
        <Container>
          <SectionIntro eyebrow="Visit" title="Plan your visit." italic="visit." className="mb-8 md:mb-10" />
          <VisitBlock />
          <HowOrderingWorks className="mt-16 md:mt-24" />
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
