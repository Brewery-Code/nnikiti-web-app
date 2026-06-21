import { useState } from "react";
import clsx from "clsx";
import { Reveal } from "@/shared/ui";

const PARTNERS = [
  "SoftServe",
  "EPAM",
  "42 Agency",
  "GlobalLogic",
  "Intellias",
  "Ciklum",
  "DataArt",
  "N-iX",
  "Sigma Software",
  "Luxoft",
  "Wargaming",
  "Playtika",
];

// One copy of PARTNERS (~1760px) is narrower than wide/ultrawide viewports, so
// a single duplication leaves a gap before the loop resets. We build the track
// as two identical halves (each = PARTNERS twice ≈ 3500px) so translateX(-50%)
// always lands exactly on the second half — seamless on any screen width.
const MARQUEE_HALF = [...PARTNERS, ...PARTNERS];
const MARQUEE_ITEMS = [...MARQUEE_HALF, ...MARQUEE_HALF];

function PartnerLogo({ name }: { name: string }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className={clsx(
        // mr-3 instead of a track gap so the duplicated set tiles seamlessly
        // (translateX(-50%) lands exactly on the second copy → no half-step jump)
        "mr-3 cursor-pointer flex-shrink-0 rounded-xl px-6 py-3 sm:rounded-[14px]",
        h && "grad-border"
      )}
      style={{
        background: h ? "rgba(166,132,255,0.08)" : "rgba(255,255,255,0.04)",
        border: h ? "none" : "1px solid rgba(255,255,255,0.08)",
        transition: "background 200ms, border-color 200ms",
      }}
    >
      <span
        className="font-display whitespace-nowrap"
        style={{
          fontWeight: 700,
          fontSize: 14,
          color: h ? "#fff" : "rgba(255,255,255,0.3)",
          transition: "color 200ms",
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default function PartnersSection({ className = "" }: { className?: string }) {
  return (
    <section
      className={clsx(
        "relative overflow-hidden border-y border-violet-500/[0.08] py-12 lg:py-[72px]",
        className
      )}
      style={{
        background: "linear-gradient(135deg, rgba(166,132,255,0.05) 0%, rgba(81,162,255,0.05) 100%)",
        borderTopColor: "rgba(166,132,255,0.08)",
        borderBottomColor: "rgba(81,162,255,0.08)",
      }}
    >
      <div className="container-v2">
        <Reveal mode="up" className="mb-8 text-center lg:mb-11">
          <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/55">
            Наші партнери
          </div>
          <h2
            className="font-display font-black text-white"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Понад <span className="text-grad">40 компаній</span>
          </h2>
        </Reveal>
      </div>

      {/* Infinite marquee — full bleed, faded edges */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="marquee-track py-1">
          {MARQUEE_ITEMS.map((name, i) => (
            <PartnerLogo key={i} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
