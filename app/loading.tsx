import { Monogram } from "@/components/brand/Monogram";

/** Route loading: monogram pulse + gold progress bar (§20.12). */
export default function Loading() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center bg-obsidian text-ivory" role="status" aria-label="Loading">
      <div className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left animate-[progress-bar_1.2s_ease-out_forwards] bg-accent" />
      <Monogram size={56} className="animate-[monogram-pulse_1.6s_ease-in-out_infinite]" />
    </div>
  );
}
