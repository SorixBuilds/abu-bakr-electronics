"use client";

import type { ReactNode } from "react";
import { site, type Placeholder as P, type PlaceholderField } from "@/content/site";
import { useReview } from "@/store/review";
import { cn } from "@/lib/cn";

/**
 * Normal mode: renders the verified value or `demoFallback` quietly (or nothing).
 * Review mode (?review=1): dotted gold underline + CLIENT TO CONFIRM tag + note tooltip (§17.4).
 */
export function Placeholder({
  field,
  className,
  children,
  reviewOnly,
}: {
  field: PlaceholderField;
  className?: string;
  /** Custom render of the normal-mode text */
  children?: (text: string) => ReactNode;
  /** Only render at all in review mode (e.g. a hidden feature) */
  reviewOnly?: boolean;
}) {
  const review = useReview((s) => s.enabled);
  const p = site[field] as P;
  const text = p.value ?? p.demoFallback;

  if (!review) {
    if (reviewOnly || !text) return null;
    return <span className={className}>{children ? children(text) : text}</span>;
  }
  return (
    <ReviewTag note={p.note} className={className}>
      {text || p.note}
    </ReviewTag>
  );
}

export function ReviewTag({ note, children, className, block }: { note: string; children?: ReactNode; className?: string; block?: boolean }) {
  return (
    <span
      className={cn(
        "group/rt relative inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 decoration-gold decoration-dotted underline underline-offset-4",
        block && "flex",
        className,
      )}
      title={note}
      tabIndex={0}
    >
      <span>{children}</span>
      <span className="whitespace-nowrap rounded-xs border border-gold/60 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-gold no-underline">
        Client to confirm
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-50 mt-2 w-max max-w-[260px] rounded-xs border border-gold/40 bg-graphite-2 px-3 py-2 text-[12px] leading-snug text-ivory no-underline opacity-0 shadow-lg transition-opacity group-hover/rt:opacity-100 group-focus/rt:opacity-100"
      >
        {note}
      </span>
    </span>
  );
}

/** Wraps arbitrary content that is only shown when review mode is on. */
export function ReviewOnly({ children }: { children: ReactNode }) {
  const review = useReview((s) => s.enabled);
  return review ? <>{children}</> : null;
}
