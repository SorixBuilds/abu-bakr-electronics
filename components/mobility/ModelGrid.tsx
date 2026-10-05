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

/** §8.3.3 — nine model cards, automotive style, with speed / range filter chips. */
export function ModelGrid({ models }: { models: Product[] }) {
  const [s, setS] = useState<string | null>(null);
  const [r, setR] = useState<string | null>(null);
  const list = models.filter((m) => (!s || m.filters.speed === s) && (!r || m.filters.range === r));

  const Chip = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        "min-h-11 rounded-xs border px-4 text-[13px] transition-colors",
        on ? "border-accent bg-[rgba(179,18,46,0.08)] text-fg" : "border-line text-fg-muted hover:text-fg",
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
              transition={{ duration: 0.5, ease: ease.outExpo }}
            >
              <Link
                href={`/mobility/${m.slug}`}
                className="group relative block overflow-hidden rounded-md border border-line-soft p-6"
                style={{ background: "radial-gradient(ellipse at 50% 30%, #4a0d1b, var(--wine-900) 80%)" }}
              >
                <span className="pointer-events-none absolute left-5 top-3 select-none text-[64px] font-semibold uppercase leading-none tracking-[-0.03em] text-white/[0.07]">
                  {m.name.replace("Jinpeng ", "")}
                </span>
                <div className="relative aspect-[16/10]">
                  <div className="absolute inset-x-[15%] bottom-0 h-[16%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,0,0,0.45),transparent_70%)]" />
                  <Image
                    src={m.image}
                    alt={`${m.name} electric scooty`}
                    fill
                    sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw"
                    className="object-contain transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[24px] font-medium leading-none">{m.name.replace("Jinpeng ", "")}</p>
                    <p className="mt-2 text-[13px] text-fg-muted">{m.tagline}</p>
                  </div>
                </div>
                <dl className="mt-5 grid grid-cols-3 border-t border-line-soft pt-4 font-mono text-[13px]">
                  {[
                    ["Speed", `${m.mobility!.topSpeedKmh} km/h`],
                    ["Range", `${m.mobility!.rangeKm[0]}–${m.mobility!.rangeKm[1]}`],
                    ["Motor", `${m.mobility!.motorW} W`],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[10px] uppercase tracking-[0.16em] text-fg-muted">{k}</dt>
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
