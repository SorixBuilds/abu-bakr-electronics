"use client";

import { useCompare } from "@/store/compare";
import { useSaved } from "@/store/saved";
import { useUi } from "@/store/ui";
import { copy } from "@/content/copy";

export function useProductActions(id: string) {
  const inCompare = useCompare((s) => s.ids.includes(id));
  const saved = useSaved((s) => s.ids.includes(id));
  const ui = useUi.getState();

  const toggleCompare = () => {
    const r = useCompare.getState().toggle(id);
    if (r === "full") ui.toast(copy.compare.full, { label: "View", onClick: () => ui.set({ compareDrawerOpen: true }) });
    else if (r === "added") ui.toast(copy.compare.added, { label: "View", onClick: () => ui.set({ compareDrawerOpen: true }) });
    else ui.toast("Removed from compare");
  };

  const toggleSave = () => {
    const now = useSaved.getState().toggle(id);
    ui.toast(now ? "Saved" : "Removed from saved", now ? { label: "View", onClick: () => ui.set({ savedOpen: true }) } : undefined);
  };

  return {
    inCompare,
    saved,
    toggleCompare,
    toggleSave,
    quickView: () => ui.set({ quickViewId: id }),
    requestPrice: () => ui.set({ requestPriceId: id }),
  };
}
