"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/cn";
import { useFinePointer } from "@/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** V2 §3.4 — primary (cherry), light (porcelain on dark/wine), ghost, text. "gold-line" is kept as an alias of ghost. */
type Variant = "primary" | "cherry" | "light" | "ghost" | "gold-line" | "text";

type Props = {
  variant?: Variant;
  size?: "md" | "lg";
  href?: string;
  external?: boolean;
  onClick?: (e: MouseEvent) => void;
  icon?: "arrow" | "whatsapp" | ReactNode;
  iconPosition?: "start" | "end";
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  "aria-label"?: string;
};

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-3 rounded-xs text-button whitespace-nowrap transition-[border-color,background-color,color,transform,opacity] duration-250 ease-ui active:scale-[0.98] disabled:opacity-40";

const ghost =
  "border border-[color-mix(in_srgb,var(--fg)_30%,transparent)] text-fg hover:border-[color-mix(in_srgb,var(--fg)_60%,transparent)] hover:bg-[color-mix(in_srgb,var(--fg)_6%,transparent)]";

const variants: Record<Variant, string> = {
  primary: "bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:bg-[var(--btn-bg-hover)] hover:-translate-y-px",
  /** Cherry regardless of section theme (primary turns porcelain on wine). */
  cherry: "bg-cherry text-white hover:bg-cherry-hi hover:-translate-y-px",
  light: "bg-porcelain text-ink hover:bg-white hover:-translate-y-px",
  ghost,
  "gold-line": ghost,
  text: "text-fg px-0! h-auto! gap-2",
};

const sizes = { md: "h-11 px-6", lg: "h-[52px] px-7" };

export function LuxuryButton({
  variant = "primary",
  size = "lg",
  href,
  external,
  onClick,
  icon,
  iconPosition = "end",
  magnetic,
  className,
  children,
  type = "button",
  disabled,
  loading,
  ...rest
}: Props) {
  const fine = useFinePointer();
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const isMagnetic = magnetic && fine && !reduced;

  const onMove = (e: MouseEvent) => {
    if (!isMagnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-6, Math.min(6, dx * 0.12)));
    y.set(Math.max(-6, Math.min(6, dy * 0.2)));
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const iconEl =
    icon === "arrow" ? (
      <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-250 ease-ui group-hover/btn:translate-x-1" />
    ) : icon === "whatsapp" ? (
      <MessageCircle size={15} strokeWidth={1.5} />
    ) : (
      icon
    );

  const inner = (
    <>
      {iconPosition === "start" && iconEl}
      <span className={cn(variant === "text" && "link-lux pb-1", loading && "opacity-0")}>{children}</span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center gap-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="size-1 rounded-full bg-current"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </span>
      )}
      {iconPosition === "end" && iconEl}
    </>
  );

  const cls = cn(base, variants[variant], sizes[size], className);

  const el = href ? (
    external ? (
      <a href={href} target="_blank" rel="noopener" className={cls} onClick={onClick} {...rest}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls} onClick={onClick} {...rest}>
        {inner}
      </Link>
    )
  ) : (
    <button type={type} className={cls} onClick={onClick} disabled={disabled || loading} aria-busy={loading} {...rest}>
      {inner}
    </button>
  );

  if (!isMagnetic) return el;
  // Width utilities on the button also size the magnetic wrapper.
  const widths = (className ?? "").split(/\s+/).filter((c) => /^([a-z0-9]+:)*w-/.test(c));
  return (
    <motion.span ref={ref} className={cn("inline-flex", widths)} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {el}
    </motion.span>
  );
}
