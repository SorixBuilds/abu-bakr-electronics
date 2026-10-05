"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Search, ArrowLeftRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Monogram } from "@/components/brand/Monogram";
import { Wordmark } from "@/components/brand/Wordmark";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MegaPanel } from "./MegaPanel";
import { MobileMenu } from "./MobileMenu";
import { useScrollState } from "@/hooks/useScrollDirection";
import { useUi } from "@/store/ui";
import { useCompare } from "@/store/compare";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const links = [
  { href: "/mobility", label: "Electric Mobility" },
  { href: "/showroom", label: "Showroom" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { y, dir } = useScrollState();
  const set = useUi((s) => s.set);
  const menuOpen = useUi((s) => s.menuOpen);
  const compareCount = useCompare((s) => s.ids.length);
  const [mega, setMega] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const solid = y > 80 || mega;
  const hide = y > 400 && dir === "down" && !mega && !menuOpen;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close the mega panel on route change
    setMega(false);
  }, [pathname]);

  // Sticky sub-bars (shop toolbar, PDP bar) follow the navbar via --nav-offset.
  useEffect(() => {
    const root = document.documentElement;
    if (hide) root.style.setProperty("--nav-offset", "0px");
    else root.style.removeProperty("--nav-offset");
  }, [hide]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMega(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMegaSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(false), 160);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <motion.header
        className="theme-dark sticky top-0 z-[60]"
        animate={{ y: hide ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: ease.out }}
        onMouseLeave={closeMegaSoon}
      >
        <div
          className={cn(
            "relative transition-[background-color,border-color,height,backdrop-filter] duration-300 ease-ui",
            "h-[60px] border-b",
            solid
              ? "border-[rgba(255,255,255,0.08)] bg-[rgba(10,11,13,0.72)] backdrop-blur-[16px] backdrop-saturate-[1.4] lg:h-16"
              : "border-transparent bg-transparent lg:h-[72px]",
          )}
        >
          <nav aria-label="Primary" className="container-lux flex h-full items-center justify-between gap-6">
            {/* Mobile: monogram left, wordmark centre, menu right */}
            <Link href="/" className="flex items-center gap-3.5 lg:gap-4" aria-label="Abu Bakr Electronics — home">
              <Monogram size={34} className="text-ivory" />
              <span className="hidden lg:block">
                <Wordmark size={13} />
              </span>
            </Link>
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:hidden" tabIndex={-1} aria-hidden>
              <Wordmark variant="horizontal" size={11} />
            </Link>

            <ul className="hidden items-center gap-9 lg:flex">
              <li onMouseEnter={openMega}>
                <button
                  className={cn(
                    "flex min-h-11 items-center gap-1.5 text-[14px] transition-colors",
                    mega || pathname.startsWith("/shop") ? "text-ivory" : "text-ivory/75 hover:text-ivory",
                  )}
                  aria-expanded={mega}
                  aria-controls="mega-panel"
                  onClick={() => setMega((v) => !v)}
                >
                  Collection
                  <ChevronDown size={14} strokeWidth={1.25} className={cn("transition-transform duration-300", mega && "rotate-180")} />
                </button>
              </li>
              {links.map((l) => (
                <li key={l.href} onMouseEnter={closeMegaSoon}>
                  <Link
                    href={l.href}
                    className={cn(
                      "link-lux relative flex min-h-11 items-center text-[14px] transition-colors",
                      isActive(l.href) ? "text-ivory" : "text-ivory/75 hover:text-ivory",
                    )}
                    aria-current={isActive(l.href) ? "page" : undefined}
                  >
                    {l.label}
                    {isActive(l.href) && <span className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-gold" />}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                onClick={() => set({ paletteOpen: true })}
                className="flex h-11 items-center gap-3 rounded-xs px-3 text-ivory/70 transition-colors hover:text-ivory"
                aria-label="Search (Ctrl K)"
              >
                <Search size={17} strokeWidth={1.25} />
                <kbd className="rounded-xs border border-line px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-ivory/50">⌘K</kbd>
              </button>
              <AnimatePresence>
                {compareCount > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => set({ compareDrawerOpen: true })}
                    className="flex h-11 items-center gap-2 px-3 text-[13px] text-ivory/80 hover:text-ivory"
                  >
                    <ArrowLeftRight size={16} strokeWidth={1.25} />
                    Compare <span className="font-mono text-gold">({compareCount})</span>
                  </motion.button>
                )}
              </AnimatePresence>
              <LuxuryButton size="md" variant="gold-line" icon="whatsapp" iconPosition="start" onClick={() => set({ advisorOpen: true })} className="ml-2">
                Speak to an Advisor
              </LuxuryButton>
            </div>

            <button
              className="relative flex size-11 items-center justify-center lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => set({ menuOpen: !menuOpen })}
            >
              <span className={cn("absolute h-px w-6 bg-ivory transition-transform duration-300 ease-ui", menuOpen ? "rotate-45" : "-translate-y-[4px]")} />
              <span className={cn("absolute h-px w-6 bg-ivory transition-transform duration-300 ease-ui", menuOpen ? "-rotate-45" : "translate-y-[4px]")} />
            </button>
          </nav>
        </div>

        <AnimatePresence>{mega && <MegaPanel onEnter={openMega} onLeave={closeMegaSoon} onClose={() => setMega(false)} />}</AnimatePresence>
      </motion.header>
      <MobileMenu />
    </>
  );
}
