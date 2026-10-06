"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, Heart, ArrowLeftRight, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useUi } from "@/store/ui";
import { useSaved } from "@/store/saved";
import { useCompare } from "@/store/compare";
import { categories } from "@/content/categories";
import { Stage, ProductCut } from "@/components/ui/Stage";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ease } from "@/lib/motion";
import type { CategorySlug } from "@/types/product";

const rows: { slug: CategorySlug; label: string; href: string; asset: string }[] = [
  ...categories.map((c) => ({ slug: c.slug as CategorySlug, label: c.title, href: `/shop/${c.slug}`, asset: c.assets[0] })),
  { slug: "mobility", label: "Jinpeng Electric", href: "/mobility", asset: "jinpeng-thrill" },
];

/** V3 §7 — full-screen white sheet, large category rows with a small cutout on its stage colour, WhatsApp pinned at the bottom. */
export function MobileMenu() {
  const open = useUi((s) => s.menuOpen);
  const set = useUi((s) => s.set);
  const saved = useSaved((s) => s.ids.length);
  const compare = useCompare((s) => s.ids.length);
  const pathname = usePathname();

  useEffect(() => {
    set({ menuOpen: false });
  }, [pathname, set]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && set({ menuOpen: false });
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, set]);

  const close = () => set({ menuOpen: false });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="theme-white fixed inset-x-0 bottom-0 top-0 z-[59] flex flex-col bg-white pt-[108px] min-[1100px]:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.25 }}
        >
          <div className="container-lux flex-1 overflow-y-auto pb-4">
            <button
              onClick={() => {
                close();
                set({ paletteOpen: true });
              }}
              className="mt-3 flex h-12 w-full items-center gap-3 rounded-sm border border-line bg-porcelain px-4 text-[15px] text-muted"
            >
              <Search size={20} strokeWidth={1.75} /> Search the collection
            </button>

            <nav aria-label="Mobile" className="mt-4">
              <ul className="flex flex-col divide-y divide-line">
                {rows.map((r, i) => (
                  <motion.li key={r.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.4, ease: ease.lux }}>
                    <Link href={r.href} onClick={close} className="group flex items-center gap-4 py-3">
                      <Stage category={r.slug} radius="md" className="h-16 w-20 shrink-0">
                        <ProductCut id={r.asset} sizes="96px" shadow={false} scale={1.05} />
                      </Stage>
                      <span className="flex-1 font-display text-[26px] leading-tight text-ink">{r.label}</span>
                      <ChevronRight size={20} strokeWidth={1.75} className="text-muted" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-4 flex flex-wrap gap-x-6 text-[15px] text-ink-2">
              <Link href="/showroom" onClick={close} className="flex min-h-11 items-center">
                Showroom
              </Link>
              <Link href="/contact" onClick={close} className="flex min-h-11 items-center">
                Contact
              </Link>
              <button
                onClick={() => {
                  close();
                  set({ savedOpen: true });
                }}
                className="flex min-h-11 items-center gap-2"
              >
                <Heart size={18} strokeWidth={1.75} /> Saved ({saved})
              </button>
              {compare > 0 && (
                <button
                  onClick={() => {
                    close();
                    set({ compareDrawerOpen: true });
                  }}
                  className="flex min-h-11 items-center gap-2"
                >
                  <ArrowLeftRight size={18} strokeWidth={1.75} /> Compare ({compare})
                </button>
              )}
            </div>
          </div>

          <div className="container-lux border-t border-line bg-white pb-[calc(env(safe-area-inset-bottom)+16px)] pt-4">
            <LuxuryButton
              className="w-full"
              icon="whatsapp"
              iconPosition="start"
              onClick={() => {
                close();
                set({ advisorOpen: true });
              }}
            >
              WhatsApp us
            </LuxuryButton>
            <p className="mt-3 text-center text-[13px] text-muted">Free delivery across Lahore · Delivering across Pakistan</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
