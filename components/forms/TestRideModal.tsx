"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Field, Select } from "@/components/ui/Field";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ReviewOnly, ReviewTag } from "@/components/ui/Placeholder";
import { useUi } from "@/store/ui";
import { mobilityModels } from "@/data/mobility";
import { openWhatsApp } from "@/lib/whatsapp";
import { isPkMobile } from "@/lib/validators";
import { site } from "@/content/site";

export function TestRideModal() {
  const id = useUi((s) => s.testRideId);
  const set = useUi((s) => s.set);
  return (
    <Modal
      open={!!id}
      onOpenChange={(v) => !v && set({ testRideId: null })}
      title="Request a test ride"
      description="An advisor will confirm availability with you."
      maxWidth={520}
    >
      {id && <TestRideForm key={id} initial={id} onDone={() => set({ testRideId: null })} />}
    </Modal>
  );
}

function TestRideForm({ initial, onDone }: { initial: string; onDone: () => void }) {
  const first = mobilityModels.find((m) => m.id === initial)?.name ?? mobilityModels[0].name;
  const [f, setF] = useState({ name: "", phone: "", model: first });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const message = () =>
    `Assalam o Alaikum, I'd like to request a test ride.\nModel: ${f.model}\nName: ${f.name.trim()}\nPhone: ${f.phone}\n(Sent from the Abu Bakr Electronics website)`;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = "Please add your name.";
    if (!isPkMobile(f.phone)) er.phone = "Please enter a mobile number like 0300 1234567.";
    setErrors(er);
    if (!Object.keys(er).length) setSent(true);
  };

  if (sent) {
    return (
      <div className="py-6 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-gold text-gold">
          <Check size={20} strokeWidth={1.25} />
        </span>
        <p className="mt-6 text-h3">Request received.</p>
        <p className="mx-auto mt-3 max-w-[38ch] text-[14px] text-fg-muted">
          An advisor will confirm test-ride availability for the {f.model}. For this demo, you can also continue on WhatsApp.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LuxuryButton size="md" variant="gold-line" icon="whatsapp" iconPosition="start" onClick={() => openWhatsApp(message())}>
            Continue on WhatsApp
          </LuxuryButton>
          <LuxuryButton size="md" variant="ghost" onClick={onDone}>
            Close
          </LuxuryButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-7">
      <ReviewOnly>
        <ReviewTag note={site.testRides.note}>Test rides</ReviewTag>
      </ReviewOnly>
      <Select label="Model" options={mobilityModels.map((m) => m.name)} value={f.model} onChange={(e) => setF({ ...f, model: e.target.value })} />
      <Field label="Your name" autoComplete="name" value={f.name} error={errors.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <Field
        label="Phone"
        type="tel"
        inputMode="tel"
        placeholder="03XX XXXXXXX"
        value={f.phone}
        error={errors.phone}
        onChange={(e) => setF({ ...f, phone: e.target.value })}
      />
      <LuxuryButton type="submit">Request a test ride</LuxuryButton>
    </form>
  );
}
