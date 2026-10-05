import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mobilityModels } from "@/data/mobility";
import { mobilityImage } from "@/content/media";
import { copy } from "@/content/copy";
import { PageHero } from "@/components/layout/PageHero";
import { ModelSelector } from "@/components/mobility/ModelSelector";
import { ModelGrid } from "@/components/mobility/ModelGrid";
import { MobilityFinalActions, MobilityHeroActions } from "@/components/mobility/MobilityHeroActions";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { wineGradient } from "@/lib/brand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Electric Mobility",
  description:
    "Electric bikes and scooties, including the Jinpeng range. Manufacturer-listed specifications, advisor guidance and free delivery across Lahore.",
};

const why = [
  { t: "No petrol", b: "Charge instead of queueing at the pump." },
  { t: "Fewer moving parts to maintain", b: "An electric motor has far fewer parts to service than an engine." },
  { t: "Charge at home", b: "Plug in overnight and start the day ready." },
];

export default function MobilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Electric Mobility · Jinpeng"
        title="The future of everyday movement."
        line="Electric bikes and scooties, including the Jinpeng range."
        image={mobilityImage("thrill")}
        contain
        overlay="wine"
        height="88vh"
      >
        <MobilityHeroActions />
      </PageHero>

      <section className="theme-wine section-y" style={{ background: wineGradient }} aria-label="Model selector">
        <div className="container-lux">
          <ModelSelector models={mobilityModels} variant="full" />
        </div>
      </section>

      <section id="models" className="theme-dark section-y scroll-mt-20 bg-obsidian" aria-label="All models">
        <div className="container-lux">
          <SectionHeading
            eyebrow="The Range"
            title="Nine models."
            support="Filter by top speed or range. Every figure is manufacturer-listed."
            className="mb-12"
          />
          <ModelGrid models={mobilityModels} />
          <p className="mt-8 text-[12.5px] text-fg-muted">{copy.jinpeng}</p>
        </div>
      </section>

      <section className="theme-porcelain section-y bg-porcelain" aria-label="Why electric">
        <div className="container-lux">
          <SectionHeading eyebrow="Why electric" title="Simpler to own." className="mb-14" />
          <Reveal stagger={0.1} className="grid gap-px md:grid-cols-3">
            {why.map((w, i) => (
              <div key={w.t} className="border-t border-line py-8 md:pr-10">
                <span className="font-serif text-[44px] leading-none text-wine-500">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-6 text-[20px] font-medium">{w.t}</p>
                <p className="mt-2 max-w-[34ch] text-fg-muted">{w.b}</p>
              </div>
            ))}
          </Reveal>
          <Link href="/compare?ids=JP-01,JP-02,JP-04" className="group mt-14 inline-flex min-h-11 items-center gap-2 text-button">
            <span className="link-lux pb-1">Compare Jinpeng models</span>
            <ArrowRight size={14} strokeWidth={1.25} className="text-accent-text transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="theme-dark section-y bg-obsidian" aria-label="Book a test ride">
        <div className="container-lux flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <SectionHeading title="Ride before you decide." support="Request a test ride and an advisor will confirm availability with you." />
          <MobilityFinalActions />
        </div>
      </section>
    </>
  );
}
