"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, ArrowLeftRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MegaPanel, navCategories, type NavKey } from "./MegaPanel";
import { MobileMenu } from "./MobileMenu";
import { useScrollState } from "@/hooks/useScrollDirection";
import { useUi } from "@/store/ui";
import { useCompare } from "@/store/compare";
import { cn } from "@/lib/cn";

/** V3 §7 — 72px white bar, hairline, gains --shadow-card after scroll. Hamburger below 1100px. */
export function Navbar() {
  const pathname = usePathname();
  const { y } = useScrollState();
  const set = useUi((s) => s.set);
  const menuOpen = useUi((s) => s.menuOpen);
  const compareCount = useCompare((s) => s.ids.length);
  const [mega, setMega] = useState<NavKey | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close the mega panel on route change
    setMega(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMega(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = (k: NavKey) => {
    clearTimeout(closeTimer.current);
    clearTimeout(openTimer.current);
    // small intent delay so sweeping across the bar doesn't flash panels
    openTimer.current = setTimeout(() => setMega(k), mega ? 0 : 90);
  };
  const closeSoon = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(null), 160);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="theme-white sticky top-0 z-[60]" onMouseLeave={closeSoon}>
        <div
          className={cn(
            "relative h-[72px] border-b border-line bg-white transition-shadow duration-300 ease-lux",
            (y > 8 || mega) && "shadow-card",
          )}
        >
          <nav aria-label="Primary" className="container-lux flex h-full items-center justify-between gap-6">
            <Link href="/" className="shrink-0">
              <Wordmark size={26} />
              <span className="sr-only">, home</span>
            </Link>

            <ul className="hidden h-full items-center gap-7 min-[1100px]:flex xl:gap-9">
              {navCategories.map((c) => {
                const on = isActive(c.href) || mega === c.key;
                return (
                  <li key={c.key} className="relative flex h-full items-center" onMouseEnter={() => open(c.key)}>
                    <Link
                      href={c.href}
                      onFocus={() => open(c.key)}
                      aria-expanded={mega === c.key}
                      aria-controls="mega-panel"
                      className={cn("whitespace-nowrap text-[15px] font-medium transition-colors", on ? "text-ink" : "text-ink-2 hover:text-ink")}
                    >
                      {c.label}
                    </Link>
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-0 bottom-0 h-[2px] origin-left bg-cherry transition-transform duration-300 ease-lux",
                        on ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </li>
                );
              })}
            </ul>

            <div className="flex shrink-0 items-center gap-1">
              <button
                onClick={() => set({ paletteOpen: true })}
                className="flex size-11 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-porcelain hover:text-ink"
                aria-label="Search (Ctrl K)"
              >
                <Search size={20} strokeWidth={1.75} />
              </button>
              <AnimatePresence>
                {compareCount > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => set({ compareDrawerOpen: true })}
                    className="hidden h-11 items-center gap-2 whitespace-nowrap rounded-full px-3 text-[14px] font-medium text-ink-2 hover:bg-porcelain hover:text-ink sm:flex"
                    aria-label={`Compare ${compareCount} products`}
                  >
                    <ArrowLeftRight size={18} strokeWidth={1.75} />
                    <span className="flex size-5 items-center justify-center rounded-full bg-cherry text-[11px] text-white">{compareCount}</span>
                  </motion.button>
                )}
              </AnimatePresence>
              <LuxuryButton size="sm" icon="whatsapp" iconPosition="start" onClick={() => set({ advisorOpen: true })} className="ml-2 hidden sm:inline-flex">
                WhatsApp us
              </LuxuryButton>
              <button
                className="relative ml-1 flex size-11 items-center justify-center min-[1100px]:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => set({ menuOpen: !menuOpen })}
              >
                <span className={cn("absolute h-[1.75px] w-6 rounded-full bg-ink transition-transform duration-300 ease-lux", menuOpen ? "rotate-45" : "-translate-y-[5px]")} />
                <span className={cn("absolute h-[1.75px] w-6 rounded-full bg-ink transition-transform duration-300 ease-lux", menuOpen ? "-rotate-45" : "translate-y-[5px]")} />
              </button>
            </div>
          </nav>
        </div>

        <AnimatePresence>
          {mega && (
            <MegaPanel
              active={mega}
              onEnter={() => clearTimeout(closeTimer.current)}
              onLeave={closeSoon}
              onClose={() => setMega(null)}
            />
          )}
        </AnimatePresence>
      </header>
      <MobileMenu />
    </>
  );
}
