"use client";

import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowRight, Compass, Gauge, Heart, MessageCircle, Search, Thermometer, ArrowLeftRight, LayoutGrid } from "lucide-react";
import { useUi } from "@/store/ui";
import { products } from "@/data/products";
import { categories } from "@/content/categories";
import { productHref } from "@/lib/format";
import { advisorText, openWhatsApp } from "@/lib/whatsapp";
import { copy } from "@/content/copy";

/** ⌘K / Ctrl+K command palette (§20.6). */
export function CommandPalette() {
  const open = useUi((s) => s.paletteOpen);
  const set = useUi((s) => s.set);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        set({ paletteOpen: !useUi.getState().paletteOpen });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [set]);

  const go = (href: string) => {
    set({ paletteOpen: false });
    router.push(href);
  };
  const run = (fn: () => void) => {
    set({ paletteOpen: false });
    setTimeout(fn, 60);
  };

  const appliances = products.filter((p) => p.category !== "mobility");
  const models = products.filter((p) => p.category === "mobility");
  const itemCls = "flex min-h-12 cursor-pointer items-center gap-4 px-5 py-2.5 text-[15px] text-ink-2 outline-none data-[selected=true]:text-ink";

  return (
    <Dialog.Root open={open} onOpenChange={(v) => set({ paletteOpen: v })}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[85] bg-[rgba(21,18,20,0.45)] data-[state=open]:animate-[fadein_200ms]" />
        <Dialog.Content
          className="theme-white fixed left-1/2 top-[10vh] z-[86] w-[calc(100vw-24px)] max-w-[640px] -translate-x-1/2 overflow-hidden rounded-xl bg-white shadow-lift outline-none"
          style={{ boxShadow: "var(--shadow-modal)" }}
        >
          <Dialog.Title className="sr-only">Search</Dialog.Title>
          <Dialog.Description className="sr-only">Search products, categories and tools</Dialog.Description>
          <Command label="Search" loop>
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search size={18} strokeWidth={1.75} className="text-accent-text" />
              <Command.Input
                autoFocus
                placeholder='Search — try "1.5 ton", "side-by-side" or "Jinpeng"'
                className="h-16 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-muted focus-visible:outline-none"
              />
              <kbd className="hidden rounded-xs border border-line px-1.5 py-0.5 font-sans text-[10px] text-muted sm:block">ESC</kbd>
            </div>
            <Command.List className="max-h-[min(60vh,520px)] overflow-y-auto overscroll-contain pb-3">
              <Command.Empty className="px-5 py-10 text-center text-[14px] text-muted">{copy.searchEmpty}</Command.Empty>

              <Command.Group heading="Products">
                {appliances.map((p) => (
                  <Command.Item
                    key={p.id}
                    value={`${p.name} ${p.id}`}
                    keywords={[p.typeLabel, ...p.keySpecs, p.type.replace(/-/g, " "), p.category]}
                    onSelect={() => go(productHref(p))}
                    className={itemCls}
                  >
                    <LayoutGrid size={16} strokeWidth={1.75} className="shrink-0 text-muted" />
                    <span className="flex-1 truncate">{p.name}</span>
                    <span className="hidden text-eyebrow text-muted sm:block">{p.keySpecs[0]}</span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Electric Mobility">
                {models.map((p) => (
                  <Command.Item
                    key={p.id}
                    value={p.name}
                    keywords={["jinpeng", "scooty", "scooter", "electric bike", "ev", ...p.keySpecs]}
                    onSelect={() => go(productHref(p))}
                    className={itemCls}
                  >
                    <Gauge size={16} strokeWidth={1.75} className="shrink-0 text-muted" />
                    <span className="flex-1">{p.name}</span>
                    <span className="text-eyebrow text-muted">{p.keySpecs[1]}</span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Categories">
                {categories.map((c) => (
                  <Command.Item key={c.slug} value={`category ${c.title} ${c.slug}`} onSelect={() => go(`/shop/${c.slug}`)} className={itemCls}>
                    <ArrowRight size={16} strokeWidth={1.75} className="shrink-0 text-muted" />
                    {c.title}
                    <span className="text-[13px] text-muted">{c.line}</span>
                  </Command.Item>
                ))}
                <Command.Item value="category electric mobility jinpeng" onSelect={() => go("/mobility")} className={itemCls}>
                  <ArrowRight size={16} strokeWidth={1.75} className="shrink-0 text-muted" />
                  Electric Mobility
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Tools">
                <Command.Item value="appliance finder guidance" onSelect={() => go("/#finder")} className={itemCls}>
                  <Compass size={16} strokeWidth={1.75} className="shrink-0 text-muted" /> Appliance Finder
                </Command.Item>
                <Command.Item value="room cooling guide ac tonnage size" onSelect={() => go("/#room-guide")} className={itemCls}>
                  <Thermometer size={16} strokeWidth={1.75} className="shrink-0 text-muted" /> Room Cooling Guide
                </Command.Item>
                <Command.Item value="compare products" onSelect={() => run(() => set({ compareDrawerOpen: true }))} className={itemCls}>
                  <ArrowLeftRight size={16} strokeWidth={1.75} className="shrink-0 text-muted" /> Compare
                </Command.Item>
                <Command.Item value="saved wishlist" onSelect={() => run(() => set({ savedOpen: true }))} className={itemCls}>
                  <Heart size={16} strokeWidth={1.75} className="shrink-0 text-muted" /> Saved
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Contact">
                <Command.Item value="whatsapp advisor contact speak" onSelect={() => run(() => openWhatsApp(advisorText("a product")))} className={itemCls}>
                  <MessageCircle size={16} strokeWidth={1.75} className="shrink-0 text-accent-text" /> Speak to an advisor on WhatsApp
                </Command.Item>
                <Command.Item value="contact page visit showroom" onSelect={() => go("/contact")} className={itemCls}>
                  <ArrowRight size={16} strokeWidth={1.75} className="shrink-0 text-muted" /> Contact & showroom
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
