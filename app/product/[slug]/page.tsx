import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { applianceProducts, getProduct, productsIn } from "@/data/products";
import { categoryHref, categoryTitle } from "@/content/categories";
import { ProductGallery } from "@/components/product/ProductGallery";
import { BuyBox } from "@/components/product/BuyBox";
import { FeatureStory } from "@/components/product/FeatureStory";
import { SpecGrid } from "@/components/product/SpecGrid";
import { ComparePrompt } from "@/components/product/ComparePrompt";
import { RelatedRail } from "@/components/product/RelatedRail";
import { StillDeciding } from "@/components/product/StillDeciding";
import { TrustRibbon } from "@/components/home/TrustRibbon";
import { HowOrderingWorks } from "@/components/trust/HowOrderingWorks";
import { Container, Section } from "@/components/ui/Section";
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

/** V3 §9.2 — gallery stage 7/12 + sticky info 5/12; specs, "why customers choose this", related rail, trust ribbon. */
export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.category === "mobility") notFound();

  const siblings = productsIn(product.category).filter((p) => p.id !== product.id);
  const sameType = siblings.filter((p) => p.type === product.type);
  const similar = [...sameType, ...siblings.filter((p) => p.type !== product.type)].slice(0, 2);
  const related = [...siblings, ...applianceProducts.filter((p) => p.category !== product.category)].slice(0, 6);

  return (
    <div className="theme-porcelain bg-porcelain">
      <Container className="pb-14 pt-5 md:pb-20 md:pt-8">
        <nav aria-label="Breadcrumb" className="mb-5 text-[14px] text-muted md:mb-8">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/shop" className="link-lux hover:text-ink">
                Collection
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={14} strokeWidth={1.75} />
            </li>
            <li>
              <Link href={categoryHref(product.category)} className="link-lux hover:text-ink">
                {categoryTitle(product.category)}
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={14} strokeWidth={1.75} />
            </li>
            <li aria-current="page" className="max-w-[48vw] truncate text-ink-2">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <BuyBox product={product} />
            </div>
          </div>
        </div>
      </Container>

      <Section tone="white" aria-label="Specifications">
        <Container>
          <h2 className="mb-8 text-h2 md:mb-10">
            <em>Specifications</em>
          </h2>
          <SpecGrid specs={product.specs} caption={product.isDemo ? copy.demoSpecs : undefined} />
        </Container>
      </Section>

      <Section tone="porcelain" aria-label="Why customers choose this">
        <Container className="flex flex-col gap-16 md:gap-24">
          <FeatureStory product={product} />
          <ComparePrompt product={product} similar={similar} />
          <HowOrderingWorks />
          <RelatedRail products={related} />
          <StillDeciding />
        </Container>
      </Section>
      <TrustRibbon />
    </div>
  );
}
