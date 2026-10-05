"use client";

import { motion } from "motion/react";
import { useId, useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

type Tab = { value: string; label: string };

/** tablist with sliding layoutId indicator (spring 400/40) and arrow-key navigation. */
export function Tabs({
  tabs,
  value,
  onChange,
  className,
  variant = "underline",
  label,
  idPrefix,
}: {
  tabs: Tab[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
  variant?: "underline" | "chips";
  label: string;
  idPrefix?: string;
}) {
  const uid = useId();
  const prefix = idPrefix ?? uid;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + tabs.length) % tabs.length;
    onChange(tabs[n].value);
    refs.current[n]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn("no-scrollbar flex overflow-x-auto", variant === "underline" ? "gap-8 border-b border-line" : "gap-2", className)}
    >
      {tabs.map((t, i) => {
        const on = t.value === value;
        return (
          <button
            key={t.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`${prefix}-tab-${t.value}`}
            aria-selected={on}
            aria-controls={`${prefix}-panel`}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(t.value)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "relative shrink-0 whitespace-nowrap transition-colors duration-250",
              variant === "underline" ? "pb-4 pt-1 text-[15px] min-h-11" : "min-h-11 rounded-xs border px-4 text-[13px]",
              variant === "chips" && (on ? "border-accent text-fg" : "border-line text-fg-muted"),
              variant === "underline" && (on ? "text-fg" : "text-fg-muted hover:text-fg"),
            )}
          >
            {t.label}
            {variant === "underline" && on && (
              <motion.span
                layoutId={`${prefix}-indicator`}
                className="absolute inset-x-0 -bottom-px h-px bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
