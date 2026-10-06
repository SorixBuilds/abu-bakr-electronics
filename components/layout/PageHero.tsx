import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { CategorySlug } from "@/types/product";
import { asset, darkStage, stageColor } from "@/lib/media";
import { Eyebrow, Heading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * V3 §9.3 — page header: a full-width stage band in the category colour (≈360px on desktop),
 * title left in Bodoni, a group of 2–3 product cutouts right. Without `category` it is a porcelain band.
 * Mobile-first: copy first, the cutout group below it in a shorter strip.
 */
export function PageHero({
  eyebrow,
  title,
  italic,
  line,
  meta,
  category,
  assets = [],
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  line?: string;
  meta?: ReactNode;
  category?: CategorySlug;
  /** Manifest asset ids, lead first */
  assets?: string[];
  children?: ReactNode;
  className?: string;
}) {
  const dark = category ? darkStage(category) : false;
  const items = assets.slice(0, 3);
  // Lead in the middle, supporting pieces either side, a little smaller and behind.
  const slots = items.length === 1 ? [{ left: 50, h: 88, z: 2 }] : items.length === 2 ? [{ left: 38, h: 88, z: 2 }, { left: 72, h: 62, z: 1 }] : [{ left: 50, h: 90, z: 3 }, { left: 20, h: 62, z: 1 }, { left: 80, h: 66, z: 2 }];

  return (
    <section
      className={cn("stage relative", dark ? "theme-graphite text-white" : "theme-porcelain", className)}
      data-dark={dark || undefined}
      style={{ "--stage-color": category ? stageColor[category] : "var(--bone)" } as CSSProperties}
    >
      <div className="container-lux grid items-center gap-4 pb-6 pt-10 md:min-h-[360px] md:grid-cols-12 md:gap-8 md:py-12">
        <Reveal className="md:col-span-6">
          <Eyebrow className={dark ? "text-cherry-soft" : undefined}>{eyebrow}</Eyebrow>
          <Heading as="h1" size="display-l" italic={italic} className="mt-3 max-w-[14ch]">
            {title}
          </Heading>
          {line && <p className={cn("mt-4 max-w-[44ch] text-body-l", dark ? "text-white/75" : "text-ink-2")}>{line}</p>}
          {meta && <p className={cn("mt-4 text-[14px] font-semibold", dark ? "text-white/65" : "text-muted")}>{meta}</p>}
          {children}
        </Reveal>
        {items.length > 0 && (
          <div className="relative h-[200px] sm:h-[240px] md:col-span-6 md:h-[300px]" aria-hidden>
            {items.map((id, n) => {
              const a = asset(id);
              const s = slots[n];
              return (
                <div key={id} className="absolute bottom-[6%] w-[46%] -translate-x-1/2" style={{ left: `${s.left}%`, height: `${s.h}%`, zIndex: s.z }}>
                  <span className="absolute bottom-0 left-1/2 h-[10%] w-[90%] -translate-x-1/2 translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(20,17,20,0.22),transparent_70%)]" />
                  <Image src={a.image} alt="" fill priority={n === 0} sizes="(max-width:768px) 45vw, 300px" className="object-contain object-bottom drop-shadow-[0_24px_30px_rgba(20,17,20,0.18)]" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
