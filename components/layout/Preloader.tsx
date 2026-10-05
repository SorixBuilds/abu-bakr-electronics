"use client";

import { useEffect, useState } from "react";
import { Monogram } from "@/components/brand/Monogram";
import { sessionGet, sessionSet } from "@/store/storage";

/**
 * V2 §6.1 — no blocking preloader. On the first visit of a session the monogram fades in and out
 * (600ms) over the already-visible hero poster. It never covers the page and never blocks input.
 */
export function Preloader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionGet("ab-intro") === "1" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sessionSet("ab-intro", "1");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- first-visit gate is only known on the client
    setShow(true);
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center">
      <Monogram size={88} className="animate-[intro-mark_0.6s_ease-out_both] text-on-dark drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]" />
    </div>
  );
}
