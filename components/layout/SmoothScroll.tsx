"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useAnyOverlay } from "@/store/ui";

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

/** Lenis on desktop + pointer:fine only; off for reduced motion and touch (§13.4). */
export function SmoothScroll() {
  const overlay = useAnyOverlay();

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      anchors: true,
      prevent: (node) => !!node.closest?.("[data-lenis-prevent],[role=dialog],[cmdk-root]"),
    });
    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (overlay) lenis.stop();
    else lenis.start();
  }, [overlay]);

  return null;
}
