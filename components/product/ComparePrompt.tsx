"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductMedia } from "./Media";
import { productHref } from "@/lib/format";
import { useCompare } from "@/store/compare";
import { useRouter } from "next/navigation";

/** "Considering others?" — two similar products + one-tap comparison (§8.2.6). */
export function ComparePrompt({ product, similar }: { product: Product; similar: Product[] }) {
  const router = useRouter();
  if (!similar.length) return null;
  const ids = [product.id, ...similar.map((s) => s.id)];

  const compare = () => {
    const c = useCompare.getState();
    c.clear();
    ids.forEach((id) => c.add(id));
    router.push(`/compare?ids=${ids.join(",")}`);
  };

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
      <div>
        <h2 className="text-h2">Considering others?</h2>
        <p className="mt-4 max-w-[36ch] text-fg-muted">Two close alternatives. See them side by side with differences highlighted.</p>
        <button onClick={compare} className="group mt-8 inline-flex min-h-11 items-center gap-2 text-button">
          <span className="link-lux pb-1">Compare side by side</span>
          <ArrowRight size={14} strokeWidth={1.25} className="text-accent-text transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5">
        {similar.map((s) => (
          <li key={s.id}>
            <Link href={productHref(s)} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]">
                  <ProductMedia product={s} sizes="(max-width:768px) 50vw, 30vw" />
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-[15px] leading-snug">{s.name}</p>
              <p className="mt-1 text-[13px] text-fg-muted">{s.keySpecs.join(" · ")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
