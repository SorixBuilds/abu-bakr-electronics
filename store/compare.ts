import { create } from "zustand";
import { persist } from "zustand/middleware";
import { safeLocal } from "./storage";

type CompareState = {
  ids: string[];
  add(id: string): "added" | "full" | "exists";
  remove(id: string): void;
  toggle(id: string): "added" | "full" | "removed";
  clear(): void;
};

export const MAX_COMPARE = 3;

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (id) => {
        const { ids } = get();
        if (ids.includes(id)) return "exists";
        if (ids.length >= MAX_COMPARE) return "full";
        set({ ids: [...ids, id] });
        return "added";
      },
      remove: (id) => set({ ids: get().ids.filter((x) => x !== id) }),
      toggle: (id) => {
        if (get().ids.includes(id)) {
          get().remove(id);
          return "removed";
        }
        const r = get().add(id);
        return r === "full" ? "full" : "added";
      },
      clear: () => set({ ids: [] }),
    }),
    { name: "ab-compare", storage: safeLocal, skipHydration: true },
  ),
);
