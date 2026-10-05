"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Horizontal drag rail (Embla). Arrows on desktop, thin line pagination on touch. */
export function Rail({
  children,
  label,
  slideClassName,
  className,
  arrowsClassName,
  showArrows = true,
  showDots = true,
  align = "start",
}: {
  children: ReactNode[];
  label: string;
  slideClassName?: string;
  className?: string;
  arrowsClassName?: string;
  showArrows?: boolean;
  showDots?: boolean;
  align?: "start" | "center";
}) {
  const [ref, api] = useEmblaCarousel({ align, containScroll: "trimSnaps", dragFree: false, skipSnaps: false });
  const [state, setState] = useState({ prev: false, next: true, index: 0, snaps: 0 });

  const update = useCallback(() => {
    if (!api) return;
    setState({ prev: api.canScrollPrev(), next: api.canScrollNext(), index: api.selectedScrollSnap(), snaps: api.scrollSnapList().length });
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const raf = requestAnimationFrame(update);
    api.on("select", update).on("reInit", update);
    return () => {
      cancelAnimationFrame(raf);
      api.off("select", update).off("reInit", update);
    };
  }, [api, update]);

  // Re-measure when children change (tab switches)
  useEffect(() => {
    api?.reInit();
    api?.scrollTo(0, true);
  }, [api, children.length]);

  return (
    <div className={cn("relative", className)} aria-roledescription="carousel" aria-label={label}>
      {showArrows && (
        <div className={cn("absolute -top-[76px] right-0 hidden gap-2 md:flex", arrowsClassName)}>
          <button
            onClick={() => api?.scrollPrev()}
            disabled={!state.prev}
            aria-label="Previous"
            className="flex size-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-[color-mix(in_srgb,var(--fg)_40%,transparent)] disabled:opacity-30"
          >
            <ArrowLeft size={16} strokeWidth={1.25} />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            disabled={!state.next}
            aria-label="Next"
            className="flex size-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-[color-mix(in_srgb,var(--fg)_40%,transparent)] disabled:opacity-30"
          >
            <ArrowRight size={16} strokeWidth={1.25} />
          </button>
        </div>
      )}
      <div ref={ref} className="overflow-hidden">
        <ul className="flex touch-pan-y gap-3 sm:gap-5">
          {children.map((c, i) => (
            <li key={i} className={cn("min-w-0 shrink-0", slideClassName)} aria-roledescription="slide" aria-label={`${i + 1} of ${children.length}`}>
              {c}
            </li>
          ))}
        </ul>
      </div>
      {showDots && state.snaps > 1 && (
        <div className="mt-8 flex gap-1.5 md:hidden" aria-hidden>
          {Array.from({ length: state.snaps }).map((_, i) => (
            <span key={i} className={cn("h-px flex-1 transition-colors duration-300", i === state.index ? "bg-accent" : "bg-line")} />
          ))}
        </div>
      )}
    </div>
  );
}
