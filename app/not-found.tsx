import Link from "next/link";
import { categories } from "@/content/categories";
import { NotFoundActions } from "@/components/layout/NotFoundActions";
import { Stage, ProductCut } from "@/components/ui/Stage";

export default function NotFound() {
  return (
    <section className="theme-porcelain section-y bg-porcelain">
      <div className="container-lux grid items-center gap-8 md:grid-cols-12 md:gap-12">
        <div className="text-center md:col-span-6 md:text-left">
          <p className="text-eyebrow text-cherry">Page not found</p>
          <h1 className="mx-auto mt-4 max-w-[14ch] text-balance text-display-l md:mx-0">
            This page has <em>moved on</em>.
          </h1>
          <NotFoundActions />
          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px] font-medium text-ink-2 md:justify-start">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/${c.slug}`} className="link-lux flex min-h-11 items-center hover:text-cherry">
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/mobility" className="link-lux flex min-h-11 items-center hover:text-cherry">
                Jinpeng Electric
              </Link>
            </li>
          </ul>
        </div>
        <Stage category="cooling" radius="2xl" className="aspect-[4/3] md:col-span-6">
          <ProductCut id="ac-3" sizes="(max-width:768px) 90vw, 560px" />
        </Stage>
      </div>
    </section>
  );
}
