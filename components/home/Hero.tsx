"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { home } from "@/content/home";
import { heroMedia } from "@/content/media";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useIntro } from "@/components/layout/Preloader";
import { useUi } from "@/store/ui";
import { ease } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/cn";

/** §6.1 — cinematic opening. Video when available; otherwise the §14.3 interior-light fallback. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introDone = useIntro((s) => s.done);
  const set = useUi((s) => s.set);
  const mobile = useIsMobile();
  const reduced = useReducedMotionSafe();
  const [paused, setPaused] = useState(false);
  const [videoOk, setVideoOk] = useState(false);
  const pausedRef = useRef(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollFx = !mobile && !reduced;
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const darken = useTransform(scrollYProgress, [0, 1], [0, 0.35]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Choose video source in JS (<source media> is unreliable for video) and apply fallbacks (§13.2).
  useEffect(() => {
    const v = videoRef.current;
    const src = mobile ? heroMedia.mobile : heroMedia.desktop;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!v || !src || reduced || conn?.saveData) return;
    v.src = src;
    let started = false;
    const onPlaying = () => {
      started = true;
      setVideoOk(true);
    };
    v.addEventListener("playing", onPlaying);
    v.play().catch(() => setVideoOk(false));
    const t = setTimeout(() => !started && setVideoOk(false), 2500);
    // Pause off-screen and when the tab is hidden
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause();
      else if (!document.hidden && !pausedRef.current) v.play().catch(() => {});
    });
    io.observe(v);
    const onVis = () => (document.hidden ? v.pause() : !pausedRef.current && v.play().catch(() => {}));
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearTimeout(t);
      io.disconnect();
      v.removeEventListener("playing", onPlaying);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [mobile, reduced]);

  const togglePause = () => {
    const next = !paused;
    pausedRef.current = next;
    setPaused(next);
    const v = videoRef.current;
    if (v && videoOk) {
      if (next) v.pause();
      else v.play().catch(() => {});
    }
  };

  const go = introDone;
  const t = (ms: number) => ms / 1000;
  const enter = (delay: number, y = 16, duration = 0.8) => ({
    initial: { opacity: 0, y: reduced ? 0 : y },
    animate: go ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: reduced ? 0.15 : duration, ease: ease.outExpo, delay: reduced ? 0 : t(delay) },
  });
  const poster = mobile ? (heroMedia.posterMobile ?? heroMedia.poster) : heroMedia.poster;

  return (
    <section
      ref={ref}
      className="theme-dark relative -mt-[60px] h-[calc(100svh-36px)] min-h-[600px] overflow-hidden bg-obsidian lg:-mt-[72px]"
      aria-label="Introduction"
    >
      {/* Media layer */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: reduced ? 1 : 1.08 }}
        animate={go ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: reduced ? 0.2 : 2.4, ease: ease.outExpo }}
      >
        <motion.div className="absolute inset-0" style={scrollFx ? { scale: mediaScale } : undefined}>
          <InteriorLight paused={paused || reduced} />
          {poster && (
            // eslint-disable-next-line @next/next/no-img-element -- LCP poster, preloaded
            <img
              src={poster}
              alt=""
              aria-hidden
              className={cn("absolute inset-0 h-full w-full object-cover", !reduced && !videoOk && "animate-[kenburns_20s_ease-out_forwards]")}
              fetchPriority="high"
            />
          )}
          {(heroMedia.desktop || heroMedia.mobile) && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster ?? undefined}
              aria-hidden="true"
              className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700", videoOk ? "opacity-100" : "opacity-0")}
            />
          )}
        </motion.div>
        {/* Overlay stack */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0.55)_0%,rgba(10,11,13,0.05)_35%,rgba(10,11,13,0.15)_60%,rgba(10,11,13,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_70%,rgba(10,11,13,0.55),transparent_60%)]" />
        {scrollFx && <motion.div className="absolute inset-0 bg-obsidian" style={{ opacity: darken }} />}
      </motion.div>
      {/* Grain sits outside the fading layer: visible from first paint */}
      <div className="grain pointer-events-none absolute inset-0" />

      {/* Copy */}
      <motion.div
        className="container-lux absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+96px)] md:bottom-[12vh]"
        style={scrollFx ? { y: textY, opacity: textOpacity } : undefined}
      >
        <div>
          <motion.p {...enter(300, 12, 0.7)} className="text-eyebrow text-ivory/70">
            <span className="mr-3 inline-block h-px w-6 bg-gold align-middle" />
            {home.hero.eyebrow}
          </motion.p>
          <h1
            className="mt-6 text-[clamp(44px,13vw,64px)] font-medium leading-[0.92] tracking-[-0.02em] md:text-[clamp(56px,9vw,152px)]"
            aria-label="Abu Bakr Electronics"
          >
            {home.hero.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]" aria-hidden>
                <motion.span
                  className="block"
                  initial={{ y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 }}
                  animate={go ? { y: "0%", opacity: 1 } : undefined}
                  transition={{ duration: reduced ? 0.15 : 1.1, ease: ease.outExpo, delay: reduced ? 0 : t(450 + i * 120) }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p {...enter(900)} className="mt-6 max-w-[760px] font-serif text-[24px] italic text-ivory/85 md:text-[28px]">
            {home.hero.subline}
          </motion.p>
          <div className="mt-9 flex flex-col gap-3 md:flex-row md:gap-4">
            <motion.div {...enter(1050)}>
              <LuxuryButton href="/shop" magnetic icon="arrow" className="w-full md:w-auto">
                Explore the Collection
              </LuxuryButton>
            </motion.div>
            <motion.div {...enter(1130)}>
              <LuxuryButton
                variant="ghost"
                icon="whatsapp"
                iconPosition="start"
                magnetic
                onClick={() => set({ advisorOpen: true })}
                className="w-full md:w-auto"
              >
                Speak to an Advisor
              </LuxuryButton>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footnote, scroll cue, pause */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : undefined}
        transition={{ delay: reduced ? 0 : 1.4, duration: 0.6 }}
        className="absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+28px)] hidden text-center font-mono text-[11px] tracking-[0.12em] text-ivory/55 md:block"
      >
        {home.hero.footnote}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : undefined}
        transition={{ delay: reduced ? 0 : 1.4, duration: 0.6 }}
        className="absolute bottom-[calc(env(safe-area-inset-bottom)+24px)] right-[var(--gutter)] flex items-end gap-5"
      >
        <button
          onClick={togglePause}
          aria-label={paused ? "Play background motion" : "Pause background motion"}
          className="flex size-10 items-center justify-center rounded-full border border-line text-ivory/70 transition-colors hover:border-ivory/40 hover:text-ivory"
        >
          {paused ? <Play size={14} strokeWidth={1.5} /> : <Pause size={14} strokeWidth={1.5} />}
        </button>
        <div className="hidden flex-col items-center gap-3 md:flex" aria-hidden>
          <span className="font-mono text-[10px] tracking-[0.2em] text-ivory/55 [writing-mode:vertical-rl]">SCROLL</span>
          <span className="relative block h-12 w-px overflow-hidden bg-ivory/15">
            <span className="absolute left-1/2 top-0 size-[3px] -translate-x-1/2 rounded-full bg-gold animate-[scroll-dot_2.4s_ease-in-out_infinite]" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * Fallback "film": a dark interior at dusk, suggested with light rather than drawn.
 * Warm practical light pools, a cool window column, a perspective floor — all drifting slowly (20s+).
 */
