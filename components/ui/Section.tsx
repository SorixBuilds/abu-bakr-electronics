import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Tone = "porcelain" | "white" | "bone" | "ice" | "bordeaux" | "ink" | "graphite";

const tones: Record<Tone, string> = {
  porcelain: "theme-porcelain bg-porcelain",
  white: "theme-white bg-white",
  bone: "theme-bone bg-bone",
  ice: "theme-ice bg-ice-tint",
  bordeaux: "theme-bordeaux bg-bordeaux",
  ink: "theme-ink bg-ink",
  graphite: "theme-graphite bg-graphite",
};

/** V3 §6 — every home section: tone + vertical rhythm (112 / 72). */
export function Section({
  tone = "porcelain",
  id,
  className,
  style,
  children,
  flush,
  "aria-label": ariaLabel,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** No vertical padding */
  flush?: boolean;
  "aria-label"?: string;
}) {
  return (
    <section id={id} aria-label={ariaLabel} className={cn(tones[tone], !flush && "section-y", "relative scroll-mt-24", className)} style={style}>
      {children}
    </section>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-lux", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-eyebrow text-accent-text", className)}>{children}</p>;
}

/**
 * Bodoni headline with exactly one italic word (V3 §4.3).
 * `italic` is the word/phrase inside `children` to set in italic.
 */
export function Heading({
  children,
  italic,
  as: Tag = "h2",
  size = "h2",
  className,
}: {
  children: string;
  italic?: string;
  as?: "h1" | "h2" | "h3" | "p";
  size?: "display-xl" | "display-l" | "h2";
  className?: string;
}) {
  const cls = cn({ "display-xl": "text-display-xl", "display-l": "text-display-l", h2: "text-h2" }[size], "text-balance", className);
  if (!italic || !children.includes(italic)) return <Tag className={cls}>{children}</Tag>;
  const i = children.indexOf(italic);
  return (
    <Tag className={cls}>
      {children.slice(0, i)}
      <em className="italic">{italic}</em>
      {children.slice(i + italic.length)}
    </Tag>
  );
}

/** Eyebrow + heading + optional support line, revealed on scroll. */
export function SectionIntro({
  eyebrow,
  title,
  italic,
  support,
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  italic?: string;
  support?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal y={24} className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading italic={italic} className={cn("max-w-[18ch]", align === "center" && "mx-auto")}>
        {title}
      </Heading>
      {support && <p className={cn("max-w-[52ch] text-body-l text-fg-muted", align === "center" && "mx-auto")}>{support}</p>}
      {children}
    </Reveal>
  );
}
