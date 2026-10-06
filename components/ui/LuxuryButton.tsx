"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/cn";

/**
 * V3 §4.5 buttons — pills, sentence case.
 *  primary   Cherry (on dark/Bordeaux sections it becomes the "on-dark" white pill automatically via --btn-*)
 *  cherry    Cherry regardless of section
 *  secondary White, ink text, hairline border (light sections)
 *  light     "On-dark": white bg, Bordeaux text
 *  ghost     Ghost-on-dark: transparent, white text, 35% white border (adapts to light sections too)
 *  text      Cherry text link, underline on hover
 */
type Variant = "primary" | "cherry" | "secondary" | "light" | "ghost" | "gold-line" | "text";

type Props = {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  onClick?: (e: MouseEvent) => void;
  icon?: "arrow" | "whatsapp" | ReactNode;
  iconPosition?: "start" | "end";
  /** @deprecated V3 bans magnetic buttons — accepted and ignored */
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  "aria-label"?: string;
};

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 rounded-full text-button whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-lux active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40";

const ghost =
  "border border-[color-mix(in_srgb,var(--fg)_35%,transparent)] text-fg hover:border-fg hover:bg-[color-mix(in_srgb,var(--fg)_6%,transparent)]";

const variants: Record<Variant, string> = {
  primary: "bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:bg-[var(--btn-bg-hover)] hover:shadow-[var(--shadow-cherry)]",
  cherry: "bg-cherry text-white hover:bg-cherry-hi hover:shadow-[var(--shadow-cherry)]",
  secondary: "border border-line bg-white text-ink hover:border-ink",
  light: "bg-white text-bordeaux hover:bg-porcelain",
  ghost,
  "gold-line": ghost,
  text: "text-accent-text h-auto! px-0! gap-1.5",
};

const sizes = { sm: "h-11 px-5 text-[14px]", md: "h-11 px-6", lg: "h-[52px] px-[26px]" };

export function LuxuryButton({
  variant = "primary",
  size = "lg",
  href,
  external,
  onClick,
  icon,
  iconPosition = "end",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- swallowed so it never reaches the DOM
  magnetic: _magnetic,
  className,
  children,
  type = "button",
  disabled,
  loading,
  ...rest
}: Props) {
  const iconEl =
    icon === "arrow" ? (
      <ArrowRight size={18} strokeWidth={1.75} className="transition-transform duration-300 ease-lux group-hover/btn:translate-x-[3px]" />
    ) : icon === "whatsapp" ? (
      <MessageCircle size={18} strokeWidth={1.75} />
    ) : (
      icon
    );

  const inner = (
    <>
      {iconPosition === "start" && iconEl}
      <span className={cn(variant === "text" && "link-lux", loading && "opacity-0")}>{children}</span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center gap-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 animate-pulse rounded-full bg-current" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </span>
      )}
      {iconPosition === "end" && iconEl}
    </>
  );

  const cls = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener" className={cls} onClick={onClick} {...rest}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls} onClick={onClick} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled || loading} aria-busy={loading} {...rest}>
      {inner}
    </button>
  );
}

export { LuxuryButton as Button };
