"use client";

import { AnimatePresence, motion } from "motion/react";
import { ClipboardList } from "lucide-react";
import { useReview } from "@/store/review";
import { Modal } from "@/components/ui/Modal";
import { placeholderFields, reviewChecklist, site, type Placeholder } from "@/content/site";

const labels: Record<string, string> = {
  phone: "Phone number",
  address: "Showroom address",
  hours: "Opening hours",
  founded: "Year established",
  warrantyStatement: "Genuine products & warranty",
  testRides: "Jinpeng test rides",
  mapsUrl: "Google Maps link",
  founderStory: "Founding story",
  showroomPhotos: "Showroom photography",
  jinpengImageRights: "Jinpeng imagery rights",
  whatsappNumber: "WhatsApp number",
};

/** Floating pill + drawer listing every item to confirm (§17.4). */
export function ReviewMode() {
  const enabled = useReview((s) => s.enabled);
  const open = useReview((s) => s.drawerOpen);
  const setDrawer = useReview((s) => s.setDrawer);
  const setEnabled = useReview((s) => s.setEnabled);

  const items = [...placeholderFields.map((k) => ({ label: labels[k] ?? k, note: (site[k] as Placeholder).note })), ...reviewChecklist];

  return (
    <>
      <AnimatePresence>
        {enabled && (
          <motion.button
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawer(true)}
            className="fixed left-1/2 top-[calc(env(safe-area-inset-top)+76px)] z-[58] flex h-10 -translate-x-1/2 items-center gap-2.5 rounded-full border border-gold/70 bg-obsidian/90 px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-gold backdrop-blur lg:top-[88px]"
          >
            <ClipboardList size={14} strokeWidth={1.25} />
            Review mode · {items.length} items to confirm
          </motion.button>
        )}
      </AnimatePresence>
      <Modal
        open={open}
        onOpenChange={setDrawer}
        title="Items to confirm"
        description="Everything we need from the client to make this real."
        placement="right"
        maxWidth={520}
      >
        <ol className="flex flex-col divide-y divide-line-soft">
          {items.map((it, i) => (
            <li key={it.label} className="flex gap-4 py-4">
              <span className="font-mono text-[11px] text-gold">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-[15px]">{it.label}</p>
                <p className="mt-1 text-[13px] text-fg-muted">{it.note}</p>
              </div>
            </li>
          ))}
        </ol>
        <button
          onClick={() => {
            setEnabled(false);
            setDrawer(false);
          }}
          className="mt-8 min-h-11 text-[13px] text-fg-muted underline underline-offset-4 hover:text-fg"
        >
          Exit review mode
        </button>
      </Modal>
    </>
  );
}
