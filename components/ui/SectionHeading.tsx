import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { RevealText } from "./RevealText";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: string;
  title: string | string[];
  support?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  size?: "h1" | "h2" | "display-l";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, support, align = "left", as = "h2", size = "h2", className, children }: Props) {
  return (
    <div className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      {eyebrow && (
        <Reveal y={12}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <RevealText
        as={as}
        lines={title}
        className={cn(size === "h1" ? "text-h1" : size === "h2" ? "text-h2" : "text-display-l", "max-w-[18ch] text-balance", align === "center" && "mx-auto")}
      />
      {support && (
        <Reveal delay={0.15} y={16}>
          <p className={cn("max-w-[46ch] text-fg-muted", align === "center" && "mx-auto")}>{support}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
