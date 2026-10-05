"use client";

import { MapPin, Clock, Phone } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Placeholder } from "@/components/ui/Placeholder";
import { useUi } from "@/store/ui";
import { site } from "@/content/site";

/** Visit details + Plan a Visit + Get Directions (hidden until a Maps link exists). */
export function VisitBlock() {
  const set = useUi((s) => s.set);
  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-16">
      <dl className="flex flex-col divide-y divide-line-soft border-y border-line-soft">
        <div className="flex items-start gap-4 py-5">
          <MapPin size={18} strokeWidth={1.25} className="mt-0.5 text-gold-text" />
          <div>
            <dt className="text-eyebrow text-fg-muted">Address</dt>
            <dd className="mt-2 text-[16px]">
              <Placeholder field="address" />
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-4 py-5">
          <Clock size={18} strokeWidth={1.25} className="mt-0.5 text-gold-text" />
          <div>
            <dt className="text-eyebrow text-fg-muted">Hours</dt>
            <dd className="mt-2 text-[16px]">
              <Placeholder field="hours" />
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-4 py-5">
          <Phone size={18} strokeWidth={1.25} className="mt-0.5 text-gold-text" />
          <div>
            <dt className="text-eyebrow text-fg-muted">Phone</dt>
            <dd className="mt-2 text-[16px]">
              {site.phone.value ? <a href={`tel:${site.phone.value}`}>{site.phone.value}</a> : <Placeholder field="phone">{() => null}</Placeholder>}
              {!site.phone.value && <span className="text-fg-muted">Via WhatsApp</span>}
            </dd>
          </div>
        </div>
      </dl>
      <div className="flex flex-col items-start justify-center gap-4">
        <p className="max-w-[40ch] text-fg-muted">Tell us when you&apos;d like to come and what you&apos;d like to see — an advisor will have it ready.</p>
        <div className="flex flex-wrap items-center gap-4">
          <LuxuryButton onClick={() => set({ visitOpen: true })} magnetic>
            Plan a Visit
          </LuxuryButton>
          {site.mapsUrl.value ? (
            <LuxuryButton variant="text" href={site.mapsUrl.value} external icon="arrow">
              Get Directions
            </LuxuryButton>
          ) : (
            <Placeholder field="mapsUrl" reviewOnly className="text-[13px]" />
          )}
        </div>
      </div>
    </div>
  );
}
