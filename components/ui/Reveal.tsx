"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { Children, type ReactNode } from "react";
import { ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Stagger direct children instead of revealing as one block */
  stagger?: number;
  as?: "div" | "section" | "li" | "ul" | "span" | "p";
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

/** Section reveal (§15.2): opacity 0→1, y 32→0, 800ms outExpo, once. */
export function Reveal({ children, delay = 0, y = 32, className, stagger, as = "div", amount = 0.2, ...rest }: Props) {
  const reduced = useReducedMotionSafe();
  const Comp = motion[as] as typeof motion.div;
  const Item = (as === "ul" ? motion.li : motion.div) as typeof motion.div;

  if (stagger) {
    return (
      <Comp
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        {...rest}
      >
        {Children.map(children, (c) => (
          <Item
            variants={{
              hidden: { opacity: 0, y: reduced ? 0 : y },
              show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.15 : 0.8, ease: ease.outExpo } },
            }}
          >
            {c}
          </Item>
        ))}
      </Comp>
    );
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduced ? 0.15 : 0.8, ease: ease.outExpo, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
