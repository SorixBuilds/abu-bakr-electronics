"use client";

import { AnimatePresence, motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useAnyOverlay, useUi } from "@/store/ui";
import { useCompare } from "@/store/compare";
import { usePathname } from "next/navigation";

/** V2 §6.3 — 56px cherry button with a white icon and a single pulse ring on load. Opens the advisor chooser. */
export function WhatsAppFab() {
  const overlay = useAnyOverlay();
  const set = useUi((s) => s.set);
  const compare = useCompare((s) => s.ids.length);
  const pathname = usePathname();
  // PDP has its own fixed bottom bar (with WhatsApp) on mobile; hide the FAB there.
  const onPdp = pathname.startsWith("/product/") || /^\/mobility\/[^/]+$/.test(pathname);

  return (
    <AnimatePresence>
      {!overlay && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={() => set({ advisorOpen: true })}
          aria-label="Speak to an advisor on WhatsApp"
          className={`fixed right-4 z-[55] flex size-14 items-center justify-center rounded-full bg-cherry text-white transition-colors hover:bg-cherry-hi animate-[pulse-once_1.4s_ease-out_1.2s_1_backwards] md:right-6 ${
            onPdp
              ? "max-md:hidden md:bottom-6"
              : compare > 0 && pathname !== "/compare"
                ? "bottom-[calc(env(safe-area-inset-bottom)+76px)] md:bottom-[112px]"
                : "bottom-[calc(env(safe-area-inset-bottom)+16px)] md:bottom-6"
          }`}
          style={{ boxShadow: "var(--shadow-fab)" }}
        >
          <MessageCircle size={22} strokeWidth={1.25} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
