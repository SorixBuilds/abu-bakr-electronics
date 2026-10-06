"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Spec, SpecGroup } from "@/types/product";
import { cn } from "@/lib/cn";

const order: SpecGroup[] = ["Dimensions", "Performance", "Energy", "General"];

/** V3 §9.2 specs — two columns, hairline rows; groups collapse on mobile. */
export function SpecGrid({ specs, caption }: { specs: Spec[]; caption?: string }) {
  const groups = order.map((g) => ({ g, rows: specs.filter((s) => s.group === g) })).filter((x) => x.rows.length);
  const [open, setOpen] = useState<Record<string, boolean>>(() => Object.fromEntries(groups.map((x, i) => [x.g, i === 0])));

  return (
    <div>
      <div className="grid gap-x-16 md:grid-cols-2">
        {groups.map(({ g, rows }) => (
          <div key={g} className="border-t border-line">
            <button
              onClick={() => setOpen((o) => ({ ...o, [g]: !o[g] }))}
              aria-expanded={open[g]}
              className="flex min-h-14 w-full items-center justify-between text-eyebrow text-cherry md:pointer-events-none"
            >
              {g}
              <ChevronDown size={18} strokeWidth={1.75} className={cn("text-ink transition-transform md:hidden", open[g] && "rotate-180")} />
            </button>
            <dl className={cn("pb-6 md:block", open[g] ? "block" : "hidden")}>
              {rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-4 border-t border-line py-3.5">
                  <dt className="text-[15px] text-muted">{r.label}</dt>
                  <dd className="text-[15px] font-medium text-ink tabular-nums">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      {caption && <p className="mt-6 text-[13px] text-fg-muted">{caption}</p>}
    </div>
  );
}
