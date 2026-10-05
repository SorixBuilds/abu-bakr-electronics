"use client";

import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

type Opt<T extends string> = { value: T; label: string };

/** radiogroup with arrow-key navigation; selected = gold 1px border + 6% tint (§22.14). */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: Opt<T>[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + options.length) % options.length;
    onChange(options[n].value);
    refs.current[n]?.focus();
  };
  return (
    <div className={className}>
      <div className="mb-3 text-eyebrow text-fg-muted" id={`seg-${label}`}>
        {label}
      </div>
      <div role="radiogroup" aria-labelledby={`seg-${label}`} className="flex flex-wrap gap-2">
        {options.map((o, i) => {
          const on = o.value === value;
          return (
            <button
              key={o.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              onClick={() => onChange(o.value)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "min-h-11 rounded-xs border px-4 text-[13px] transition-colors duration-250",
                on
                  ? "border-gold-text bg-[rgba(201,169,106,0.08)] text-fg"
                  : "border-line text-fg-muted hover:border-[color-mix(in_srgb,var(--fg)_35%,transparent)] hover:text-fg",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
