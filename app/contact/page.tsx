import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactCards } from "@/components/forms/ContactCards";
import { ContactForm } from "@/components/forms/ContactForm";
import { Faq } from "@/components/forms/Faq";
import { HowOrderingWorks } from "@/components/trust/HowOrderingWorks";

export const metadata: Metadata = {
  title: "Contact",
  description: "Speak to an advisor on WhatsApp — choose, compare and arrange delivery. Free delivery across Lahore, delivering across Pakistan.",
};

export default function ContactPage() {
  return (
    <div className="theme-dark bg-obsidian">
      <section className="container-lux pb-20 pt-16 md:pt-24">
        <SectionHeading
          as="h1"
          size="display-l"
          eyebrow="Contact"
          title="Speak to us."
          support="An advisor will help you choose, compare and arrange delivery."
          className="mb-14 md:mb-20"
        />
        <ContactCards />
      </section>

      <section className="theme-light section-y bg-ivory" aria-label="Send a message">
        <div className="container-lux grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Message" title="Write to an advisor." />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="container-lux section-y grid gap-14 lg:grid-cols-12" aria-label="Questions">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Questions" title="Before you ask." />
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Faq />
        </div>
        <HowOrderingWorks className="lg:col-span-12 lg:mt-12" />
      </section>
    </div>
  );
}
