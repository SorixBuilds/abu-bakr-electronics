import { create } from "zustand";
import { persist } from "zustand/middleware";
import { safeLocal } from "./storage";

type SavedState = {
  ids: string[];
  toggle(id: string): boolean;
  remove(id: string): void;
};

export const useSaved = create<SavedState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const has = get().ids.includes(id);
        set({ ids: has ? get().ids.filter((x) => x !== id) : [...get().ids, id] });
        return !has;
      },
      remove: (id) => set({ ids: get().ids.filter((x) => x !== id) }),
    }),
    { name: "ab-saved", storage: safeLocal, skipHydration: true },
  ),
);
