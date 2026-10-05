"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Monogram } from "@/components/brand/Monogram";
import { Wordmark } from "@/components/brand/Wordmark";
import { Placeholder, ReviewOnly, ReviewTag } from "@/components/ui/Placeholder";
import { site } from "@/content/site";
import { waLink, generalText } from "@/lib/whatsapp";
import { useUi } from "@/store/ui";

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-5 text-eyebrow text-ivory/60">{title}</h3>
      <ul className="flex flex-col gap-3 text-[14px] text-ivory/75">{children}</ul>
    </div>
  );
}

const L = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="link-lux hover:text-ivory">
      {children}
    </Link>
  </li>
);

export function Footer() {
  const set = useUi((s) => s.set);
  const socials = (Object.entries(site.socials) as [string, string | null][]).filter(([, v]) => !!v);

  return (
    <footer className="theme-dark relative bg-[linear-gradient(180deg,var(--wine-900)_0%,var(--obsidian)_420px)]">
      <div className="container-lux pb-10 pt-24 lg:pt-32">
        <div className="flex flex-col gap-6 border-b border-line-soft pb-14 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-5">
            <Monogram size={52} className="text-ivory" />
            <Wordmark size={16} />
          </div>
          <p className="text-lede text-ivory/80">Home technology, chosen with care.</p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 md:grid-cols-4">
          <Col title="Collection">
            <L href="/shop/cooling">Air Conditioners</L>
            <L href="/shop/refrigeration">Refrigerators</L>
            <L href="/shop/home-appliances">Home Appliances</L>
            <L href="/shop/electronics">Electronics</L>
          </Col>
          <Col title="Electric Mobility">
            <L href="/mobility">Jinpeng Range</L>
            <L href="/compare?ids=JP-01,JP-02,JP-04">Compare Models</L>
            <ReviewOnly>
              <li>
                <ReviewTag note={site.testRides.note}>Book a Test Ride</ReviewTag>
              </li>
            </ReviewOnly>
          </Col>
          <Col title="Visit">
            <L href="/showroom">The Showroom</L>
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
            <li>Free Delivery in Lahore</li>
            <li>Nationwide Delivery</li>
            <li>
              <button onClick={() => set({ advisorOpen: true })} className="link-lux text-left hover:text-ivory">
                Speak to an Advisor
              </button>
            </li>
            <L href="/contact">Request a Price</L>
          </Col>
        </div>

        <div className="flex items-center gap-2 pb-12">
          <a
            href={waLink(generalText)}
            target="_blank"
            rel="noopener"
            aria-label="WhatsApp"
            className="hidden size-11 items-center justify-center rounded-full border border-line text-on-dark/75 transition-colors hover:border-accent hover:text-on-dark md:flex"
          >
            <MessageCircle size={18} strokeWidth={1.25} />
          </a>
          {socials.map(([k, v]) => (
            <a key={k} href={v!} target="_blank" rel="noopener" className="flex h-11 items-center px-3 text-[13px] capitalize text-ivory/70 hover:text-ivory">
              {k}
            </a>
          ))}
          <ReviewOnly>
            <span className="ml-3 text-[13px] text-ivory/70">
              <ReviewTag note="Instagram, Facebook, TikTok URLs — icons stay hidden until provided">Social links</ReviewTag>
            </span>
          </ReviewOnly>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-line-soft pb-20 pt-8 text-center text-[12px] text-ivory/60 md:flex-row md:justify-between md:pb-0 md:pr-24 md:text-left">
          <p>
            © 2026 Abu Bakr Electronics.
            {site.demoMode && <span> Demo website — product information is illustrative.</span>}
          </p>
          <a
            href={site.sorixUrl}
            target="_blank"
            rel="noopener"
            className="font-mono text-[11px] tracking-[0.08em] text-[rgba(244,241,234,0.28)] transition-colors hover:text-[rgba(244,241,234,0.55)]"
          >
            Made by Sorix
          </a>
        </div>
      </div>
    </footer>
  );
}
