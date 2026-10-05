import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const steps = [
  { title: "Choose, or ask.", body: "Browse the collection or tell an advisor what you need." },
  { title: "Confirm with an advisor.", body: "We confirm current price and availability with you directly." },
  { title: "Delivered.", body: "Free across Lahore. Delivering across Pakistan." },
];

/** §18.3 — three numbered steps, horizontal on desktop, vertical on mobile. */
export function HowOrderingWorks({ className, heading = true }: { className?: string; heading?: boolean }) {
  return (
    <div className={className}>
      {heading && <h2 className="mb-10 text-eyebrow text-fg-muted">How ordering works</h2>}
      <Reveal stagger={0.1} className="grid gap-px md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className={cn("flex gap-6 border-t border-line py-7 md:flex-col md:gap-5 md:pr-10")}>
            <span className="font-serif text-[44px] leading-none text-gold-text">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="text-[18px] font-medium">{s.title}</p>
              <p className="mt-2 max-w-[32ch] text-[14px] text-fg-muted">{s.body}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
