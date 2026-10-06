/** V3 §4.7 — "AB" in Bodoni inside a Bordeaux circle with a champagne ring (favicon / small spaces). */
export function Monogram({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="var(--bordeaux)" />
      <circle cx="20" cy="20" r="17.5" fill="none" stroke="var(--champagne)" strokeWidth="0.6" />
      <text x="20" y="25.6" textAnchor="middle" fontFamily="var(--font-bodoni), serif" fontSize="16" fontWeight="500" fill="#fff">
        AB
      </text>
    </svg>
  );
}
