import { useEffect, useState } from "react";

// ─── Circuit board hero background ───────────────────────────────────────────
// Topology: IC_A(1080,360) ↔ IC_B(1320,180) ↔ IC_C(960,540) ↔ IC_D(840,720)
// IC_E(240,270) is a sparse left-side cluster; all traces connect logically.
export function CircuitBackground() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Double rAF — ensures animations start after first paint is fully committed
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const primary = [
    "M  900 165 H 1380 V 330 H 1440",  // main right horizontal → spine
    "M 1080 480 V 330 H 1260",          // inner rectangle connector
  ];

  const secondary = [
    // Top rail — extended left into center
    "M  360  45 H  660",                // top rail left extension
    "M  360  45 V   0",                 // top exit at x=360
    "M  660  45 H 1140",                // top rail right portion
    "M  660  45 V   0",                 // top exit at x=660
    "M 1140  45 V 210 H 1380 V 330",    // top-right descent
    "M  900 165 V   0",                 // main rail top exit
    // Right side
    "M 1440 120 H 1260 V 210 H 1440",   // right-edge notch
    "M 1260 330 V 480 H 1440",          // lower-right branch
    "M  900 480 H 1440",                // bottom-right horizontal
    "M  900 480 V 630 H 1440",          // bottom exit
    // Center vertical connector
    "M  660  45 V 210",                 // center drop from top rail
    "M  480 390 V 210 H 660",           // center L → joins vertical
    "M  480 390 H   0",                 // center horizontal to left edge
    // Left side
    "M    0 165 H 360 V  45",           // left staircase → top rail
    "M    0 315 H 240",                 // left mid stub
    "M    0 510 H 180",                 // left lower stub
  ];

  const signals = [
    { d: "M 360 45 H 1140 V 210 H 1380 V 330 H 1440", dur: 16, delay: 0 },
    { d: "M 900 165 H 1380 V 330 H 1440",              dur: 9,  delay: 1 },
    { d: "M 1080 480 V 330 H 1260 V 480 H 1440",       dur: 8,  delay: 3 },
    { d: "M 1440 120 H 1260 V 210 H 1440",             dur: 4,  delay: 6 },
    { d: "M 900 480 V 630 H 1440",                     dur: 6,  delay: 4 },
    { d: "M 0 390 H 480 V 210 H 660 V 45",             dur: 10, delay: 2 },
    { d: "M 0 165 H 360 V 45 H 660",                   dur: 7,  delay: 5 },
  ];

  const vias = [
    // Top rail
    { cx:  360, cy:  45 }, { cx:  660, cy:  45 }, { cx: 1140, cy:  45 },
    // Center junction
    { cx:  660, cy: 210 }, { cx:  480, cy: 210 }, { cx:  480, cy: 390 },
    // Right cluster
    { cx: 1140, cy: 210 }, { cx: 1380, cy: 210 },
    { cx: 1380, cy: 330 }, { cx:  900, cy: 165 },
    { cx: 1080, cy: 330 }, { cx: 1260, cy: 330 },
    { cx: 1080, cy: 480 }, { cx: 1260, cy: 480 }, { cx: 900, cy: 480 },
    // Left side
    { cx:  360, cy: 165 }, { cx:  240, cy: 315 }, { cx: 180, cy: 510 },
  ];

  const corners = [
    { cx: 1260, cy: 120 }, { cx: 1260, cy: 210 },
    { cx: 1380, cy: 165 },
    { cx:  900, cy: 630 },
    { cx:  360, cy: 165 },
  ];

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="cb-fade-y" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="1" />
          <stop offset="55%"  stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="cb-mask">
          <rect width="1440" height="900" fill="url(#cb-fade-y)" />
        </mask>
      </defs>
      <style>{`
        @keyframes cb-signal {
          0%   { stroke-dashoffset: 2600; opacity: 0; }
          6%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes cb-via { 0%,100% { opacity: 0.38; } 50% { opacity: 0.85; } }
        @keyframes cb-dot { 0%,100% { opacity: 0.28; } 50% { opacity: 0.65; } }
      `}</style>

      <g mask="url(#cb-mask)">
        {/* Secondary traces — dim background wiring */}
        <g stroke="rgba(139,92,246,0.11)" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
          {secondary.map((d, i) => <path key={i} d={d} />)}
        </g>

        {/* Primary traces — main data buses */}
        <g stroke="rgba(139,92,246,0.26)" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="miter">
          {primary.map((d, i) => <path key={i} d={d} />)}
        </g>

        {/* Animated signals */}
        {signals.map((s, i) => (
          <path
            key={i} d={s.d}
            stroke="rgba(196,172,255,0.9)" strokeWidth="1.5"
            strokeLinecap="round" strokeDasharray="42 2600"
            style={ready ? {
              animation: `cb-signal ${s.dur}s linear infinite ${s.delay}s`,
              animationFillMode: "backwards",
            } : { opacity: 0 }}
          />
        ))}

        {/* Corner dots */}
        {corners.map((n, i) => (
          <circle key={i} cx={n.cx} cy={n.cy} r="2"
            fill="rgba(139,92,246,0.45)"
            style={ready ? { animation: `cb-dot ${2.8 + (i % 4) * 0.6}s ease-in-out infinite ${i * 0.28}s` } : undefined}
          />
        ))}

        {/* Vias */}
        {vias.map((v, i) => (
          <g key={i} style={ready ? { animation: `cb-via ${3.5 + i * 0.7}s ease-in-out infinite ${i * 0.6}s` } : undefined}>
            <circle cx={v.cx} cy={v.cy} r="5.5"
              fill="rgba(7,8,14,0.96)" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" />
            <circle cx={v.cx} cy={v.cy} r="2.2" fill="rgba(167,139,250,0.75)" />
          </g>
        ))}
      </g>
    </svg>
  );
}
