import type { CSSProperties } from "react";

export type Finish = "steel" | "glass" | "matte";

export const finishes: { value: Finish; label: string; swatch: string }[] = [
  { value: "steel", label: "Brushed steel", swatch: "linear-gradient(135deg,#6b6f76,#3b3e43)" },
  { value: "glass", label: "Black glass", swatch: "linear-gradient(135deg,#2a2c31,#07080a)" },
  { value: "matte", label: "Matte black", swatch: "#1c1d20" },
];

/** Side-by-side refrigerator illustration with a real finish fill (A-06 stand-in). */
export function FridgeArt({ finish, className, style }: { finish: Finish; className?: string; style?: CSSProperties }) {
  const id = `f-${finish}`;
  return (
    <svg viewBox="0 0 300 560" className={className} style={style} role="img" aria-label={`Side-by-side refrigerator, ${finish} finish (illustrative)`}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" x2="1" y1="0" y2="0">
          {finish === "steel" && (
            <>
              <stop offset="0" stopColor="#3a3d42" />
              <stop offset="0.35" stopColor="#5d6168" />
              <stop offset="0.5" stopColor="#4a4d53" />
              <stop offset="0.68" stopColor="#62666d" />
              <stop offset="1" stopColor="#33363a" />
            </>
          )}
          {finish === "glass" && (
            <>
              <stop offset="0" stopColor="#0b0c0e" />
              <stop offset="0.5" stopColor="#15171b" />
              <stop offset="1" stopColor="#090a0c" />
            </>
          )}
          {finish === "matte" && (
            <>
              <stop offset="0" stopColor="#1a1b1e" />
              <stop offset="1" stopColor="#1f2023" />
            </>
          )}
        </linearGradient>
        {/* brushed texture */}
        <pattern id={`${id}-brush`} width="3" height="560" patternUnits="userSpaceOnUse">
          <rect width="1" height="560" fill="white" opacity={finish === "steel" ? 0.035 : 0} />
        </pattern>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.42" stopColor="white" stopOpacity="0" />
          <stop offset="0.5" stopColor="white" stopOpacity={finish === "glass" ? 0.09 : finish === "steel" ? 0.05 : 0.012} />
          <stop offset="0.58" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.12" />
          <stop offset="0.25" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-reflect`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.07" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* body */}
      <rect x="40" y="20" width="220" height="470" rx="7" fill={`url(#${id}-body)`} />
      <rect x="40" y="20" width="220" height="470" rx="7" fill={`url(#${id}-brush)`} />
      <rect x="40" y="20" width="220" height="470" rx="7" fill={`url(#${id}-sheen)`} />
      <rect x="40" y="20" width="220" height="470" rx="7" fill={`url(#${id}-top)`} />
      <rect x="40.5" y="20.5" width="219" height="469" rx="6.5" fill="none" stroke="white" strokeOpacity="0.14" />
      {/* door split */}
      <line x1="150" y1="20" x2="150" y2="490" stroke="black" strokeOpacity="0.55" strokeWidth="1.5" />
      <line x1="151.5" y1="20" x2="151.5" y2="490" stroke="white" strokeOpacity="0.06" />
      {/* handles */}
      <rect x="136" y="120" width="5" height="190" rx="2.5" fill="white" fillOpacity={finish === "steel" ? 0.35 : 0.16} />
      <rect x="159" y="120" width="5" height="190" rx="2.5" fill="white" fillOpacity={finish === "steel" ? 0.35 : 0.16} />
      {/* dispenser */}
      <rect x="66" y="132" width="52" height="84" rx="4" fill="black" fillOpacity="0.55" stroke="white" strokeOpacity="0.1" />
      <rect x="80" y="146" width="24" height="5" rx="1" fill="var(--gold)" opacity="0.8" />
      <rect x="86" y="160" width="12" height="34" rx="2" fill="white" fillOpacity="0.05" />
      {/* plinth */}
      <rect x="48" y="490" width="204" height="8" fill="black" fillOpacity="0.6" />
      {/* floor reflection */}
      <g opacity="0.55" transform="translate(0 996) scale(1 -1)">
        <rect x="40" y="440" width="220" height="56" rx="7" fill={`url(#${id}-reflect)`} />
      </g>
    </svg>
  );
}
