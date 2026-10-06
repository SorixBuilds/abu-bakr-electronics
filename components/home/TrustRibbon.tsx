import { Truck, MapPin, MessageCircle } from "lucide-react";
import { home } from "@/content/home";

const icons = { truck: Truck, pin: MapPin, chat: MessageCircle } as const;

/** V3 §8.2 — white strip, 3 items divided by hairlines; horizontal snap-scroll on mobile. Only verified claims. */
export function TrustRibbon({ className = "" }: { className?: string }) {
  return (
    <section aria-label="Why buy from us" className={`theme-white border-y border-line bg-white ${className}`}>
      <ul className="container-lux no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-3 md:divide-x md:divide-line md:overflow-visible">
        {home.trust.map((t) => {
          const Icon = icons[t.icon as keyof typeof icons];
          return (
            <li key={t.title} className="flex min-w-[78%] shrink-0 snap-start items-center gap-4 py-6 pr-6 sm:min-w-[46%] md:min-w-0 md:justify-center md:px-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blush text-cherry">
                <Icon size={24} strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-[16px] font-semibold text-ink">{t.title}</span>
                <span className="block text-[14px] text-muted">{t.line}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
