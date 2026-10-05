"use client";

import { useMediaQuery } from "./useMediaQuery";

/** Global reduced-motion gate. False on the server (motion is opt-out). */
export function useReducedMotionSafe() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
