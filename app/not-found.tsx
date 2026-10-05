import Link from "next/link";
import { categories } from "@/content/categories";
import { NotFoundActions } from "@/components/layout/NotFoundActions";

export default function NotFound() {
  return (
    <section className="theme-dark relative -mt-[60px] flex min-h-[100svh] items-center overflow-hidden bg-obsidian lg:-mt-[72px]">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[44vw] font-semibold leading-none tracking-[-0.05em] text-white/[0.035]"
      >
        404
      </span>
      <div className="container-lux relative py-40 text-center">
        <p className="text-eyebrow text-fg-muted">Not found</p>
        <h1 className="mx-auto mt-5 max-w-[16ch] text-balance text-display-l">This page has moved on.</h1>
        <NotFoundActions />
        <ul className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[15px] text-fg-muted">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/shop/${c.slug}`} className="link-lux hover:text-fg">
                {c.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/mobility" className="link-lux hover:text-fg">
              Electric Mobility
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
