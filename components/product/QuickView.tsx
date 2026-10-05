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
import { brandLabel, productHref } from "@/lib/format";
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
          <Drawer.Overlay className="fixed inset-0 z-[80] bg-[rgba(10,11,13,0.72)] backdrop-blur-[8px]" />
          <Drawer.Content className="theme-dark fixed inset-x-0 bottom-0 z-[81] flex h-[92svh] flex-col rounded-t-2xl bg-graphite-2 outline-none">
            <div className="mx-auto mt-3 h-1 w-9 shrink-0 rounded-full bg-ivory/30" aria-hidden />
            {product && (
              <>
                <Drawer.Title className="sr-only">{product.name}</Drawer.Title>
                <Drawer.Description className="sr-only">Quick view</Drawer.Description>
                <div className="overflow-y-auto px-5 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-4">
                  <div className="relative mx-auto aspect-[4/5] max-h-[44svh] overflow-hidden rounded-sm">
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
                className="fixed inset-0 z-[80] bg-[rgba(10,11,13,0.72)] backdrop-blur-[8px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>
            <div className="pointer-events-none fixed inset-0 z-[81] flex items-center justify-center p-6">
              <Dialog.Content asChild forceMount>
                <motion.div
                  className="theme-dark pointer-events-auto relative grid h-[min(640px,88vh)] w-full max-w-[1040px] grid-cols-[1.05fr_1fr] overflow-hidden rounded-md bg-graphite-2 outline-none"
                  style={{ boxShadow: "var(--shadow-modal)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.35 }}
                >
                  <motion.div
                    layoutId={`img-${product.id}`}
                    className="relative h-full overflow-hidden bg-stage"
                    transition={{ duration: 0.6, ease: ease.outExpo }}
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
                    className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full text-fg-muted hover:text-fg"
                    aria-label="Close"
                  >
                    <X size={20} strokeWidth={1.25} />
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
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-muted">
          {categoryTitle(product.category)} · {brandLabel(product)}
        </span>
      </div>
      <h2 className="mt-4 text-[28px] font-medium leading-tight tracking-[-0.01em] md:pr-8">{product.name}</h2>
      <p className="mt-3 text-lede text-fg/80">{product.tagline}</p>
      <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line-soft pt-6">
        {specs.map((s) => (
          <div key={s.label}>
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-muted">{s.label}</dt>
            <dd className="mt-1 text-[15px]">{s.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-7">
        <p className="text-[20px] font-medium">{copy.price.onRequest}</p>
        <p className="mt-1 text-[13px] text-fg-muted">{copy.price.line}</p>
      </div>
      <div className="mt-auto flex flex-col gap-4 pt-8">
        <LuxuryButton
          onClick={() => {
            set({ quickViewId: null });
            setTimeout(() => set({ requestPriceId: product.id }), 120);
          }}
        >
          Request Price
        </LuxuryButton>
        <div className="flex items-center justify-between">
          <Link href={productHref(product)} onClick={onNavigate} className="group flex min-h-11 items-center gap-2 text-button">
            <span className="link-lux pb-1">View full details</span>
            <ArrowRight size={14} strokeWidth={1.25} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <div className="flex gap-1">
            <button
              onClick={a.toggleSave}
              aria-pressed={a.saved}
              aria-label="Save"
              className={`flex size-11 items-center justify-center rounded-full ${a.saved ? "text-gold" : "text-fg-muted hover:text-fg"}`}
            >
              <Heart size={18} strokeWidth={1.25} fill={a.saved ? "currentColor" : "none"} />
            </button>
            <button
              onClick={a.toggleCompare}
              aria-pressed={a.inCompare}
              aria-label="Compare"
              className={`flex size-11 items-center justify-center rounded-full ${a.inCompare ? "text-gold" : "text-fg-muted hover:text-fg"}`}
            >
              <ArrowLeftRight size={18} strokeWidth={1.25} />
            </button>
          </div>
        </div>
        {product.isDemo && <p className="text-[12px] text-fg-muted">{copy.demoSpecs}</p>}
      </div>
    </div>
  );
}
