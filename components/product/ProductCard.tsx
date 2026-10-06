"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeftRight, Heart } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductMedia } from "./Media";
import { useProductActions } from "./useProductActions";
import { categoryTitle } from "@/content/categories";
import { formatPrice, productHref } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useReview } from "@/store/review";
import { useUi } from "@/store/ui";

const labels: Record<string, string> = { "NEW IN": "New in", DEMO: "Demo", "ASK FOR AVAILABILITY": "Ask for availability", JINPENG: "Jinpeng" };

/** V3 §9.1 badge — blush pill, cherry text. Review mode marks illustrative products. */
export function ProductBadge({ product }: { product: Product }) {
  const review = useReview((s) => s.enabled);
  const badge = review && product.isDemo ? "DEMO" : product.badge;
  if (!badge) return null;
  return <span className="whitespace-nowrap rounded-full bg-blush px-2.5 py-1 text-[12px] font-semibold text-cherry">{labels[badge] ?? badge}</span>;
}

/**
 * V3 §9.1 — white card (14px, --shadow-card), 4:5 stage with the cutout, save/compare circles,
 * type line, name, "Price on request", Request price pill + View link. Hover: lift, cutout rises, Quick view pill.
 */
export function ProductCard({
  product,
  variant = "default",
  priority,
  className,
  sizes = "(max-width:768px) 80vw, (max-width:1280px) 33vw, 320px",
  headingAs: H = "h3",
  dense,
}: {
  product: Product;
  variant?: "default" | "compact";
  priority?: boolean;
  className?: string;
  sizes?: string;
  headingAs?: "h2" | "h3";
  /** Two-column phone grids: hide the icon circles and the Request price pill below 640px */
  dense?: boolean;
}) {
  const a = useProductActions(product.id);
  const set = useUi((s) => s.set);
  const href = productHref(product);
  const compact = variant === "compact";
  const typeLine = `${product.category === "mobility" ? "Jinpeng" : categoryTitle(product.category).replace(/s$/, "")} · ${product.typeLabel}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-md bg-white p-2.5 shadow-card transition-[box-shadow,transform] duration-300 ease-lux hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[10px]">
        <Link href={href} className="absolute inset-0" aria-label={product.name}>
          <ProductMedia product={product} priority={priority} sizes={sizes} />
        </Link>

        <div className="pointer-events-none absolute inset-x-2.5 top-2.5 flex items-start justify-between">
          <span className="pointer-events-auto">
            <ProductBadge product={product} />
          </span>
          <div className={cn("pointer-events-auto flex gap-1.5", (compact || dense) && "max-sm:hidden")}>
            <IconToggle on={a.saved} label={a.saved ? "Remove from saved" : "Save"} onClick={a.toggleSave}>
              <Heart size={18} strokeWidth={1.75} fill={a.saved ? "currentColor" : "none"} />
            </IconToggle>
            <IconToggle on={a.inCompare} label={a.inCompare ? "Remove from compare" : "Compare"} onClick={a.toggleCompare}>
              <ArrowLeftRight size={18} strokeWidth={1.75} />
            </IconToggle>
          </div>
        </div>

        {!compact && (
          <button
            onClick={a.quickView}
            className="absolute bottom-3 left-1/2 hidden h-10 -translate-x-1/2 translate-y-2 items-center justify-center rounded-full bg-white px-5 text-[14px] font-semibold text-ink opacity-0 shadow-card transition-all duration-300 ease-lux group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 [@media(hover:hover)]:flex"
          >
            Quick view
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
        <span className="line-clamp-1 text-[13px] text-muted">{typeLine}</span>
        <Link href={href} className="mt-1">
          <H className={cn("line-clamp-2 font-semibold leading-snug text-ink", compact || dense ? "text-[15px] sm:text-[17px]" : "text-[17px]", compact && "sm:text-[15px]")}>{product.name}</H>
        </Link>
        <span className="mt-1.5 text-[15px] text-ink-2">{formatPrice(product)}</span>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          {!compact && (
            <button
              onClick={() => set({ requestPriceId: product.id })}
              className={cn(
                "inline-flex h-11 items-center rounded-full bg-cherry px-4 text-[14px] font-semibold text-white transition-[background-color,box-shadow] duration-300 hover:bg-cherry-hi hover:shadow-[var(--shadow-cherry)]",
                dense && "max-sm:hidden",
              )}
            >
              Request price
            </button>
          )}
          <Link href={href} className="inline-flex min-h-11 items-center gap-1 text-[14px] font-semibold text-cherry">
            <span className="link-lux">View</span>
            <ArrowRight size={16} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-[3px]" />
          </Link>
        </div>
      </div>
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
        "flex size-11 items-center justify-center rounded-full bg-white shadow-card transition-colors",
        on ? "text-cherry" : "text-ink-2 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
