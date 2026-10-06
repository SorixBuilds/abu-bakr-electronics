"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { SpecTrio } from "./SpecTrio";
import { copy } from "@/content/copy";
import { ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** V3 §9.4 — model page stage: the real Jinpeng photo on Bordeaux, specs counting up on load. */
export function ModelStage({ model }: { model: Product }) {
  const reduced = useReducedMotionSafe();
  const zero = { topSpeedKmh: 0, rangeKm: [0, 0] as [number, number], motorW: 0 };
  return (
    <section
      className="theme-bordeaux relative overflow-hidden pb-12 pt-8 md:pb-16"
      style={{ background: "linear-gradient(180deg, #5C0F22, #3E0A17)" }}
      aria-label={`${model.name}`}
    >
      <div className="container-lux relative">
        <nav aria-label="Breadcrumb" className="text-[13px] text-white/70">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/mobility" className="link-lux hover:text-white">
                Jinpeng Electric
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-white">
              {model.name.replace("Jinpeng ", "")}
            </li>
          </ol>
        </nav>
        <p className="mt-8 text-center text-eyebrow text-cherry-soft">Jinpeng · Electric scooty</p>
        <h1 className="mt-3 text-center text-display-l text-white">{model.name}</h1>
        <p className="mt-3 text-center font-display text-[22px] italic text-white/80">{model.tagline}</p>
        <motion.div
          className="relative mx-auto mt-4 aspect-[16/10] max-h-[50vh] w-full max-w-[880px]"
          initial={{ opacity: 0, x: reduced ? 0 : 60, scale: reduced ? 1 : 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: reduced ? 0.15 : 0.8, ease: ease.lux }}
        >
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_85%,rgba(232,52,78,0.25),transparent_60%)]" />
          <div aria-hidden className="absolute inset-x-[18%] bottom-[3%] h-[12%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.45),transparent_70%)]" />
          <Image
            src={model.image}
            alt={`${model.name} electric scooty`}
            fill
            priority
            sizes="(max-width:900px) 100vw, 880px"
            className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]"
          />
        </motion.div>
        <TrioOnLoad spec={model.mobility!} zero={zero} />
        <p className="mx-auto mt-6 max-w-[60ch] text-center text-[13px] text-white/70">{copy.jinpeng}</p>
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
  return <SpecTrio spec={s} className="mx-auto mt-6 max-w-[760px]" />;
}
