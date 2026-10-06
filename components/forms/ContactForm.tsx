"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Field, Select, TextArea } from "@/components/ui/Field";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { contactCities } from "@/content/cities";
import { copy } from "@/content/copy";
import { isPkMobile } from "@/lib/validators";
import { openWhatsApp } from "@/lib/whatsapp";

const interests = ["Air conditioners", "Refrigerators", "Home appliances", "Electronics", "Electric bikes & scooties", "Something else"];

export function ContactForm() {
  const [f, setF] = useState({ name: "", phone: "", city: "Lahore", interest: interests[0], message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const message = () =>
    `Assalam o Alaikum,\nName: ${f.name.trim()}\nPhone: ${f.phone}\nCity: ${f.city}\nInterested in: ${f.interest}${f.message.trim() ? `\n${f.message.trim()}` : ""}\n(Sent from the Abu Bakr Electronics website)`;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = "Please add your name.";
    if (!isPkMobile(f.phone)) er.phone = "Please enter a mobile number like 0300 1234567.";
    setErrors(er);
    if (Object.keys(er).length) return;
    setState("loading");
    setTimeout(() => setState("done"), 900);
  };

  if (state === "done") {
    return (
      <div className="rounded-sm border border-line p-8 md:p-12">
        <span className="flex size-12 items-center justify-center rounded-full border border-accent text-accent-text">
          <Check size={20} strokeWidth={1.75} />
        </span>
        <p className="mt-6 text-h3">Thank you.</p>
        <p className="mt-3 max-w-[44ch] text-fg-muted">{copy.formDemo}</p>
        <LuxuryButton className="mt-8" variant="secondary" icon="whatsapp" iconPosition="start" onClick={() => openWhatsApp(message())}>
          Continue on WhatsApp
        </LuxuryButton>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 md:grid-cols-2">
      <Field label="Name" autoComplete="name" value={f.name} error={errors.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <Field
        label="Phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="03XX XXXXXXX"
        value={f.phone}
        error={errors.phone}
        onChange={(e) => setF({ ...f, phone: e.target.value })}
      />
      <Select label="City" options={contactCities} value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} />
      <Select label="Interested in" options={interests} value={f.interest} onChange={(e) => setF({ ...f, interest: e.target.value })} />
      <div className="md:col-span-2">
        <TextArea label="Message" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
      </div>
      <div className="md:col-span-2">
        <LuxuryButton type="submit" loading={state === "loading"}>
          Send message
        </LuxuryButton>
      </div>
    </form>
  );
}
