import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, className, dot = true }: { children: ReactNode; className?: string; dot?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-eyebrow text-fg-muted", className)}>
      {dot && <span aria-hidden className="h-px w-6 bg-hairline" />}
      {children}
    </span>
  );
}
