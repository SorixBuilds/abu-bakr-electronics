import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ShopView, ShopViewStatic } from "@/components/product/ShopView";
import { applianceProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "The Collection",
  description: "Air conditioners, refrigerators, home appliances and electronics — a considered collection. Free delivery across Lahore.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="The Collection"
        title="The Collection"
        line="Everything we curate, in one place."
        meta={`${applianceProducts.length} pieces`}
        image="/images/lifestyle/kitchen-dark-2.jpg"
        imagePosition="50% 60%"
      />
      <Suspense fallback={<ShopViewStatic />}>
        <ShopView />
      </Suspense>
    </>
  );
}
