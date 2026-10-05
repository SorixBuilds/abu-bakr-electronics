"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "@/lib/motion";
import { create } from "zustand";
import { sessionGet, sessionSet } from "@/store/storage";

/** Hero entrance waits for this. */
export const useIntro = create<{ done: boolean; finish(): void }>()((set) => ({ done: false, finish: () => set({ done: true }) }));

/**
 * First visit per session only (§15.2). Circle draws → AB fades → hairline expands → curtain lifts.
 * Total ≤ 1.4s. Skipped for reduced motion. Rendered visible on the server so there is no flash;
 * a tiny inline script hides it before paint when it should not run.
 */
export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionGet("ab-preloaded") === "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- session gate known only on client
      setShow(false);
      useIntro.getState().finish();
      return;
    }
    sessionSet("ab-preloaded", "1");
    const t = setTimeout(() => {
      setShow(false);
      useIntro.getState().finish();
    }, 1450);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.preloader = show ? "on" : "off";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian text-ivory"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.7, ease: ease.outExpo } }}
          aria-hidden
        >
          <div className="flex flex-col items-center">
            <svg width="84" height="84" viewBox="0 0 40 40">
              <motion.circle
                cx="20"
                cy="20"
                r="19.25"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: ease.inOut }}
                style={{ transformOrigin: "50% 50%" }}
              />
              <motion.text
                x="20"
                y="25.5"
                textAnchor="middle"
                fontFamily="var(--font-instrument), serif"
                fontSize="17"
                fill="currentColor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.3 }}
              >
                AB
              </motion.text>
            </svg>
            <motion.span
              className="mt-5 block h-px w-12 origin-center bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.4, ease: ease.outExpo }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Runs before hydration: hide the preloader immediately when it already ran this session or motion is reduced. */
export const preloaderGateScript = `try{if(sessionStorage.getItem('ab-preloaded')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.preloader='off'}}catch(e){}`;
