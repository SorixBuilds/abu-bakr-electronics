"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeftRight, X } from "lucide-react";
import { useCompare, MAX_COMPARE } from "@/store/compare";
import { useAnyOverlay, useUi } from "@/store/ui";
import { getProductById } from "@/data/products";
import { ProductMedia } from "@/components/product/Media";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ease } from "@/lib/motion";
import { usePathname } from "next/navigation";

/** Bottom docked tray (desktop 88px) / compact pill (mobile) — §9.5 */
export function CompareTray() {
  const ids = useCompare((s) => s.ids);
  const remove = useCompare((s) => s.remove);
  const clear = useCompare((s) => s.clear);
  const set = useUi((s) => s.set);
  const overlay = useAnyOverlay();
  const products = ids.map(getProductById).filter(Boolean);
  const pathname = usePathname();
  const show = products.length > 0 && !overlay && pathname !== "/compare";

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Desktop tray */}
          <motion.div
            key="tray"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: ease.outExpo }}
            className="theme-dark fixed inset-x-0 bottom-0 z-[54] hidden h-[88px] border-t border-line bg-[rgba(17,19,22,0.92)] backdrop-blur-[16px] md:block"
          >
            <div className="container-lux flex h-full items-center gap-6 pr-24">
              <span className="text-eyebrow text-fg-muted">Compare</span>
              <ul className="flex gap-3">
                {Array.from({ length: MAX_COMPARE }).map((_, i) => {
                  const p = products[i];
                  return (
                    <li key={p?.id ?? `empty-${i}`} className="relative size-14 overflow-hidden rounded-sm border border-line-soft">
                      {p ? (
                        <>
                          <ProductMedia product={p} sizes="56px" />
                          <button
                            onClick={() => remove(p.id)}
                            aria-label={`Remove ${p.name} from compare`}
                            className="absolute inset-0 flex items-center justify-center bg-obsidian/70 opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100"
                          >
                            <X size={16} strokeWidth={1.25} />
                          </button>
                        </>
                      ) : (
                        <span className="flex h-full items-center justify-center text-fg-muted/40">+</span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="hidden max-w-[28ch] text-[13px] text-fg-muted lg:block">
                {products.length < 2 ? "Add one more product to compare side by side." : `${products.length} products ready to compare.`}
              </p>
              <div className="ml-auto flex items-center gap-3">
                <button onClick={clear} className="min-h-11 px-3 text-[13px] text-fg-muted hover:text-fg">
                  Clear
                </button>
                <LuxuryButton size="md" onClick={() => set({ compareDrawerOpen: true })} icon="arrow">
                  Compare now
                </LuxuryButton>
              </div>
            </div>
          </motion.div>
          {/* Mobile pill (above the WhatsApp button) */}
          <motion.button
            key="pill"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => set({ compareDrawerOpen: true })}
            className="fixed bottom-[calc(env(safe-area-inset-bottom)+16px)] left-4 z-[54] flex h-12 items-center gap-2 rounded-full border border-accent bg-obsidian px-5 text-[13px] text-ivory md:hidden"
            style={{ boxShadow: "var(--shadow-fab)" }}
          >
            <ArrowLeftRight size={15} strokeWidth={1.25} className="text-accent-text" /> Compare ({products.length})
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
}
