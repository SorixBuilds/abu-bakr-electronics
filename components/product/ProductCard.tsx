"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeftRight, Heart } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductMedia } from "./Media";
import { useProductActions } from "./useProductActions";
import { categoryTitle } from "@/content/categories";
import { formatPrice, productHref } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useReview } from "@/store/review";

export function ProductBadge({ product }: { product: Product }) {
  const review = useReview((s) => s.enabled);
  const badge = review && product.isDemo ? "DEMO" : product.badge;
  if (!badge) return null;
  // V2 §8.1 — "NEW IN" is white on cherry; other badges are quiet outlines.
  const strong = badge === "NEW IN" || badge === "JINPENG";
  return (
    <span
      className={cn(
        "rounded-xs px-2 py-1 font-mono text-[10px] tracking-[0.14em]",
        strong
          ? "bg-cherry text-white"
          : "border border-[color-mix(in_srgb,var(--fg)_30%,transparent)] bg-[color-mix(in_srgb,var(--bg)_70%,transparent)] text-fg/85",
      )}
    >
      {badge}
    </span>
  );
}

/** V2 §8.1 — real photo on a 4:5 stage; hover swaps to the in-situ photo, zooms, and lifts the card. */
export function ProductCard({
  product,
  variant = "default",
  priority,
  className,
  sizes,
  headingAs: H = "h3",
}: {
  product: Product;
  variant?: "default" | "compact";
  priority?: boolean;
  className?: string;
  sizes?: string;
  headingAs?: "h2" | "h3";
}) {
  const a = useProductActions(product.id);
  const href = productHref(product);
  const compact = variant === "compact";
  const eyebrow = `${categoryTitle(product.category)} · ${product.typeLabel}`;

  return (
    <article className={cn("group/card relative flex flex-col transition-transform duration-500 ease-out-expo hover:-translate-y-1", className)}>
      <div className="relative">
        <Link href={href} className="block" aria-label={product.name}>
          <motion.div
            layoutId={`img-${product.id}`}
            className="relative aspect-[4/5] overflow-hidden rounded-md bg-stage transition-shadow duration-500 group-hover/card:shadow-[var(--shadow-soft)]"
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.04]">
              <ProductMedia product={product} priority={priority} sizes={sizes} />
              {product.gallery[1] && (
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100">
                  <ProductMedia product={product} index={1} sizes={sizes} />
                </div>
              )}
            </div>
          </motion.div>
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between">
          <span className="pointer-events-auto">
            <ProductBadge product={product} />
          </span>
          <div className="pointer-events-auto flex gap-1 opacity-60 transition-opacity duration-250 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/card:opacity-100 [@media(hover:hover)]:group-focus-within/card:opacity-100">
            <IconToggle on={a.saved} label={a.saved ? "Remove from saved" : "Save"} onClick={a.toggleSave}>
              <motion.span key={String(a.saved)} initial={{ scale: a.saved ? 1.25 : 1 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                <Heart size={16} strokeWidth={1.25} fill={a.saved ? "currentColor" : "none"} />
              </motion.span>
            </IconToggle>
            <IconToggle on={a.inCompare} label={a.inCompare ? "Remove from compare" : "Compare"} onClick={a.toggleCompare}>
              <ArrowLeftRight size={16} strokeWidth={1.25} />
            </IconToggle>
          </div>
        </div>

        {!compact && (
          <button
            onClick={a.quickView}
            className="absolute inset-x-3 bottom-3 hidden h-10 translate-y-3 items-center justify-center rounded-xs bg-white text-button text-ink opacity-0 backdrop-blur-md transition-all duration-250 ease-ui group-hover/card:translate-y-0 group-hover/card:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 [@media(hover:hover)]:flex"
          >
            Quick View
          </button>
        )}
      </div>

      <Link href={href} className="mt-4 flex flex-col gap-1.5">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-muted line-clamp-1">{eyebrow}</span>
        <H className={cn("font-medium leading-snug text-fg line-clamp-2", compact ? "text-[15px]" : "text-[17px]")}>{product.name}</H>
        {!compact && <p className="line-clamp-1 text-[14px] text-fg-muted">{product.tagline}</p>}
        <span className="mt-1 flex items-center justify-between text-[14px] text-fg">
          {formatPrice(product)}
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-accent-text">
            View
            <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-250 group-hover/card:translate-x-1" />
          </span>
        </span>
      </Link>
    </article>
  );
}

function IconToggle({ on, label, onClick, children }: { on: boolean; label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      aria-label={label}
      title={label}
      className={cn(
        "flex size-11 items-center justify-center rounded-full backdrop-blur-md transition-colors",
        "bg-[color-mix(in_srgb,var(--bg)_55%,transparent)]",
        on ? "text-accent-text" : "text-fg/80 hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
