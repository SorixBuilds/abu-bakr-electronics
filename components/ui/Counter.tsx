"use client";

import { animate, useMotionValue, useTransform, motion } from "motion/react";
import { useEffect } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** Number tween for spec numerals only (§15.2). tabular-nums prevents jitter. */
export function Counter({ value, decimals = 0, duration = 0.5, className }: { value: number; decimals?: number; duration?: number; className?: string }) {
  const reduced = useReducedMotionSafe();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => v.toFixed(decimals));
  useEffect(() => {
    if (reduced) {
      mv.set(value);
      return;
    }
    const c = animate(mv, value, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [value, duration, reduced, mv]);
  return (
    <motion.span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {text}
    </motion.span>
  );
}
