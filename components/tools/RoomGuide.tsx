"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Counter } from "@/components/ui/Counter";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { explain, suggestTons, sunLabels, tonFilter, tonLabel, type People, type Sun } from "@/lib/roomGuide";
import { openWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { productsIn } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

/**
 * V3 §8.5 — room size slider, sun, people → suggested tonnage (logic from V1 §6.4, unchanged).
 * Full layout: controls left, white result card right with the tonnage in 72px Bodoni cherry, matching AC cards below.
 * `compact` (shop page sidebar) stacks everything and omits the cards.
 */
export function RoomGuide({ compact, onTons, showMatches }: { compact?: boolean; onTons?: (t: number) => void; showMatches?: boolean }) {
  const [size, setSize] = useState(150);
  const [sun, setSun] = useState<Sun>("normal");
  const [people, setPeople] = useState<People>("1-2");
  const tons = suggestTons({ size, sun, people });
  const big = tons >= 3;
  const fill = ((size - 80) / (400 - 80)) * 100;

  useTonsCallback(tons, onTons);

  const ask = () =>
    openWhatsApp(
      `Assalam o Alaikum, I'd like help choosing an air conditioner.\nRoom size: ${size} sq ft\nSun exposure: ${sunLabels[sun]}\nPeople usually in the room: ${people}\nThe website guide suggested: ${tonLabel(tons)}\nCould an advisor confirm?`,
    );

  const controls = (
    <div className={cn("flex flex-col", compact ? "gap-7" : "gap-8")}>
      <div>
        <div className="flex items-end justify-between gap-4">
          <label htmlFor="room-size" className="text-eyebrow text-muted">
            Room size
          </label>
          <span className="flex items-baseline gap-2">
            <Counter value={size} className="font-display text-[44px] leading-none text-ink md:text-[56px]" duration={0.3} />
            <span className="text-[13px] font-semibold text-muted">sq ft</span>
          </span>
        </div>
        <input
          id="room-size"
          type="range"
          min={80}
          max={400}
          step={10}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="lux-range mt-4"
          style={{ ["--fill" as string]: `${fill}%` }}
          aria-valuetext={`${size} square feet`}
        />
        <div className="mt-1 flex justify-between text-[12px] text-muted">
          <span>80</span>
          <span>400</span>
        </div>
      </div>
      <SegmentedControl
        label="Sun exposure"
        value={sun}
        onChange={setSun}
        options={[
          { value: "shaded", label: "Shaded" },
          { value: "normal", label: "Normal" },
          { value: "very", label: "Very sunny / top floor" },
        ]}
      />
      <SegmentedControl
        label="People usually in the room"
        value={people}
        onChange={setPeople}
        options={[
          { value: "1-2", label: "1–2" },
          { value: "3-4", label: "3–4" },
          { value: "5+", label: "5+" },
        ]}
      />
      <p className="text-[13px] italic leading-relaxed text-muted">
        A general guide only. Ceiling height, insulation and window area matter — an advisor will confirm before you buy.
      </p>
    </div>
  );

  const result = (
    <div className="rounded-xl bg-white p-6 shadow-card md:p-8" aria-live="polite">
      <p className="text-eyebrow text-muted">Suggested capacity</p>
      <p className="mt-3 flex items-baseline gap-3">
        <span className="font-display text-[64px] leading-none tracking-[-0.02em] text-cherry md:text-[72px]">
          {big ? "3+" : <Counter value={tons} decimals={tons % 1 ? 1 : 0} duration={0.4} />}
        </span>
        <span className="text-[20px] font-semibold text-ink">ton</span>
      </p>
      <p className="mt-3 text-[15px] text-ink-2">{explain(tons, { size, sun, people })}</p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
        {big ? (
          <LuxuryButton size="md" icon="whatsapp" iconPosition="start" variant="cherry" onClick={ask}>
            Speak to an advisor
          </LuxuryButton>
        ) : (
          <>
            <LuxuryButton size="md" variant="cherry" href={`/shop/cooling?tonnage=${encodeURIComponent(tonFilter(tons))}`} icon="arrow">
              See {tonLabel(tons)} ACs
            </LuxuryButton>
            <button onClick={ask} className="link-lux min-h-11 text-left text-[15px] font-semibold text-cherry">
              Ask an advisor to confirm
            </button>
          </>
        )}
      </div>
    </div>
  );

  if (compact) {
    return (
      <div className="flex flex-col gap-7">
        {controls}
        {result}
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">{controls}</div>
      <div className="flex flex-col gap-6 lg:col-span-7">
        {result}
        {showMatches && !big && <Matches tons={tons} />}
      </div>
    </div>
  );
}

/** 2–3 AC cards for the suggested capacity (falls back to the full range). */
function Matches({ tons }: { tons: number }) {
  const t = tonFilter(tons);
  const exact = productsIn("cooling").filter((p) => p.filters.tonnage === t);
  const items = [...exact, ...productsIn("cooling").filter((p) => !exact.includes(p))].slice(0, 2);
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 md:gap-4">
        {items.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} variant="compact" sizes="(max-width:768px) 45vw, 300px" />
          </li>
        ))}
      </ul>
      <Link href="/shop/cooling" className="group mt-4 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-cherry">
        <span className="link-lux">All air conditioners</span>
        <ArrowRight size={16} strokeWidth={1.75} className="transition-transform group-hover:translate-x-[3px]" />
      </Link>
    </div>
  );
}

/** Notify parent whenever tonnage changes. */
function useTonsCallback(v: number, cb?: (v: number) => void) {
  const ref = useRef(cb);
  useEffect(() => {
    ref.current = cb;
  });
  useEffect(() => {
    ref.current?.(v);
  }, [v]);
}
