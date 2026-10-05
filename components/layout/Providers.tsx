"use client";

import dynamic from "next/dynamic";
import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { useCompare } from "@/store/compare";
import { useSaved } from "@/store/saved";
import { useReview } from "@/store/review";
import { AdvisorChooser } from "@/components/forms/AdvisorChooser";
import { RequestPriceModal } from "@/components/forms/RequestPriceModal";
import { Toaster } from "@/components/ui/Toaster";
import { SmoothScroll } from "./SmoothScroll";
import { ReviewMode } from "./ReviewMode";

const QuickView = dynamic(() => import("@/components/product/QuickView").then((m) => m.QuickView), { ssr: false });
const CompareDrawer = dynamic(() => import("@/components/compare/CompareDrawer").then((m) => m.CompareDrawer), { ssr: false });
const CompareTray = dynamic(() => import("@/components/compare/CompareTray").then((m) => m.CompareTray), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/tools/CommandPalette").then((m) => m.CommandPalette), { ssr: false });
const SavedDrawer = dynamic(() => import("@/components/product/SavedDrawer").then((m) => m.SavedDrawer), { ssr: false });
const VisitModal = dynamic(() => import("@/components/forms/VisitModal").then((m) => m.VisitModal), { ssr: false });
const TestRideModal = dynamic(() => import("@/components/forms/TestRideModal").then((m) => m.TestRideModal), { ssr: false });

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    useCompare.persist.rehydrate();
    useSaved.persist.rehydrate();
    useReview.getState().init();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {children}
      <SmoothScroll />
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
    </MotionConfig>
  );
}
