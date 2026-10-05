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
  { href: "/mobility", label: "Electric Mobility", short: "E-Mobility" },
  { href: "/showroom", label: "Showroom" },
  { href: "/contact", label: "Contact" },
];

const LIGHT = ".theme-light, .theme-porcelain, [data-nav='light']";

/**
 * Is the section directly under the nav bar light? V2 §6.2: with ~40% of the page bright,
 * the nav switches to porcelain over light sections instead of staying dark everywhere.
 */
function useLightUnderNav(dep: unknown) {
  const [light, setLight] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const probeY = 66;
        const sections = document.querySelectorAll<HTMLElement>("main section, main [data-nav], footer");
        let hit: HTMLElement | null = null;
        sections.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top <= probeY && r.bottom > probeY) hit = el; // last match = innermost / latest in DOM
        });
        setLight(!!hit && (hit as HTMLElement).matches(LIGHT));
      });
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [dep]);
  return light;
}

export function Navbar() {
  const pathname = usePathname();
  const { y, dir } = useScrollState();
  const set = useUi((s) => s.set);
  const menuOpen = useUi((s) => s.menuOpen);
  const compareCount = useCompare((s) => s.ids.length);
  const [mega, setMega] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lightUnder = useLightUnderNav(pathname);

  const solid = y > 80 || mega;
  const hide = y > 400 && dir === "down" && !mega && !menuOpen;
  const light = lightUnder && !mega && !menuOpen;

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
  const linkCls = (on: boolean) =>
    cn("relative flex min-h-11 items-center whitespace-nowrap text-[14px] transition-colors", on ? "text-fg" : "text-fg/75 hover:text-fg");

  return (
    <>
      <motion.header
        className={cn("sticky top-0 z-[60]", light ? "theme-porcelain" : "theme-dark")}
        animate={{ y: hide ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: ease.out }}
        onMouseLeave={closeMegaSoon}
      >
        <div
          className={cn(
            "relative h-[60px] border-b transition-[background-color,border-color,height,backdrop-filter] duration-300 ease-ui",
            !solid && "border-transparent bg-transparent lg:h-[72px]",
            solid &&
              (light
                ? "border-line bg-[rgba(250,248,245,0.88)] backdrop-blur-[16px] lg:h-16"
                : "border-[rgba(255,255,255,0.08)] bg-[rgba(11,10,12,0.82)] backdrop-blur-[16px] backdrop-saturate-[1.4] lg:h-16"),
          )}
        >
          <nav aria-label="Primary" className="container-lux flex h-full items-center justify-between gap-6">
            <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Abu Bakr Electronics — home">
              <Monogram size={34} className="text-fg" />
              <span className="hidden lg:block">
                <Wordmark variant="lockup" size={14} />
              </span>
            </Link>
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:hidden" tabIndex={-1} aria-hidden>
              <Wordmark variant="horizontal" size={11} />
            </Link>

            <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
              <li onMouseEnter={openMega}>
                <button
                  className={linkCls(mega || pathname.startsWith("/shop"))}
                  aria-expanded={mega}
                  aria-controls="mega-panel"
                  onClick={() => setMega((v) => !v)}
                >
                  Collection
                  <ChevronDown size={14} strokeWidth={1.25} className={cn("ml-1.5 transition-transform duration-300", mega && "rotate-180")} />
                </button>
              </li>
              {links.map((l) => (
                <li key={l.href} onMouseEnter={closeMegaSoon}>
                  <Link href={l.href} className={cn(linkCls(isActive(l.href)), "link-lux")} aria-current={isActive(l.href) ? "page" : undefined}>
                    {l.short ? (
                      <>
                        <span className="min-[1180px]:hidden">{l.short}</span>
                        <span className="hidden min-[1180px]:inline">{l.label}</span>
                      </>
                    ) : (
                      l.label
                    )}
                    {isActive(l.href) && <span className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-cherry-hi" />}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden shrink-0 items-center gap-1 lg:flex">
              <button
                onClick={() => set({ paletteOpen: true })}
                className="flex h-11 items-center gap-2.5 rounded-xs px-3 text-fg/70 transition-colors hover:text-fg"
                aria-label="Search (Ctrl K)"
              >
                <Search size={17} strokeWidth={1.25} />
                <kbd className="hidden rounded-xs border border-line px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-fg/50 xl:inline">⌘K</kbd>
              </button>
              <AnimatePresence>
                {compareCount > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => set({ compareDrawerOpen: true })}
                    className="flex h-11 items-center gap-2 whitespace-nowrap px-3 text-[13px] text-fg/80 hover:text-fg"
                  >
                    <ArrowLeftRight size={16} strokeWidth={1.25} />
                    Compare
                    <span className="flex size-5 items-center justify-center rounded-full bg-cherry font-mono text-[10px] text-white">{compareCount}</span>
                  </motion.button>
                )}
              </AnimatePresence>
              <LuxuryButton size="md" icon="whatsapp" iconPosition="start" onClick={() => set({ advisorOpen: true })} className="ml-2">
                <span className="hidden xl:inline">Speak to an Advisor</span>
                <span className="xl:hidden">Advisor</span>
              </LuxuryButton>
            </div>

            <button
              className="relative flex size-11 items-center justify-center lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => set({ menuOpen: !menuOpen })}
            >
              <span className={cn("absolute h-px w-6 bg-fg transition-transform duration-300 ease-ui", menuOpen ? "rotate-45" : "-translate-y-[4px]")} />
              <span className={cn("absolute h-px w-6 bg-fg transition-transform duration-300 ease-ui", menuOpen ? "-rotate-45" : "translate-y-[4px]")} />
            </button>
          </nav>
        </div>

        <AnimatePresence>{mega && <MegaPanel onEnter={openMega} onLeave={closeMegaSoon} onClose={() => setMega(false)} />}</AnimatePresence>
      </motion.header>
      <MobileMenu />
    </>
  );
}
