import type { ReactNode } from "react";
import { Photo } from "@/components/product/Media";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

/** V2 §8.4 — full-bleed photo hero with a dark (or wine) overlay, sitting beneath the transparent navbar. */
export function PageHero({
  eyebrow,
  title,
  line,
  meta,
  image,
  imagePosition,
  contain,
  overlay = "dark",
  height = "56vh",
  children,
  className,
}: {
  eyebrow: string;
  title: string | string[];
  line?: string;
  meta?: ReactNode;
  image: string;
  imagePosition?: string;
  /** Cut-out images (Jinpeng) sit on the wine stage instead of filling the frame */
  contain?: boolean;
  overlay?: "dark" | "wine";
  height?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      data-nav="dark"
      className={cn("relative -mt-[60px] flex flex-col justify-end overflow-hidden lg:-mt-[72px]", overlay === "wine" ? "theme-wine" : "theme-dark", className)}
      style={{ minHeight: `max(${height}, 480px)` }}
    >
      <Photo
        src={image}
        alt=""
        priority
        sizes="100vw"
        position={imagePosition}
        contain={contain}
        className={cn(
          contain && "bg-[radial-gradient(ellipse_at_70%_45%,var(--wine-500),var(--wine-900)_70%)] py-[10%] pl-[42%] pr-[4%] max-md:pl-[10%] max-md:pb-[42%]",
        )}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            overlay === "wine"
              ? "linear-gradient(90deg, rgba(42,7,16,0.85) 0%, rgba(42,7,16,0.35) 55%, rgba(42,7,16,0) 80%), linear-gradient(180deg, rgba(11,10,12,0.5) 0%, transparent 35%)"
              : "linear-gradient(180deg, rgba(11,10,12,0.6) 0%, rgba(11,10,12,0.15) 40%, rgba(11,10,12,0.85) 100%), linear-gradient(90deg, rgba(11,10,12,0.55), transparent 65%)",
        }}
      />
      <div className="container-lux relative pb-14 pt-36 lg:pb-20">
        <Reveal y={12}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <RevealText as="h1" lines={title} immediate delay={0.1} className="mt-5 max-w-[14ch] text-display-l text-on-dark" />
        {line && (
          <Reveal delay={0.25} y={16}>
            <p className="mt-5 max-w-[44ch] text-lede text-on-dark/85">{line}</p>
          </Reveal>
        )}
        {meta && (
          <Reveal delay={0.35} y={12}>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-on-dark-muted">{meta}</div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
