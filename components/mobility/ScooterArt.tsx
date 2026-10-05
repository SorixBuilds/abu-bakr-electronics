import type { CSSProperties } from "react";

/**
 * Side-profile electric scooty, lit like an object on a stage (A-12 stand-in until
 * Jinpeng dealer imagery is supplied). `variant` subtly changes proportions per model family.
 */
export function ScooterArt({ variant = 1, className, style, label }: { variant?: 0 | 1 | 2; className?: string; style?: CSSProperties; label?: string }) {
  const body = ["#1d2025", "#22262c", "#1a1c20"][variant];
  const seatLen = [118, 128, 136][variant];
  return (
    <svg viewBox="0 0 640 400" className={className} style={style} role="img" aria-label={label ?? "Electric scooty (illustration)"}>
      <defs>
        <linearGradient id={`sc-body-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3f47" />
          <stop offset="0.45" stopColor={body} />
          <stop offset="1" stopColor="#0d0e10" />
        </linearGradient>
        <linearGradient id={`sc-sheen-${variant}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.5" stopColor="white" stopOpacity="0.14" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`sc-tyre-${variant}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.62" stopColor="#0b0b0c" />
          <stop offset="0.8" stopColor="#1b1c1f" />
          <stop offset="1" stopColor="#060607" />
        </radialGradient>
      </defs>

      {/* wheels */}
      {[150, 492].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="302" r="62" fill={`url(#sc-tyre-${variant})`} />
          <circle cx={cx} cy="302" r="62" fill="none" stroke="white" strokeOpacity="0.1" />
          <circle cx={cx} cy="302" r="38" fill="#121316" stroke="white" strokeOpacity="0.16" />
          {Array.from({ length: 5 }).map((_, i) => {
            const a = (i / 5) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={cx}
                y1={302}
                x2={+(cx + Math.cos(a) * 34).toFixed(2)}
                y2={+(302 + Math.sin(a) * 34).toFixed(2)}
                stroke="white"
                strokeOpacity="0.22"
                strokeWidth="5"
                strokeLinecap="round"
              />
            );
          })}
          <circle cx={cx} cy="302" r="9" fill="#2a2d32" stroke="var(--gold)" strokeOpacity="0.8" />
          {/* disc brake */}
          <circle cx={cx} cy="302" r="24" fill="none" stroke="white" strokeOpacity="0.12" strokeDasharray="2 3" />
        </g>
      ))}

      {/* front fork */}
      <path d="M492 302 L452 150" stroke="#2c3036" strokeWidth="12" strokeLinecap="round" />
      <path d="M492 302 L452 150" stroke="white" strokeOpacity="0.12" strokeWidth="1" />
      {/* handlebar */}
      <path d="M430 118 L470 108" stroke="#2c3036" strokeWidth="9" strokeLinecap="round" />
      <path d="M416 120 L436 116" stroke="#111" strokeWidth="11" strokeLinecap="round" />
      {/* front cowl + headlight */}
      <path d="M440 134 C 470 140, 486 168, 478 214 L 452 236 L 420 236 L 430 150 Z" fill={`url(#sc-body-${variant})`} stroke="white" strokeOpacity="0.12" />
      <path d="M470 156 C 482 168, 484 186, 480 200" stroke="#f4f1ea" strokeOpacity="0.85" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M470 156 C 482 168, 484 186, 480 200"
        stroke="#e1c98d"
        strokeOpacity="0.4"
        strokeWidth="10"
        strokeLinecap="round"
        style={{ filter: "blur(6px)" }}
      />
      {/* front fender */}
      <path d="M440 262 A 62 62 0 0 1 548 270" fill="none" stroke="#24272c" strokeWidth="10" strokeLinecap="round" />

      {/* floorboard */}
      <path d="M232 262 L 420 262 L 452 236 L 420 236 L 236 236 Z" fill="#15171a" stroke="white" strokeOpacity="0.1" />
      {/* rear body */}
      <path
        d={`M 236 236 L 196 236 C 140 236, 96 228, 74 206 C 64 196, 70 180, 86 176 L ${100 + seatLen} 168 C ${130 + seatLen} 166, 300 176, 306 196 L 300 236 Z`}
        fill={`url(#sc-body-${variant})`}
        stroke="white"
        strokeOpacity="0.14"
      />
      <path d={`M 90 186 L ${96 + seatLen} 178`} stroke={`url(#sc-sheen-${variant})`} strokeWidth="2" />
      {/* gold accent line */}
      <path d="M 104 212 C 160 220, 240 222, 296 214" stroke="var(--gold)" strokeOpacity="0.75" strokeWidth="1.2" fill="none" />
      {/* seat */}
      <path
        d={`M 98 166 C 98 150, 120 146, 150 146 L ${110 + seatLen} 146 C ${126 + seatLen} 146, ${132 + seatLen} 154, ${128 + seatLen} 166 Z`}
        fill="#0e0f11"
        stroke="white"
        strokeOpacity="0.1"
      />
      {/* tail light */}
      <path d="M 72 200 L 84 192" stroke="#d9826b" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" />
      {/* rear fender + swingarm */}
      <path d="M 96 262 A 62 62 0 0 1 200 248" fill="none" stroke="#24272c" strokeWidth="8" strokeLinecap="round" />
      <path d="M 150 302 L 250 262" stroke="#2c3036" strokeWidth="10" strokeLinecap="round" />
      {/* motor hub hint */}
      <circle cx="150" cy="302" r="16" fill="none" stroke="var(--gold)" strokeOpacity="0.35" />
    </svg>
  );
}
