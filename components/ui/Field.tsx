"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const inputCls =
  "peer h-[52px] w-full rounded-sm border border-line bg-white px-4 text-[16px] text-ink placeholder:text-muted/70 outline-none transition-[border-color,box-shadow] focus:border-cherry focus:shadow-[0_0_0_3px_var(--blush)] focus-visible:outline-none aria-[invalid=true]:border-error";

function Wrap({ id, label, error, children, hint }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div className="group flex flex-col">
      <label htmlFor={id} className="mb-2 text-[14px] font-semibold text-ink-2 transition-colors group-focus-within:text-cherry">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} className="mt-2 text-[13px] text-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-[13px] text-muted">{hint}</p>
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
      <textarea id={id} rows={3} className={cn(inputCls, "h-auto min-h-[96px] resize-none py-3", className)} {...props} />
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
        <select id={id} className={cn(inputCls, "appearance-none pr-10", className)} {...props}>
          {options.map((o) => {
            const v = typeof o === "string" ? { value: o, label: o } : o;
            return (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            );
          })}
        </select>
        <ChevronDown size={16} strokeWidth={1.75} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
      </div>
    </Wrap>
  );
}
