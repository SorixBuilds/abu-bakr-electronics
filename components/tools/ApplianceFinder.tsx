"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { recommend, step1, step2, step3, type FinderCategory } from "@/lib/finder";
import { ProductMedia } from "@/components/product/Media";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { openWhatsApp } from "@/lib/whatsapp";
import { productHref } from "@/lib/format";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Answers = { cat?: FinderCategory; s2?: string; s3?: string };

/** V3 §8.8 — three questions (logic unchanged), one recommendation on its stage + two alternates, shortlist to WhatsApp. */
export function ApplianceFinder({ onNavigate }: { onNavigate?: () => void }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [a, setA] = useState<Answers>({});

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };

  const q =
    step === 0
      ? { title: "What are you looking for?", options: step1.map((o) => ({ value: o.value, label: o.label, line: o.line })), key: "cat" as const }
      : step === 1 && a.cat
        ? { title: step2[a.cat].question, options: step2[a.cat].options, key: "s2" as const }
        : { title: "What matters most?", options: step3, key: "s3" as const };

  const results = step === 3 && a.cat && a.s2 && a.s3 ? recommend(a.cat, a.s2, a.s3) : [];

  const choose = (value: string) => {
    const next = { ...a, [q.key]: value } as Answers;
    if (q.key === "cat") {
      next.s2 = undefined;
      next.s3 = undefined;
    }
    setA(next);
    setTimeout(() => go(step + 1), 180);
  };

  const label = (key: keyof Answers) => {
    if (key === "cat") return step1.find((o) => o.value === a.cat)?.label;
    if (key === "s2" && a.cat) return step2[a.cat].options.find((o) => o.value === a.s2)?.label;
    return step3.find((o) => o.value === a.s3)?.label;
  };

  const send = () =>
    openWhatsApp(
      `Assalam o Alaikum, I used the Appliance Finder on your website.\nLooking for: ${label("cat")}\n${a.cat ? step2[a.cat].question : ""} ${label("s2")}\nWhat matters most: ${label("s3")}\nMy shortlist:\n${results
        .map((p) => `• ${p.name} (${p.id})`)
        .join("\n")}\nCould an advisor help me choose?`,
    );

  return (
    <div>
      {/* progress */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex flex-1 gap-1.5" aria-hidden>
          {[0, 1, 2].map((n) => (
            <span key={n} className="relative h-1 flex-1 overflow-hidden rounded-full bg-line">
              <motion.span
                className="absolute inset-0 origin-left rounded-full bg-cherry"
                animate={{ scaleX: step > n ? 1 : step === n ? 0.35 : 0 }}
                transition={{ duration: 0.5, ease: ease.outExpo }}
              />
            </span>
          ))}
        </div>
        <span className="text-[13px] font-semibold text-muted tabular-nums">{step < 3 ? `${step + 1} of 3` : "Your shortlist"}</span>
      </div>

      <div className="relative min-h-[340px]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: 40 * d }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: -40 * d }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: ease.lux }}
          >
            {step < 3 ? (
              <Question title={q.title} options={q.options} value={a[q.key]} onChoose={choose} />
            ) : (
              <div>
                <p className="text-eyebrow text-cherry">Our recommendation</p>
                {results[0] ? (
                  <>
                    <Link
                      href={productHref(results[0])}
                      onClick={onNavigate}
                      className="group mt-4 grid gap-5 rounded-lg bg-white p-3 shadow-card ring-1 ring-line sm:grid-cols-[200px_1fr] sm:items-center"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-md sm:aspect-[4/5]">
                        <ProductMedia product={results[0]} sizes="(max-width:640px) 90vw, 200px" />
                      </div>
                      <div className="pb-2 sm:pb-0 sm:pr-4">
                        <p className="text-[20px] font-semibold leading-snug text-ink">{results[0].name}</p>
                        <p className="mt-2 font-display text-[18px] italic text-ink-2">{results[0].tagline}</p>
                        <p className="mt-2 text-[14px] text-muted">{results[0].keySpecs.join(" · ")} · Price on request</p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-cherry">
                          View details <ArrowRight size={16} strokeWidth={1.75} className="transition-transform group-hover:translate-x-[3px]" />
                        </span>
                      </div>
                    </Link>
                    {results.length > 1 && (
                      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {results.slice(1).map((p) => (
                          <li key={p.id}>
                            <Link
                              href={productHref(p)}
                              onClick={onNavigate}
                              className="flex items-center gap-3 rounded-md bg-white p-2 ring-1 ring-line transition-shadow hover:shadow-card"
                            >
                              <div className="relative h-[72px] w-[64px] shrink-0 overflow-hidden rounded-xs">
                                <ProductMedia product={p} sizes="64px" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[12px] font-semibold text-muted">Alternative</p>
                                <p className="line-clamp-2 text-[14px] font-semibold leading-snug text-ink">{p.name}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <p className="mt-5 text-fg-muted">An advisor can suggest the right option — send your answers below.</p>
                )}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <LuxuryButton variant="cherry" icon="whatsapp" iconPosition="start" onClick={send}>
                    Send my shortlist on WhatsApp
                  </LuxuryButton>
                  <LuxuryButton
                    variant="secondary"
                    icon={<RotateCcw size={16} strokeWidth={1.75} />}
                    onClick={() => {
                      setA({});
                      go(0);
                    }}
                  >
                    Start again
                  </LuxuryButton>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step > 0 && step < 3 && (
        <button onClick={() => go(step - 1)} className="mt-6 flex min-h-11 items-center gap-2 text-[15px] font-semibold text-ink-2 hover:text-ink">
          <ArrowLeft size={18} strokeWidth={1.75} /> Back
        </button>
      )}
    </div>
  );
}

function Question({
  title,
  options,
  value,
  onChoose,
}: {
  title: string;
  options: { value: string; label: string; line?: string }[];
  value?: string;
  onChoose: (v: string) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    refs.current[(i + d + options.length) % options.length]?.focus();
  };
  const titleId = `q-${title.replace(/\W+/g, "-")}`;
  return (
    <div>
      <h3 id={titleId} className="font-display text-[28px] leading-tight text-ink md:text-[34px]">
        {title}
      </h3>
      <div role="radiogroup" aria-labelledby={titleId} className={cn("mt-6 grid gap-2.5 sm:gap-3", options.length > 3 ? "sm:grid-cols-2" : "")}>
        {options.map((o, i) => {
          const on = value === o.value;
          return (
            <button
              key={o.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="radio"
              aria-checked={on}
              tabIndex={on || (!value && i === 0) ? 0 : -1}
              onKeyDown={(e) => onKey(e, i)}
              onClick={() => onChoose(o.value)}
              className={cn(
                "group flex min-h-16 items-center justify-between gap-4 rounded-full border px-6 py-3.5 text-left transition-colors duration-300",
                on ? "border-cherry bg-blush" : "border-line bg-white hover:border-ink",
              )}
            >
              <span>
                <span className="block text-[16px] font-semibold text-ink">{o.label}</span>
                {o.line && <span className="mt-0.5 block text-[13px] text-muted">{o.line}</span>}
              </span>
              <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full border-2", on ? "border-cherry" : "border-line")}>
                {on && <span className="size-2 rounded-full bg-cherry" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
