"use client";

import { motion } from "motion/react";
import { createElement } from "react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

type Props = {
  lines: string | string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** "lines" = line-mask reveal (default); "words" = word-mask reveal */
  mode?: "lines" | "words";
  /** Animate immediately instead of on view (hero) */
  immediate?: boolean;
  lineClassName?: string;
};

/** Line-mask reveal for H1/H2 (§15.2): each line y 105%→0 inside overflow:hidden. */
export function RevealText({ lines, as = "h2", className, delay = 0, mode = "lines", immediate, lineClassName }: Props) {
  const reduced = useReducedMotionSafe();
  const arr = Array.isArray(lines) ? lines : [lines];
  const units: string[][] = mode === "words" ? [arr.join(" ").split(" ")] : arr.map((l) => [l]);
  const step = mode === "words" ? 0.04 : 0.1;
  let i = 0;

  // Above-the-fold headings: pure CSS so the reveal (and LCP) does not wait for hydration.
  if (immediate) {
    return createElement(
      as,
      { className, "aria-label": arr.join(" ") },
      <span aria-hidden className="block">
        {units.map((line, li) => (
          <span key={li} className={cn("block", mode === "words" && "flex flex-wrap justify-[inherit] gap-x-[0.25em]")}>
            {line.map((w) => {
              const d = delay + step * i++;
              return (
                <span
                  key={`${li}-${w}-${d}`}
                  className={cn("inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top", mode === "lines" && "block", lineClassName)}
                >
                  <span className="inline-block animate-[line-up_1s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: `${d}s` }}>
                    {w}
                  </span>
                </span>
              );
            })}
          </span>
        ))}
      </span>,
    );
  }

  const trigger = immediate ? { animate: "show" as const } : { whileInView: "show" as const, viewport: { once: true, amount: 0.4 } };

  const content = (
    <motion.span initial="hidden" {...trigger} className="block">
      {units.map((line, li) => (
        <span key={li} className={cn("block", mode === "words" && "flex flex-wrap justify-[inherit] gap-x-[0.25em]")}>
          {line.map((w) => {
            const d = delay + step * i++;
            return (
              <span
                key={`${li}-${w}-${d}`}
                className={cn("inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top", mode === "lines" && "block", lineClassName)}
              >
                <motion.span
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: reduced ? { opacity: 0 } : { y: "105%" },
                    show: reduced
                      ? { opacity: 1, transition: { duration: 0.15, delay: d } }
                      : { y: "0%", transition: { duration: 1, ease: ease.outExpo, delay: d } },
                  }}
                >
                  {w}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </motion.span>
  );

  return createElement(as, { className, "aria-label": arr.join(" ") }, <span aria-hidden>{content}</span>);
}
