"use client";

import { motion } from "motion/react";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewTag } from "@/components/ui/Placeholder";
import { useReview } from "@/store/review";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** §6.9 — trust without invented facts. Item 04 only when confirmed (or in Review Mode). */
export function StandardChapter() {
  const review = useReview((s) => s.enabled);
  const warranty = site.warrantyStatement.value;
  const items = [...home.standard.items];
  const showFourth = !!warranty || review;

  return (
    <section className="theme-light section-y bg-ivory" aria-label="The Abu Bakr standard">
      <div className="container-lux">
        <SectionHeading eyebrow={home.standard.eyebrow} title={home.standard.title} className="mb-16 md:mb-20" />
        <ul className={cn("grid md:grid-cols-3", showFourth && "lg:grid-cols-4")}>
          {items.map((it, i) => (
            <Item key={it.title} n={i} title={it.title} body={it.body} />
          ))}
          {showFourth && (
            <Item
              n={3}
              title={warranty ? "Genuine products & brand warranty." : ""}
              body={warranty ?? ""}
              custom={
                !warranty && (
                  <ReviewTag note={site.warrantyStatement.note}>
                    <span className="text-[22px] font-medium">Genuine products &amp; brand warranty.</span>
                  </ReviewTag>
                )
              }
            />
          )}
        </ul>
      </div>
    </section>
  );
}

function Item({ n, title, body, custom }: { n: number; title: string; body: string; custom?: React.ReactNode }) {
  return (
    <motion.li className="relative py-10 md:px-8 md:py-0 md:first:pl-0" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {/* rule: top on mobile, left on desktop */}
      <motion.span
        className="absolute inset-x-0 top-0 h-px origin-left bg-line md:hidden"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease: ease.outExpo, delay: n * 0.1 } } }}
      />
      {n > 0 && (
        <motion.span
          className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-line md:block"
          variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.9, ease: ease.outExpo, delay: n * 0.1 } } }}
        />
      )}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.outExpo, delay: 0.3 + n * 0.1 } } }}
      >
        <span className="font-serif text-[72px] leading-none text-gold-text">{String(n + 1).padStart(2, "0")}</span>
        {custom ? (
          <div className="mt-8">{custom}</div>
        ) : (
          <>
            <h3 className="mt-8 text-[24px] font-medium leading-tight tracking-[-0.01em]">{title}</h3>
            <p className="mt-3 max-w-[30ch] text-fg-muted">{body}</p>
          </>
        )}
      </motion.div>
    </motion.li>
  );
}
