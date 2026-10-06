"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Product } from "@/types/product";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const speed = [
  { value: "up-to-50", label: "Up to 50 km/h" },
  { value: "55-65", label: "55–65 km/h" },
  { value: "75", label: "75 km/h" },
];
const range = [
  { value: "80-110", label: "Range 80–110" },
  { value: "110-140", label: "110–140" },
  { value: "140+", label: "140+" },
];

/** V3 §9.4 — nine model cards on Bordeaux stages (white text), with speed / range filter pills. */
export function ModelGrid({ models }: { models: Product[] }) {
  const [s, setS] = useState<string | null>(null);
  const [r, setR] = useState<string | null>(null);
  const list = models.filter((m) => (!s || m.filters.speed === s) && (!r || m.filters.range === r));

  const Chip = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        "min-h-11 rounded-full border px-4 text-[14px] font-medium transition-colors",
        on ? "border-cherry bg-blush text-cherry" : "border-line bg-white text-ink-2 hover:border-ink",
      )}
    >
      {children}
    </button>
  );

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] md:mx-0 md:px-0">
          {speed.map((o) => (
            <Chip key={o.value} on={s === o.value} onClick={() => setS(s === o.value ? null : o.value)}>
              {o.label}
            </Chip>
          ))}
        </div>
        <div className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] md:mx-0 md:px-0">
          {range.map((o) => (
            <Chip key={o.value} on={r === o.value} onClick={() => setR(r === o.value ? null : o.value)}>
              {o.label}
            </Chip>
          ))}
        </div>
      </div>
      <motion.ul layout className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((m) => (
            <motion.li
              key={m.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: ease.lux }}
            >
              <Link
                href={`/mobility/${m.slug}`}
                className="theme-bordeaux group relative block overflow-hidden rounded-md p-6 text-white shadow-card transition-shadow duration-300 hover:shadow-lift"
                style={{ background: "radial-gradient(120% 80% at 50% 0%, #7A1830, #5C0F22 55%, #3E0A17)" }}
              >
                <div className="relative aspect-[16/10]">
                  <div className="absolute inset-x-[15%] bottom-0 h-[16%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,0,0,0.45),transparent_70%)] transition-[inset] duration-300 group-hover:inset-x-[10%]" />
                  <Image
                    src={m.image}
                    alt={`${m.name} electric scooty`}
                    fill
                    sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw"
                    className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-lux group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-[30px] leading-none">{m.name.replace("Jinpeng ", "")}</p>
                    <p className="mt-2 text-[14px] text-white/75">{m.tagline}</p>
                  </div>
                </div>
                <dl className="mt-5 grid grid-cols-3 border-t border-white/15 pt-4 text-[14px] tabular-nums">
                  {[
                    ["Speed", `${m.mobility!.topSpeedKmh} km/h`],
                    ["Range", `${m.mobility!.rangeKm[0]}–${m.mobility!.rangeKm[1]}`],
                    ["Motor", `${m.mobility!.motorW} W`],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">{k}</dt>
                      <dd className="mt-1">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {list.length === 0 && <p className="py-16 text-center text-fg-muted">No models match both filters. Clear one to see more.</p>}
    </div>
  );
}
