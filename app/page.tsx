import { Hero } from "@/components/home/Hero";
import { FourWorlds } from "@/components/home/FourWorlds";
import { FridgeSpotlight } from "@/components/home/FridgeSpotlight";
import { ClimateChapter } from "@/components/home/ClimateChapter";
import { CollectionRail } from "@/components/home/CollectionRail";
import { MobilityChapter } from "@/components/home/MobilityChapter";
import { FinderChapter } from "@/components/home/FinderChapter";
import { DeliveryChapter } from "@/components/home/DeliveryChapter";
import { StandardChapter } from "@/components/home/StandardChapter";
import { ShowroomChapter } from "@/components/home/ShowroomChapter";
import { FinalCTA } from "@/components/home/FinalCTA";
import { BrandWall } from "@/components/home/BrandWall";

/** Home — 12 chapters (§6). Theme rhythm: dark · dark · dark · ivory · ivory · dark · graphite · dark · ivory · ivory · dark · obsidian. */
export default function Home() {
  return (
    <>
      <Hero />
      <FourWorlds />
      <FridgeSpotlight />
      <ClimateChapter />
      <CollectionRail />
      <MobilityChapter />
      <FinderChapter />
      <DeliveryChapter />
      <BrandWall />
      <StandardChapter />
      <ShowroomChapter />
      <FinalCTA />
    </>
  );
}
