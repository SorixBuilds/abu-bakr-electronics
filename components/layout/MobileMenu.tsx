"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, Heart, ArrowLeftRight, Truck } from "lucide-react";
import { useEffect } from "react";
import { useUi } from "@/store/ui";
import { useSaved } from "@/store/saved";
import { useCompare } from "@/store/compare";
import { categories } from "@/content/categories";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ease } from "@/lib/motion";

const links = [
  { href: "/shop", label: "Collection" },
  { href: "/mobility", label: "Electric Mobility" },
  { href: "/showroom", label: "Showroom" },
  { href: "/contact", label: "Contact" },
];

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
          className="theme-dark fixed inset-0 z-[59] flex flex-col overflow-y-auto bg-obsidian pt-24 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: 0.35 }}
        >
          <div className="container-lux flex flex-1 flex-col pb-[calc(env(safe-area-inset-bottom)+24px)] pt-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <button
                onClick={() => {
                  close();
                  set({ paletteOpen: true });
                }}
                className="flex h-11 flex-1 items-center gap-3 text-ivory/60"
              >
                <Search size={18} strokeWidth={1.25} /> Search the collection
              </button>
            </div>
            <nav aria-label="Mobile">
              <ul className="mt-6 flex flex-col">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.05, duration: 0.6, ease: ease.outExpo }}
                  >
                    <Link href={l.href} onClick={close} className="block py-2 text-[34px] font-normal leading-tight tracking-[-0.02em]">
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.ul className="mt-8 grid grid-cols-2 gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop/${c.slug}`}
                    onClick={close}
                    className="flex min-h-[64px] flex-col justify-end rounded-sm border border-line-soft bg-graphite p-3"
                  >
                    <span className="text-[15px]">{c.title}</span>
                    <span className="line-clamp-1 text-[12px] text-fg-muted">{c.tileLine}</span>
                  </Link>
                </li>
              ))}
            </motion.ul>

            <div className="mt-5 flex gap-5 text-[14px] text-ivory/70">
              <button
                onClick={() => {
                  close();
                  set({ savedOpen: true });
                }}
                className="flex min-h-11 items-center gap-2"
              >
                <Heart size={16} strokeWidth={1.25} /> Saved ({saved})
              </button>
              {compare > 0 && (
                <button
                  onClick={() => {
                    close();
                    set({ compareDrawerOpen: true });
                  }}
                  className="flex min-h-11 items-center gap-2"
                >
                  <ArrowLeftRight size={16} strokeWidth={1.25} /> Compare ({compare})
                </button>
              )}
            </div>

            <div className="mt-auto pt-8">
              <LuxuryButton
                className="w-full"
                icon="whatsapp"
                iconPosition="start"
                onClick={() => {
                  close();
                  set({ advisorOpen: true });
                }}
              >
                Speak to an Advisor
              </LuxuryButton>
              <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ivory/55">
                <Truck size={14} strokeWidth={1.25} className="text-gold" /> Free delivery across Lahore
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
