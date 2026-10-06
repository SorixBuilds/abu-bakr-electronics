import { cn } from "@/lib/cn";

/**
 * V3 §4.7 — "Abu Bakr" in Bodoni Moda 500 with ELECTRONICS beneath in Inter Tight 600, 0.32em, cherry.
 * `size` = font-size of "Abu Bakr" in px (26 in the nav). Colour follows the section (ink on light, white on dark).
 * Replace with the client's logo when supplied.
 */
export function Wordmark({ size = 26, className, onDark }: { size?: number; className?: string; onDark?: boolean; variant?: string; align?: string }) {
  return (
    <span className={cn("inline-flex flex-col whitespace-nowrap leading-none", className)}>
      <span className="font-display font-medium tracking-[-0.01em]" style={{ fontSize: size }}>
        Abu Bakr
      </span>{" "}
      <span
        className={cn("mt-[3px] font-sans font-semibold uppercase tracking-[0.32em]", onDark ? "text-cherry-soft" : "text-accent-text")}
        style={{ fontSize: Math.max(8, Math.round(size * 0.35)) }}
      >
        Electronics
      </span>
    </span>
  );
}
