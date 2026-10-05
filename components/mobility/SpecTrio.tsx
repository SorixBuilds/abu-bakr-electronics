"use client";

import { Counter } from "@/components/ui/Counter";
import { RangeRing } from "./RangeRing";
import type { MobilitySpec } from "@/types/product";
import { cn } from "@/lib/cn";

/** TOP SPEED · RANGE · MOTOR — Jinpeng's category language, staged like a configurator. */
export function SpecTrio({ spec, className, compact }: { spec: MobilitySpec; className?: string; compact?: boolean }) {
  const num = compact ? "text-[24px] sm:text-[32px]" : "text-[22px] min-[400px]:text-[26px] sm:text-[40px] lg:text-[56px]";
  const unit = "ml-1 text-[10px] tracking-[0.12em] text-fg-muted md:text-[12px]";
  const label = "order-2 mt-3 font-mono text-[10px] tracking-[0.2em] text-fg-muted md:text-[11px]";
  const ring = !compact;
  return (
    <dl className={cn("grid grid-cols-3 items-center", className)}>
      <div className="relative flex flex-col items-center px-2 text-center">
        <dt className={label}>TOP SPEED</dt>
        <dd className={cn("order-1 whitespace-nowrap font-mono leading-none tabular-nums", num)}>
          <Counter value={spec.topSpeedKmh} />
          <span className={unit}>KM/H</span>
        </dd>
      </div>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center border-x border-gold/40 px-2 text-center",
          ring && "md:aspect-square md:max-h-[300px] md:border-x-0",
        )}
      >
        <dt className={cn(label, "relative")}>RANGE</dt>
        <dd className={cn("order-1 whitespace-nowrap font-mono leading-none tabular-nums", num)}>
          {ring && (
            <span aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
              <RangeRing value={spec.rangeKm[1]} />
            </span>
          )}
          <span className="relative">
            <Counter value={spec.rangeKm[0]} />
            <span className="text-fg-muted">–</span>
            <Counter value={spec.rangeKm[1]} />
            <span className={unit}>KM</span>
          </span>
        </dd>
      </div>
      <div className="relative flex flex-col items-center px-2 text-center">
        <dt className={label}>MOTOR</dt>
        <dd className={cn("order-1 whitespace-nowrap font-mono leading-none tabular-nums", num)}>
          <Counter value={spec.motorW} />
          <span className={unit}>W</span>
        </dd>
      </div>
    </dl>
  );
}
