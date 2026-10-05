"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { getLenis } from "./SmoothScroll";

/** New page fades in with y 16→0 (450ms outExpo) + 2px gold progress bar on navigation (§15.2). */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotionSafe();
  const [prev, setPrev] = useState(pathname);
  const [navs, setNavs] = useState(0);

  // Derive "a navigation happened" during render (no effect round-trip).
  if (pathname !== prev) {
    setPrev(pathname);
    setNavs((n) => n + 1);
  }

  useEffect(() => {
    if (navs > 0) getLenis()?.scrollTo(0, { immediate: true });
  }, [navs]);

  return (
    <>
      {navs > 0 && (
        <motion.div
          key={navs}
          className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-accent"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ scaleX: { duration: 0.5, ease: ease.outExpo }, opacity: { delay: 0.45, duration: 0.3 } }}
        />
      )}
      <motion.div
        key={pathname}
        initial={navs === 0 || reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: ease.outExpo }}
      >
        {children}
      </motion.div>
    </>
  );
}
