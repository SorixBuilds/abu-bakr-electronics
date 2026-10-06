"use client";

import { Counter } from "@/components/ui/Counter";
import type { MobilitySpec } from "@/types/product";
import { cn } from "@/lib/cn";

/** V3 §8.7 — Top speed · Range · Motor in Bodoni numerals, counting up on change. */
export function SpecTrio({ spec, className, compact }: { spec: MobilitySpec; className?: string; compact?: boolean }) {
  const num = compact ? "text-[28px] sm:text-[36px]" : "text-[28px] min-[400px]:text-[32px] md:text-spec";
  const unit = "mt-1.5 block md:ml-1.5 md:mt-0 md:inline font-sans text-[12px] font-semibold tracking-[0.08em] text-fg-muted md:text-[13px]";
  const label = "order-2 mt-3 text-eyebrow text-fg-muted";
  const items = [
    { label: "Top speed", unit: "km/h", value: <Counter value={spec.topSpeedKmh} /> },
    {
      label: "Range",
      unit: "km",
      value: (
        <>
          <Counter value={spec.rangeKm[0]} />
          <span className="text-fg-muted">–</span>
          <Counter value={spec.rangeKm[1]} />
        </>
      ),
    },
    { label: "Motor", unit: "W", value: <Counter value={spec.motorW} /> },
  ];
  return (
    <dl className={cn("grid grid-cols-3 divide-x divide-line", className)}>
      {items.map((it) => (
        <div key={it.label} className="flex flex-col items-center px-2 text-center">
          <dt className={label}>{it.label}</dt>
          <dd className={cn("order-1 whitespace-nowrap font-display leading-none tracking-[-0.02em] tabular-nums", num)}>
            {it.value}
            <span className={unit}>{it.unit}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
