"use client";

import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { home } from "@/content/home";
import { copy } from "@/content/copy";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { openWhatsApp } from "@/lib/whatsapp";

const DeliveryConstellation = dynamic(() => import("@/components/tools/DeliveryConstellation").then((m) => m.DeliveryConstellation), {
  ssr: false,
  loading: () => <div className="aspect-[4/5] md:aspect-square" />,
});

/** §6.8 — the two verified promises, made visible. */
export function DeliveryChapter() {
  return (
    <section className="theme-dark section-y bg-obsidian" aria-label="Delivery across Pakistan">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-[40fr_60fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={home.delivery.eyebrow} title={home.delivery.title} />
          <Reveal stagger={0.1} className="mt-12 flex flex-col">
            {[
              { t: "Free across Lahore", b: "Complimentary delivery anywhere in the city." },
              { t: "Across Pakistan", b: "We deliver nationwide. Ask an advisor about your city." },
            ].map((x) => (
              <div key={x.t} className="flex gap-5 border-t border-line py-6">
                <span aria-hidden className="mt-2 size-2 shrink-0 rotate-45 bg-gold" />
                <div>
                  <p className="text-[20px] font-medium">{x.t}</p>
                  <p className="mt-1 text-fg-muted">{x.b}</p>
                </div>
              </div>
            ))}
          </Reveal>
          <p className="mt-4 text-[13px] text-fg-muted">{copy.delivery.small}</p>
          <button
            onClick={() => openWhatsApp("Assalam o Alaikum, do you deliver to ___? I'm interested in: ")}
            className="group mt-10 inline-flex min-h-11 items-center gap-2 text-button"
          >
            <span className="link-lux pb-1">Check delivery to my city</span>
            <ArrowRight size={14} strokeWidth={1.25} className="text-gold transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="mx-auto w-full max-w-[720px]">
          <DeliveryConstellation />
        </div>
      </div>
    </section>
  );
}
