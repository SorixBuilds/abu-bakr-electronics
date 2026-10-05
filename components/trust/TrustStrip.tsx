"use client";

import { MessageCircle, MapPin, Truck, ShieldCheck } from "lucide-react";
import { ReviewOnly, ReviewTag } from "@/components/ui/Placeholder";
import { site } from "@/content/site";

/** Verified-only trust strip; warranty slot appears only in Review Mode (§8.2.7). */
export function TrustStrip() {
  const items = [
    { icon: MessageCircle, title: "Guidance first", line: "A real advisor, before you decide." },
    { icon: Truck, title: "Free delivery in Lahore", line: "Complimentary, across the city." },
    { icon: MapPin, title: "Nationwide delivery", line: "Ask about delivery to your city." },
  ];
  return (
    <ul className="grid gap-px overflow-hidden rounded-sm border border-line-soft bg-line-soft sm:grid-cols-3 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
      {items.map(({ icon: Icon, title, line }) => (
        <li key={title} className="flex items-start gap-4 bg-[var(--bg)] p-6">
          <Icon size={20} strokeWidth={1.25} className="mt-0.5 shrink-0 text-gold-text" />
          <div>
            <p className="text-[15px] font-medium">{title}</p>
            <p className="mt-1 text-[13px] text-fg-muted">{line}</p>
          </div>
        </li>
      ))}
      <ReviewOnly>
        <li className="flex items-start gap-4 bg-[var(--bg)] p-6">
          <ShieldCheck size={20} strokeWidth={1.25} className="mt-0.5 shrink-0 text-gold-text" />
          <div className="text-[15px]">
            <ReviewTag note={site.warrantyStatement.note}>Brand warranty</ReviewTag>
          </div>
        </li>
      </ReviewOnly>
    </ul>
  );
}
