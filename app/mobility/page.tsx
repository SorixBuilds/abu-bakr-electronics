import type { Metadata } from "next";
import Link from "next/link";
import { mobilityModels } from "@/data/mobility";
import { copy } from "@/content/copy";
import { ModelSelector } from "@/components/mobility/ModelSelector";
import { ModelGrid } from "@/components/mobility/ModelGrid";
import { MobilityFinalActions, MobilityHeroActions } from "@/components/mobility/MobilityHeroActions";
import { Container, Eyebrow, Heading, Section, SectionIntro } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Jinpeng Electric",
  description:
    "Electric bikes and scooties, including the Jinpeng range. Manufacturer-listed specifications, advisor guidance and free delivery across Lahore.",
};

const why = [
  { t: "No petrol", b: "Charge instead of queueing at the pump." },
  { t: "Less to maintain", b: "An electric motor has far fewer parts to service than an engine." },
  { t: "Charge at home", b: "Plug in overnight and start the day ready." },
];

const bordeaux = { background: "linear-gradient(180deg, #5C0F22, #3E0A17)" };

/** V3 §9.4 — Bordeaux hero with the model selector, all nine models, then a comparison table. */
export default function MobilityPage() {
  const sorted = [...mobilityModels].sort((a, b) => b.mobility!.topSpeedKmh - a.mobility!.topSpeedKmh);
  return (
    <>
      <section className="theme-bordeaux relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-16" style={bordeaux} aria-label="Jinpeng Electric">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <Eyebrow className="text-cherry-soft">Jinpeng Electric</Eyebrow>
            <Heading as="h1" size="display-l" italic="future" className="max-w-[14ch] text-white">
              The future of everyday movement.
            </Heading>
            <p className="max-w-[46ch] text-body-l text-white/75">Electric bikes & scooties, including the full Jinpeng range.</p>
            <MobilityHeroActions />
          </div>
          <div className="mt-10">
            <ModelSelector models={mobilityModels} variant="full" />
          </div>
        </Container>
      </section>

      <Section tone="porcelain" id="models" aria-label="All models">
        <Container>
          <SectionIntro eyebrow="The range" title="Nine models, one standard." italic="one" support="Filter by top speed or range. Every figure is manufacturer-listed." className="mb-10" />
          <ModelGrid models={mobilityModels} />
        </Container>
      </Section>

      <Section tone="white" aria-label="Compare Jinpeng models">
        <Container>
          <SectionIntro eyebrow="Side by side" title="Compare the range." italic="range" className="mb-8" />
          <Reveal className="overflow-x-auto rounded-md border border-line bg-white shadow-card">
            <table className="w-full min-w-[640px] text-left text-[15px] tabular-nums">
              <caption className="sr-only">Jinpeng models compared by top speed, range and motor power</caption>
              <thead className="bg-porcelain text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                <tr>
                  <th scope="col" className="px-5 py-4">Model</th>
                  <th scope="col" className="px-5 py-4">Top speed</th>
                  <th scope="col" className="px-5 py-4">Range</th>
                  <th scope="col" className="px-5 py-4">Motor</th>
                  <th scope="col" className="px-5 py-4"><span className="sr-only">Link</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {sorted.map((m) => (
                  <tr key={m.id}>
                    <th scope="row" className="px-5 py-4 font-display text-[20px] font-normal">{m.name.replace("Jinpeng ", "")}</th>
                    <td className="px-5 py-4">{m.mobility!.topSpeedKmh} km/h</td>
                    <td className="px-5 py-4">{m.mobility!.rangeKm[0]}–{m.mobility!.rangeKm[1]} km</td>
                    <td className="px-5 py-4">{m.mobility!.motorW} W</td>
                    <td className="px-5 py-4 text-right">
                      <Link href={`/mobility/${m.slug}`} className="link-lux font-semibold text-cherry">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="mt-4 text-[13px] text-muted">{copy.jinpeng}</p>
        </Container>
      </Section>

      <Section tone="porcelain" aria-label="Why electric">
        <Container>
          <SectionIntro eyebrow="Why electric" title="Simpler to own." italic="Simpler" className="mb-10" />
          <Reveal stagger={0.08} className="grid gap-4 md:grid-cols-3">
            {why.map((w, i) => (
              <div key={w.t} className="h-full rounded-md bg-white p-7 shadow-card">
                <span className="font-display text-[44px] leading-none text-bordeaux">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-5 text-[20px] font-semibold">{w.t}</p>
                <p className="mt-2 text-muted">{w.b}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <section className="theme-bordeaux section-y" style={bordeaux} aria-label="Ride before you decide">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Heading italic="decide" className="text-white">
              Ride before you decide.
            </Heading>
            <p className="mt-3 max-w-[44ch] text-body-l text-white/75">Ask an advisor about trying a model and they will confirm availability with you.</p>
          </div>
          <MobilityFinalActions />
        </Container>
      </section>
    </>
  );
}
