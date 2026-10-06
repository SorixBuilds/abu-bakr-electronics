"use client";

import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { home, type HeroSlide } from "@/content/home";
import { asset, heroVideo } from "@/lib/media";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Placeholder } from "@/components/ui/Placeholder";
import { useUi } from "@/store/ui";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const slides = home.hero.slides as HeroSlide[];
const DURATION = 6000;

/**
 * Hero — Bordeaux with white type over a looping wine-graded electronics video (client request, overrides V3 §5),
 * with the product carousel (V3 §8.1) standing in front of it.
 * Mobile-first: product, then copy, dots + swipe. The poster is server-rendered (no blank screen);
 * the video only loads after hydration, never with reduced motion or Save-Data.
 */
export function Hero() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLElement>(null);
  const set = useUi((s) => s.set);
  const s = slides[i];
  const paused = hover || focus || !visible || reduced;

  const go = useCallback((n: number) => {
    setI((cur) => {
      const next = (n + slides.length) % slides.length;
      setDir(next > cur || (cur === slides.length - 1 && next === 0) ? 1 : -1);
      return next;
    });
  }, []);
  const next = useCallback(() => go(i + 1), [go, i]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(i + 1);
    if (e.key === "ArrowLeft") go(i - 1);
  };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) go(i + 1);
    else if (info.offset.x > 50) go(i - 1);
  };

  const secondary = () => {
    if (s.secondary.action === "whatsapp") set({ advisorOpen: true });
    if (s.secondary.action === "test-ride") set({ testRideId: "JP-01" });
    if (s.secondary.action === "room-guide") document.getElementById("room-guide")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };
  const secondaryLabel = s.secondary.action === "test-ride" ? <Placeholder field="testRides" /> : s.secondary.label;

  const fade = { duration: reduced ? 0.15 : 0.7, ease: ease.lux };

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onKeyDown={onKey}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocus(false)}
      className="theme-bordeaux relative isolate overflow-hidden bg-bordeaux-900 text-white"
    >
      <HeroBackdrop playing={visible} />

      {/* Single timing source for autoplay — the same keyed animation drives the visible progress bars */}
      {!reduced && (
        <span
          key={`t-${i}`}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
          style={{ animation: `slide-progress ${DURATION}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }}
          onAnimationEnd={next}
        />
      )}

      <div className="container-lux relative">
        <div className="grid gap-2 pb-4 pt-4 md:gap-6 lg:h-[min(calc(100svh-196px),860px)] lg:min-h-[600px] lg:grid-cols-12 lg:gap-10 lg:pb-0 lg:pt-6">
          {/* Product (first on mobile) */}
          <motion.div
            className="relative order-1 h-[38svh] min-h-[260px] max-h-[440px] sm:h-[46svh] lg:order-2 lg:col-span-7 lg:h-full lg:max-h-none"
            drag={reduced ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={onDragEnd}
          >
            {/* soft light pool the products stand in */}
            <div aria-hidden className="absolute inset-x-[4%] bottom-[2%] top-[12%] rounded-[50%] bg-[radial-gradient(ellipse_at_50%_70%,rgba(255,235,238,0.16),rgba(232,52,78,0.10)_40%,transparent_70%)]" />
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={s.key}
                custom={dir}
                className="absolute inset-0"
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: reduced ? 0 : 60 * d, scale: reduced ? 1 : 0.96 }),
                  center: { opacity: 1, x: 0, scale: 1, transition: { duration: reduced ? 0.15 : 0.8, ease: ease.lux } },
                  exit: (d: number) => ({ opacity: 0, x: reduced ? 0 : -40 * d, transition: { duration: reduced ? 0.15 : 0.45, ease: ease.lux } }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {s.items.map((it) => (
                  <StageItem key={it.id} item={it} priority={i === 0} />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Copy */}
          <div className="relative order-2 flex flex-col justify-center lg:order-1 lg:col-span-5 lg:h-full">
            <AnimatePresence initial={false} mode="wait">
              <motion.div key={s.key} initial="in" animate="show" exit="out" aria-live="polite">
                {[
                  <p key="e" className="text-eyebrow text-cherry-soft">
                    {s.eyebrow}
                  </p>,
                  <h1
                    key="h"
                    className="mt-3 max-w-[13ch] text-balance font-display text-[clamp(40px,11vw,56px)] leading-[0.98] tracking-[-0.02em] text-white md:mt-4 lg:text-[clamp(56px,5.6vw,92px)]"
                  >
                    {split(s.headline, s.italic)}
                  </h1>,
                  <p key="l" className="mt-4 max-w-[34ch] text-[17px] leading-relaxed text-white/80 md:mt-5 md:text-body-l">
                    {s.line}
                  </p>,
                ].map((el, n) => (
                  <motion.div
                    key={n}
                    variants={{
                      in: { opacity: 0, y: reduced ? 0 : 12 },
                      show: { opacity: 1, y: 0, transition: { ...fade, delay: n * 0.06 } },
                      out: { opacity: 0, transition: { duration: reduced ? 0.15 : 0.25 } },
                    }}
                  >
                    {el}
                  </motion.div>
                ))}
                <motion.div
                  className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 md:mt-8"
                  variants={{
                    in: { opacity: 0, y: reduced ? 0 : 12 },
                    show: { opacity: 1, y: 0, transition: { ...fade, delay: 0.18 } },
                    out: { opacity: 0, transition: { duration: reduced ? 0.15 : 0.25 } },
                  }}
                >
                  <LuxuryButton href={s.primary.href} icon="arrow" variant="light" className="w-full sm:w-auto">
                    {s.primary.label}
                  </LuxuryButton>
                  <LuxuryButton
                    variant="ghost"
                    onClick={secondary}
                    icon={s.secondary.action === "whatsapp" ? "whatsapp" : undefined}
                    iconPosition="start"
                    className="hidden sm:inline-flex"
                  >
                    {secondaryLabel}
                  </LuxuryButton>
                  <button onClick={secondary} className="link-lux min-h-11 text-[15px] font-semibold text-white sm:hidden">
                    {secondaryLabel} →
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            <p className="mt-3 text-center text-[13px] text-white/65 sm:text-left md:mt-6 md:text-[14px]">{home.hero.trust}</p>
          </div>
        </div>

        {/* Navigator — desktop: numbered with progress; mobile: dots */}
        <div className="hidden h-[88px] lg:block">
          <ol className="grid h-full grid-cols-4 gap-6 border-t border-white/20">
            {slides.map((sl, n) => (
              <li key={sl.key}>
                <button
                  onClick={() => go(n)}
                  aria-current={n === i}
                  data-slide={sl.nav}
                  className={cn(
                    "relative flex h-full w-full items-center gap-3 text-left text-[15px] font-medium transition-colors",
                    n === i ? "text-white" : "text-white/60 hover:text-white",
                  )}
                >
                  <span className="absolute inset-x-0 -top-px h-[2px] overflow-hidden">
                    {n === i && (
                      <span
                        key={`p-${i}`}
                        className="block h-full origin-left bg-cherry-hi"
                        style={
                          reduced
                            ? undefined
                            : { animation: `slide-progress ${DURATION}ms linear forwards`, animationPlayState: paused ? "paused" : "running", transform: "scaleX(0)" }
                        }
                      />
                    )}
                  </span>
                  <span className="font-display text-[18px] tabular-nums">{String(n + 1).padStart(2, "0")}</span>
                  {sl.nav}
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex justify-center gap-1 pb-4 lg:hidden">
          {slides.map((sl, n) => (
            <button key={sl.key} onClick={() => go(n)} aria-label={`Show ${sl.nav}`} aria-current={n === i} className="flex size-11 items-center justify-center">
              <span className={cn("h-2 rounded-full transition-all duration-300", n === i ? "w-6 bg-white" : "w-2 bg-white/35")} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Poster (server-rendered, instant) + video (after hydration). Phones get the portrait 540×960 cut,
 * larger screens the 1280×720 loop. Skipped with reduced motion or Save-Data; paused when off-screen.
 */
function HeroBackdrop({ playing }: { playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduced || conn?.saveData) return;
    // Start the video only once the page has loaded and the main thread is idle — the poster is the LCP.
    const pick = () => setSrc(window.matchMedia("(max-width: 767px)").matches ? heroVideo.mobile : heroVideo.desktop);
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    let t: ReturnType<typeof setTimeout>;
    const idle = () => (w.requestIdleCallback ? w.requestIdleCallback(pick, { timeout: 2500 }) : (t = setTimeout(pick, 1200)));
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
    return () => {
      window.removeEventListener("load", idle);
      clearTimeout(t);
    };
  }, [reduced]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing, src]);

  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <picture>
        <source media="(max-width: 767px)" srcSet={heroVideo.posterMobile} />
        <img src={heroVideo.poster} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      </picture>
      {src && (
        <video
          ref={ref}
          key={src}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={(e) => e.currentTarget.classList.replace("opacity-0", "opacity-100")}
        />
      )}
      {/* Bordeaux veil: keeps white type legible and calms the footage behind the products */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,8,18,0.55)_0%,rgba(43,8,18,0.72)_55%,rgba(43,8,18,0.92)_100%)] lg:bg-[linear-gradient(90deg,rgba(43,8,18,0.94)_0%,rgba(43,8,18,0.78)_42%,rgba(43,8,18,0.45)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_40%,transparent_40%,rgba(43,8,18,0.6)_100%)]" />
    </div>
  );
}

function split(text: string, italic: string) {
  const at = text.indexOf(italic);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <em className="italic">{italic}</em>
      {text.slice(at + italic.length)}
    </>
  );
}

function StageItem({ item, priority }: { item: HeroSlide["items"][number]; priority: boolean }) {
  const a = asset(item.id);
  return (
    <>
      <span
        aria-hidden
        className="absolute h-[9%] -translate-x-1/2 translate-y-1/2"
        style={{
          left: `${item.left}%`,
          bottom: `${item.bottom}%`,
          width: `${item.width * 0.8}%`,
          zIndex: item.z,
          background: "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.55), transparent 70%)",
        }}
      />
      <div
        className="absolute -translate-x-1/2"
        style={{ left: `${item.left}%`, bottom: `${item.bottom}%`, width: `${item.width}%`, height: `${item.height}%`, zIndex: item.z }}
      >
        <Image
          src={a.image}
          alt={a.subject}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 90vw, 54vw"
          className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
        />
      </div>
    </>
  );
}
