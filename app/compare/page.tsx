import type { Metadata } from "next";
import { Suspense } from "react";
import { ComparePageView } from "@/components/compare/ComparePageView";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Compare",
  description: "Compare up to three products side by side, with differences highlighted.",
};

export default function ComparePage() {
  return (
    <div className="theme-dark bg-obsidian">
      <div className="container-lux pb-[var(--section-y)] pt-16 md:pt-24">
        <SectionHeading as="h1" size="h1" eyebrow="Compare" title="Side by side." className="mb-12" />
        <Suspense>
          <ComparePageView />
        </Suspense>
      </div>
    </div>
  );
}
