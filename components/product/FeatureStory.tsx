import type { Product } from "@/types/product";
import { Reveal } from "@/components/ui/Reveal";

/** V3 §9.2 — "Why customers choose this": general, true statements as numbered rows (no repeated imagery). */
export function FeatureStory({ product }: { product: Product }) {
  if (!product.features.length) return null;
  return (
    <div>
      <h2 className="mb-8 max-w-[18ch] text-h2 md:mb-10">
        Why customers <em>choose</em> this
      </h2>
      <Reveal stagger={0.08} className="grid gap-3 md:grid-cols-2 md:gap-4">
        {product.features.map((f, i) => (
          <div key={f.title} className="flex h-full gap-5 rounded-md bg-white p-6 shadow-card md:p-8">
            <span className="font-display text-[40px] leading-none text-bordeaux">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-[19px] font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.body}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
