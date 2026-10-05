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
 * When a product has no photography, views are the line drawing presented at different framings.
 */
export function ProductGallery({ product }: { product: Product }) {
  const count = Math.max(1, product.gallery.length || 3);
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
      <div className="hidden w-[76px] shrink-0 flex-col gap-3 lg:flex">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "relative aspect-[4/5] overflow-hidden rounded-sm border transition-colors",
              i === index ? "border-gold" : "border-transparent opacity-60 hover:opacity-100",
            )}
          >
            <View product={product} i={i} thumb />
          </button>
        ))}
      </div>
      <div className="relative min-w-0 flex-1">
        <div ref={ref} className="overflow-hidden rounded-sm">
          <div className="flex touch-pan-y">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="relative aspect-[4/5] min-w-0 shrink-0 basis-full">
                <View product={product} i={i} priority={i === 0} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setLightbox(true)}
          className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full bg-[rgba(10,11,13,0.5)] text-ivory/80 backdrop-blur hover:text-ivory"
          aria-label="Open full-screen view"
        >
          <Maximize2 size={16} strokeWidth={1.25} />
        </button>
        <div className="mt-4 flex justify-center gap-2 lg:hidden" aria-hidden>
          {Array.from({ length: count }).map((_, i) => (
            <span key={i} className={cn("h-px w-8 transition-colors", i === index ? "bg-gold" : "bg-line")} />
          ))}
        </div>
      </div>
      <Lightbox product={product} open={lightbox} onOpenChange={setLightbox} start={index} count={count} />
    </div>
  );
}

/** Different framings of the same product when only one (or no) image exists. */
function View({ product, i, thumb, priority }: { product: Product; i: number; thumb?: boolean; priority?: boolean }) {
  if (product.gallery[i] || (i === 0 && product.image)) {
    return <ProductMedia product={product} index={i} priority={priority} sizes={thumb ? "76px" : "(max-width:1024px) 100vw, 55vw"} />;
  }
  const framing = ["", "scale-[1.6] translate-y-[8%]", "scale-[1.25] -translate-x-[10%]"][i % 3];
  return (
    <div className="absolute inset-0 overflow-hidden bg-stage">
      <div className={cn("absolute inset-0 transition-transform", framing)}>
        <ProductMedia product={product} strokeOpacity={thumb ? 0.5 : 0.6} />
      </div>
    </div>
  );
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
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-obsidian" />
        <Dialog.Content className="theme-dark fixed inset-0 z-[91] flex flex-col outline-none" data-lenis-prevent>
          <Dialog.Title className="sr-only">{product.name} — images</Dialog.Title>
          <Dialog.Description className="sr-only">Scroll or pinch to zoom.</Dialog.Description>
          <div className="flex items-center justify-between px-5 py-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ivory/55">
              {i + 1} / {count}
            </span>
            <Dialog.Close className="flex size-11 items-center justify-center text-ivory/70 hover:text-ivory" aria-label="Close">
              <X size={22} strokeWidth={1.25} />
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
                <span className={cn("h-px w-full", n === i ? "bg-gold" : "bg-line")} />
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
