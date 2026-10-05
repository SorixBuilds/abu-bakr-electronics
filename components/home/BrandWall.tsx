import { site } from "@/content/site";

/** §6.13 — conditional typographic brand list. Hidden until the client confirms brands. Never logo files. */
export function BrandWall() {
  if (!site.brands.length) return null;
  return (
    <section className="theme-dark section-y bg-obsidian" aria-label="Brands in the collection">
      <div className="container-lux text-center">
        <h2 className="text-eyebrow text-fg-muted">Brands in the collection</h2>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          {site.brands.map((b, i) => (
            <li key={b} className="flex items-center gap-6">
              {i > 0 && <span aria-hidden className="size-1 rounded-full bg-hairline" />}
              <span className="text-[18px] font-medium uppercase tracking-[0.24em] text-ivory/45 transition-colors hover:text-ivory/90">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
