"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/product";
import { ProductMedia } from "@/components/product/Media";
import { formatPrice, productHref } from "@/lib/format";
import { cn } from "@/lib/cn";
import { copy } from "@/content/copy";

/** Union of spec keys; rows that differ are tinted gold when "Highlight differences" is on (§8.5). */
export function CompareTable({ products, onRemove, onNavigate }: { products: Product[]; onRemove?: (id: string) => void; onNavigate?: () => void }) {
  const [highlight, setHighlight] = useState(true);

  if (!products.length) {
    return <p className="py-16 text-center text-fg-muted">{copy.compare.empty}</p>;
  }

  const keys: string[] = [];
  products.forEach((p) => p.specs.forEach((s) => !keys.includes(s.label) && keys.push(s.label)));
  const val = (p: Product, k: string) => p.specs.find((s) => s.label === k)?.value ?? "—";
  const mixed = new Set(products.map((p) => p.category)).size > 1;
  const anyDemo = products.some((p) => p.isDemo);
  const anyJinpeng = products.some((p) => p.category === "mobility");

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[14px]">
          <input type="checkbox" checked={highlight} onChange={(e) => setHighlight(e.target.checked)} className="peer sr-only" />
          <span className="relative h-5 w-9 rounded-full border border-line transition-colors peer-checked:border-gold peer-focus-visible:outline-2 peer-focus-visible:outline-gold-hi">
            <span
              className={cn(
                "absolute top-1/2 size-3 -translate-y-1/2 rounded-full transition-all",
                highlight ? "left-[19px] bg-gold" : "left-[3px] bg-fg-muted",
              )}
            />
          </span>
          Highlight differences
        </label>
        {mixed && <p className="text-[13px] text-fg-muted">You&apos;re comparing across categories — some rows won&apos;t apply to every product.</p>}
      </div>
      <div className="no-scrollbar -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] md:mx-0 md:px-0" data-lenis-prevent>
        <table className="w-full min-w-[560px] table-fixed border-collapse text-left">
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-10 w-[140px] bg-[var(--bg)] md:w-[180px]">
                <span className="sr-only">Specification</span>
              </th>
              {products.map((p) => (
                <th key={p.id} scope="col" className="px-3 pb-6 align-top font-normal">
                  <div className="relative">
                    <Link href={productHref(p)} onClick={onNavigate} className="block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                        <ProductMedia product={p} sizes="200px" />
                      </div>
                      <p className="mt-3 line-clamp-2 text-[15px] font-medium leading-snug">{p.name}</p>
                    </Link>
                    <p className="mt-1 text-[13px] text-fg-muted">{formatPrice(p)}</p>
                    {onRemove && (
                      <button
                        onClick={() => onRemove(p.id)}
                        aria-label={`Remove ${p.name}`}
                        className="absolute right-1 top-1 flex size-9 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--bg)_60%,transparent)] text-fg-muted backdrop-blur hover:text-fg"
                      >
                        <X size={16} strokeWidth={1.25} />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => {
              const values = products.map((p) => val(p, k));
              const differs = new Set(values).size > 1;
              return (
                <tr key={k} className={cn("border-t border-line-soft transition-colors", highlight && differs && "bg-[rgba(201,169,106,0.06)]")}>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-[var(--bg)] py-4 pr-3 align-top font-mono text-[10.5px] font-normal uppercase tracking-[0.14em] text-fg-muted"
                  >
                    <span className={cn("block", highlight && differs && "text-gold-text")}>{k}</span>
                  </th>
                  {values.map((v, i) => (
                    <td key={i} className="px-3 py-4 align-top text-[14px]">
                      {v}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-6 space-y-1 text-[12px] text-fg-muted">
        {anyDemo && <p>{copy.demoSpecs}</p>}
        {anyJinpeng && <p>{copy.jinpeng}</p>}
      </div>
    </div>
  );
}
