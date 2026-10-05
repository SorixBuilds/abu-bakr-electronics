"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { home } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Modal } from "@/components/ui/Modal";
import { useUi } from "@/store/ui";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { ease } from "@/lib/motion";

const ApplianceFinder = dynamic(() => import("@/components/tools/ApplianceFinder").then((m) => m.ApplianceFinder), { ssr: false });

/** §6.7 — graphite chapter; inline panel on desktop, bottom sheet on mobile. */
export function FinderChapter() {
  const [started, setStarted] = useState(false);
  const mobile = useIsMobile();
  const sheet = useUi((s) => s.finderSheetOpen);
  const set = useUi((s) => s.set);

  const begin = () => (mobile ? set({ finderSheetOpen: true }) : setStarted(true));

  return (
    <section id="finder" className="theme-graphite section-y scroll-mt-20 bg-graphite" aria-label="Appliance Finder">
      <div className="container-lux">
        <div className="mx-auto max-w-[720px]">
          <AnimatePresence mode="wait" initial={false}>
            {!started ? (
              <motion.div key="intro" exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="flex flex-col items-center text-center">
                <SectionHeading eyebrow={home.finder.eyebrow} title={home.finder.title} support={home.finder.support} align="center" />
                <div className="mt-10">
                  <LuxuryButton onClick={begin} icon="arrow" magnetic>
                    Begin
                  </LuxuryButton>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: ease.outExpo }}
                className="rounded-md border border-line bg-graphite-2 p-8 md:p-12"
              >
                <ApplianceFinder />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {mobile && (
        <Modal open={sheet} onOpenChange={(v) => set({ finderSheetOpen: v })} title="Appliance Finder" hideTitle>
          <div className="pb-4 pt-2">
            <ApplianceFinder onNavigate={() => set({ finderSheetOpen: false })} />
          </div>
        </Modal>
      )}
    </section>
  );
}
