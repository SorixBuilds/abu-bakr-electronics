"use client";

import { MessageCircle, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Placeholder, ReviewOnly, ReviewTag } from "@/components/ui/Placeholder";
import { useUi } from "@/store/ui";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Three contact cards — WhatsApp primary (Bordeaux), Call and Visit pending client confirmation. */
export function ContactCards() {
  const set = useUi((s) => s.set);
  const card = "group flex min-h-[200px] flex-col justify-between rounded-lg p-6 text-left shadow-card transition-shadow hover:shadow-lift md:p-7";
  const icon = "flex size-12 items-center justify-center rounded-full";
  return (
    <div className="grid gap-3 md:grid-cols-3 md:gap-4">
      <button
        onClick={() => set({ advisorOpen: true })}
        className={cn(card, "theme-bordeaux text-white")}
        style={{ background: "linear-gradient(135deg, #7A1830, #5C0F22 60%, #3E0A17)" }}
      >
        <span className={cn(icon, "bg-white/15 text-white")}>
          <MessageCircle size={24} strokeWidth={1.75} />
        </span>
        <span>
          <span className="block font-display text-[30px] leading-tight">WhatsApp</span>
          <span className="mt-1 block text-[15px] text-white/75">The fastest way to an advisor.</span>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold">
            Start a chat
            <ArrowUpRight size={18} strokeWidth={1.75} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </span>
      </button>
      <div className={cn(card, "bg-white")}>
        <span className={cn(icon, "bg-blush text-cherry")}>
          <Phone size={24} strokeWidth={1.75} />
        </span>
        <div>
          <p className="font-display text-[30px] leading-tight text-ink">Call</p>
          <p className="mt-1 text-[15px] text-ink-2">{site.phone.value ? <a href={`tel:${site.phone.value}`}>{site.phone.value}</a> : "Ask on WhatsApp for a callback."}</p>
          <ReviewOnly>
            <p className="mt-3 text-[13px]">
              <ReviewTag note={site.phone.note}>Phone number</ReviewTag>
            </p>
          </ReviewOnly>
        </div>
      </div>
      <div className={cn(card, "bg-white")}>
        <span className={cn(icon, "bg-blush text-cherry")}>
          <MapPin size={24} strokeWidth={1.75} />
        </span>
        <div>
          <p className="font-display text-[30px] leading-tight text-ink">Visit</p>
          <p className="mt-1 text-[15px] text-ink-2">
            <Placeholder field="address" /> · <Placeholder field="hours" />
          </p>
        </div>
      </div>
    </div>
  );
}
