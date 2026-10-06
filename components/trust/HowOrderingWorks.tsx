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
      {heading && (
        <h2 className="mb-8 text-h2 md:mb-10">
          How ordering <em>works</em>
        </h2>
      )}
      <Reveal stagger={0.1} className="grid gap-3 md:grid-cols-3 md:gap-4">
        {steps.map((s, i) => (
          <div key={s.title} className={cn("flex h-full gap-5 rounded-md bg-white p-6 shadow-card md:flex-col md:gap-4 md:p-8")}>
            <span className="font-display text-[44px] leading-none text-bordeaux">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="text-[18px] font-semibold text-ink">{s.title}</p>
              <p className="mt-2 max-w-[32ch] text-[15px] text-ink-2">{s.body}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
