"use client";

import { Children, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tag = "div" | "section" | "li" | "ul" | "span" | "p";

type Props = {
  children: ReactNode;
  /** seconds */
  delay?: number;
  /** px travelled upwards */
  y?: number;
  className?: string;
  /** Stagger direct children (seconds between each) instead of revealing as one block */
  stagger?: number;
  as?: Tag;
  /** kept for API compatibility */
  amount?: number;
  style?: CSSProperties;
  id?: string;
};

/**
 * V3 §5 section reveal — opacity 0→1, y 24→0, 700ms cubic-bezier(.2,.8,.2,1), once.
 * CSS-driven with one shared IntersectionObserver (no animation library on the main thread).
 * Content is visible without JS (the hidden state is only applied once the observer is armed); reduced motion → 150ms fade.
 */
export function Reveal({ children, delay = 0, y = 24, className, stagger, as = "div", style, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observe(el);
    return () => unobserve(el);
  }, []);

  const Comp = as as "div";
  const vars = { "--rv-y": `${y}px`, "--rv-d": `${delay}s`, ...style } as CSSProperties;

  if (stagger) {
    const Item = (as === "ul" ? "li" : "div") as "div";
    return (
      <Comp ref={ref as never} id={id} className={cn("rv-group", className)} style={vars}>
        {Children.map(children, (c, i) => (
          <Item className="rv-item" style={{ "--rv-d": `${delay + i * stagger}s` } as CSSProperties}>
            {c}
          </Item>
        ))}
      </Comp>
    );
  }

  return (
    <Comp ref={ref as never} id={id} className={cn("rv", className)} style={vars}>
      {children}
    </Comp>
  );
}

let io: IntersectionObserver | null = null;
function observer() {
  if (io || typeof window === "undefined") return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.setAttribute("data-rv", "in");
          io!.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
  );
  return io;
}
function observe(el: Element) {
  const o = observer();
  if (!o) return;
  // Already on screen at mount (e.g. above the fold): show immediately, no flash.
  const r = el.getBoundingClientRect();
  if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
    el.setAttribute("data-rv", "in");
    return;
  }
  el.setAttribute("data-rv", "out");
  o.observe(el);
}
function unobserve(el: Element) {
  io?.unobserve(el);
}
