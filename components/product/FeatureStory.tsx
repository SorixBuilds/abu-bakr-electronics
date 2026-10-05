import type { Product } from "@/types/product";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { ProductMedia } from "./Media";
import { cn } from "@/lib/cn";

/** "In the home" rows alternate the gallery's lifestyle shot and the product photo (V2 §8.3). */
const order = [1, 0, 1];

/** Three alternating image/text rows (7/5 columns, then reversed). */
export function FeatureStory({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-20 md:gap-32">
      {product.features.map((f, i) => (
        <div key={f.title} className={cn("grid items-center gap-8 md:grid-cols-12 md:gap-16", i % 2 && "md:[&>*:first-child]:order-2")}>
          <ImageReveal className="aspect-[4/3] rounded-md md:col-span-7">
            <ProductMedia product={product} index={Math.min(order[i % 3], product.gallery.length - 1)} sizes="(max-width:768px) 100vw, 58vw" grade="dark" />
          </ImageReveal>
          <Reveal className="md:col-span-5">
            <span className="font-serif text-[40px] leading-none text-accent-text">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="mt-6 text-h2 max-w-[14ch]">{f.title}</h2>
            <p className="mt-5 max-w-[40ch] text-body-l text-fg-muted">{f.body}</p>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
