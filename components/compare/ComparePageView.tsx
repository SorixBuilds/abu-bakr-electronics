"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Share2 } from "lucide-react";
import { CompareTable } from "./CompareTable";
import { useCompare } from "@/store/compare";
import { useUi } from "@/store/ui";
import { getProductById } from "@/data/products";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import type { Product } from "@/types/product";

/** /compare — reads ?ids= and falls back to the compare store (§8.5). Shareable. */
export function ComparePageView() {
  const params = useSearchParams();
  const router = useRouter();
  const storeIds = useCompare((s) => s.ids);
  const remove = useCompare((s) => s.remove);
  const urlIds = params.get("ids")?.split(",").filter(Boolean) ?? null;
  const ids = (urlIds ?? storeIds).slice(0, 3);
  const products = ids.map(getProductById).filter(Boolean) as Product[];

  // Keep the store in step with a shared link so the tray reflects it
  useEffect(() => {
    if (!urlIds) return;
    const c = useCompare.getState();
    if (urlIds.join() !== c.ids.join()) {
      c.clear();
      urlIds.slice(0, 3).forEach((id) => getProductById(id) && c.add(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const onRemove = (id: string) => {
    remove(id);
    const next = ids.filter((x) => x !== id);
    router.replace(next.length ? `/compare?ids=${next.join(",")}` : "/compare", { scroll: false });
  };

  const share = async () => {
    const url = `${window.location.origin}/compare?ids=${ids.join(",")}`;
    try {
      await navigator.clipboard.writeText(url);
      useUi.getState().toast("Link copied");
    } catch {
      useUi.getState().toast("Copy this link: " + url);
    }
  };

  return (
    <div>
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
        <p className="text-fg-muted">{products.length ? `${products.length} of 3 selected.` : ""}</p>
        {products.length > 0 && (
          <button onClick={share} className="flex min-h-11 items-center gap-2 text-[14px] text-fg-muted hover:text-fg">
            <Share2 size={16} strokeWidth={1.75} /> Share comparison
          </button>
        )}
      </div>
      <CompareTable products={products} onRemove={onRemove} />
      {products.length === 0 && (
        <div className="flex justify-center gap-3">
          <LuxuryButton href="/shop" variant="ghost" icon="arrow">
            Explore the collection
          </LuxuryButton>
          <Link href="/mobility" className="sr-only">
            Electric Mobility
          </Link>
        </div>
      )}
    </div>
  );
}
