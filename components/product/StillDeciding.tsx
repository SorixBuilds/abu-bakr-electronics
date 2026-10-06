"use client";

import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useUi } from "@/store/ui";

export function StillDeciding() {
  const set = useUi((s) => s.set);
  return (
    <div className="theme-bordeaux flex flex-col items-start justify-between gap-6 rounded-xl p-6 text-white sm:p-8 md:flex-row md:items-center md:p-12" style={{ background: "linear-gradient(135deg, #5C0F22, #3E0A17)" }}>
      <div>
        <h2 className="text-h2 text-white">
          Still <em>deciding</em>?
        </h2>
        <p className="mt-3 max-w-[44ch] text-white/75">An advisor can compare options with you, confirm availability and arrange delivery.</p>
      </div>
      <LuxuryButton variant="light" icon="whatsapp" iconPosition="start" onClick={() => set({ advisorOpen: true })}>
        WhatsApp us
      </LuxuryButton>
    </div>
  );
}
