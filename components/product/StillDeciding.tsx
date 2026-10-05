"use client";

import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useUi } from "@/store/ui";

export function StillDeciding() {
  const set = useUi((s) => s.set);
  return (
    <div className="flex flex-col items-start justify-between gap-8 border-y border-line py-14 md:flex-row md:items-center">
      <div>
        <h2 className="text-h2">Still deciding?</h2>
        <p className="mt-3 max-w-[44ch] text-fg-muted">An advisor can compare options with you, confirm availability and arrange delivery.</p>
      </div>
      <LuxuryButton variant="gold-line" icon="whatsapp" iconPosition="start" magnetic onClick={() => set({ advisorOpen: true })}>
        Speak to an Advisor
      </LuxuryButton>
    </div>
  );
}
