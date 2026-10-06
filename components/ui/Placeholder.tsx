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
        "group/rt relative inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 decoration-cherry decoration-dotted underline underline-offset-4",
        block && "flex",
        className,
      )}
      title={note}
      tabIndex={0}
    >
      <span>{children}</span>
      <span className="whitespace-nowrap rounded-full bg-blush px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-cherry no-underline">
        Client to confirm
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-50 mt-2 w-max max-w-[260px] rounded-sm bg-ink px-3 py-2 text-[13px] leading-snug text-white no-underline opacity-0 shadow-lift transition-opacity group-hover/rt:opacity-100 group-focus/rt:opacity-100"
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
