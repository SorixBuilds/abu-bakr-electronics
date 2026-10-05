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
import { brandLabel, formatPrice } from "@/lib/format";
import { advisorText, openWhatsApp } from "@/lib/whatsapp";
import { useUi } from "@/store/ui";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** PDP right column (§8.2.2) + sticky product bar that appears once the main CTA scrolls away (§8.2.3). */
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
          {product.badge !== "JINPENG" && <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-muted">{brandLabel(product)}</span>}
          {product.brand === null && (
            <ReviewOnly>
              <ReviewTag note="Brand and model for this product">Brand</ReviewTag>
            </ReviewOnly>
          )}
        </div>
        <H className="mt-5 text-[32px] font-medium leading-[1.08] tracking-[-0.015em] md:text-[40px]">{product.name}</H>
        <p className="mt-4 text-[22px] font-serif italic leading-snug text-fg/80">{product.tagline}</p>

        <ul className="mt-7 flex flex-wrap gap-2">
          {product.keySpecs.map((k) => (
            <li key={k} className="rounded-xs border border-line px-2.5 py-1.5 font-mono text-[12px] text-fg/85">
              {k}
            </li>
          ))}
        </ul>

        <div className="mt-9 border-t border-line-soft pt-7">
          <p className="text-[22px] font-medium">{formatPrice(product)}</p>
          <p className="mt-1 text-[14px] text-fg-muted">{copy.price.line}</p>
        </div>

        <div ref={ctaRef} className="mt-7 flex flex-col gap-3">
          <LuxuryButton onClick={a.requestPrice} magnetic className="w-full">
            Request Price
          </LuxuryButton>
          <LuxuryButton variant="gold-line" icon="whatsapp" iconPosition="start" onClick={whatsapp} className="w-full">
            WhatsApp an Advisor
          </LuxuryButton>
          {testRide && (
            <LuxuryButton variant="ghost" onClick={() => set({ testRideId: product.id })} className="w-full">
              Book a Test Ride
            </LuxuryButton>
          )}
        </div>

        <div className="mt-4 flex items-center gap-1">
          <Tertiary on={a.inCompare} onClick={a.toggleCompare} icon={<ArrowLeftRight size={16} strokeWidth={1.25} />}>
            {a.inCompare ? "In compare" : "Compare"}
          </Tertiary>
          <Tertiary on={a.saved} onClick={a.toggleSave} icon={<Heart size={16} strokeWidth={1.25} fill={a.saved ? "currentColor" : "none"} />}>
            {a.saved ? "Saved" : "Save"}
          </Tertiary>
          <Tertiary onClick={share} icon={<Share2 size={16} strokeWidth={1.25} />}>
            Share
          </Tertiary>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-sm bg-stage p-5 text-[14px]">
          <p className="flex items-center gap-3">
            <Truck size={17} strokeWidth={1.25} className="text-accent-text" /> Free delivery across Lahore
          </p>
          <p className="flex items-center gap-3">
            <MapPin size={17} strokeWidth={1.25} className="text-accent-text" /> Delivering across Pakistan — ask about your city
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
            transition={{ duration: 0.4, ease: ease.outExpo }}
            className="theme-dark fixed inset-x-0 top-[var(--nav-offset)] z-50 hidden h-16 border-b border-line-soft bg-[rgba(17,19,22,0.9)] backdrop-blur-[16px] transition-[top] duration-300 md:block"
          >
            <div className="container-lux flex h-full items-center gap-4">
              <div className="relative h-11 w-9 overflow-hidden rounded-xs">
                <ProductMedia product={product} sizes="36px" />
              </div>
              <p className="truncate text-[15px]">{product.name}</p>
              <span className="ml-auto hidden text-[14px] text-fg-muted lg:block">{formatPrice(product)}</span>
              <LuxuryButton size="md" onClick={a.requestPrice} className="ml-auto lg:ml-4">
                Request Price
              </LuxuryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        data-mobile-bar
        className="theme-dark fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-line-soft bg-[rgba(17,19,22,0.94)] px-4 pt-3 backdrop-blur-[16px] md:hidden"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
      >
        <LuxuryButton size="md" onClick={a.requestPrice} className="flex-1">
          Request Price
        </LuxuryButton>
        <button
          onClick={whatsapp}
          aria-label="WhatsApp an advisor"
          className="flex size-11 shrink-0 items-center justify-center rounded-xs border border-accent text-ivory"
        >
          <MessageCircle size={18} strokeWidth={1.25} />
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
      className={cn("flex min-h-11 items-center gap-2 px-3 text-[13px] transition-colors first:pl-0", on ? "text-accent-text" : "text-fg-muted hover:text-fg")}
    >
      {icon}
      {children}
    </button>
  );
}
