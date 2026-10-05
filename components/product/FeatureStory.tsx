import type { Product } from "@/types/product";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { ProductMedia } from "./Media";
import { cn } from "@/lib/cn";

const framings = ["scale-[1.35] translate-y-[6%]", "scale-[1.8] -translate-x-[12%] translate-y-[10%]", "scale-[1.15]"];

/** Three alternating image/text rows (7/5 columns, then reversed). */
export function FeatureStory({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-20 md:gap-32">
      {product.features.map((f, i) => (
        <div key={f.title} className={cn("grid items-center gap-8 md:grid-cols-12 md:gap-16", i % 2 && "md:[&>*:first-child]:order-2")}>
          <ImageReveal className="aspect-[4/3] rounded-sm md:col-span-7">
            <div className="absolute inset-0 overflow-hidden bg-stage">
              <div className={cn("absolute inset-0", framings[i % 3])}>
                <ProductMedia product={product} index={i + 1 < product.gallery.length ? i + 1 : 0} strokeOpacity={0.5} />
              </div>
            </div>
          </ImageReveal>
          <Reveal className="md:col-span-5">
            <span className="font-serif text-[40px] leading-none text-gold-text">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="mt-6 text-h2 max-w-[14ch]">{f.title}</h2>
            <p className="mt-5 max-w-[40ch] text-body-l text-fg-muted">{f.body}</p>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
