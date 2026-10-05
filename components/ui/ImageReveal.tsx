"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** Image reveal (§15.2): clip inset 12% → 0 + inner scale 1.15 → 1, 1200ms outExpo. */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotionSafe();
  if (reduced) return <div className={cn("relative overflow-hidden", className)}>{children}</div>;
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: "inset(12% 12% 12% 12%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.2, ease: ease.outExpo, delay }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.2, ease: ease.outExpo, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
