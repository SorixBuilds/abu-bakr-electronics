"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Drawer } from "vaul";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  /** Visually hide the title (still announced) */
  hideTitle?: boolean;
  description?: string;
  children: ReactNode;
  maxWidth?: number;
  className?: string;
  /** Desktop: "center" modal or "right" drawer */
  placement?: "center" | "right";
  padded?: boolean;
};

/** V3 §9.5 — white, radius 24, --shadow-lift, padding 32; Radix Dialog on desktop, Vaul bottom sheet under 768px. */
export function Modal({ open, onOpenChange, title, hideTitle, description, children, maxWidth = 520, className, placement = "center", padded = true }: Props) {
  const mobile = useIsMobile();

  if (mobile) {
    return (
      <Drawer.Root open={open} onOpenChange={onOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[80] bg-[rgba(21,18,20,0.45)]" />
          <Drawer.Content
            className={cn("theme-white fixed inset-x-0 bottom-0 z-[81] flex max-h-[92svh] flex-col rounded-t-xl bg-white text-ink outline-none", className)}
          >
            <div className="mx-auto mt-3 h-1 w-9 shrink-0 rounded-full bg-line" aria-hidden />
            <Drawer.Title className={cn("px-5 pt-5 font-display text-[28px] leading-tight", hideTitle && "sr-only")}>{title}</Drawer.Title>
            {description ? (
              <Drawer.Description className="px-5 pt-1 text-sm text-fg-muted">{description}</Drawer.Description>
            ) : (
              <Drawer.Description className="sr-only">{title}</Drawer.Description>
            )}
            <div
              className={cn("overflow-y-auto overscroll-contain", padded && "px-5 pt-5")}
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}
              data-vaul-no-drag={undefined}
            >
              {children}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  const right = placement === "right";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[80] bg-[rgba(21,18,20,0.45)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={description ? undefined : undefined}>
              <motion.div
                className={cn(
                  "theme-white fixed z-[81] bg-white text-ink outline-none",
                  right
                    ? "inset-y-0 right-0 flex w-full flex-col overflow-hidden border-l border-line"
                    : "left-1/2 top-1/2 max-h-[90vh] w-[calc(100vw-48px)] overflow-y-auto rounded-xl",
                  padded && !right && "p-8",
                  className,
                )}
                style={{ maxWidth, boxShadow: "var(--shadow-lift)" }}
                initial={right ? { x: "100%" } : { opacity: 0, scale: 0.98, x: "-50%", y: "calc(-50% + 12px)" }}
                animate={right ? { x: 0 } : { opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={
                  right
                    ? { x: "100%", transition: { duration: 0.3, ease: ease.in } }
                    : { opacity: 0, scale: 0.98, x: "-50%", y: "calc(-50% + 8px)", transition: { duration: 0.25, ease: ease.in } }
                }
                transition={{ duration: right ? 0.5 : 0.45, ease: ease.outExpo }}
              >
                <Dialog.Title className={cn("pr-10 font-display text-[30px] leading-tight", hideTitle && "sr-only", right && "px-8 pt-8")}>{title}</Dialog.Title>
                {description ? (
                  <Dialog.Description className={cn("mt-2 text-sm text-fg-muted", right && "px-8")}>{description}</Dialog.Description>
                ) : (
                  <Dialog.Description className="sr-only">{title}</Dialog.Description>
                )}
                <Dialog.Close
                  className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-porcelain text-ink-2 transition-colors hover:text-ink"
                  aria-label="Close"
                >
                  <X size={20} strokeWidth={1.75} />
                </Dialog.Close>
                <div className={cn(!hideTitle && !right && "mt-6", right && "flex-1 overflow-y-auto px-8 pb-8 pt-6")}>{children}</div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
