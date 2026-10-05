import { create } from "zustand";

export type Toast = { id: number; message: string; action?: { label: string; onClick: () => void } };

type UiState = {
  quickViewId: string | null;
  requestPriceId: string | null;
  advisorOpen: boolean;
  menuOpen: boolean;
  paletteOpen: boolean;
  compareDrawerOpen: boolean;
  savedOpen: boolean;
  visitOpen: boolean;
  testRideId: string | null;
  finderSheetOpen: boolean;
  toasts: Toast[];
  set(p: Partial<Omit<UiState, "set" | "toast" | "dismissToast">>): void;
  toast(message: string, action?: Toast["action"]): void;
  dismissToast(id: number): void;
};

let toastId = 0;

export const useUi = create<UiState>()((set, get) => ({
  quickViewId: null,
  requestPriceId: null,
  advisorOpen: false,
  menuOpen: false,
  paletteOpen: false,
  compareDrawerOpen: false,
  savedOpen: false,
  visitOpen: false,
  testRideId: null,
  finderSheetOpen: false,
  toasts: [],
  set: (p) => set(p),
  toast: (message, action) => {
    const id = ++toastId;
    set({ toasts: [...get().toasts.slice(-2), { id, message, action }] });
    setTimeout(() => get().dismissToast(id), 3500);
  },
  dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));

/** True when any overlay is open (used to hide the WhatsApp FAB). */
export const useAnyOverlay = () =>
  useUi(
    (s) =>
      !!s.quickViewId ||
      !!s.requestPriceId ||
      s.advisorOpen ||
      s.menuOpen ||
      s.paletteOpen ||
      s.compareDrawerOpen ||
      s.savedOpen ||
      s.visitOpen ||
      !!s.testRideId ||
      s.finderSheetOpen,
  );
