"use client";

import { motion } from "motion/react";

/**
 * Thin dial around the range numeral that fills proportionally to range / 160 km.
 * The only electric-blue on the page. Fills its (square) parent.
 */
export function RangeRing({ value, max = 160 }: { value: number; max?: number }) {
  const r = 48;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, value / max);
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.35" />
      {/* tick marks every 20 km */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={+(50 + Math.cos(a) * 45.5).toFixed(2)}
            y1={+(50 + Math.sin(a) * 45.5).toFixed(2)}
            x2={+(50 + Math.cos(a) * 47).toFixed(2)}
            y2={+(50 + Math.sin(a) * 47).toFixed(2)}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.35"
          />
        );
      })}
      <motion.circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="var(--electric)"
        strokeOpacity="0.7"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - pct) }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
