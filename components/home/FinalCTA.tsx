"use client";

import { home } from "@/content/home";
import { editorialMedia } from "@/content/media";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/product/Media";
import { useUi } from "@/store/ui";
import { wineOverlay } from "@/lib/brand";

/** V2 §7.10 — night interior photo, wine overlay, white headline, cherry primary + light ghost. */
export function FinalCTA({ title = home.final.title }: { title?: string }) {
  const set = useUi((s) => s.set);
  return (
    <section className="theme-wine relative overflow-hidden" aria-label="Speak to an advisor">
      <Photo src={editorialMedia.livingNight} alt="" sizes="100vw" />
      <div className="absolute inset-0" style={{ background: wineOverlay }} />
      <div className="grain absolute inset-0" />
      <div className="container-lux relative flex min-h-[72svh] flex-col items-center justify-center py-28 text-center">
        <RevealText
          as="h2"
          lines={title}
          mode="words"
          className="mx-auto max-w-[14ch] justify-center text-[clamp(40px,6vw,92px)] font-normal leading-[0.98] tracking-[-0.025em] [&_span.flex]:justify-center"
        />
        <Reveal delay={0.4} y={16} className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <LuxuryButton variant="cherry" icon="whatsapp" iconPosition="start" magnetic onClick={() => set({ advisorOpen: true })}>
            Speak to an Advisor
          </LuxuryButton>
          <LuxuryButton variant="ghost" href="/shop" icon="arrow" magnetic>
            Explore the Collection
          </LuxuryButton>
        </Reveal>
        <Reveal delay={0.55} y={8}>
          <p className="mt-10 font-mono text-[11px] tracking-[0.12em] text-on-wine-muted">Free delivery across Lahore · Delivering across Pakistan</p>
        </Reveal>
      </div>
    </section>
  );
}
