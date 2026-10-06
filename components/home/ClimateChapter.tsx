import { home } from "@/content/home";
import { Container, Section, SectionIntro } from "@/components/ui/Section";
import { RoomGuide } from "@/components/tools/RoomGuide";

/** V3 §8.5 — Ice-tinted section: guide on the left, result card + matching AC cards on the right (inside RoomGuide). */
export function ClimateChapter() {
  return (
    <Section tone="ice" id="room-guide" aria-label="Room Cooling Guide">
      <Container>
        <SectionIntro eyebrow={home.climate.eyebrow} title={home.climate.title} italic={home.climate.italic} support={home.climate.support} className="mb-10 md:mb-12" />
        <RoomGuide showMatches />
      </Container>
    </Section>
  );
}
