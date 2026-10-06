"use client";

import useEmblaCarousel from "embla-carousel-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useState, type WheelEvent } from "react";
import type { Product } from "@/types/product";
import { ProductMedia } from "./Media";
import { cn } from "@/lib/cn";

/**
 * Main image 4:5 on stage, vertical thumbnails (desktop), swipe + dots (mobile), full-screen lightbox with zoom.
 */
export function ProductGallery({ product }: { product: Product }) {
  const count = Math.max(1, product.gallery.length);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [ref, api] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (!api) return;
    const on = () => setIndex(api.selectedScrollSnap());
    api.on("select", on);
    return () => {
      api.off("select", on);
    };
  }, [api]);

  const go = useCallback((i: number) => api?.scrollTo(i), [api]);

  return (
    <div className="flex gap-4 lg:gap-5">
      <div className={cn("hidden w-[84px] shrink-0 flex-col gap-3", count > 1 && "lg:flex")}>
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "relative aspect-[4/5] overflow-hidden rounded-sm ring-offset-2 transition",
              i === index ? "ring-2 ring-cherry" : "ring-1 ring-line opacity-70 hover:opacity-100",
            )}
          >
            <View product={product} i={i} thumb />
          </button>
        ))}
      </div>
      <div className="relative min-w-0 flex-1">
        <div ref={ref} className="overflow-hidden rounded-lg">
          <div className="flex touch-pan-y">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="relative aspect-[4/5] min-w-0 shrink-0 basis-full sm:aspect-square">
                <View product={product} i={i} priority={i === 0} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setLightbox(true)}
          className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full bg-white text-ink-2 shadow-card hover:text-ink"
          aria-label="Open full-screen view"
        >
          <Maximize2 size={18} strokeWidth={1.75} />
        </button>
        <div className={cn("mt-4 justify-center gap-2 lg:hidden", count > 1 ? "flex" : "hidden")} aria-hidden>
          {Array.from({ length: count }).map((_, i) => (
            <span key={i} className={cn("h-[3px] w-8 rounded-full transition-colors", i === index ? "bg-cherry" : "bg-line")} />
          ))}
        </div>
      </div>
      <Lightbox product={product} open={lightbox} onOpenChange={setLightbox} start={index} count={count} />
    </div>
  );
}

/** One real photo from the product gallery. */
function View({ product, i, thumb, priority }: { product: Product; i: number; thumb?: boolean; priority?: boolean }) {
  return <ProductMedia product={product} index={i} priority={priority} sizes={thumb ? "76px" : "(max-width:1024px) 100vw, 55vw"} />;
}

function Lightbox({
  product,
  open,
  onOpenChange,
  start,
  count,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  start: number;
  count: number;
}) {
  const [i, setI] = useState(start);
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync lightbox to the gallery position when opened
      setI(start);
      setZoom(1);
    }
  }, [open, start]);

  const onWheel = (e: WheelEvent) => setZoom((z) => Math.min(3, Math.max(1, z - e.deltaY * 0.002)));

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-porcelain" />
        <Dialog.Content className="theme-porcelain fixed inset-0 z-[91] flex flex-col outline-none">
          <Dialog.Title className="sr-only">{product.name} — images</Dialog.Title>
          <Dialog.Description className="sr-only">Scroll or pinch to zoom.</Dialog.Description>
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[14px] font-semibold text-muted">
              {i + 1} / {count}
            </span>
            <Dialog.Close className="flex size-11 items-center justify-center rounded-full bg-white text-ink shadow-card" aria-label="Close">
              <X size={22} strokeWidth={1.75} />
            </Dialog.Close>
          </div>
          <div className="relative flex-1 touch-pinch-zoom overflow-auto" onWheel={onWheel} onDoubleClick={() => setZoom((z) => (z > 1 ? 1 : 2))}>
            <div className="absolute inset-0 transition-transform duration-200" style={{ transform: `scale(${zoom})` }}>
              <div className="relative mx-auto h-full max-w-[min(80vh,900px)]">
                <View product={product} i={i} />
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-4">
            {Array.from({ length: count }).map((_, n) => (
              <button
                key={n}
                onClick={() => {
                  setI(n);
                  setZoom(1);
                }}
                aria-label={`Image ${n + 1}`}
                className="flex h-11 w-10 items-center"
              >
                <span className={cn("h-[3px] w-full rounded-full", n === i ? "bg-cherry" : "bg-line")} />
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
