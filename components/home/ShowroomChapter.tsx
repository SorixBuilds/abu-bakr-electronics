"use client";

import { home } from "@/content/home";
import { shopPhotos } from "@/lib/media";
import { Container, Section, SectionIntro } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/product/Media";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Placeholder } from "@/components/ui/Placeholder";
import { site } from "@/content/site";
import { useUi } from "@/store/ui";

/**
 * V3 §8.9 — "See it. Feel it. Choose it." with the client's real shop photos (Mode B framing):
 * one large (7 cols, 4:5) + two stacked (5 cols). Hidden entirely until ≥3 shop photos exist in the manifest — never stock.
 */
export function ShowroomChapter() {
  const set = useUi((s) => s.set);
  if (shopPhotos.length < 3) return null;
  const [big, a, b] = shopPhotos;
  return (
    <Section tone="porcelain" id="showroom" aria-label="Our showroom">
      <Container>
        <SectionIntro eyebrow={home.showroom.eyebrow} title={home.showroom.title} italic={home.showroom.italic} support={home.showroom.support} className="mb-10" />
        <div className="grid gap-3 md:grid-cols-12 md:gap-4">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-lg md:col-span-7">
            <Photo src={`/${big.file}`} alt={big.alt} sizes="(max-width:768px) 100vw, 58vw" />
          </Reveal>
          <div className="grid gap-3 md:col-span-5 md:gap-4">
            {[a, b].map((p) => (
              <Reveal key={p.file} className="relative aspect-[16/10] overflow-hidden rounded-lg md:aspect-auto">
                <Photo src={`/${p.file}`} alt={p.alt} sizes="(max-width:768px) 100vw, 40vw" />
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 text-[15px] text-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <Placeholder field="address" /> · <Placeholder field="hours" />
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {site.mapsUrl.value && (
              <LuxuryButton variant="secondary" href={site.mapsUrl.value} external>
                Get directions
              </LuxuryButton>
            )}
            <LuxuryButton variant="cherry" icon="whatsapp" iconPosition="start" onClick={() => set({ advisorOpen: true })}>
              WhatsApp us
            </LuxuryButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
