import type { Metadata } from "next";
import { Suspense } from "react";
import { ComparePageView } from "@/components/compare/ComparePageView";
import { SectionIntro } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Compare",
  description: "Compare up to three products side by side, with differences highlighted.",
};

export default function ComparePage() {
  return (
    <div className="theme-porcelain bg-porcelain">
      <div className="container-lux pb-[var(--section-y)] pt-10 md:pt-16">
        <SectionIntro eyebrow="Compare" title="Side by side." italic="by side." className="mb-8 md:mb-10" />
        <Suspense>
          <ComparePageView />
        </Suspense>
      </div>
    </div>
  );
}
