import type { ReactNode } from "react";
import type { ProductShape } from "@/types/product";
import { SceneVisual } from "@/components/product/Media";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

/** Dark image hero that sits beneath the transparent navbar (category, mobility, showroom). */
export function PageHero({
  eyebrow,
  title,
  line,
  meta,
  tone,
  shape,
  image,
  height = "56vh",
  children,
  className,
}: {
  eyebrow: string;
  title: string | string[];
  line?: string;
  meta?: ReactNode;
  tone?: string;
  shape?: ProductShape;
  image?: string | null;
  height?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("theme-dark relative -mt-[60px] flex flex-col justify-end overflow-hidden bg-obsidian lg:-mt-[72px]", className)}
      style={{ minHeight: `max(${height}, 460px)` }}
    >
      <div className="absolute inset-0">
        <SceneVisual
          tone={tone}
          shape={shape}
          image={image}
          drawingClassName="left-auto right-[6%] w-[min(46%,520px)] opacity-80 max-md:right-[-8%] max-md:w-[70%] max-md:opacity-40"
        />
      </div>
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0.55)_0%,rgba(10,11,13,0.1)_40%,rgba(10,11,13,0.85)_100%)]" />
      <div className="container-lux relative pb-14 pt-36 lg:pb-20">
        <Reveal y={12}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <RevealText as="h1" lines={title} immediate delay={0.1} className="mt-5 text-display-l max-w-[14ch]" />
        {line && (
          <Reveal delay={0.25} y={16}>
            <p className="mt-5 max-w-[44ch] text-lede text-ivory/80">{line}</p>
          </Reveal>
        )}
        {meta && (
          <Reveal delay={0.35} y={12}>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ivory/55">{meta}</div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
