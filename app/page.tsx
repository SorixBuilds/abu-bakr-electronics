import { Hero } from "@/components/home/Hero";
import { TrustRibbon } from "@/components/home/TrustRibbon";
import { Bento } from "@/components/home/Bento";
import { Spotlight } from "@/components/home/Spotlight";
import { ClimateChapter } from "@/components/home/ClimateChapter";
import { CollectionRail } from "@/components/home/CollectionRail";
import { MobilityChapter } from "@/components/home/MobilityChapter";
import { FinderChapter } from "@/components/home/FinderChapter";
import { ShowroomChapter } from "@/components/home/ShowroomChapter";
import { DeliveryChapter } from "@/components/home/DeliveryChapter";
import { FinalCTA } from "@/components/home/FinalCTA";

/** V3 §8 — Hero · Trust · Bento · Spotlight · Room Guide · Collection · Bordeaux Room · Finder · Showroom (when real photos exist) · Delivery · Final CTA. */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustRibbon />
      <Bento />
      <Spotlight />
      <ClimateChapter />
      <CollectionRail />
      <MobilityChapter />
      <FinderChapter />
      <ShowroomChapter />
      <DeliveryChapter />
      <FinalCTA />
    </>
  );
}
