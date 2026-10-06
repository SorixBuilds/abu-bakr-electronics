"use client";

import Image from "next/image";
import { home } from "@/content/home";
import { asset } from "@/lib/media";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Heading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useUi } from "@/store/ui";

const duo = [
  { id: "fridge-2", left: 62, width: 46, height: 92, z: 1 },
  { id: "microwave-1", left: 28, width: 46, height: 30, z: 2 },
];

/** V3 §8.11 — Bordeaux block inside the container (radius 32) with real cutouts on the right. */
export function FinalCTA({ title = home.final.title, italic = home.final.italic }: { title?: string; italic?: string }) {
  const set = useUi((s) => s.set);
  return (
    <section className="theme-porcelain section-y bg-porcelain" aria-label="Speak to an advisor">
      <div className="container-lux">
        <Reveal
          className="theme-bordeaux relative grid overflow-hidden rounded-3xl text-white md:grid-cols-12"
          style={{ background: "radial-gradient(120% 120% at 85% 20%, #7A1830 0%, #5C0F22 45%, #3E0A17 100%)" }}
        >
          <div className="relative z-10 px-6 pb-4 pt-12 sm:px-10 md:col-span-7 md:py-20 lg:px-16">
            <Heading italic={italic} className="max-w-[14ch] text-white">
              {title}
            </Heading>
            <p className="mt-4 max-w-[40ch] text-body-l text-white/75">Tell us about your room, your kitchen or your commute. A real person will reply.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LuxuryButton variant="light" icon="whatsapp" iconPosition="start" onClick={() => set({ advisorOpen: true })}>
                WhatsApp us
              </LuxuryButton>
              <LuxuryButton variant="ghost" href="/shop" icon="arrow">
                Explore the collection
              </LuxuryButton>
            </div>
            <p className="mt-8 text-[13px] text-white/65">Free delivery across Lahore · Delivering across Pakistan</p>
          </div>
          <div className="relative h-[280px] md:col-span-5 md:h-auto">
            <div aria-hidden className="absolute inset-x-[6%] bottom-0 top-[18%] bg-[radial-gradient(ellipse_at_50%_85%,rgba(232,52,78,0.3),transparent_62%)]" />
            {duo.map((d) => {
              const a = asset(d.id);
              return (
                <div key={d.id} className="absolute bottom-[8%] -translate-x-1/2" style={{ left: `${d.left}%`, width: `${d.width}%`, height: `${d.height}%`, zIndex: d.z }}>
                  <span aria-hidden className="absolute bottom-0 left-1/2 h-[10%] w-[90%] -translate-x-1/2 translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.5),transparent_70%)]" />
                  <Image src={a.image} alt="" fill sizes="(max-width:768px) 45vw, 260px" className="object-contain object-bottom drop-shadow-[0_24px_30px_rgba(0,0,0,0.35)]" />
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
