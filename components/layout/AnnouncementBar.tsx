"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { waLink, generalText } from "@/lib/whatsapp";
import { sessionGet, sessionSet } from "@/store/storage";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const items = [
  { text: "Free delivery across Lahore" },
  { text: "Delivering across Pakistan" },
  { text: "Speak to an advisor on WhatsApp →", href: waLink(generalText) },
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  const [hidden, setHidden] = useState(false);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read session flag after hydration
    if (sessionGet("ab-announce") === "0") setHidden(true);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [reduced]);

  if (hidden) return null;
  const item = items[i];

  return (
    <div className="relative z-[61] flex h-9 items-center justify-center bg-obsidian text-[11px] text-ivory/70" role="region" aria-label="Announcements">
      <div className="relative h-full w-full max-w-[640px] overflow-hidden">
        {/* Mobile: item 1 only */}
        <p className="flex h-full items-center justify-center gap-2.5 font-mono uppercase tracking-[0.14em] md:hidden">
          <span aria-hidden className="size-1 rounded-full bg-gold" />
          {items[0].text}
        </p>
        <div className="hidden h-full md:block" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center gap-2.5 font-mono uppercase tracking-[0.14em]"
            >
              <span aria-hidden className="size-1 rounded-full bg-gold" />
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener" className="link-lux hover:text-ivory">
                  {item.text}
                </a>
              ) : (
                item.text
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <button
        onClick={() => {
          sessionSet("ab-announce", "0");
          setHidden(true);
        }}
        className="absolute right-3 hidden size-9 items-center justify-center text-ivory/50 transition-colors hover:text-ivory md:flex"
        aria-label="Dismiss announcement"
      >
        <X size={14} strokeWidth={1.25} />
      </button>
    </div>
  );
}
