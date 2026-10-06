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
        <h2 className="text-h2">
          Considering <em>others</em>?
        </h2>
        <p className="mt-4 max-w-[36ch] text-ink-2">Two close alternatives. See them side by side with differences highlighted.</p>
        <button onClick={compare} className="group mt-6 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-cherry">
          <span className="link-lux">Compare side by side</span>
          <ArrowRight size={18} strokeWidth={1.75} className="transition-transform group-hover:translate-x-[3px]" />
        </button>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5">
        {similar.map((s) => (
          <li key={s.id}>
            <Link href={productHref(s)} className="group block rounded-md bg-white p-2.5 shadow-card transition-shadow hover:shadow-lift">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
                <ProductMedia product={s} sizes="(max-width:768px) 50vw, 30vw" />
              </div>
              <p className="mt-3 line-clamp-2 px-1 text-[15px] font-semibold leading-snug text-ink">{s.name}</p>
              <p className="mt-1 px-1 pb-1 text-[13px] text-muted">{s.keySpecs.join(" · ")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
