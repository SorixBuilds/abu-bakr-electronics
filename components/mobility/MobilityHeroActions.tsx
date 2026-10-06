"use client";

import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Placeholder } from "@/components/ui/Placeholder";
import { useUi } from "@/store/ui";

/** Test rides are [CLIENT TO CONFIRM] (site.testRides) — labelled through the placeholder system. */
export function MobilityHeroActions() {
  const set = useUi((s) => s.set);
  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
      <LuxuryButton href="#models" variant="light" icon="arrow">
        Explore models
      </LuxuryButton>
      <LuxuryButton variant="ghost" onClick={() => set({ testRideId: "JP-01" })}>
        <Placeholder field="testRides" />
      </LuxuryButton>
    </div>
  );
}

export function MobilityFinalActions() {
  const set = useUi((s) => s.set);
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <LuxuryButton variant="light" icon="whatsapp" iconPosition="start" onClick={() => set({ advisorOpen: true })}>
        WhatsApp us
      </LuxuryButton>
      <LuxuryButton variant="ghost" onClick={() => set({ testRideId: "JP-01" })}>
        <Placeholder field="testRides" />
      </LuxuryButton>
    </div>
  );
}
