"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Counter } from "@/components/ui/Counter";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { explain, suggestTons, sunLabels, tonFilter, tonLabel, type People, type Sun } from "@/lib/roomGuide";
import { openWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export function RoomGuide({ compact, onTons }: { compact?: boolean; onTons?: (t: number) => void }) {
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

  return (
    <div className={cn("flex flex-col", compact ? "gap-7" : "gap-9")}>
      <div>
        <div className="flex items-end justify-between gap-4">
          <label htmlFor="room-size" className="text-eyebrow text-fg-muted">
            Room size
          </label>
          <span className="flex items-baseline gap-2">
            <Counter value={size} className="font-mono text-[44px] leading-none text-gold-text md:text-[56px]" duration={0.3} />
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-fg-muted">sq ft</span>
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
        <div className="mt-1 flex justify-between font-mono text-[10.5px] text-fg-muted">
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

      <div className="rounded-sm border border-line bg-[color-mix(in_srgb,var(--stage)_70%,transparent)] p-6 md:p-7" aria-live="polite">
        <p className="text-eyebrow text-fg-muted">Suggested capacity</p>
        <p className="mt-3 flex items-baseline gap-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={big ? "big" : "n"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-[44px] font-medium leading-none tracking-[-0.02em]"
            >
              {big ? "3+" : <Counter value={tons} decimals={tons % 1 ? 1 : 0} duration={0.4} />}
            </motion.span>
          </AnimatePresence>
          <span className="text-[20px] font-medium">ton</span>
        </p>
        <p className="mt-3 text-[14px] text-fg-muted">{explain(tons, { size, sun, people })}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          {big ? (
            <LuxuryButton size="md" icon="whatsapp" iconPosition="start" onClick={ask}>
              Speak to an advisor
            </LuxuryButton>
          ) : (
            <>
              <Link href={`/shop/cooling?tonnage=${encodeURIComponent(tonFilter(tons))}`} className="group inline-flex min-h-11 items-center gap-2 text-button">
                <span className="link-lux pb-1">See {tonLabel(tons)} air conditioners</span>
                <ArrowRight size={14} strokeWidth={1.25} className="text-gold-text transition-transform group-hover:translate-x-1" />
              </Link>
              <button onClick={ask} className="min-h-11 text-left text-[14px] text-fg-muted underline-offset-4 hover:text-fg hover:underline">
                Ask an advisor to confirm
              </button>
            </>
          )}
        </div>
      </div>
      <p className="text-[12.5px] italic leading-relaxed text-fg-muted">
        A general guide only. Ceiling height, insulation and window area matter — an advisor will confirm before you buy.
      </p>
    </div>
  );
}

/** Notify parent (decorative air overlay) whenever tonnage changes. */
function useTonsCallback(v: number, cb?: (v: number) => void) {
  const ref = useRef(cb);
  useEffect(() => {
    ref.current = cb;
  });
  useEffect(() => {
    ref.current?.(v);
  }, [v]);
}
