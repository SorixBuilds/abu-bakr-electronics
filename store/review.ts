import { create } from "zustand";
import { sessionGet, sessionSet } from "./storage";

type ReviewState = {
  enabled: boolean;
  drawerOpen: boolean;
  init(): void;
  setEnabled(v: boolean): void;
  setDrawer(v: boolean): void;
};

export const useReview = create<ReviewState>()((set) => ({
  enabled: false,
  drawerOpen: false,
  init: () => {
    const q = new URLSearchParams(window.location.search).get("review");
    if (q === "1") sessionSet("ab-review", "1");
    if (q === "0") sessionSet("ab-review", "0");
    set({ enabled: sessionGet("ab-review") === "1" });
  },
  setEnabled: (v) => {
    sessionSet("ab-review", v ? "1" : "0");
    set({ enabled: v });
  },
  setDrawer: (v) => set({ drawerOpen: v }),
}));
