import Image from "next/image";
import type { Product } from "@/types/product";
import { productAlt } from "@/lib/format";
import { cn } from "@/lib/cn";

type Grade = "dark" | "light" | "none";

const grades: Record<Grade, string> = {
  dark: "saturate-[0.92] contrast-[1.05]",
  light: "saturate-[0.95]",
  none: "",
};

/**
 * A real photograph filling its (positioned) parent, with the V2 §4.8 treatment:
 * consistent grade + a soft inner vignette so photos from different sources sit together.
 */
export function Photo({
  src,
  alt,
  sizes = "100vw",
  priority,
  position,
  grade = "dark",
  vignette = true,
  contain,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
  grade?: Grade;
  vignette?: boolean;
  /** Cut-outs (Jinpeng PNGs) are contained, not cropped */
  contain?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-stage", className)}>
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(contain ? "object-contain" : "object-cover", grades[grade], imgClassName)}
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
      {vignette && !contain && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: grade === "light" ? "inset 0 0 120px rgba(0,0,0,0.08)" : "inset 0 0 120px rgba(0,0,0,0.25)" }}
        />
      )}
    </div>
  );
}

/** Product photo on its stage. `index` picks from the gallery (falls back to the main image). */
export function ProductMedia({
  product,
  index = 0,
  sizes = "(max-width:768px) 50vw, (max-width:1280px) 33vw, 420px",
  priority,
  className,
  grade,
}: {
  product: Product;
  index?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  grade?: Grade;
}) {
  const src = product.gallery[index] ?? product.image;
  const cutout = product.category === "mobility";
  return (
    <Photo
      src={src}
      alt={productAlt(product)}
      sizes={sizes}
      priority={priority}
      position={src === product.image ? product.imagePosition : undefined}
      contain={cutout}
      grade={grade ?? "none"}
      className={cn(cutout && "bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,#4a0d1b,var(--wine-900))] p-[8%]", className)}
    />
  );
}
