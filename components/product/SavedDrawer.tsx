"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useSaved } from "@/store/saved";
import { useUi } from "@/store/ui";
import { getProductById } from "@/data/products";
import { ProductMedia } from "./Media";
import { formatPrice, productHref } from "@/lib/format";
import { openWhatsApp } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

export function SavedDrawer() {
  const open = useUi((s) => s.savedOpen);
  const set = useUi((s) => s.set);
  const ids = useSaved((s) => s.ids);
  const remove = useSaved((s) => s.remove);
  const products = ids.map(getProductById).filter(Boolean) as Product[];
  const close = () => set({ savedOpen: false });

  return (
    <Modal open={open} onOpenChange={(v) => set({ savedOpen: v })} title="Saved" description="Pieces you're considering." placement="right" maxWidth={480}>
      {products.length === 0 ? (
        <p className="py-16 text-center text-fg-muted">Nothing saved yet. Tap the heart on any product to keep it here.</p>
      ) : (
        <>
          <ul className="flex flex-col divide-y divide-line-soft">
            {products.map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-4">
                <Link href={productHref(p)} onClick={close} className="relative block h-20 w-16 shrink-0 overflow-hidden rounded-sm">
                  <ProductMedia product={p} sizes="64px" />
                </Link>
                <Link href={productHref(p)} onClick={close} className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-[15px] leading-snug">{p.name}</p>
                  <p className="mt-1 text-[13px] text-fg-muted">{formatPrice(p)}</p>
                </Link>
                <button
                  onClick={() => remove(p.id)}
                  aria-label={`Remove ${p.name}`}
                  className="flex size-11 items-center justify-center text-fg-muted hover:text-fg"
                >
                  <X size={16} strokeWidth={1.25} />
                </button>
              </li>
            ))}
          </ul>
          <LuxuryButton
            className="mt-8 w-full"
            variant="gold-line"
            icon="whatsapp"
            iconPosition="start"
            onClick={() =>
              openWhatsApp(
                `Assalam o Alaikum, I'm considering these products and would like prices and availability:\n${products
                  .map((p) => `• ${p.name} (${p.id})`)
                  .join("\n")}\n(Sent from the Abu Bakr Electronics website)`,
              )
            }
          >
            Send my shortlist to an advisor
          </LuxuryButton>
        </>
      )}
    </Modal>
  );
}