function InteriorLight({ paused }: { paused: boolean }) {
  const play = paused ? "paused" : "running";
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0b0d]" aria-hidden>
      {/* cool window light, upper right */}
      <div
        className="absolute -right-[10%] -top-[10%] h-[90%] w-[60%] animate-[drift_26s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(ellipse 50% 60% at 60% 40%, rgba(120,150,190,0.16), transparent 70%)", animationPlayState: play }}
      />
      {/* window mullions */}
      <div
        className="absolute right-[14%] top-[6%] h-[58%] w-[26%] opacity-[0.07]"
        style={{
          background: "repeating-linear-gradient(90deg, transparent 0 calc(33.3% - 1px), #cfd8e6 calc(33.3% - 1px) 33.3%)",
          maskImage: "linear-gradient(180deg, black, transparent)",
        }}
      />
      {/* warm pendant pools */}
      <div
        className="absolute left-[18%] top-[28%] h-[60%] w-[46%] animate-[drift_32s_ease-in-out_infinite_reverse]"
        style={{ background: "radial-gradient(ellipse 45% 40% at 50% 45%, rgba(201,169,106,0.20), transparent 70%)", animationPlayState: play }}
      />
      <div
        className="absolute left-[46%] top-[20%] h-[40%] w-[30%] animate-[drift_22s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(225,201,141,0.12), transparent 65%)", animationPlayState: play }}
      />
      {/* pendant cords + lights */}
      {[30, 40, 50].map((x, i) => (
        <div key={x} className="absolute top-0" style={{ left: `${x}%`, height: `${30 + i * 2}%` }}>
          <div className="mx-auto h-full w-px bg-gradient-to-b from-transparent to-white/10" />
          <div
            className="-mt-1 size-2 -translate-x-[3.5px] rounded-full bg-[#f1dcaa] opacity-70 blur-[1px]"
            style={{ boxShadow: "0 0 24px 8px rgba(225,201,141,0.35)" }}
          />
        </div>
      ))}
      {/* counter / island silhouette */}
      <div className="absolute inset-x-[8%] top-[64%] h-px bg-gradient-to-r from-transparent via-[rgba(225,201,141,0.25)] to-transparent" />
      <div className="absolute inset-x-[8%] top-[64%] h-[14%] bg-gradient-to-b from-[rgba(255,255,255,0.025)] to-transparent" />
      {/* perspective floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[34%] opacity-[0.06]"
        style={{
          background: "repeating-linear-gradient(90deg, transparent 0 7%, #f4f1ea 7% calc(7% + 1px))",
          transform: "perspective(600px) rotateX(62deg)",
          transformOrigin: "50% 100%",
          maskImage: "linear-gradient(180deg, transparent, black)",
        }}
      />
      {/* tall appliance silhouette, left (fridge column) */}
      <div className="absolute bottom-[22%] left-[6%] hidden h-[50%] w-[11%] rounded-[3px] border border-white/[0.05] bg-gradient-to-b from-white/[0.035] to-transparent md:block" />
    </div>
  );
}
