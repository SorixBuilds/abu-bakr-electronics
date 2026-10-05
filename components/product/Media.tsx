import Image from "next/image";
import type { Product, ProductShape } from "@/types/product";
import { ProductPlaceholder } from "./ProductPlaceholder";
import { productAlt } from "@/lib/format";
import { cn } from "@/lib/cn";

/** Product image on its stage, or the line-drawn placeholder when no photo exists. */
export function ProductMedia({
  product,
  index = 0,
  sizes = "(max-width:768px) 50vw, (max-width:1280px) 33vw, 420px",
  priority,
  className,
  strokeOpacity,
}: {
  product: Product;
  index?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  strokeOpacity?: number;
}) {
  const src = index === 0 ? product.image : product.gallery[index];
  if (!src) {
    return <ProductPlaceholder shape={product.shape} className={className} strokeOpacity={strokeOpacity} />;
  }
  return (
    <div className={cn("relative h-full w-full bg-stage", className)}>
      <Image src={src} alt={productAlt(product)} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}

const tones: Record<string, string> = {
  cool: "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(77,141,255,0.10), transparent 60%), radial-gradient(ellipse 90% 70% at 20% 100%, rgba(201,169,106,0.08), transparent 60%), linear-gradient(180deg, #121519 0%, #0b0c0f 100%)",
  steel:
    "radial-gradient(ellipse 70% 50% at 50% 15%, rgba(244,241,234,0.08), transparent 60%), radial-gradient(ellipse 80% 40% at 50% 100%, rgba(201,169,106,0.10), transparent 60%), linear-gradient(180deg, #15171a 0%, #0a0b0d 100%)",
  warm: "radial-gradient(ellipse 80% 60% at 25% 25%, rgba(201,169,106,0.14), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 100%, rgba(122,94,40,0.18), transparent 60%), linear-gradient(180deg, #16140f 0%, #0b0a09 100%)",
  electric:
    "radial-gradient(ellipse 60% 40% at 50% 85%, rgba(77,141,255,0.10), transparent 65%), radial-gradient(ellipse 80% 60% at 80% 10%, rgba(201,169,106,0.07), transparent 60%), linear-gradient(180deg, #0f1115 0%, #08090b 100%)",
  ivory:
    "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255,255,255,0.6), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 100%, rgba(201,169,106,0.18), transparent 60%), linear-gradient(180deg, #ebe6db 0%, #ddd7ca 100%)",
  night:
    "radial-gradient(ellipse 50% 35% at 30% 70%, rgba(201,169,106,0.16), transparent 70%), radial-gradient(ellipse 60% 40% at 80% 30%, rgba(77,141,255,0.06), transparent 70%), linear-gradient(180deg, #0d0e11 0%, #070809 100%)",
};

/** Atmospheric scene for categories / editorial blocks when photography is not yet available. */
export function SceneVisual({
  tone = "steel",
  shape,
  image,
  alt = "",
  sizes = "100vw",
  priority,
  className,
  drawingClassName,
  label,
  floor = "18%",
}: {
  tone?: keyof typeof tones | string;
  shape?: ProductShape;
  image?: string | null;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  drawingClassName?: string;
  label?: string;
  /** height of the floor line from the bottom; null hides it */
  floor?: string | null;
}) {
  if (image) {
    return (
      <div className={cn("relative h-full w-full bg-graphite", className)}>
        <Image src={image} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", tone === "ivory" ? "theme-light" : "theme-dark", className)}
      style={{ background: tones[tone] ?? tones.steel }}
      aria-hidden={!alt}
    >
      {/* architectural hint: floor line */}
      {floor && <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ bottom: floor }} />}
      {shape && (
        <div className={cn("absolute inset-x-[12%] bottom-[10%] top-[18%]", drawingClassName)}>
          <ProductPlaceholder shape={shape} className="bg-transparent" glow={false} strokeOpacity={0.42} />
        </div>
      )}
      {label && <span className="absolute right-3 top-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ivory/35">{label}</span>}
    </div>
  );
}
