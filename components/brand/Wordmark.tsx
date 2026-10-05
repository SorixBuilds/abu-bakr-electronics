import { cn } from "@/lib/cn";

type Props = {
  variant?: "stacked" | "horizontal" | "lockup";
  align?: "left" | "center";
  size?: number;
  className?: string;
};

/** ABU BAKR / ELECTRONICS wordmark (§4.1). `size` = font-size of line 1 in px. */
export function Wordmark({ variant = "stacked", align = "left", size = 15, className }: Props) {
  // V2 §6.2 — nav lockup: ABU BAKR over a small ELECTRONICS, never wraps.
  if (variant === "lockup") {
    return (
      <span className={cn("inline-flex flex-col whitespace-nowrap uppercase leading-none", className)} aria-label="Abu Bakr Electronics">
        <span className="font-semibold tracking-[0.28em]" style={{ fontSize: size }}>
          Abu Bakr
        </span>
        <span className="mt-[5px] font-medium tracking-[0.5em] text-fg-muted" style={{ fontSize: 9 }}>
          Electronics
        </span>
      </span>
    );
  }
  if (variant === "horizontal") {
    return (
      <span className={cn("inline-flex items-center whitespace-nowrap uppercase", className)} style={{ fontSize: size }} aria-label="Abu Bakr Electronics">
        <span className="font-semibold tracking-[0.32em]">Abu Bakr</span>
        <span aria-hidden className="mx-[0.7em] inline-block size-[3px] rounded-full bg-cherry-hi" />
        <span className="font-medium tracking-[0.42em] text-fg-muted">Electronics</span>
      </span>
    );
  }
  return (
    <span
      className={cn("inline-flex flex-col whitespace-nowrap uppercase", align === "center" ? "items-center" : "items-start", className)}
      aria-label="Abu Bakr Electronics"
    >
      <span className="font-semibold leading-none tracking-[0.32em]" style={{ fontSize: size }}>
        Abu Bakr
      </span>
      <span aria-hidden className="my-[7px] block h-px w-6 bg-hairline" />
      <span className="font-medium leading-none tracking-[0.58em] text-fg-muted" style={{ fontSize: Math.round(size * 0.42 * 10) / 10 + 1 }}>
        Electronics
      </span>
    </span>
  );
}
