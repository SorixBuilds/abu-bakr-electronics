"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { waLink, generalText } from "@/lib/whatsapp";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const items = [
  { text: "Free delivery across Lahore" },
  { text: "Delivering across Pakistan" },
  { text: "Speak to an advisor on WhatsApp →", href: waLink(generalText) },
];

/** V3 §7 — 36px Bordeaux bar, white 13px text, cherry-hi dot, rotating messages. */
export function AnnouncementBar() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, [reduced]);

  const item = items[i];

  return (
    <div className="relative z-[61] h-9 bg-bordeaux text-[13px] text-white" role="region" aria-label="Announcements">
      <div className="relative mx-auto h-full max-w-[640px] overflow-hidden" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex items-center justify-center gap-2.5 px-4"
          >
            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-cherry-hi" />
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener" className="link-lux">
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
