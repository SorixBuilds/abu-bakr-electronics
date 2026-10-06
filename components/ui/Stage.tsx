import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { CategorySlug } from "@/types/product";
import { asset, darkStage, fitFor, stageColor } from "@/lib/media";
import { cn } from "@/lib/cn";

/**
 * V3 §3.4 — the signature of the site. A category-coloured stage with a soft top light,
 * a floor shadow and a product cutout standing on it.
 */
export function Stage({
  category,
  color,
  className,
  style,
  children,
  radius = "lg",
}: {
  category?: CategorySlug;
  /** Overrides the category colour */
  color?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  radius?: "none" | "md" | "lg" | "xl" | "2xl";
}) {
  const dark = category ? darkStage(category) : false;
  return (
    <div
      className={cn(
        "stage",
        { none: "", md: "rounded-md", lg: "rounded-lg", xl: "rounded-xl", "2xl": "rounded-2xl" }[radius],
        className,
      )}
      data-dark={dark || undefined}
      style={{ "--stage-color": color ?? (category ? stageColor[category] : undefined), ...style } as CSSProperties}
    >
      {children}
    </div>
  );
}

/**
 * A cutout from the manifest placed on a Stage at its category scale.
 * `scale` lets a slot enlarge the whole category box (e.g. hero = 1.15) without breaking per-category consistency.
 */
export function ProductCut({
  id,
  alt,
  sizes = "(max-width: 768px) 80vw, 480px",
  priority,
  scale = 1,
  offsetY = 0,
  className,
  shadow = true,
}: {
  id: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  scale?: number;
  /** Shift the product (and its floor) up/down in % of the stage */
  offsetY?: number;
  className?: string;
  shadow?: boolean;
}) {
  const a = asset(id);
  const f = fitFor(id);
  const w = Math.min(100, f.w * scale);
  const h = Math.min(100, f.h * scale);
  const floor = f.floor - offsetY;
  return (
    <>
      {shadow && <span aria-hidden className="stage-floor" style={{ "--floor": `${floor}%`, "--floor-w": `${Math.min(96, f.floorW * scale)}%` } as CSSProperties} />}
      <div className={cn("absolute left-1/2 -translate-x-1/2", className)} style={{ width: `${w}%`, height: `${h}%`, bottom: `${floor}%` }}>
        <Image
          src={a.image}
          alt={alt ?? a.subject}
          fill
          sizes={sizes}
          priority={priority}
          className="stage-product object-contain object-bottom"
        />
      </div>
    </>
  );
}
