"use client";

import { MapPin, Clock, Phone } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Placeholder } from "@/components/ui/Placeholder";
import { useUi } from "@/store/ui";
import { site } from "@/content/site";

/** Visit details + Plan a visit + Get directions (hidden until a Maps link exists). Address/hours are [CLIENT TO CONFIRM]. */
export function VisitBlock() {
  const set = useUi((s) => s.set);
  const rows = [
    { icon: MapPin, label: "Address", value: <Placeholder field="address" /> },
    { icon: Clock, label: "Hours", value: <Placeholder field="hours" /> },
    {
      icon: Phone,
      label: "Phone",
      value: site.phone.value ? <a href={`tel:${site.phone.value}`}>{site.phone.value}</a> : <span className="text-ink-2">Via WhatsApp</span>,
    },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-10">
      <dl className="flex flex-col gap-3">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 rounded-md bg-white p-4 shadow-card">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blush text-cherry">
              <Icon size={20} strokeWidth={1.75} />
            </span>
            <div>
              <dt className="text-[13px] text-muted">{label}</dt>
              <dd className="text-[16px] font-semibold text-ink">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
      <div className="flex flex-col items-start justify-center gap-4">
        <p className="max-w-[40ch] text-body-l text-ink-2">Tell us when you&apos;d like to come and what you&apos;d like to see — an advisor will have it ready.</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <LuxuryButton variant="cherry" onClick={() => set({ visitOpen: true })}>
            Plan a visit
          </LuxuryButton>
          {site.mapsUrl.value ? (
            <LuxuryButton variant="secondary" href={site.mapsUrl.value} external icon="arrow">
              Get directions
            </LuxuryButton>
          ) : (
            <Placeholder field="mapsUrl" reviewOnly className="text-[13px]" />
          )}
        </div>
      </div>
    </div>
  );
}
