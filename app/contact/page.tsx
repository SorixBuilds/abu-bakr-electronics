import type { Metadata } from "next";
import { ContactCards } from "@/components/forms/ContactCards";
import { ContactForm } from "@/components/forms/ContactForm";
import { Faq } from "@/components/forms/Faq";
import { HowOrderingWorks } from "@/components/trust/HowOrderingWorks";
import { Container, Section, SectionIntro } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Speak to an advisor on WhatsApp — choose, compare and arrange delivery. Free delivery across Lahore, delivering across Pakistan.",
};

export default function ContactPage() {
  return (
    <>
      <Section tone="porcelain" aria-label="Contact">
        <Container>
          <SectionIntro eyebrow="Contact" title="Speak to a person." italic="person." support="An advisor will help you choose, compare and arrange delivery." className="mb-8 md:mb-12" />
          <ContactCards />
        </Container>
      </Section>

      <Section tone="white" aria-label="Send a message">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionIntro eyebrow="Message" title="Write to an advisor." italic="advisor." />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </Container>
      </Section>

      <Section tone="porcelain" aria-label="Questions">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionIntro eyebrow="Questions" title="Before you ask." italic="ask." />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq />
          </div>
          <HowOrderingWorks className="lg:col-span-12 lg:mt-8" />
        </Container>
      </Section>
    </>
  );
}
