"use client";

import { AnimatePresence, motion } from "motion/react";
import { useUi } from "@/store/ui";
import { ease } from "@/lib/motion";

export function Toaster() {
  const toasts = useUi((s) => s.toasts);
  const dismiss = useUi((s) => s.dismissToast);
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+88px)] z-[95] flex flex-col items-center gap-2 px-4 md:bottom-8"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
            transition={{ duration: 0.45, ease: ease.outExpo }}
            className="theme-dark pointer-events-auto flex items-center gap-5 rounded-xs border border-line bg-graphite-2 py-3 pl-5 pr-3 text-[14px] text-ivory"
            style={{ boxShadow: "var(--shadow-fab)" }}
          >
            <span>{t.message}</span>
            {t.action && (
              <button
                onClick={() => {
                  t.action!.onClick();
                  dismiss(t.id);
                }}
                className="min-h-9 px-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-text hover:text-accent-text"
              >
                {t.action.label}
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
