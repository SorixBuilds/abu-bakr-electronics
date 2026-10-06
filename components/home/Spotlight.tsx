"use client";

import Link from "next/link";
import { useState } from "react";
import { getProductById, productsIn } from "@/data/products";
import { Stage, ProductCut } from "@/components/ui/Stage";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useUi } from "@/store/ui";
import { productHref } from "@/lib/format";
import { copy } from "@/content/copy";
import { cn } from "@/lib/cn";

/** Four key facts for the spotlight (2×2, Bodoni). Generic by type — labelled illustrative. */
const facts = [
  { value: "4", label: "Doors, French-door layout" },
  { value: "No-frost", label: "Cooling" },
  { value: "Water & ice", label: "Door dispenser" },
  { value: "Dark steel", label: "Finish" },
];

/** V3 §8.4 — one product: a big Frost stage, name, italic line, 2×2 facts, Request price + View details, then siblings. */
export function Spotlight() {
  const fridges = productsIn("refrigeration");
  const [id, setId] = useState("RF-01");
  const p = getProductById(id)!;
  const set = useUi((s) => s.set);

  return (
    <Section tone="white" id="spotlight" aria-label="Spotlight">
      <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          <Stage category="refrigeration" radius="2xl" className="aspect-[4/5] sm:aspect-[5/5] lg:aspect-[6/6]">
            <ProductCut key={p.id} id={p.asset!} scale={1.06} sizes="(max-width:1024px) 92vw, 720px" />
          </Stage>
          <ul className="mt-3 grid grid-cols-3 gap-3" aria-label="More refrigerators">
            {fridges.map((f) => (
              <li key={f.id}>
                <button
                  onClick={() => setId(f.id)}
                  aria-pressed={f.id === id}
                  aria-label={f.name}
                  className={cn("block w-full rounded-sm ring-offset-2 transition-shadow", f.id === id ? "ring-2 ring-cherry" : "ring-1 ring-line hover:ring-ink-2")}
                >
                  <Stage category="refrigeration" radius="md" className="aspect-[4/3]">
                    <ProductCut id={f.asset!} sizes="160px" shadow={false} scale={1.1} />
                  </Stage>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <Eyebrow>Spotlight · Refrigerators</Eyebrow>
          <h2 className="mt-4 text-h2">{p.name}</h2>
          <p className="mt-3 font-display text-[22px] italic text-ink-2 md:text-[26px]">{p.tagline}</p>
          {p.id === "RF-01" && (
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-7">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display text-[26px] leading-none tracking-[-0.02em] text-ink sm:text-[34px] md:text-[44px]">{f.value}</dd>
                  <dd className="mt-2 text-[14px] text-muted">{f.label}</dd>
                </div>
              ))}
            </dl>
          )}
          {p.id !== "RF-01" && <p className="mt-8 max-w-[44ch] border-t border-line pt-7 text-body-l text-ink-2">{p.description}</p>}
          <p className="mt-6 text-[13px] text-muted">{copy.demoSpecs}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LuxuryButton variant="cherry" onClick={() => set({ requestPriceId: p.id })}>
              Request price
            </LuxuryButton>
            <LuxuryButton variant="secondary" href={productHref(p)} icon="arrow">
              View details
            </LuxuryButton>
          </div>
          <Link href="/shop/refrigeration" className="link-lux mt-6 inline-flex min-h-11 items-center text-[15px] font-semibold text-cherry">
            All refrigerators →
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
