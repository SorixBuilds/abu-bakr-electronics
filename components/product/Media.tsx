import Image from "next/image";
import type { Product } from "@/types/product";
import { productAlt } from "@/lib/format";
import { Stage, ProductCut } from "@/components/ui/Stage";
import { cn } from "@/lib/cn";

/**
 * V3 §3.3 Mode B — a framed photo (shop / showroom photos only) filling its positioned parent,
 * with the unified grade and 1px inner border so phone photos from different days sit together.
 */
export function Photo({
  src,
  alt,
  sizes = "100vw",
  priority,
  position,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
  className?: string;
  imgClassName?: string;
  /** @deprecated kept for old call sites */
  grade?: string;
  vignette?: boolean;
  contain?: boolean;
}) {
  return (
    <div className={cn("framed absolute inset-0 bg-bone", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imgClassName)} style={position ? { objectPosition: position } : undefined} />
    </div>
  );
}

/**
 * V3 §3.4 — every product image is its manifest cutout standing on the category Stage.
 * Fills its (positioned) parent. `index` is kept for gallery call sites; extra gallery items reuse the same cutout until more angles exist.
 */
export function ProductMedia({
  product,
  sizes = "(max-width:768px) 50vw, (max-width:1280px) 33vw, 420px",
  priority,
  className,
  scale = 1,
  radius = "none",
}: {
  product: Product;
  index?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  scale?: number;
  radius?: "none" | "md" | "lg" | "xl" | "2xl";
  grade?: string;
}) {
  return (
    <Stage category={product.category} radius={radius} className={cn("absolute inset-0", className)}>
      <ProductCut id={product.asset!} alt={productAlt(product)} sizes={sizes} priority={priority} scale={scale} />
    </Stage>
  );
}
