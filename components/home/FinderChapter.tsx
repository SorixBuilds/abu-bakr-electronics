"use client";

import { home } from "@/content/home";
import { Container, Section, SectionIntro } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ApplianceFinder } from "@/components/tools/ApplianceFinder";

/** V3 §8.8 — white section, centred card (max 760px, --shadow-card, radius 24), inline on every screen size. */
export function FinderChapter() {
  return (
    <Section tone="white" id="finder" aria-label="Appliance Finder">
      <Container>
        <SectionIntro eyebrow={home.finder.eyebrow} title={home.finder.title} italic={home.finder.italic} support={home.finder.support} align="center" className="mb-8 md:mb-10" />
        <Reveal className="mx-auto max-w-[760px] rounded-xl bg-white p-5 shadow-card ring-1 ring-line sm:p-8 md:p-10">
          <ApplianceFinder />
        </Reveal>
      </Container>
    </Section>
  );
}
