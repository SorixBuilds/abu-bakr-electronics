"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Truck, MapPin } from "lucide-react";
import { home } from "@/content/home";
import { copy } from "@/content/copy";
import { Container, Section, SectionIntro } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { openWhatsApp } from "@/lib/whatsapp";

const DeliveryConstellation = dynamic(() => import("@/components/tools/DeliveryConstellation").then((m) => m.DeliveryConstellation), {
  ssr: false,
  loading: () => <div className="aspect-[4/5] md:aspect-square" />,
});

/** V3 §8.10 — white: the two verified lines + "Check delivery to my city", the city constellation restyled for light. */
export function DeliveryChapter() {
  return (
    <Section tone="white" id="delivery" aria-label="Delivery across Pakistan">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionIntro eyebrow={home.delivery.eyebrow} title={home.delivery.title} italic={home.delivery.italic} />
          <Reveal stagger={0.08} className="mt-8 flex flex-col gap-3">
            {[
              { icon: Truck, t: "Free delivery across Lahore", b: "Complimentary, anywhere in the city." },
              { icon: MapPin, t: "Delivering across Pakistan", b: "Ask an advisor about your city." },
            ].map((x) => (
              <div key={x.t} className="flex items-center gap-4 rounded-md bg-porcelain p-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blush text-cherry">
                  <x.icon size={24} strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-[17px] font-semibold text-ink">{x.t}</span>
                  <span className="block text-[14px] text-muted">{x.b}</span>
                </span>
              </div>
            ))}
          </Reveal>
          <p className="mt-4 text-[13px] text-muted">{copy.delivery.small}</p>
          <LuxuryButton
            variant="cherry"
            icon="whatsapp"
            iconPosition="start"
            className="mt-8 w-full sm:w-auto"
            onClick={() => openWhatsApp("Assalam o Alaikum, do you deliver to ___? I'm interested in: ")}
          >
            Check delivery to my city
          </LuxuryButton>
        </div>
        <div className="mx-auto w-full max-w-[680px] lg:col-span-7">
          <WhenNear>
            <DeliveryConstellation />
          </WhenNear>
        </div>
      </Container>
    </Section>
  );
}

/** Mount children (and load their code) only when scrolled within ~600px. */
function WhenNear({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setNear(true), io.disconnect()), { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref}>{near ? children : <div className="aspect-[4/5] md:aspect-square" />}</div>;
}
