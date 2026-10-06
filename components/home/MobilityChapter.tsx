import { homeSelectorOrder, mobilityModels } from "@/data/mobility";
import { Container, Eyebrow, Heading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ModelSelector } from "@/components/mobility/ModelSelector";

const models = homeSelectorOrder.map((s) => mobilityModels.find((m) => m.slug === s)!);

/** V3 §8.7 — "The Bordeaux Room": full-bleed Bordeaux, white type, real Jinpeng photos. */
export function MobilityChapter() {
  return (
    <section
      id="jinpeng"
      aria-label="Jinpeng Electric"
      className="theme-bordeaux section-y relative scroll-mt-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #5C0F22, #3E0A17)" }}
    >
      <Container>
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow className="text-cherry-soft">Jinpeng Electric</Eyebrow>
          <Heading italic="future" className="max-w-[16ch] text-white">
            The future of everyday movement.
          </Heading>
          <p className="max-w-[46ch] text-body-l text-white/75">Electric bikes & scooties, presented properly.</p>
        </Reveal>
        <div className="mt-10 md:mt-12">
          <ModelSelector models={models} />
        </div>
      </Container>
    </section>
  );
}
