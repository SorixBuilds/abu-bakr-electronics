"use client";

import { useEffect, useState } from "react";

export function useScrollState() {
  const [state, setState] = useState({ y: 0, dir: "up" as "up" | "down" });
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - last;
        if (Math.abs(delta) < 4) return;
        setState({ y, dir: delta > 0 ? "down" : "up" });
        last = y;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return state;
}
