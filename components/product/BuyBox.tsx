"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeftRight, Heart, MessageCircle, Share2, Truck, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/types/product";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ReviewOnly, ReviewTag } from "@/components/ui/Placeholder";
import { ProductBadge } from "./ProductCard";
import { ProductMedia } from "./Media";
import { useProductActions } from "./useProductActions";
import { formatPrice } from "@/lib/format";
import { categoryTitle } from "@/content/categories";
import { advisorText, openWhatsApp } from "@/lib/whatsapp";
import { useUi } from "@/store/ui";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** V3 §9.2 PDP info column + sticky bars (desktop under the nav; mobile bottom bar with Request price + WhatsApp). */
export function BuyBox({ product, testRide, headingAs: H = "h1" }: { product: Product; testRide?: boolean; headingAs?: "h1" | "h2" }) {
  const a = useProductActions(product.id);
  const set = useUi((s) => s.set);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: product.name, url });
      else {
        await navigator.clipboard.writeText(url);
        useUi.getState().toast("Link copied");
      }
    } catch {
      /* dismissed */
    }
  };

  const whatsapp = () => openWhatsApp(`${advisorText(product.name)}\n(${product.id})`);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <ProductBadge product={product} />
          <span className="text-eyebrow text-cherry">{product.category === "mobility" ? "Jinpeng Electric" : categoryTitle(product.category)}</span>
          {product.brand === null && (
            <ReviewOnly>
              <ReviewTag note="Brand and model for this product">Brand</ReviewTag>
            </ReviewOnly>
          )}
        </div>
        <H className="mt-4 text-h2">{product.name}</H>
        <p className="mt-3 font-display text-[22px] italic leading-snug text-ink-2">{product.tagline}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {product.keySpecs.map((k) => (
            <li key={k} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[14px] font-medium text-ink-2">
              {k}
            </li>
          ))}
        </ul>

        <div className="mt-7 border-t border-line pt-6">
          <p className="text-[22px] font-semibold text-ink">{formatPrice(product)}</p>
          <p className="mt-1 text-[14px] text-muted">{copy.price.line}</p>
        </div>

        <div ref={ctaRef} className="mt-6 flex flex-col flex-wrap gap-3 sm:flex-row">
          <LuxuryButton variant="cherry" onClick={a.requestPrice} className="w-full sm:flex-1">
            Request price
          </LuxuryButton>
          <LuxuryButton variant="secondary" icon="whatsapp" iconPosition="start" onClick={whatsapp} className="w-full sm:flex-1">
            WhatsApp us
          </LuxuryButton>
          {testRide && (
            <LuxuryButton variant="secondary" onClick={() => set({ testRideId: product.id })} className="w-full sm:basis-full">
              Request a test ride
            </LuxuryButton>
          )}
        </div>

        <div className="mt-4 flex items-center gap-1">
          <Tertiary on={a.inCompare} onClick={a.toggleCompare} icon={<ArrowLeftRight size={18} strokeWidth={1.75} />}>
            {a.inCompare ? "In compare" : "Compare"}
          </Tertiary>
          <Tertiary on={a.saved} onClick={a.toggleSave} icon={<Heart size={18} strokeWidth={1.75} fill={a.saved ? "currentColor" : "none"} />}>
            {a.saved ? "Saved" : "Save"}
          </Tertiary>
          <Tertiary onClick={share} icon={<Share2 size={18} strokeWidth={1.75} />}>
            Share
          </Tertiary>
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-md bg-bone p-5 text-[15px] text-ink">
          <p className="flex items-center gap-3">
            <Truck size={20} strokeWidth={1.75} className="text-cherry" /> Free delivery across Lahore
          </p>
          <p className="flex items-center gap-3">
            <MapPin size={20} strokeWidth={1.75} className="text-cherry" /> Delivering across Pakistan — ask about your city
          </p>
        </div>
        {testRide && (
          <ReviewOnly>
            <p className="mt-4 text-[13px]">
              <ReviewTag note={site.testRides.note}>Test rides</ReviewTag>
            </p>
          </ReviewOnly>
        )}
      </div>

      {/* Sticky bar — desktop: under nav; mobile: fixed bottom with safe area */}
      <AnimatePresence>
        {stuck && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: ease.lux }}
            className="theme-white fixed inset-x-0 top-[72px] z-50 hidden h-16 border-b border-line bg-white shadow-card md:block"
          >
            <div className="container-lux flex h-full items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-xs">
                <ProductMedia product={product} sizes="48px" />
              </div>
              <p className="truncate text-[15px] font-semibold text-ink">{product.name}</p>
              <span className="ml-auto hidden text-[14px] text-muted lg:block">{formatPrice(product)}</span>
              <LuxuryButton size="md" variant="cherry" onClick={a.requestPrice} className="ml-auto lg:ml-4">
                Request price
              </LuxuryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        data-mobile-bar
        className="theme-white fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-line bg-white px-4 pt-3 shadow-[0_-8px_24px_-12px_rgba(21,18,20,0.18)] md:hidden"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
      >
        <LuxuryButton size="md" variant="cherry" onClick={a.requestPrice} className="flex-1">
          Request price
        </LuxuryButton>
        <button
          onClick={whatsapp}
          aria-label="WhatsApp an advisor"
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-line bg-white px-4 text-[14px] font-semibold text-ink"
        >
          <MessageCircle size={18} strokeWidth={1.75} /> WhatsApp
        </button>
      </div>
    </>
  );
}

function Tertiary({ on, onClick, icon, children }: { on?: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={cn("flex min-h-11 items-center gap-2 px-3 text-[14px] font-medium transition-colors first:pl-0", on ? "text-cherry" : "text-ink-2 hover:text-ink")}
    >
      {icon}
      {children}
    </button>
  );
}
