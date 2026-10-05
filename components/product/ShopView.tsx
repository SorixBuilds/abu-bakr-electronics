"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Grid2x2, Grid3x3, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import { products as all } from "@/data/products";
import { categories, type ShopCategory } from "@/content/categories";
import { ProductGrid } from "./ProductGrid";
import { Modal } from "@/components/ui/Modal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { RoomGuide } from "@/components/tools/RoomGuide";
import { SceneVisual } from "./Media";
import { useUi } from "@/store/ui";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type Sort = "featured" | "name" | "newest";

const emptyParams = new URLSearchParams();

/** URL-driven view (filters live in the query string). Must sit inside <Suspense>. */
export function ShopView({ category }: { category?: ShopCategory }) {
  return <ShopViewInner category={category} params={useSearchParams()} />;
}

/** Server-rendered fallback with no filters, so the grid is in the HTML (no layout shift). */
export function ShopViewStatic({ category }: { category?: ShopCategory }) {
  return <ShopViewInner category={category} params={emptyParams} />;
}

function ShopViewInner({ category, params }: { category?: ShopCategory; params: URLSearchParams }) {
  const router = useRouter();
  const pathname = usePathname();
  const [cols, setCols] = useState<2 | 3>(3);
  const [sheet, setSheet] = useState(false);

  const cat = category ? categories.find((c) => c.slug === category) : undefined;
  const base = useMemo(() => all.filter((p) => p.category !== "mobility" && (!category || p.category === category)), [category]);

  // Filter groups: category-specific, or a "Category" group on /shop
  const groups = cat ? cat.filters : [{ key: "category", label: "Category", options: categories.map((c) => ({ value: c.slug, label: c.title })) }];

  const active: Record<string, string[]> = {};
  groups.forEach((g) => {
    const v = params.get(g.key);
    if (v) active[g.key] = v.split(",");
  });
  const sort = (params.get("sort") as Sort) || "featured";

  const filtered = useMemo(() => {
    let list = base.filter((p) => Object.entries(active).every(([k, vals]) => (k === "category" ? vals.includes(p.category) : vals.includes(p.filters[k]))));
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "newest") list = [...list].sort((a, b) => Number(b.badge === "NEW IN") - Number(a.badge === "NEW IN"));
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, params]);

  const setParam = (key: string, values: string[] | string | null) => {
    const next = new URLSearchParams(params.toString());
    const v = Array.isArray(values) ? values.join(",") : values;
    if (v) next.set(key, v);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggle = (key: string, value: string) => {
    const cur = active[key] ?? [];
    setParam(key, cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value]);
  };

  const clearAll = () => router.replace(sort !== "featured" ? `${pathname}?sort=${sort}` : pathname, { scroll: false });
  const activeCount = Object.values(active).reduce((n, v) => n + v.length, 0);

  const editorial = category === "cooling" ? <EditorialCooling /> : category === "refrigeration" ? <EditorialFinish /> : <EditorialAdvisor />;

  return (
    <div className="theme-dark bg-obsidian">
      {/* Toolbar (sticky under nav) */}
      <div className="sticky top-[var(--nav-offset)] z-40 border-b transition-[top] duration-300 ease-ui border-line-soft bg-[rgba(10,11,13,0.86)] backdrop-blur-[16px]">
        <div className="container-lux flex min-h-16 items-center gap-3">
          <button onClick={() => setSheet(true)} className="flex min-h-11 items-center gap-2 rounded-xs border border-line px-4 text-[13px] md:hidden">
            <SlidersHorizontal size={15} strokeWidth={1.25} /> Filters {activeCount > 0 && <span className="font-mono text-gold">({activeCount})</span>}
          </button>
          <div className="hidden flex-1 flex-wrap items-center gap-2 md:flex">
            {groups.map((g) => (
              <FilterPopover key={g.key} label={g.label} options={g.options} selected={active[g.key] ?? []} onToggle={(v) => toggle(g.key, v)} />
            ))}
            <AnimatePresence>
              {activeCount > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={clearAll}
                  className="ml-2 min-h-11 px-2 text-[13px] text-fg-muted hover:text-fg"
                >
                  Clear filters
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted sm:block">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </span>
            <label className="relative flex items-center">
              <span className="sr-only">Sort</span>
              <select
                value={sort}
                onChange={(e) => setParam("sort", e.target.value === "featured" ? null : e.target.value)}
                className="h-11 appearance-none rounded-xs border border-line bg-transparent pl-4 pr-9 text-[13px] text-fg outline-none [&>option]:bg-graphite-2"
              >
                <option value="featured">Featured</option>
                <option value="name">Name A–Z</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown size={14} strokeWidth={1.25} className="pointer-events-none absolute right-3 text-fg-muted" />
            </label>
            <div className="hidden items-center lg:flex" role="group" aria-label="Grid density">
              <button
                aria-pressed={cols === 2}
                onClick={() => setCols(2)}
                className={cn("flex size-11 items-center justify-center", cols === 2 ? "text-gold" : "text-fg-muted hover:text-fg")}
                aria-label="Two columns"
              >
                <Grid2x2 size={17} strokeWidth={1.25} />
              </button>
              <button
                aria-pressed={cols === 3}
                onClick={() => setCols(3)}
                className={cn("flex size-11 items-center justify-center", cols === 3 ? "text-gold" : "text-fg-muted hover:text-fg")}
                aria-label="Three columns"
              >
                <Grid3x3 size={17} strokeWidth={1.25} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-lux pb-[var(--section-y)] pt-12 md:pt-16">
        {activeCount > 0 && (
          <div className="mb-8 flex flex-wrap gap-2 md:hidden">
            {Object.entries(active).flatMap(([k, vals]) =>
              vals.map((v) => {
                const label = groups.find((g) => g.key === k)?.options.find((o) => o.value === v)?.label ?? v;
                return (
                  <button
                    key={k + v}
                    onClick={() => toggle(k, v)}
                    className="flex min-h-9 items-center gap-2 rounded-xs border border-gold/60 px-3 text-[12px]"
                  >
                    {label} <X size={12} strokeWidth={1.5} />
                  </button>
                );
              }),
            )}
          </div>
        )}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="max-w-[40ch] text-h3">Nothing matches those filters.</p>
            <p className="mt-3 max-w-[44ch] text-fg-muted">Clear filters or ask an advisor — we may have it in the showroom.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LuxuryButton variant="ghost" size="md" onClick={clearAll}>
                Clear filters
              </LuxuryButton>
              <LuxuryButton variant="gold-line" size="md" icon="whatsapp" iconPosition="start" onClick={() => useUi.getState().set({ advisorOpen: true })}>
                Ask an advisor
              </LuxuryButton>
            </div>
          </div>
        ) : (
          <ProductGrid products={filtered} columns={cols} editorialSlot={editorial} />
        )}
      </div>

      <Modal open={sheet} onOpenChange={setSheet} title="Filters">
        <div className="flex flex-col gap-8 pb-24">
          {groups.map((g) => (
            <fieldset key={g.key}>
              <legend className="mb-3 text-eyebrow text-fg-muted">{g.label}</legend>
              <div className="flex flex-wrap gap-2">
                {g.options.map((o) => {
                  const on = active[g.key]?.includes(o.value);
                  return (
                    <button
                      key={o.value}
                      aria-pressed={on}
                      onClick={() => toggle(g.key, o.value)}
                      className={cn(
                        "min-h-11 rounded-xs border px-4 text-[14px]",
                        on ? "border-gold bg-[rgba(201,169,106,0.08)]" : "border-line text-fg-muted",
                      )}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
        <div className="sticky bottom-0 -mx-5 flex gap-3 border-t border-line bg-graphite-2 px-5 py-4">
          <LuxuryButton variant="ghost" size="md" onClick={clearAll} className="flex-1">
            Clear
          </LuxuryButton>
          <LuxuryButton size="md" onClick={() => setSheet(false)} className="flex-[2]">
            Show results ({filtered.length})
          </LuxuryButton>
        </div>
      </Modal>
    </div>
  );
}

function FilterPopover({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex min-h-11 items-center gap-2 rounded-xs border px-4 text-[13px] transition-colors",
          selected.length ? "border-gold/70 text-fg" : "border-line text-fg-muted hover:text-fg",
        )}
      >
        {label}
        {selected.length > 0 && <span className="font-mono text-gold">{selected.length}</span>}
        <ChevronDown size={14} strokeWidth={1.25} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: ease.out }}
            className="absolute left-0 top-full z-50 mt-2 min-w-[240px] rounded-sm border border-line bg-graphite-2 p-2"
            style={{ boxShadow: "var(--shadow-modal)" }}
          >
            {options.map((o) => {
              const on = selected.includes(o.value);
              return (
                <button
                  key={o.value}
                  role="menuitemcheckbox"
                  aria-checked={on}
                  onClick={() => onToggle(o.value)}
                  className="flex min-h-11 w-full items-center gap-3 rounded-xs px-3 text-left text-[14px] hover:bg-white/5"
                >
                  <span className={cn("flex size-4 items-center justify-center rounded-[2px] border", on ? "border-gold bg-gold" : "border-line")}>
                    {on && <span className="size-1.5 rounded-[1px] bg-obsidian" />}
                  </span>
                  {o.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EditorialCooling() {
  return (
    <div className="grid gap-10 rounded-sm border border-line-soft bg-graphite p-6 md:grid-cols-[1fr_1.2fr] md:p-12">
      <div>
        <span className="text-eyebrow text-fg-muted">Room Cooling Guide</span>
        <h2 className="mt-4 text-h2 max-w-[14ch]">The right size starts with your room.</h2>
        <p className="mt-4 max-w-[38ch] text-fg-muted">Move the slider — the guide suggests a capacity and filters the collection for you.</p>
      </div>
      <RoomGuide compact />
    </div>
  );
}

function EditorialFinish() {
  return (
    <div className="grid overflow-hidden rounded-sm border border-line-soft md:grid-cols-2">
      <div className="relative aspect-[4/3] md:aspect-auto">
        <SceneVisual tone="steel" shape="fridge-french" />
      </div>
      <div className="flex flex-col justify-center bg-graphite p-8 md:p-14">
        <span className="text-eyebrow text-fg-muted">Finish matters</span>
        <h2 className="mt-4 text-h2 max-w-[14ch]">Steel, glass or matte black.</h2>
        <p className="mt-4 max-w-[40ch] text-fg-muted">
          A refrigerator is the largest object in most kitchens. Ask an advisor which finishes are available for the models you like.
        </p>
        <LuxuryButton variant="text" icon="arrow" className="mt-8 self-start" onClick={() => useUi.getState().set({ advisorOpen: true })}>
          Ask about finishes
        </LuxuryButton>
      </div>
    </div>
  );
}

function EditorialAdvisor() {
  return (
    <div className="flex flex-col items-start justify-between gap-8 rounded-sm border border-line-soft bg-graphite p-8 md:flex-row md:items-center md:p-12">
      <div>
        <span className="text-eyebrow text-fg-muted">Guidance</span>
        <h2 className="mt-4 text-h2 max-w-[20ch]">Not sure which one? Ask a person.</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        <LuxuryButton variant="gold-line" icon="whatsapp" iconPosition="start" onClick={() => useUi.getState().set({ advisorOpen: true })}>
          Speak to an Advisor
        </LuxuryButton>
        <Link href="/#finder" className="group inline-flex min-h-[52px] items-center gap-2 px-2 text-button">
          <span className="link-lux pb-1">Appliance Finder</span>
          <ArrowRight size={14} strokeWidth={1.25} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
