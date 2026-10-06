"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { useCompare } from "@/store/compare";
import { useSaved } from "@/store/saved";
import { useReview } from "@/store/review";
import { useAnyOverlay, useUi } from "@/store/ui";

const AdvisorChooser = dynamic(() => import("@/components/forms/AdvisorChooser").then((m) => m.AdvisorChooser), { ssr: false });
const RequestPriceModal = dynamic(() => import("@/components/forms/RequestPriceModal").then((m) => m.RequestPriceModal), { ssr: false });
const QuickView = dynamic(() => import("@/components/product/QuickView").then((m) => m.QuickView), { ssr: false });
const CompareDrawer = dynamic(() => import("@/components/compare/CompareDrawer").then((m) => m.CompareDrawer), { ssr: false });
const CompareTray = dynamic(() => import("@/components/compare/CompareTray").then((m) => m.CompareTray), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/tools/CommandPalette").then((m) => m.CommandPalette), { ssr: false });
const SavedDrawer = dynamic(() => import("@/components/product/SavedDrawer").then((m) => m.SavedDrawer), { ssr: false });
const VisitModal = dynamic(() => import("@/components/forms/VisitModal").then((m) => m.VisitModal), { ssr: false });
const TestRideModal = dynamic(() => import("@/components/forms/TestRideModal").then((m) => m.TestRideModal), { ssr: false });
const ReviewMode = dynamic(() => import("./ReviewMode").then((m) => m.ReviewMode), { ssr: false });
const Toaster = dynamic(() => import("@/components/ui/Toaster").then((m) => m.Toaster), { ssr: false });

/**
 * Overlays (modals, drawers, palette, toasts) are not needed for first paint, so they mount only
 * when one is requested or once the main thread is idle — keeps hydration light on phones.
 */
function useOverlaysReady() {
  const requested = useAnyOverlay();
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const done = () => setIdle(true);
    const onInput = (e: Event) => {
      // Ctrl/⌘+K pressed before the palette has mounted: open it directly.
      if (e instanceof KeyboardEvent && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        useUi.getState().set({ paletteOpen: true });
      }
      done();
    };
    window.addEventListener("pointerdown", onInput, { once: true, passive: true });
    window.addEventListener("keydown", onInput, { once: true });
    const id = w.requestIdleCallback ? w.requestIdleCallback(done, { timeout: 6000 }) : window.setTimeout(done, 3500);
    return () => {
      window.removeEventListener("pointerdown", onInput);
      window.removeEventListener("keydown", onInput);
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);
  return requested || idle;
}

export function Providers({ children }: { children: ReactNode }) {
  const ready = useOverlaysReady();

  useEffect(() => {
    useCompare.persist.rehydrate();
    useSaved.persist.rehydrate();
    useReview.getState().init();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {children}
      {ready && (
        <>
          <AdvisorChooser />
          <RequestPriceModal />
          <QuickView />
          <CompareDrawer />
          <CompareTray />
          <CommandPalette />
          <SavedDrawer />
          <VisitModal />
          <TestRideModal />
          <ReviewMode />
          <Toaster />
        </>
      )}
    </MotionConfig>
  );
}
