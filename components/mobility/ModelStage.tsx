"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { ScooterArt } from "./ScooterArt";
import { SpecTrio } from "./SpecTrio";
import { scooterVariant } from "./ModelSelector";
import { copy } from "@/content/copy";
import { ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** §8.4 — model on obsidian, name 18vw faint behind, spec trio tweening up on load. */
export function ModelStage({ model }: { model: Product }) {
  const reduced = useReducedMotionSafe();
  const name = model.name.replace("Jinpeng ", "");
  const zero = { topSpeedKmh: 0, rangeKm: [0, 0] as [number, number], motorW: 0 };
  return (
    <section className="relative -mt-[60px] overflow-hidden pb-14 pt-32 lg:-mt-[72px] lg:pt-36" aria-label={`${model.name} stage`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_32%_at_50%_58%,rgba(201,169,106,0.13),transparent_75%)]" />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[14%] select-none text-center text-[18vw] font-semibold uppercase leading-none tracking-[-0.03em] text-white/[0.045]"
        initial={{ opacity: 0, y: reduced ? 0 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: ease.outExpo }}
      >
        {name}
      </motion.span>
      <div className="container-lux relative">
        <p className="text-center text-eyebrow text-fg-muted">Jinpeng · Electric scooty</p>
        <h1 className="mt-4 text-center text-h1">{model.name}</h1>
        <motion.div
          className="mx-auto mt-6 aspect-[16/10] max-h-[52vh] w-full max-w-[900px]"
          initial={{ opacity: 0, x: reduced ? 0 : 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: ease.outExpo, delay: 0.1 }}
        >
          <ScooterArt variant={scooterVariant(model)} className="h-full w-full" label={`${model.name} (illustration)`} />
        </motion.div>
        <TrioOnLoad spec={model.mobility!} zero={zero} />
        <p className="mx-auto mt-6 max-w-[60ch] text-center text-[12.5px] text-fg-muted">{copy.jinpeng}</p>
      </div>
    </section>
  );
}

function TrioOnLoad({ spec, zero }: { spec: NonNullable<Product["mobility"]>; zero: NonNullable<Product["mobility"]> }) {
  const [s, setS] = useState(zero);
  useEffect(() => {
    const t = setTimeout(() => setS(spec), 250);
    return () => clearTimeout(t);
  }, [spec]);
  return <SpecTrio spec={s} className="mx-auto mt-8 max-w-[880px]" />;
}
