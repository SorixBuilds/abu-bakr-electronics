"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeftRight, ArrowRight, Heart, X } from "lucide-react";
import { Drawer } from "vaul";
import { useUi } from "@/store/ui";
import { getProductById } from "@/data/products";
import { ProductMedia } from "./Media";
import { ProductBadge } from "./ProductCard";
import { useProductActions } from "./useProductActions";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { productHref } from "@/lib/format";
import { categoryTitle } from "@/content/categories";
import { copy } from "@/content/copy";
import { ease } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import type { Product } from "@/types/product";

/** §9.4 — card image morphs into the modal via shared layoutId; bottom sheet on mobile. */
export function QuickView() {
  const id = useUi((s) => s.quickViewId);
  const set = useUi((s) => s.set);
  const mobile = useIsMobile();
  const product = id ? getProductById(id) : undefined;
  const close = () => set({ quickViewId: null });

  if (mobile) {
    return (
      <Drawer.Root open={!!product} onOpenChange={(v) => !v && close()}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[80] bg-[rgba(21,18,20,0.45)]" />
          <Drawer.Content className="theme-white fixed inset-x-0 bottom-0 z-[81] flex h-[92svh] flex-col rounded-t-xl bg-white text-ink outline-none">
            <div className="mx-auto mt-3 h-1 w-9 shrink-0 rounded-full bg-line" aria-hidden />
            {product && (
              <>
                <Drawer.Title className="sr-only">{product.name}</Drawer.Title>
                <Drawer.Description className="sr-only">Quick view</Drawer.Description>
                <div className="overflow-y-auto px-5 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-4">
                  <div className="relative mx-auto aspect-[4/5] max-h-[44svh] overflow-hidden rounded-lg">
                    <ProductMedia product={product} sizes="90vw" />
                  </div>
                  <Info product={product} onNavigate={close} />
                </div>
              </>
            )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <Dialog.Root open={!!product} onOpenChange={(v) => !v && close()}>
      <AnimatePresence>
        {product && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[80] bg-[rgba(21,18,20,0.45)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>
            <div className="pointer-events-none fixed inset-0 z-[81] flex items-center justify-center p-6">
              <Dialog.Content asChild forceMount>
                <motion.div
                  className="theme-white pointer-events-auto relative grid h-[min(640px,88vh)] w-full max-w-[1040px] grid-cols-[1.05fr_1fr] overflow-hidden rounded-xl bg-white text-ink outline-none"
                  style={{ boxShadow: "var(--shadow-lift)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.35 }}
                >
                  <motion.div
                    layoutId={`img-${product.id}`}
                    className="relative h-full overflow-hidden"
                    transition={{ duration: 0.6, ease: ease.lux }}
                  >
                    <ProductMedia product={product} sizes="520px" />
                  </motion.div>
                  <motion.div
                    className="flex flex-col overflow-y-auto p-10"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.5, ease: ease.outExpo }}
                  >
                    <Dialog.Title className="sr-only">{product.name}</Dialog.Title>
                    <Dialog.Description className="sr-only">Quick view</Dialog.Description>
                    <Info product={product} onNavigate={close} />
                  </motion.div>
                  <Dialog.Close
                    className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-porcelain text-ink-2 hover:text-ink"
                    aria-label="Close"
                  >
                    <X size={20} strokeWidth={1.75} />
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function Info({ product, onNavigate }: { product: Product; onNavigate: () => void }) {
  const a = useProductActions(product.id);
  const set = useUi((s) => s.set);
  const specs = product.specs.slice(0, 4);
  return (
    <div className="flex flex-1 flex-col pt-6 md:pt-0">
      <div className="flex items-center gap-3">
        <ProductBadge product={product} />
        <span className="text-eyebrow text-cherry">
          {categoryTitle(product.category)}
        </span>
      </div>
      <h2 className="mt-3 font-display text-[32px] leading-[1.05] md:pr-8">{product.name}</h2>
      <p className="mt-3 font-display text-[20px] italic text-ink-2">{product.tagline}</p>
      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6">
        {specs.map((s) => (
          <div key={s.label}>
            <dt className="text-[13px] text-muted">{s.label}</dt>
            <dd className="mt-0.5 text-[15px] font-medium text-ink">{s.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-7">
        <p className="text-[20px] font-semibold">{copy.price.onRequest}</p>
        <p className="mt-1 text-[13px] text-muted">{copy.price.line}</p>
      </div>
      <div className="mt-auto flex flex-col gap-4 pt-8">
        <LuxuryButton
          onClick={() => {
            set({ quickViewId: null });
            setTimeout(() => set({ requestPriceId: product.id }), 120);
          }}
        >
          Request price
        </LuxuryButton>
        <div className="flex items-center justify-between">
          <Link href={productHref(product)} onClick={onNavigate} className="group flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-cherry">
            <span className="link-lux">View full details</span>
            <ArrowRight size={18} strokeWidth={1.75} className="transition-transform group-hover:translate-x-[3px]" />
          </Link>
          <div className="flex gap-1">
            <button
              onClick={a.toggleSave}
              aria-pressed={a.saved}
              aria-label="Save"
              className={`flex size-11 items-center justify-center rounded-full ${a.saved ? "bg-blush text-cherry" : "bg-porcelain text-ink-2 hover:text-ink"}`}
            >
              <Heart size={18} strokeWidth={1.75} fill={a.saved ? "currentColor" : "none"} />
            </button>
            <button
              onClick={a.toggleCompare}
              aria-pressed={a.inCompare}
              aria-label="Compare"
              className={`flex size-11 items-center justify-center rounded-full ${a.inCompare ? "bg-blush text-cherry" : "bg-porcelain text-ink-2 hover:text-ink"}`}
            >
              <ArrowLeftRight size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>
        {product.isDemo && <p className="text-[13px] text-muted">{copy.demoSpecs}</p>}
      </div>
    </div>
  );
}
