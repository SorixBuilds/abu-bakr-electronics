"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { home } from "@/content/home";
import { heroMedia } from "@/content/media";
import { worlds } from "@/content/categories";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Photo } from "@/components/product/Media";
import { useUi } from "@/store/ui";
import { ease } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/cn";

/**
 * V2 §5 — "Cinema + Showcase": full-bleed video, left copy, and four real photo cards
 * overlapping into the next section. The poster (a frame of the same clip) is the LCP element.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedRef = useRef(false);
  const set = useUi((s) => s.set);
  const mobile = useIsMobile();
  const reduced = useReducedMotionSafe();
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollFx = !mobile && !reduced;
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const copyY = useTransform(scrollYProgress, [0, 0.6], [0, -50]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // Choose the source in JS (<source media> is unreliable for video); the poster covers every failure case.
  useEffect(() => {
    const v = videoRef.current;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!v || reduced || conn?.saveData) return;
    v.src = mobile ? heroMedia.videoMobile : heroMedia.video;
    const onPlaying = () => setPlaying(true);
    v.addEventListener("playing", onPlaying);
    v.play().catch(() => setPlaying(false));
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause();
      else if (!document.hidden && !pausedRef.current) v.play().catch(() => {});
    });
    io.observe(v);
    const onVis = () => (document.hidden ? v.pause() : !pausedRef.current && v.play().catch(() => {}));
    document.addEventListener("visibilitychange", onVis);
    return () => {
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
    if (!v) return;
    if (next) v.pause();
    else v.play().catch(() => {});
  };

  const enter = (delay: number, y = 18) => ({
    initial: { opacity: 0, y: reduced ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.15 : 0.9, ease: ease.outExpo, delay: reduced ? 0 : delay },
  });

  return (
    <>
      <section
        ref={ref}
        data-nav="dark"
        className="theme-dark relative -mt-[60px] h-[calc(100svh-36px)] min-h-[660px] overflow-hidden bg-obsidian lg:-mt-[72px]"
        aria-label="Introduction"
      >
        <motion.div className="absolute inset-0" style={scrollFx ? { scale: mediaScale } : undefined}>
          {/* Desktop and mobile posters are both rendered; CSS picks one so the server HTML is correct. */}
          <Photo src={heroMedia.poster} alt="" priority sizes="100vw" vignette={false} className="hidden bg-obsidian md:block" />
          <Photo src={heroMedia.posterMobile} alt="" priority sizes="100vw" vignette={false} className="bg-obsidian md:hidden" />
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className={cn("absolute inset-0 h-full w-full object-cover saturate-[0.92] transition-opacity duration-700", playing ? "opacity-100" : "opacity-0")}
          />
        </motion.div>
        {/* Overlays: left/top for legibility, the right half stays bright; bottom fade for the cards */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,10,12,0.8)_0%,rgba(11,10,12,0.45)_50%,rgba(11,10,12,0.25)_75%)] md:bg-[linear-gradient(90deg,rgba(11,10,12,0.82)_0%,rgba(11,10,12,0.45)_45%,rgba(11,10,12,0.05)_72%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(180deg,transparent,rgba(11,10,12,0.8))]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(11,10,12,0.55),transparent)]" />

        <motion.div className="container-lux absolute inset-x-0 top-[13svh] md:top-[17vh]" style={scrollFx ? { y: copyY, opacity: copyOpacity } : undefined}>
          <div className="max-w-[780px]">
            <motion.p {...enter(0.1, 10)} className="flex items-center gap-3 text-eyebrow text-on-dark">
              <span aria-hidden className="size-1.5 rounded-full bg-cherry-hi" />
              {home.hero.eyebrow}
            </motion.p>
            <h1 className="mt-6 text-[clamp(40px,5.2vw,84px)] font-medium leading-[1.02] tracking-[-0.025em] text-on-dark">
              {home.hero.headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em] md:whitespace-nowrap">
                  <span className="block animate-[line-up_1.1s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <motion.p {...enter(0.5)} className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-on-dark/85 md:text-[18px]">
              {home.hero.sub}
            </motion.p>
            <motion.div {...enter(0.65)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <LuxuryButton href="/shop" magnetic icon="arrow" className="w-full sm:w-auto">
                Explore the Collection
              </LuxuryButton>
              <LuxuryButton variant="ghost" icon="whatsapp" iconPosition="start" onClick={() => set({ advisorOpen: true })} className="w-full sm:w-auto">
                Speak to an Advisor
              </LuxuryButton>
            </motion.div>
          </div>
        </motion.div>

        <motion.div {...enter(0.9, 0)} className="container-lux absolute inset-x-0 bottom-[132px] flex items-center justify-between gap-6 md:bottom-[176px]">
          <p className="hidden font-mono text-[12px] tracking-[0.06em] text-on-dark-muted md:block">{home.hero.footnote}</p>
          <button
            onClick={togglePause}
            aria-label={paused ? "Play background video" : "Pause background video"}
            className="ml-auto flex size-10 items-center justify-center rounded-full border border-line text-on-dark/80 transition-colors hover:border-on-dark/40 hover:text-on-dark"
          >
            {paused ? <Play size={14} strokeWidth={1.5} /> : <Pause size={14} strokeWidth={1.5} />}
          </button>
        </motion.div>
      </section>

      <Showcase />
    </>
  );
}

/** Four real photo cards overlapping the hero and the next (porcelain) section (V2 §5.2 layer 3). */
function Showcase() {
  const reduced = useReducedMotionSafe();
  return (
    <div className="relative z-10 -mt-[110px] bg-[linear-gradient(180deg,transparent_110px,var(--porcelain)_110px)] md:-mt-[150px] md:bg-[linear-gradient(180deg,transparent_150px,var(--porcelain)_150px)]">
      <ul className="container-lux no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto md:grid md:grid-cols-4 md:gap-4 md:overflow-visible">
        {worlds.map((w, i) => (
          <motion.li
            key={w.key}
            className="w-[70vw] shrink-0 snap-start md:w-auto"
            initial={{ opacity: 0, y: reduced ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.9, ease: ease.outExpo, delay: reduced ? 0 : 0.8 + i * 0.09 }}
          >
            <Link
              href={w.href}
              className="group relative block aspect-[13/9] overflow-hidden rounded-md border border-[var(--line-dark)] transition-transform duration-500 ease-out-expo hover:-translate-y-1.5"
              style={{ boxShadow: "0 24px 60px -24px rgba(0,0,0,0.55)" }}
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-105">
                <Photo
                  src={w.image}
                  alt=""
                  sizes="(max-width:768px) 70vw, 25vw"
                  contain={w.onWine}
                  vignette={false}
                  className={cn(w.onWine && "bg-[radial-gradient(ellipse_at_50%_40%,var(--wine-500),var(--wine-900))] px-[10%] pb-[22%] pt-[4%]")}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[linear-gradient(180deg,transparent,rgba(11,10,12,0.8))] px-4 pb-3 pt-10">
                <span className="text-[14px] font-medium text-on-dark">{w.label}</span>
                <span className="flex size-7 items-center justify-center rounded-full bg-cherry text-white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={13} strokeWidth={1.75} />
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
