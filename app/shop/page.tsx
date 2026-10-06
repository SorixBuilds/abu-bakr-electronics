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
        eyebrow="The collection"
        title="Everything, in one showroom."
        italic="one"
        line="Air conditioners, refrigerators, home appliances and electronics."
        meta={`${applianceProducts.length} pieces · Price on request`}
        assets={["fridge-1", "washer-1", "tv-2"]}
      />
      <Suspense fallback={<ShopViewStatic />}>
        <ShopView />
      </Suspense>
    </>
  );
}
