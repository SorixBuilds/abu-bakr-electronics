export function Monogram({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="19.25" fill="none" stroke="var(--gold)" strokeWidth="0.75" />
      <text x="20" y="25.5" textAnchor="middle" fontFamily="var(--font-instrument), serif" fontSize="17" letterSpacing="0.5" fill="currentColor">
        AB
      </text>
    </svg>
  );
}
