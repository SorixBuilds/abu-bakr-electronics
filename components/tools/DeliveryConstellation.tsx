"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { cities, origin, type City } from "@/content/cities";
import { arcPath, project } from "@/lib/projection";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/**
 * §6.8 / §20.7 — abstract city constellation (deliberately no country outline).
 * Routes draw from Lahore on enter; a light packet travels each arc once.
 */
export function DeliveryConstellation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const mobile = useIsMobile();
  const reduced = useReducedMotionSafe();
  const [hover, setHover] = useState<string | null>(null);

  const list = mobile ? cities.filter((c) => c.major) : cities;
  const o = project(origin.lat, origin.lon);
  // Mobile uses a 4:5 viewBox crop around the points
  const vb = mobile ? "60 40 880 1100" : "0 0 1000 1000";
  const fs = mobile ? 26 : 19;

  const tip = (c: City) => (c.name === origin.name ? "Lahore · Free delivery" : `${c.name} · Delivery available — ask for timeline`);
  const hovered = hover ? (hover === origin.name ? origin : list.find((c) => c.name === hover)) : null;
  const hp = hovered ? project(hovered.lat, hovered.lon) : null;

  return (
    <div className="relative">
      <svg ref={ref} viewBox={vb} className="h-auto w-full" role="img" aria-label="Delivery from Lahore to cities across Pakistan">
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(21,18,20,0.15)" />
          </pattern>
          <radialGradient id="lahore-glow">
            <stop offset="0" stopColor="rgba(232,52,78,0.28)" />
            <stop offset="1" stopColor="rgba(232,52,78,0)" />
          </radialGradient>
        </defs>
        <rect x="-200" y="-200" width="1400" height="1600" fill="url(#dots)" />

        {/* routes */}
        {list.map((c, i) => {
          const p = project(c.lat, c.lon);
          const d = arcPath(o, p);
          const delay = 0.2 + i * 0.12;
          return (
            <g key={c.name}>
              <motion.path
                d={d}
                fill="none"
                stroke="rgba(200,16,46,0.7)"
                strokeWidth={mobile ? 1.6 : 1}
                initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
                transition={{ pathLength: { duration: 1.2, ease: [0.65, 0, 0.35, 1], delay }, opacity: { duration: 0.2, delay } }}
              />
              {!reduced && inView && (
                <circle
                  r={mobile ? 4.5 : 3}
                  fill="#C8102E"
                  style={
                    {
                      offsetPath: `path("${d}")`,
                      offsetRotate: "0deg",
                      animation: `packet 1.2s cubic-bezier(0.65,0,0.35,1) ${delay + 0.9}s 1 both`,
                    } as React.CSSProperties
                  }
                />
              )}
            </g>
          );
        })}

        {/* city nodes */}
        {list.map((c, i) => {
          const p = project(c.lat, c.lon);
          const end = c.anchor === "end";
          return (
            <motion.g
              key={c.name}
              initial={{ opacity: reduced ? 1 : 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ delay: 0.2 + i * 0.12 + 1, duration: 0.5 }}
              onMouseEnter={() => setHover(c.name)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(c.name)}
              onBlur={() => setHover(null)}
              onClick={() => setHover((h) => (h === c.name ? null : c.name))}
              tabIndex={0}
              role="button"
              aria-label={tip(c)}
              className="cursor-pointer outline-none"
            >
              <circle cx={p.x} cy={p.y} r={mobile ? 22 : 16} fill="transparent" />
              <circle cx={p.x} cy={p.y} r={mobile ? 5 : 3.5} fill="#151214" opacity={hover === c.name ? 1 : 0.75} />
              <text
                x={p.x + (end ? -12 : 12)}
                y={p.y + fs * 0.35 + (mobile ? 0 : (c.dy ?? 0))}
                textAnchor={end ? "end" : "start"}
                fontSize={fs}
                fontFamily="var(--font-inter-tight), sans-serif"
                letterSpacing="0.06em" fontWeight={600}
                fill={hover === c.name ? "#151214" : "#3B3538"}
              >
                {c.name.toUpperCase()}
              </text>
            </motion.g>
          );
        })}

        {/* Lahore origin */}
        <g
          onMouseEnter={() => setHover(origin.name)}
          onMouseLeave={() => setHover(null)}
          onFocus={() => setHover(origin.name)}
          onBlur={() => setHover(null)}
          tabIndex={0}
          role="button"
          aria-label={tip(origin)}
          className="cursor-pointer outline-none"
        >
          <circle cx={o.x} cy={o.y} r="60" fill="url(#lahore-glow)" />
          {!reduced && (
            <circle
              cx={o.x}
              cy={o.y}
              r="9"
              fill="none"
              stroke="var(--cherry-hi)"
              strokeWidth="1"
              style={{ transformOrigin: `${o.x}px ${o.y}px`, animation: "halo 2.8s ease-out infinite" }}
            />
          )}
          <circle cx={o.x} cy={o.y} r={mobile ? 10 : 8} fill="var(--cherry-hi)" />
          <text
            x={o.x + 18}
            y={o.y + 34}
            fontSize={fs + 3}
            fontFamily="var(--font-inter-tight), sans-serif"
            letterSpacing="0.1em"
            fill="var(--cherry)"
            fontWeight={700}
          >
            LAHORE
          </text>
        </g>
      </svg>

      {hovered && hp && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+14px)] whitespace-nowrap rounded-full bg-ink px-3.5 py-2 text-[13px] text-white shadow-card"
          style={{ left: `${mobile ? ((hp.x - 60) / 880) * 100 : hp.x / 10}%`, top: `${mobile ? ((hp.y - 40) / 1100) * 100 : hp.y / 10}%` }}
          role="tooltip"
        >
          {tip(hovered)}
        </div>
      )}
    </div>
  );
}
