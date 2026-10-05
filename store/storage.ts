import { createJSONStorage, type StateStorage } from "zustand/middleware";

const safe = (get: () => Storage | undefined): StateStorage => ({
  getItem: (k) => {
    try {
      return get()?.getItem(k) ?? null;
    } catch {
      return null;
    }
  },
  setItem: (k, v) => {
    try {
      get()?.setItem(k, v);
    } catch {
      /* private mode / blocked storage */
    }
  },
  removeItem: (k) => {
    try {
      get()?.removeItem(k);
    } catch {
      /* ignore */
    }
  },
});

export const safeLocal = createJSONStorage(() => safe(() => (typeof window === "undefined" ? undefined : window.localStorage)));
export const safeSession = createJSONStorage(() => safe(() => (typeof window === "undefined" ? undefined : window.sessionStorage)));

export const sessionGet = (k: string) => {
  try {
    return window.sessionStorage.getItem(k);
  } catch {
    return null;
  }
};
export const sessionSet = (k: string, v: string) => {
  try {
    window.sessionStorage.setItem(k, v);
  } catch {
    /* ignore */
  }
};
