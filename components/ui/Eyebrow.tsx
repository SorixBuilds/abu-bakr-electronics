import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** V3 §4.3 eyebrow: 12px Inter Tight 600, 0.16em, uppercase, cherry. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string; dot?: boolean }) {
  return <span className={cn("inline-block text-eyebrow text-accent-text", className)}>{children}</span>;
}
