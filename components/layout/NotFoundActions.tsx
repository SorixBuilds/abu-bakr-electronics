"use client";

import { Search } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useUi } from "@/store/ui";

export function NotFoundActions() {
  const set = useUi((s) => s.set);
  return (
    <div className="mx-auto mt-12 flex max-w-[560px] flex-col gap-3 sm:flex-row">
      <button
        onClick={() => set({ paletteOpen: true })}
        className="flex h-[52px] flex-1 items-center gap-3 rounded-xs border border-line px-5 text-left text-[15px] text-fg-muted transition-colors hover:border-white/40 hover:text-fg"
      >
        <Search size={17} strokeWidth={1.75} className="text-accent-text" />
        Search the collection
      </button>
      <LuxuryButton variant="secondary" icon="whatsapp" iconPosition="start" onClick={() => set({ advisorOpen: true })}>
        WhatsApp us
      </LuxuryButton>
    </div>
  );
}
