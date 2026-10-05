"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Placeholder } from "@/components/ui/Placeholder";
import { useReview } from "@/store/review";
import { cn } from "@/lib/cn";

/** Verified-safe FAQ only (§8.7). The showroom answer is a placeholder until confirmed. */
export function Faq() {
  const review = useReview((s) => s.enabled);
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q: "Do you deliver in Lahore?", a: <>Yes — delivery across Lahore is free.</> },
    { q: "Do you deliver outside Lahore?", a: <>Yes, we deliver across Pakistan. Ask an advisor about your city.</> },
    ...(review
      ? [
          {
            q: "Can I see products before buying?",
            a: (
              <>
                Visit the showroom — <Placeholder field="address" />
              </>
            ),
          },
        ]
      : []),
  ];
  return (
    <ul className="border-b border-line">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <li key={it.q} className="border-t border-line">
            <button
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-[18px]"
            >
              {it.q}
              <Plus size={18} strokeWidth={1.25} className={cn("shrink-0 text-accent-text transition-transform duration-300", on && "rotate-45")} />
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[60ch] pb-6 text-fg-muted">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
