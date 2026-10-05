"use client";

import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useUi } from "@/store/ui";

export function MobilityHeroActions() {
  const set = useUi((s) => s.set);
  return (
    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
      <LuxuryButton href="#models" icon="arrow" magnetic>
        Explore Models
      </LuxuryButton>
      <LuxuryButton variant="ghost" onClick={() => set({ testRideId: "JP-01" })}>
        Book a Test Ride
      </LuxuryButton>
    </div>
  );
}

export function MobilityFinalActions() {
  const set = useUi((s) => s.set);
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <LuxuryButton onClick={() => set({ testRideId: "JP-01" })} magnetic>
        Book a Test Ride
      </LuxuryButton>
      <LuxuryButton variant="gold-line" icon="whatsapp" iconPosition="start" onClick={() => set({ advisorOpen: true })}>
        Speak to an Advisor
      </LuxuryButton>
    </div>
  );
}
