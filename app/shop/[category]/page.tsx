import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ShopView, ShopViewStatic } from "@/components/product/ShopView";
import { categories, getCategory } from "@/content/categories";
import { productsIn } from "@/data/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return { title: c.title, description: `${c.line} Free delivery across Lahore, delivering across Pakistan.` };
}

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const count = productsIn(c.slug).length;
  return (
    <>
      <PageHero eyebrow={c.world} title={c.heading} italic={c.italic} line={c.line} meta={`${c.title} · ${count} ${count === 1 ? "piece" : "pieces"} · Price on request`} category={c.slug} assets={c.assets} />
      <Suspense fallback={<ShopViewStatic category={c.slug} />}>
        <ShopView category={c.slug} />
      </Suspense>
    </>
  );
}
