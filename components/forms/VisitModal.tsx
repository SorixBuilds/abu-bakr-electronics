"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { Field, Select } from "@/components/ui/Field";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Placeholder } from "@/components/ui/Placeholder";
import { useUi } from "@/store/ui";
import { openWhatsApp } from "@/lib/whatsapp";
import { isPkMobile } from "@/lib/validators";

const days = ["Any day", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const interests = ["Air conditioners", "Refrigerators", "Home appliances", "Electronics", "Electric bikes & scooties", "Just browsing"];

export function VisitModal() {
  const open = useUi((s) => s.visitOpen);
  const set = useUi((s) => s.set);
  const [f, setF] = useState({ name: "", phone: "", day: "Any day", interest: interests[0] });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = "Please add your name.";
    if (f.phone && !isPkMobile(f.phone)) er.phone = "Please enter a mobile number like 0300 1234567.";
    setErrors(er);
    if (Object.keys(er).length) return;
    openWhatsApp(
      `Assalam o Alaikum, I'd like to visit the showroom.\nName: ${f.name.trim()}${f.phone ? `\nPhone: ${f.phone}` : ""}\nPreferred day: ${f.day}\nInterested in: ${f.interest}\n(Sent from the Abu Bakr Electronics website)`,
    );
    set({ visitOpen: false });
  };

  return (
    <Modal
      open={open}
      onOpenChange={(v) => set({ visitOpen: v })}
      title="Plan a visit"
      description="Tell us when you'd like to come — an advisor will confirm on WhatsApp."
      maxWidth={520}
    >
      <form onSubmit={submit} noValidate className="flex flex-col gap-7">
        <Field label="Your name" autoComplete="name" value={f.name} error={errors.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <Field
          label="Phone (optional)"
          type="tel"
          inputMode="tel"
          placeholder="03XX XXXXXXX"
          value={f.phone}
          error={errors.phone}
          onChange={(e) => setF({ ...f, phone: e.target.value })}
        />
        <div className="grid gap-7 sm:grid-cols-2">
          <Select label="Preferred day" options={days} value={f.day} onChange={(e) => setF({ ...f, day: e.target.value })} />
          <Select label="Interested in" options={interests} value={f.interest} onChange={(e) => setF({ ...f, interest: e.target.value })} />
        </div>
        <LuxuryButton type="submit" icon="whatsapp" iconPosition="start">
          Send on WhatsApp
        </LuxuryButton>
        <p className="text-center text-[13px] text-fg-muted">
          <Placeholder field="address" /> · <Placeholder field="hours" />
        </p>
      </form>
    </Modal>
  );
}
