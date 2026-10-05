"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Field, Select, TextArea } from "@/components/ui/Field";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useUi } from "@/store/ui";
import { getProductById } from "@/data/products";
import { openWhatsApp, priceRequestText } from "@/lib/whatsapp";
import { isPkMobile } from "@/lib/validators";
import { contactCities } from "@/content/cities";
import { copy } from "@/content/copy";
import type { Product } from "@/types/product";

export function RequestPriceModal() {
  const id = useUi((s) => s.requestPriceId);
  const set = useUi((s) => s.set);
  const product = id ? getProductById(id) : undefined;
  return (
    <Modal open={!!product} onOpenChange={(v) => !v && set({ requestPriceId: null })} title="Request price" description={product?.name} maxWidth={520}>
      {product && <RequestPriceForm key={product.id} product={product} onDone={() => set({ requestPriceId: null })} />}
    </Modal>
  );
}

function RequestPriceForm({ product, onDone }: { product: Product; onDone: () => void }) {
  const [f, setF] = useState({ name: "", phone: "", city: "Lahore", note: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "callback">("idle");

  const validate = (needPhone: boolean) => {
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = "Please add your name.";
    if (needPhone && !isPkMobile(f.phone)) e.phone = "Please enter a mobile number like 0300 1234567.";
    if (!needPhone && f.phone && !isPkMobile(f.phone)) e.phone = "Please enter a mobile number like 0300 1234567.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sendWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    if (!validate(false)) return;
    openWhatsApp(priceRequestText(product, { name: f.name.trim(), city: f.city, note: f.note.trim() || undefined }));
  };

  const callback = () => {
    if (!validate(true)) return;
    setState("loading");
    setTimeout(() => setState("callback"), 900);
  };

  if (state === "callback") {
    return (
      <div className="py-6 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-accent text-accent-text">
          <Check size={20} strokeWidth={1.25} />
        </span>
        <p className="mt-6 text-h3">{copy.formSuccess}</p>
        <p className="mx-auto mt-3 max-w-[38ch] text-[14px] text-fg-muted">{copy.formDemo}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LuxuryButton
            size="md"
            variant="gold-line"
            icon="whatsapp"
            iconPosition="start"
            onClick={() => openWhatsApp(priceRequestText(product, { name: f.name.trim(), city: f.city, note: f.note.trim() || undefined }))}
          >
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
    <form onSubmit={sendWhatsApp} noValidate className="flex flex-col gap-7">
      <Field label="Your name" autoComplete="name" value={f.name} error={errors.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <Field
        label="Phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="03XX XXXXXXX"
        value={f.phone}
        error={errors.phone}
        hint="Needed for a callback. Optional for WhatsApp."
        onChange={(e) => setF({ ...f, phone: e.target.value })}
      />
      <Select label="City" options={contactCities} value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} />
      <TextArea label="Note (optional)" value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} />
      <div className="flex flex-col gap-3 pt-1">
        <LuxuryButton type="submit" icon="whatsapp" iconPosition="start">
          Send on WhatsApp
        </LuxuryButton>
        <LuxuryButton variant="ghost" onClick={callback} loading={state === "loading"}>
          Request a callback
        </LuxuryButton>
      </div>
      <p className="text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-muted">Free delivery across Lahore · Delivering across Pakistan</p>
    </form>
  );
}
