"use client";

import { MessageCircle, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Placeholder, ReviewOnly, ReviewTag } from "@/components/ui/Placeholder";
import { useUi } from "@/store/ui";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Three contact cards — WhatsApp primary (gold hairline), Call and Visit pending confirmation. */
export function ContactCards() {
  const set = useUi((s) => s.set);
  const card = "group flex min-h-[220px] flex-col justify-between rounded-sm border p-7 text-left transition-colors";
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <button onClick={() => set({ advisorOpen: true })} className={cn(card, "border-accent hover:bg-[rgba(179,18,46,0.05)]")}>
        <MessageCircle size={22} strokeWidth={1.25} className="text-accent-text" />
        <div>
          <p className="text-h3">WhatsApp</p>
          <p className="mt-2 text-[14px] text-fg-muted">The fastest way to an advisor.</p>
          <span className="mt-5 inline-flex items-center gap-2 text-button">
            Start a chat{" "}
            <ArrowUpRight
              size={14}
              strokeWidth={1.25}
              className="text-accent-text transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </button>
      <div className={cn(card, "border-line")}>
        <Phone size={22} strokeWidth={1.25} className="text-accent-text" />
        <div>
          <p className="text-h3">Call</p>
          <p className="mt-2 text-[14px] text-fg-muted">
            {site.phone.value ? <a href={`tel:${site.phone.value}`}>{site.phone.value}</a> : "Ask on WhatsApp for a callback."}
          </p>
          <ReviewOnly>
            <p className="mt-3 text-[13px]">
              <ReviewTag note={site.phone.note}>Phone number</ReviewTag>
            </p>
          </ReviewOnly>
        </div>
      </div>
      <div className={cn(card, "border-line")}>
        <MapPin size={22} strokeWidth={1.25} className="text-accent-text" />
        <div>
          <p className="text-h3">Visit</p>
          <p className="mt-2 text-[14px] text-fg-muted">
            <Placeholder field="address" /> · <Placeholder field="hours" />
          </p>
        </div>
      </div>
    </div>
  );
}
