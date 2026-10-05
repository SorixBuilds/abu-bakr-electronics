"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Spec, SpecGroup } from "@/types/product";
import { cn } from "@/lib/cn";

const order: SpecGroup[] = ["Dimensions", "Performance", "Energy", "General"];

/** Two-column grouped definition list; groups collapse on mobile (§8.2.5). */
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
              className="flex min-h-14 w-full items-center justify-between text-eyebrow text-fg-muted md:pointer-events-none"
            >
              {g}
              <ChevronDown size={16} strokeWidth={1.25} className={cn("transition-transform md:hidden", open[g] && "rotate-180")} />
            </button>
            <dl className={cn("pb-6 md:block", open[g] ? "block" : "hidden")}>
              {rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-4 border-t border-line-soft py-3.5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">{r.label}</dt>
                  <dd className="text-[16px]">{r.value}</dd>
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
