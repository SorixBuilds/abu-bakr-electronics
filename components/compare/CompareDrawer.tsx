"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { CompareTable } from "./CompareTable";
import { useCompare } from "@/store/compare";
import { useUi } from "@/store/ui";
import { getProductById } from "@/data/products";
import type { Product } from "@/types/product";

export function CompareDrawer() {
  const open = useUi((s) => s.compareDrawerOpen);
  const set = useUi((s) => s.set);
  const ids = useCompare((s) => s.ids);
  const remove = useCompare((s) => s.remove);
  const products = ids.map(getProductById).filter(Boolean) as Product[];
  const close = () => set({ compareDrawerOpen: false });

  return (
    <Modal
      open={open}
      onOpenChange={(v) => set({ compareDrawerOpen: v })}
      title="Compare"
      description="Up to three products, side by side."
      placement="right"
      maxWidth={720}
    >
      <CompareTable products={products} onRemove={remove} onNavigate={close} />
      {products.length > 0 && (
        <Link href={`/compare?ids=${ids.join(",")}`} onClick={close} className="group mt-8 inline-flex min-h-11 items-center gap-2 text-button">
          <span className="link-lux pb-1">Open full comparison</span>
          <ArrowRight size={14} strokeWidth={1.75} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </Modal>
  );
}
