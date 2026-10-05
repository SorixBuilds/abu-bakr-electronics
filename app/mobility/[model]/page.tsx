import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getModel, mobilityModels } from "@/data/mobility";
import { copy } from "@/content/copy";
import { BuyBox } from "@/components/product/BuyBox";
import { SpecGrid } from "@/components/product/SpecGrid";
import { RelatedRail } from "@/components/product/RelatedRail";
import { StillDeciding } from "@/components/product/StillDeciding";
import { TrustStrip } from "@/components/trust/TrustStrip";
import { ModelStage } from "@/components/mobility/ModelStage";
import { Reveal } from "@/components/ui/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return mobilityModels.map((m) => ({ model: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/mobility/[model]">): Promise<Metadata> {
  const { model } = await params;
  const m = getModel(model);
  if (!m) return {};
  return { title: m.name, description: `${m.tagline} ${m.keySpecs.join(" · ")} (manufacturer-listed). Price on request.` };
}

export default async function ModelPage({ params }: PageProps<"/mobility/[model]">) {
  const { model } = await params;
  const m = getModel(model);
  if (!m) notFound();
  const others = mobilityModels.filter((x) => x.id !== m.id);
  const name = m.name.replace("Jinpeng ", "");

  return (
    <div className="theme-dark bg-obsidian">
      <ModelStage model={m} />

      <section className="container-lux pb-16 pt-6">
        <nav aria-label="Breadcrumb" className="mb-10 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/mobility" className="link-lux hover:text-fg">
                Electric Mobility
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-fg/70">
              {m.name}
            </li>
          </ol>
        </nav>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {m.mobility?.highlights?.length ? (
              <>
                <h2 className="text-eyebrow text-fg-muted">Highlights</h2>
                <Reveal stagger={0.06} as="ul" className="mt-6 grid gap-px sm:grid-cols-2">
                  {m.mobility.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-4 border-t border-line py-5">
                      <span aria-hidden className="size-1.5 rotate-45 bg-gold" />
                      <span className="text-[17px]">{h}</span>
                    </div>
                  ))}
                </Reveal>
              </>
            ) : (
              <p className="max-w-[44ch] text-lede text-fg/80">
                {m.tagline} Ask an advisor for the full feature list and current availability of the {name}.
              </p>
            )}
            <div className="mt-16">
              <h2 className="mb-8 text-h2">Specifications</h2>
              <SpecGrid specs={m.specs} caption={copy.jinpeng} />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <BuyBox product={m} testRide headingAs="h2" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-lux section-y flex flex-col gap-24">
        <TrustStrip />
        <RelatedRail products={others} title="Other models" />
        <StillDeciding />
      </section>
    </div>
  );
}
