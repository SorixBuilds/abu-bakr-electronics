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

/** §6.7 / §20.6 — three questions, one considered recommendation + two alternates. */
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
      <div className="mb-10 flex items-center gap-4">
        <div className="flex flex-1 gap-1.5" aria-hidden>
          {[0, 1, 2].map((n) => (
            <span key={n} className="relative h-px flex-1 overflow-hidden bg-line">
              <motion.span
                className="absolute inset-0 origin-left bg-gold"
                animate={{ scaleX: step > n ? 1 : step === n ? 0.35 : 0 }}
                transition={{ duration: 0.5, ease: ease.outExpo }}
              />
            </span>
          ))}
        </div>
        <span className="font-mono text-[11px] tracking-[0.14em] text-fg-muted">{step < 3 ? `${step + 1} / 3` : "RESULT"}</span>
      </div>

      <div className="relative min-h-[360px]">
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
            transition={{ duration: 0.45, ease: ease.outExpo }}
          >
            {step < 3 ? (
              <Question title={q.title} options={q.options} value={a[q.key]} onChoose={choose} />
            ) : (
              <div>
                <p className="text-eyebrow text-fg-muted">Our recommendation</p>
                {results[0] ? (
                  <>
                    <Link
                      href={productHref(results[0])}
                      onClick={onNavigate}
                      className="group mt-5 grid gap-6 rounded-sm border border-gold/50 p-4 sm:grid-cols-[180px_1fr] sm:items-center"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[4/5]">
                        <ProductMedia product={results[0]} sizes="180px" />
                      </div>
                      <div className="pb-2 sm:pb-0 sm:pr-4">
                        <p className="text-[20px] font-medium leading-snug">{results[0].name}</p>
                        <p className="mt-2 text-[14px] text-fg-muted">{results[0].tagline}</p>
                        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">{results[0].keySpecs.join(" · ")}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-button">
                          View details <ArrowRight size={14} strokeWidth={1.25} className="text-gold transition-transform group-hover:translate-x-1" />
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
                              className="flex items-center gap-4 rounded-sm border border-line p-3 transition-colors hover:border-[color-mix(in_srgb,var(--fg)_35%,transparent)]"
                            >
                              <div className="relative h-16 w-[52px] shrink-0 overflow-hidden rounded-xs">
                                <ProductMedia product={p} sizes="52px" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[11px] uppercase tracking-[0.14em] text-fg-muted">Alternative</p>
                                <p className="line-clamp-2 text-[14px] leading-snug">{p.name}</p>
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
                  <LuxuryButton variant="gold-line" icon="whatsapp" iconPosition="start" onClick={send}>
                    Send my shortlist to an advisor
                  </LuxuryButton>
                  <LuxuryButton
                    variant="ghost"
                    icon={<RotateCcw size={14} strokeWidth={1.5} />}
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
        <button onClick={() => go(step - 1)} className="mt-6 flex min-h-11 items-center gap-2 text-[14px] text-fg-muted hover:text-fg">
          <ArrowLeft size={14} strokeWidth={1.25} /> Back
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
      <h3 id={titleId} className="text-h3">
        {title}
      </h3>
      <div role="radiogroup" aria-labelledby={titleId} className={cn("mt-8 grid gap-3", options.length > 3 ? "sm:grid-cols-2" : "")}>
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
                "group flex min-h-16 items-center justify-between gap-4 rounded-sm border px-5 py-4 text-left transition-colors duration-250",
                on ? "border-gold bg-[rgba(201,169,106,0.06)]" : "border-line hover:border-[color-mix(in_srgb,var(--fg)_35%,transparent)]",
              )}
            >
              <span>
                <span className="block text-[16px]">{o.label}</span>
                {o.line && <span className="mt-0.5 block text-[13px] text-fg-muted">{o.line}</span>}
              </span>
              <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full border", on ? "border-gold" : "border-line")}>
                {on && <span className="size-2 rounded-full bg-gold" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
