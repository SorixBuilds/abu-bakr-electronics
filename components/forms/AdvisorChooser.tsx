"use client";

import { ArrowUpRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useUi } from "@/store/ui";
import { advisorText, openWhatsApp } from "@/lib/whatsapp";

const topics = ["Air conditioning", "Refrigeration", "Home appliances", "Electronics", "Electric bikes & scooties", "Something else"];

export function AdvisorChooser() {
  const open = useUi((s) => s.advisorOpen);
  const set = useUi((s) => s.set);
  return (
    <Modal
      open={open}
      onOpenChange={(v) => set({ advisorOpen: v })}
      title="How can we help?"
      description="Choose a topic — an advisor will continue on WhatsApp."
      maxWidth={480}
    >
      <ul className="flex flex-col">
        {topics.map((t) => (
          <li key={t}>
            <button
              onClick={() => {
                openWhatsApp(advisorText(t === "Something else" ? "something else" : t.toLowerCase()));
                set({ advisorOpen: false });
              }}
              className="group flex min-h-14 w-full items-center justify-between border-b border-line text-left text-[17px] font-medium text-ink transition-colors hover:text-cherry"
            >
              {t}
              <ArrowUpRight
                size={20}
                strokeWidth={1.75}
                className="text-cherry transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[13px] text-muted">Free delivery across Lahore · Delivering across Pakistan</p>
    </Modal>
  );
}
