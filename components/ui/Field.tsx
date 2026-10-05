"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const inputCls =
  "peer h-[52px] w-full rounded-none border-0 border-b border-line bg-transparent px-0 text-[16px] text-fg placeholder:text-fg-muted/60 outline-none transition-colors focus:border-accent focus-visible:outline-none";

function Wrap({ id, label, error, children, hint }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div className="group flex flex-col">
      <label htmlFor={id} className="text-eyebrow text-fg-muted transition-colors group-focus-within:text-accent-text">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} className="mt-2 text-[13px] text-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-[12px] text-fg-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function Field({ label, error, hint, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }) {
  const id = useId();
  return (
    <Wrap id={id} label={label} error={error} hint={hint}>
      <input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={cn(inputCls, className)} {...props} />
    </Wrap>
  );
}

export function TextArea({ label, error, className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string }) {
  const id = useId();
  return (
    <Wrap id={id} label={label} error={error}>
      <textarea id={id} rows={3} className={cn(inputCls, "h-auto min-h-[88px] resize-none py-3", className)} {...props} />
    </Wrap>
  );
}

export function Select({
  label,
  options,
  error,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: (string | { value: string; label: string })[]; error?: string }) {
  const id = useId();
  return (
    <Wrap id={id} label={label} error={error}>
      <div className="relative">
        <select id={id} className={cn(inputCls, "appearance-none pr-8 [&>option]:bg-graphite-2 [&>option]:text-ivory", className)} {...props}>
          {options.map((o) => {
            const v = typeof o === "string" ? { value: o, label: o } : o;
            return (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            );
          })}
        </select>
        <ChevronDown size={16} strokeWidth={1.25} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-fg-muted" />
      </div>
    </Wrap>
  );
}
