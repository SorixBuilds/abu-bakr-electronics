"use client";

import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { home } from "@/content/home";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { FridgeArt, finishes, type Finish } from "./FridgeArt";
import { useUi } from "@/store/ui";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/cn";

const steps = home.fridge.steps;

/** §6.3 — the one scroll-pinned product story. Desktop only; stacked cards on mobile / reduced motion. */
export function FridgeSpotlight() {
  const desktop = useIsDesktop();
  const reduced = useReducedMotionSafe();
  return desktop && !reduced ? <Pinned /> : <Stacked />;
}

function Ctas() {
  const set = useUi((s) => s.set);
  return (
    <div className="flex flex-wrap items-center gap-4">
      <LuxuryButton href="/shop/refrigeration" variant="ghost" icon="arrow">
        View Refrigerators
      </LuxuryButton>
      <LuxuryButton variant="text" onClick={() => set({ requestPriceId: "RF-01" })}>
        Request Price
      </LuxuryButton>
    </div>
  );
}

function Pinned() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  const [finish, setFinish] = useState<Finish>("steel");

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStep(Math.min(3, Math.floor(p * 4)));
    if (p >= 0.75) setFinish(p < 0.83 ? "steel" : p < 0.91 ? "glass" : "matte");
    else setFinish("steel");
  });

  const productScale = useTransform(scrollYProgress, [0, 0.12], [0.92, 1]);
  const productOpacity = useTransform(scrollYProgress, [0, 0.08], [0.3, 1]);
  const coolLight = useTransform(scrollYProgress, [0.22, 0.3, 0.48, 0.55], [0, 1, 1, 0]);
  const grain = useTransform(scrollYProgress, [0.48, 0.56], [1, 0]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dimLine = useTransform(scrollYProgress, [0.02, 0.18, 0.25, 0.28], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="theme-dark relative h-[400vh] bg-obsidian" aria-label="Freshness — refrigerator spotlight">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* stage light */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_55%_at_50%_30%,rgba(244,241,234,0.07),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_28%_8%_at_50%_86%,rgba(201,169,106,0.16),transparent_70%)]" />
        <motion.div className="pointer-events-none absolute inset-0 bg-[rgba(77,141,255,0.05)]" style={{ opacity: coolLight }} />
        <motion.div className="grain pointer-events-none absolute inset-0" style={{ opacity: grain }} />

        <div className="container-lux relative grid h-full grid-cols-[1fr_40%_30%] items-center gap-10">
          {/* Left: heading + step index */}
          <div className="flex h-full flex-col justify-between py-[14vh]">
            <div>
              <Eyebrow>{home.fridge.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-h1">{home.fridge.title}</h2>
            </div>
            <div className="relative pl-6">
              <span aria-hidden className="absolute left-0 top-1 h-[calc(100%-8px)] w-px bg-line" />
              <motion.span aria-hidden className="absolute left-0 top-1 h-[calc(100%-8px)] w-px origin-top bg-gold" style={{ scaleY: progress }} />
              <ol className="flex flex-col gap-6" aria-label="Story steps">
                {steps.map((s, i) => (
                  <li
                    key={s.n}
                    className={cn("font-mono text-[12px] tracking-[0.16em] transition-colors duration-500", i === step ? "text-gold" : "text-fg-muted/60")}
                  >
                    {s.n}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Centre: product */}
          <motion.div className="relative flex h-[78vh] items-center justify-center" style={{ scale: productScale, opacity: productOpacity }}>
            {finishes.map((f) => (
              <FridgeArt
                key={f.value}
                finish={f.value}
                className="absolute h-full w-auto transition-opacity duration-700 ease-in-out-lux"
                style={{ opacity: finish === f.value ? 1 : 0 }}
              />
            ))}
            {/* dimension line */}
            <motion.div className="absolute right-[6%] top-[4%] flex h-[84%] items-center gap-3" style={{ opacity: dimLine }} aria-hidden>
              <DimLine progress={dimLine} />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-gold [writing-mode:vertical-rl]">640 L · demo</span>
            </motion.div>
            {/* finish chips */}
            <div
              className={cn("absolute -bottom-2 flex gap-2 transition-all duration-500", step === 3 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}
            >
              {finishes.map((f) => (
                <span
                  key={f.value}
                  className={cn(
                    "flex items-center gap-2 rounded-xs border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em]",
                    finish === f.value ? "border-gold text-ivory" : "border-line text-fg-muted",
                  )}
                >
                  <span className="size-2.5 rounded-full border border-white/20" style={{ background: f.swatch }} />
                  {f.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: feature copy */}
          <div className="relative flex h-full flex-col justify-center gap-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                animate={{ opacity: i === step ? 1 : i < step ? 0.25 : 0, y: i <= step ? 0 : 24 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-h3">{s.title}</h3>
                <p className="mt-2 max-w-[34ch] text-[15px] text-fg-muted">{s.body}</p>
                {i === 3 && <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-muted/70">Finishes shown are illustrative</p>}
              </motion.div>
            ))}
            <motion.div animate={{ opacity: step === 3 ? 1 : 0, y: step === 3 ? 0 : 12 }} transition={{ duration: 0.5 }}>
              <Ctas />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DimLine({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative h-full w-2">
      <span className="absolute left-0 top-0 h-px w-2 bg-gold" />
      <motion.span className="absolute left-1/2 top-0 h-full w-px origin-top bg-gold" style={{ scaleY: progress }} />
      <span className="absolute bottom-0 left-0 h-px w-2 bg-gold" />
    </div>
  );
}

function Stacked() {
  return (
    <section className="theme-dark section-y bg-obsidian" aria-label="Freshness — refrigerator spotlight">
      <div className="container-lux">
        <Reveal y={12}>
          <Eyebrow>{home.fridge.eyebrow}</Eyebrow>
        </Reveal>
        <RevealText lines={home.fridge.title} className="mt-5 text-h1" />
        <div className="relative mx-auto mt-12 flex aspect-[3/4] max-h-[70svh] items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_10%_at_50%_92%,rgba(201,169,106,0.18),transparent_70%)]" />
          <FridgeArt finish="steel" className="relative h-full w-auto" />
        </div>
        <ul className="mt-12 flex flex-col gap-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.05} className="rounded-sm border border-line-soft bg-graphite p-6">
              <span className="font-mono text-[11px] tracking-[0.16em] text-gold">{s.n}</span>
              <h3 className="mt-3 text-h3">{s.title}</h3>
              <p className="mt-2 text-[15px] text-fg-muted">{s.body}</p>
              {i === 3 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {finishes.map((f) => (
                    <span
                      key={f.value}
                      className="flex items-center gap-2 rounded-xs border border-line px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-muted"
                    >
                      <span className="size-2.5 rounded-full border border-white/20" style={{ background: f.swatch }} />
                      {f.label}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </ul>
        <div className="mt-10">
          <Ctas />
        </div>
      </div>
    </section>
  );
}
