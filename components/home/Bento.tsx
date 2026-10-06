import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import type { CategorySlug } from "@/types/product";
import { home } from "@/content/home";
import { productsIn } from "@/data/products";
import { asset, darkStage, stageColor } from "@/lib/media";
import { Container, Section, SectionIntro } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/** A cutout in a tile. right/bottom may be negative so the product steps out past the tile edge (V3 §8.3 "overflowing by 8%"). */
type Box = { right: number; bottom: number; width: number; height: number };
/** desktop box + optional small-tile box (2-column mobile grid, where the title takes the top half) */
type Piece = Box & { id: string; sm?: Box };

type Tile = { category: CategorySlug; title: string; href: string; span: string; mobile: string; pieces: Piece[] };

const tiles: Tile[] = [
  {
    category: "cooling",
    title: "Air Conditioners",
    href: "/shop/cooling",
    span: "lg:col-span-7",
    mobile: "aspect-[16/11] sm:aspect-[16/9]",
    pieces: [{ id: "ac-2", right: -8, bottom: 16, width: 78, height: 58, sm: { right: -12, bottom: 10, width: 74, height: 50 } }],
  },
  {
    category: "refrigeration",
    title: "Refrigerators",
    href: "/shop/refrigeration",
    span: "lg:col-span-5",
    mobile: "aspect-[3/4] sm:aspect-[4/5]",
    pieces: [{ id: "fridge-2", right: 4, bottom: -8, width: 62, height: 88, sm: { right: -6, bottom: -12, width: 72, height: 66 } }],
  },
  {
    category: "home-appliances",
    title: "Home Appliances",
    href: "/shop/home-appliances",
    span: "lg:col-span-4",
    mobile: "aspect-[3/4] sm:aspect-[4/5]",
    pieces: [{ id: "washer-1", right: -8, bottom: -8, width: 74, height: 74, sm: { right: -16, bottom: -12, width: 80, height: 52 } }],
  },
  {
    category: "electronics",
    title: "Electronics",
    href: "/shop/electronics",
    span: "lg:col-span-4",
    mobile: "aspect-[3/4] sm:aspect-[4/5]",
    pieces: [
      { id: "tv-1", right: -8, bottom: 26, width: 96, height: 46, sm: { right: -18, bottom: 17, width: 112, height: 38 } },
      { id: "soundbar-1", right: 4, bottom: 13, width: 72, height: 12, sm: { right: -2, bottom: 7, width: 84, height: 9 } },
    ],
  },
  {
    category: "mobility",
    title: "Jinpeng Electric",
    href: "/mobility",
    span: "lg:col-span-4",
    mobile: "aspect-[3/4] sm:aspect-[4/5]",
    pieces: [{ id: "jinpeng-thrill", right: -10, bottom: 4, width: 112, height: 66, sm: { right: -30, bottom: 0, width: 136, height: 44 } }],
  },
];

/** V3 §8.3 — "Five worlds, one showroom." Bento: 7+5 / 4+4+4 on desktop, 2 columns with the first tile full width on mobile. */
export function Bento() {
  return (
    <Section tone="porcelain" id="collection" aria-label="Shop by category">
      <Container>
        <SectionIntro eyebrow={home.bento.eyebrow} title={home.bento.title} italic={home.bento.italic} className="mb-10 md:mb-12" />
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-12">
          {tiles.map((t, n) => (
            <Reveal key={t.category} delay={n * 0.06} className={cn(t.span, n === 0 && "col-span-2")}>
              <TileCard t={t} first={n === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function vars(p: Piece): CSSProperties {
  const sm = p.sm ?? p;
  return {
    "--r": `${p.right}%`, "--b": `${p.bottom}%`, "--w": `${p.width}%`, "--h": `${p.height}%`,
    "--sr": `${sm.right}%`, "--sb": `${sm.bottom}%`, "--sw": `${sm.width}%`, "--sh": `${sm.height}%`,
  } as CSSProperties;
}

function TileCard({ t, first }: { t: Tile; first: boolean }) {
  const dark = darkStage(t.category);
  const count = productsIn(t.category).length;
  return (
    <Link
      href={t.href}
      className={cn(
        "group stage block w-full rounded-lg shadow-card transition-shadow duration-300 ease-lux hover:shadow-lift",
        t.mobile,
        "lg:aspect-auto",
        first || t.category === "refrigeration" ? "lg:h-[460px]" : "lg:h-[400px]",
        dark && "text-white",
      )}
      data-dark={dark || undefined}
      style={{ "--stage-color": stageColor[t.category] } as CSSProperties}
    >
      {t.category === "mobility" && (
        <span aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_90%,rgba(232,52,78,0.28),transparent_60%)]" />
      )}
      {t.pieces.map((p) => {
        const a = asset(p.id);
        return (
          <span
            key={p.id}
            className="absolute right-[var(--sr)] bottom-[var(--sb)] h-[var(--sh)] w-[var(--sw)] lg:right-[var(--r)] lg:bottom-[var(--b)] lg:h-[var(--h)] lg:w-[var(--w)]"
            style={vars(p)}
          >
            <span
              aria-hidden
              className="absolute bottom-0 left-1/2 h-[14%] w-[80%] -translate-x-1/2 translate-y-1/2"
              style={{ background: `radial-gradient(50% 50% at 50% 50%, rgba(${dark ? "0,0,0,0.45" : "20,17,20,0.22"}), transparent 70%)` }}
            />
            <Image
              src={a.image}
              alt=""
              fill
              sizes={first ? "(max-width:1024px) 100vw, 760px" : "(max-width:1024px) 50vw, 440px"}
              className="stage-product object-contain object-bottom"
            />
          </span>
        );
      })}
      <span className={cn("absolute left-4 top-4 z-10 flex flex-col gap-1 sm:left-5 sm:top-5 md:left-7 md:top-7 md:gap-1.5", first ? "max-w-[60%]" : "max-w-[88%] lg:max-w-[60%]")}>
        <span className={cn("font-display md:text-[32px]", first ? "text-[28px]" : "text-[22px] sm:text-[26px]", "leading-[1.05]")}>{t.title}</span>
        <span className={cn("text-[13px]", dark ? "text-white/70" : "text-muted")}>
          {count} {count === 1 ? "piece" : "pieces"}
        </span>
        <span className={cn("mt-1 inline-flex items-center gap-1.5 text-[15px] font-semibold md:mt-2", dark ? "text-white" : "text-cherry")}>
          Explore
          <ArrowRight size={18} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-[3px]" />
        </span>
      </span>
    </Link>
  );
}
