"use client";

import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Placeholder, ReviewOnly, ReviewTag } from "@/components/ui/Placeholder";
import { site } from "@/content/site";
import { waLink, generalText } from "@/lib/whatsapp";
import { useUi } from "@/store/ui";

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-5 text-eyebrow text-cherry-soft">{title}</h3>
      <ul className="flex flex-col gap-3 text-[15px] text-white/75">{children}</ul>
    </div>
  );
}

const L = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="link-lux hover:text-white">
      {children}
    </Link>
  </li>
);

/** V3 §8.12 — ink, wordmark, 4 columns, demo disclaimer once, "Made by Sorix" discreet bottom-right. One WhatsApp link only. */
export function Footer() {
  const set = useUi((s) => s.set);
  const socials = (Object.entries(site.socials) as [string, string | null][]).filter(([, v]) => !!v);

  return (
    <footer className="theme-ink bg-ink text-white">
      <div className="container-lux pb-10 pt-20 lg:pt-24">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
          <Wordmark size={34} onDark />
          <p className="font-display text-[24px] italic text-white/80">Home technology, chosen with care.</p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4">
          <Col title="Collection">
            <L href="/shop/cooling">Air Conditioners</L>
            <L href="/shop/refrigeration">Refrigerators</L>
            <L href="/shop/home-appliances">Home Appliances</L>
            <L href="/shop/electronics">Electronics</L>
          </Col>
          <Col title="Jinpeng">
            <L href="/mobility">Jinpeng Electric range</L>
            <L href="/compare?ids=JP-01,JP-02,JP-04">Compare models</L>
            <ReviewOnly>
              <li>
                <ReviewTag note={site.testRides.note}>Request a test ride</ReviewTag>
              </li>
            </ReviewOnly>
          </Col>
          <Col title="Visit">
            <L href="/showroom">The showroom</L>
            <li>
              <Placeholder field="address" />
            </li>
            <li>
              <Placeholder field="hours" />
            </li>
            <li>
              <Placeholder field="mapsUrl" reviewOnly />
            </li>
          </Col>
          <Col title="Service">
            <li>Free delivery across Lahore</li>
            <li>Delivering across Pakistan</li>
            <li>
              <a href={waLink(generalText)} target="_blank" rel="noopener" className="link-lux hover:text-white">
                WhatsApp an advisor
              </a>
            </li>
            <li>
              <button onClick={() => set({ advisorOpen: true })} className="link-lux text-left hover:text-white">
                Request a price
              </button>
            </li>
          </Col>
        </div>

        {(
          <div className="flex items-center gap-2 pb-8">
            {socials.map(([k, v]) => (
              <a key={k} href={v!} target="_blank" rel="noopener" className="flex h-11 items-center pr-4 text-[14px] capitalize text-white/70 hover:text-white">
                {k}
              </a>
            ))}
            <ReviewOnly>
              <span className="text-[13px] text-white/70">
                <ReviewTag note="Instagram, Facebook, TikTok URLs — links stay hidden until provided">Social links</ReviewTag>
              </span>
            </ReviewOnly>
          </div>
        )}

        <div className="flex flex-col items-center gap-3 border-t border-white/10 pb-20 pt-6 text-center text-[13px] text-white/60 md:flex-row md:justify-between md:pb-0 md:pr-24 md:text-left">
          <p>
            © 2026 Abu Bakr Electronics, Lahore.
            {site.demoMode && <span> Demo website — product information is illustrative.</span>}
          </p>
          <a href={site.sorixUrl} target="_blank" rel="noopener" className="text-[12px] text-white/50 transition-colors hover:text-white/75">
            Made by Sorix
          </a>
        </div>
      </div>
    </footer>
  );
}
