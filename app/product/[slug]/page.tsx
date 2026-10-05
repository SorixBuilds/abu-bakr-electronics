import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { applianceProducts, getProduct, productsIn } from "@/data/products";
import { categoryHref, categoryTitle } from "@/content/categories";
import { ProductGallery } from "@/components/product/ProductGallery";
import { BuyBox } from "@/components/product/BuyBox";
import { FeatureStory } from "@/components/product/FeatureStory";
import { SpecGrid } from "@/components/product/SpecGrid";
import { ComparePrompt } from "@/components/product/ComparePrompt";
import { RelatedRail } from "@/components/product/RelatedRail";
import { StillDeciding } from "@/components/product/StillDeciding";
import { TrustStrip } from "@/components/trust/TrustStrip";
import { HowOrderingWorks } from "@/components/trust/HowOrderingWorks";
import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/content/copy";

export const dynamicParams = false;

export function generateStaticParams() {
  return applianceProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: p.name, description: `${p.tagline} ${p.keySpecs.join(" · ")}. Price on request — free delivery across Lahore.` };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.category === "mobility") notFound();

  const siblings = productsIn(product.category).filter((p) => p.id !== product.id);
  const sameType = siblings.filter((p) => p.type === product.type);
  const similar = [...sameType, ...siblings.filter((p) => p.type !== product.type)].slice(0, 2);

  return (
    <div className="theme-dark bg-obsidian">
      <div className="container-lux pb-16 pt-8 md:pt-10">
        <nav aria-label="Breadcrumb" className="mb-8 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/shop" className="link-lux hover:text-fg">
                Collection
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={categoryHref(product.category)} className="link-lux hover:text-fg">
                {categoryTitle(product.category)}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="truncate text-fg/70">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <BuyBox product={product} />
            </div>
          </div>
        </div>
      </div>

      <section className="container-lux section-y" aria-label="Features">
        <Reveal>
          <p className="mb-16 max-w-[52ch] text-lede text-fg/80 md:mb-24">{product.description}</p>
        </Reveal>
        <FeatureStory product={product} />
      </section>

      <section className="theme-light bg-ivory">
        <div className="container-lux section-y">
          <h2 className="mb-12 text-h2">Specifications</h2>
          <SpecGrid specs={product.specs} caption={product.isDemo ? copy.demoSpecs : undefined} />
        </div>
      </section>

      <section className="container-lux section-y flex flex-col gap-24 md:gap-32">
        <ComparePrompt product={product} similar={similar} />
        <div>
          <TrustStrip />
          <HowOrderingWorks className="mt-20" />
        </div>
        <RelatedRail products={siblings.slice(0, 6)} />
        <StillDeciding />
      </section>
    </div>
  );
}
