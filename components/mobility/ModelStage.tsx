"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import Image from "next/image";
import { SpecTrio } from "./SpecTrio";
import { wineGradient } from "@/lib/brand";
import { copy } from "@/content/copy";
import { ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** V2 §7.4/§8.4 — real model photo on the wine stage, name faint behind, spec trio tweening up on load. */
export function ModelStage({ model }: { model: Product }) {
  const reduced = useReducedMotionSafe();
  const name = model.name.replace("Jinpeng ", "");
  const zero = { topSpeedKmh: 0, rangeKm: [0, 0] as [number, number], motorW: 0 };
  return (
    <section
      className="theme-wine relative -mt-[60px] overflow-hidden pb-14 pt-32 lg:-mt-[72px] lg:pt-36"
      style={{ background: wineGradient }}
      aria-label={`${model.name} stage`}
    >
      <div className="grain pointer-events-none absolute inset-0" />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[14%] select-none text-center text-[18vw] font-semibold uppercase leading-none tracking-[-0.03em] text-white/[0.06]"
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
          className="relative mx-auto mt-6 aspect-[16/10] max-h-[52vh] w-full max-w-[900px]"
          initial={{ opacity: 0, x: reduced ? 0 : 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: ease.outExpo, delay: 0.1 }}
        >
          <div className="absolute inset-x-[18%] bottom-[2%] h-[14%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,0,0,0.5),transparent_70%)]" />
          <Image
            src={model.image}
            alt={`${model.name} electric scooty`}
            fill
            priority
            sizes="(max-width:900px) 100vw, 900px"
            className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]"
          />
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
