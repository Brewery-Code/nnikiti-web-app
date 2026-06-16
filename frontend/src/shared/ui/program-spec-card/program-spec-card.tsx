import { useState } from "react";
import { Link } from "react-router-dom";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SMOOTH = `all 500ms ${EASE}`;

export type ProgramSpecCardData = {
  code: string;
  specialty: string;
  program?: string;
  degree?: string;
};

type ProgramSpecCardProps = {
  to: string;
  spec: ProgramSpecCardData;
  programLabel: string;
  specialtyLabel: string;
  codeLabel: string;
};

export function ProgramSpecCard({ to, spec, programLabel, specialtyLabel }: ProgramSpecCardProps) {
  const [h, setH] = useState(false);

  const title = spec.program || spec.specialty;

  return (
    <Link
      to={to}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="spec-card grad-border group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl sm:rounded-[20px]"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Glow */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "-35%",
          right: "-20%",
          width: "80%",
          height: "80%",
          background: "radial-gradient(circle, rgba(166,132,255,0.22) 0%, rgba(81,162,255,0.08) 45%, transparent 70%)",
          opacity: h ? 1 : 0.35,
          transition: SMOOTH,
          pointerEvents: "none",
        }}
      />

      <div className="relative z-[1] flex flex-1 flex-col p-5 sm:p-6">
        {/* Top row: "Освітня програма" label + degree badge */}
        <div className="mb-5 flex items-center justify-between gap-2">
          <span
            className="font-display uppercase"
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: h ? "#a78bfa" : "var(--text-subtle)",
              transition: SMOOTH,
            }}
          >
            {programLabel}
          </span>

          {spec.degree && (
            <span
              className="font-display inline-block rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.05em]"
              style={{
                color: h ? "#fff" : "#a78bfa",
                border: "1px solid",
                borderColor: h ? "transparent" : "rgba(167,139,250,0.3)",
                background: h ? "linear-gradient(135deg, #a684ff, #51a2ff)" : "transparent",
                boxShadow: h ? "0 4px 14px rgba(139,92,246,0.35)" : "none",
                transition: SMOOTH,
              }}
            >
              {spec.degree}
            </span>
          )}
        </div>

        {/* Program name (big) */}
        <h3
          className="font-display relative z-[1] mb-auto font-extrabold uppercase"
          style={{
            fontSize: "clamp(1rem, 1.35vw, 1.35rem)",
            letterSpacing: "-0.01em",
            lineHeight: 1.22,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            color: h ? "transparent" : "var(--text-primary)",
            background: h ? "linear-gradient(100deg, #ffffff 0%, #d7c9ff 55%, #9fc6ff 100%)" : "none",
            WebkitBackgroundClip: h ? "text" : "border-box",
            backgroundClip: h ? "text" : "border-box",
            transition: SMOOTH,
          }}
        >
          {title}
        </h3>

        {/* Footer: specialty + arrow */}
        <div
          className="mt-5 flex items-end justify-between gap-3 pt-4"
          style={{ borderTop: "1px solid var(--border-ui-sm)" }}
        >
          <div className="min-w-0">
            <p
              className="font-display mb-1 uppercase"
              style={{
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: h ? "#a78bfa" : "var(--text-subtle)",
                transition: SMOOTH,
              }}
            >
              {specialtyLabel}
            </p>
            <div className="flex items-start gap-1.5">
              <span
                className="font-display mt-[1px] shrink-0 rounded-[5px] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.04em]"
                style={{
                  background: h ? "rgba(166,132,255,0.22)" : "rgba(255,255,255,0.06)",
                  color: h ? "#c4b5fd" : "var(--text-muted)",
                  transition: SMOOTH,
                }}
              >
                {spec.code}
              </span>
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  lineHeight: 1.35,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  color: h ? "rgba(255,255,255,0.85)" : "var(--text-muted)",
                  transition: SMOOTH,
                }}
              >
                {spec.specialty}
              </p>
            </div>
          </div>

          <div
            className="flex shrink-0 items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: h ? "linear-gradient(135deg, #a684ff, #51a2ff)" : "rgba(255,255,255,0.06)",
              color: h ? "#fff" : "var(--text-muted)",
              boxShadow: h ? "0 6px 20px rgba(139,92,246,0.45)" : "none",
              transform: h ? "translateX(3px)" : "translateX(0)",
              transition: SMOOTH,
              fontSize: 15,
            }}
          >
            →
          </div>
        </div>
      </div>
    </Link>
  );
}
