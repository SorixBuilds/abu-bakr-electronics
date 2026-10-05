import type { ProductShape } from "@/types/product";
import { cn } from "@/lib/cn";

/**
 * Refined line drawing of a product family on the stage colour (§14.3).
 * The site must look intentional with zero photos. Stroke 1.25, ivory, one gold detail.
 */

const G = "var(--gold)";

function Lines({ shape }: { shape: ProductShape }) {
  switch (shape) {
    case "fridge-sbs":
      return (
        <>
          <rect x="56" y="28" width="88" height="186" rx="4" />
          <line x1="100" y1="28" x2="100" y2="214" />
          <line x1="95" y1="78" x2="95" y2="142" strokeWidth="2" />
          <line x1="105" y1="78" x2="105" y2="142" strokeWidth="2" />
          <rect x="64" y="70" width="22" height="34" rx="2" stroke={G} />
          <line x1="70" y1="98" x2="80" y2="98" stroke={G} />
          <line x1="62" y1="214" x2="62" y2="219" />
          <line x1="138" y1="214" x2="138" y2="219" />
        </>
      );
    case "fridge-french":
      return (
        <>
          <rect x="52" y="28" width="96" height="186" rx="4" />
          <line x1="52" y1="148" x2="148" y2="148" />
          <line x1="100" y1="28" x2="100" y2="148" />
          <line x1="95" y1="62" x2="95" y2="122" strokeWidth="2" />
          <line x1="105" y1="62" x2="105" y2="122" strokeWidth="2" />
          <line x1="78" y1="160" x2="122" y2="160" strokeWidth="2" stroke={G} />
          <line x1="58" y1="214" x2="58" y2="219" />
          <line x1="142" y1="214" x2="142" y2="219" />
        </>
      );
    case "fridge-top":
      return (
        <>
          <rect x="62" y="24" width="76" height="190" rx="4" />
          <line x1="62" y1="80" x2="138" y2="80" />
          <line x1="128" y1="40" x2="128" y2="66" strokeWidth="2" />
          <line x1="128" y1="94" x2="128" y2="150" strokeWidth="2" stroke={G} />
          <line x1="68" y1="214" x2="68" y2="219" />
          <line x1="132" y1="214" x2="132" y2="219" />
        </>
      );
    case "fridge-single":
      return (
        <>
          <rect x="68" y="104" width="64" height="110" rx="4" />
          <line x1="122" y1="118" x2="122" y2="160" strokeWidth="2" stroke={G} />
          <rect x="76" y="112" width="38" height="18" rx="1" strokeDasharray="2 3" />
          <line x1="74" y1="214" x2="74" y2="219" />
          <line x1="126" y1="214" x2="126" y2="219" />
        </>
      );
    case "freezer":
      return (
        <>
          <rect x="30" y="138" width="140" height="76" rx="4" />
          <line x1="30" y1="154" x2="170" y2="154" />
          <line x1="84" y1="146" x2="116" y2="146" strokeWidth="2" stroke={G} />
          <line x1="44" y1="196" x2="64" y2="196" />
          <line x1="44" y1="202" x2="64" y2="202" />
        </>
      );
    case "ac-split":
      return (
        <>
          <rect x="22" y="92" width="156" height="50" rx="10" />
          <line x1="34" y1="130" x2="166" y2="130" />
          <line x1="34" y1="136" x2="166" y2="136" strokeOpacity="0.5" />
          <circle cx="152" cy="108" r="2" fill={G} stroke="none" />
          <path d="M60 156 q 40 14 80 0" stroke={G} strokeDasharray="2 4" />
          <path d="M50 172 q 50 18 100 0" stroke={G} strokeDasharray="2 4" strokeOpacity="0.6" />
          <path d="M42 188 q 58 22 116 0" stroke={G} strokeDasharray="2 4" strokeOpacity="0.3" />
        </>
      );
    case "ac-floor":
      return (
        <>
          <rect x="72" y="26" width="56" height="188" rx="10" />
          {[48, 56, 64, 72, 80, 88, 96, 104].map((y) => (
            <line key={y} x1="82" y1={y} x2="118" y2={y} strokeOpacity={0.4 + (y - 48) / 140} />
          ))}
          <rect x="88" y="124" width="24" height="10" rx="2" stroke={G} />
          <line x1="80" y1="200" x2="120" y2="200" strokeOpacity="0.5" />
        </>
      );
    case "washer-front":
      return (
        <>
          <rect x="44" y="52" width="112" height="162" rx="5" />
          <line x1="44" y1="80" x2="156" y2="80" />
          <circle cx="100" cy="145" r="42" />
          <circle cx="100" cy="145" r="32" stroke={G} />
          <circle cx="136" cy="66" r="5" />
          <line x1="56" y1="66" x2="84" y2="66" />
        </>
      );
    case "washer-top":
      return (
        <>
          <rect x="48" y="78" width="104" height="136" rx="5" />
          <rect x="48" y="58" width="104" height="22" rx="3" />
          <line x1="48" y1="104" x2="152" y2="104" />
          <circle cx="132" cy="69" r="4" stroke={G} />
          <line x1="60" y1="69" x2="100" y2="69" />
          <line x1="84" y1="92" x2="116" y2="92" strokeWidth="2" />
        </>
      );
    case "microwave":
      return (
        <>
          <rect x="26" y="104" width="148" height="88" rx="5" />
          <rect x="36" y="114" width="96" height="68" rx="3" />
          <line x1="142" y1="104" x2="142" y2="192" />
          <rect x="150" y="116" width="16" height="8" rx="1" stroke={G} />
          {[136, 148, 160, 172].map((y) => (
            <circle key={y} cx="158" cy={y} r="2" />
          ))}
        </>
      );
    case "air-fryer":
      return (
        <>
          <path d="M62 214 L62 108 Q62 80 100 80 Q138 80 138 108 L138 214 Z" />
          <rect x="70" y="150" width="60" height="56" rx="6" />
          <line x1="88" y1="178" x2="112" y2="178" strokeWidth="2" stroke={G} />
          <rect x="84" y="100" width="32" height="20" rx="3" />
        </>
      );
    case "dispenser":
      return (
        <>
          <rect x="78" y="36" width="44" height="66" rx="16" strokeOpacity="0.7" />
          <path d="M72 108 h56 v106 h-56 z" />
          <line x1="72" y1="108" x2="128" y2="108" />
          <rect x="84" y="128" width="32" height="26" rx="2" />
          <line x1="92" y1="154" x2="92" y2="160" stroke={G} strokeWidth="2" />
          <line x1="108" y1="154" x2="108" y2="160" strokeWidth="2" />
          <line x1="80" y1="176" x2="120" y2="176" strokeOpacity="0.5" />
        </>
      );
    case "vacuum":
      return (
        <>
          <line x1="122" y1="34" x2="98" y2="196" />
          <path d="M116 34 q 12 -8 20 4" />
          <rect x="104" y="58" width="26" height="54" rx="10" transform="rotate(8 117 85)" />
          <circle cx="118" cy="104" r="4" stroke={G} />
          <rect x="66" y="196" width="60" height="14" rx="4" />
        </>
      );
    case "tv":
      return (
        <>
          <rect x="16" y="64" width="168" height="100" rx="2" />
          <rect x="22" y="70" width="156" height="88" strokeOpacity="0.35" />
          <path d="M60 164 l -10 22 M140 164 l 10 22" />
          <line x1="40" y1="186" x2="62" y2="186" />
          <line x1="138" y1="186" x2="160" y2="186" />
          <line x1="96" y1="160" x2="104" y2="160" stroke={G} strokeWidth="1.5" />
        </>
      );
    case "soundbar":
      return (
        <>
          <rect x="18" y="160" width="128" height="24" rx="11" />
          {[34, 46, 58, 70, 82, 94, 106, 118, 130].map((x) => (
            <circle key={x} cx={x} cy="172" r="1.4" />
          ))}
          <rect x="152" y="118" width="34" height="96" rx="6" />
          <circle cx="169" cy="168" r="11" stroke={G} />
        </>
      );
    case "speaker":
      return (
        <>
          <rect x="50" y="128" width="100" height="62" rx="31" />
          <circle cx="80" cy="159" r="16" />
          <circle cx="120" cy="159" r="16" />
          <circle cx="80" cy="159" r="5" stroke={G} />
          <circle cx="120" cy="159" r="5" stroke={G} />
          <path d="M70 128 q 30 -18 60 0" />
        </>
      );
    case "smart-speaker":
      return (
        <>
          <rect x="74" y="106" width="52" height="108" rx="22" />
          <ellipse cx="100" cy="116" rx="18" ry="5" stroke={G} />
          {[140, 150, 160, 170, 180, 190].map((y) => (
            <line key={y} x1="82" y1={y} x2="118" y2={y} strokeOpacity="0.35" />
          ))}
        </>
      );
    case "scooter":
      return (
        <>
          <circle cx="52" cy="186" r="25" />
          <circle cx="52" cy="186" r="9" strokeOpacity="0.5" />
          <circle cx="152" cy="186" r="25" />
          <circle cx="152" cy="186" r="9" strokeOpacity="0.5" />
          <path d="M152 186 L140 96" />
          <path d="M128 92 L156 86" strokeWidth="2" />
          <path d="M141 104 q 10 4 14 -2" stroke={G} />
          <path d="M72 172 L126 172 L136 128" />
          <path d="M30 168 C 34 140, 52 128, 82 128 L 104 132 L 100 160 L 72 172" />
          <path d="M44 124 L 98 124" strokeWidth="3" strokeLinecap="round" />
          <path d="M26 186 a 26 26 0 0 1 8 -22" strokeOpacity="0.5" />
          <line x1="80" y1="146" x2="96" y2="146" stroke={G} />
        </>
      );
  }
}

export function ProductPlaceholder({
  shape,
  label,
  className,
  glow = true,
  strokeOpacity = 0.55,
}: {
  shape: ProductShape;
  label?: string;
  className?: string;
  glow?: boolean;
  strokeOpacity?: number;
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-stage", className)} aria-hidden="true">
      {glow && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 18% at 50% 88%, rgba(201,169,106,0.13), transparent 70%), radial-gradient(ellipse 70% 55% at 50% 38%, color-mix(in srgb, var(--fg) 5%, transparent), transparent 70%)",
          }}
        />
      )}
      <svg
        viewBox="0 0 200 250"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full p-[9%]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "var(--fg)" }}
      >
        <g style={{ strokeOpacity }}>
          <Lines shape={shape} />
        </g>
        <ellipse cx="100" cy="221" rx="70" ry="2.5" fill="currentColor" stroke="none" opacity="0.06" />
      </svg>
      {label && <span className="absolute bottom-3 left-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-fg-muted/70">{label}</span>}
    </div>
  );
}
