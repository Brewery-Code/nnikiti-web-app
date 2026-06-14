import { useState } from "react";
import { Link } from "react-router-dom";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SMOOTH = `all 500ms ${EASE}`;

export type ProgramSpecCardData = {
  code: string;
  /** Specialty name */
  specialty: string;
  /** Educational program name (optional) */
  program?: string;
  /** Degree level label, e.g. "Бакалавр" / "Магістр" */
  degree?: string;
};

type ProgramSpecCardProps = {
  to: string;
  spec: ProgramSpecCardData;
  /** Prefix before the code, e.g. "Code:" */
  codeLabel: string;
  /** Caption above the educational program name */
  programLabel: string;
  /** Footer call-to-action text */
  ctaLabel: string;
};

export function ProgramSpecCard({ to, spec, codeLabel, programLabel, ctaLabel }: ProgramSpecCardProps) {
  const [h, setH] = useState(false);

  // Show the educational program name only when it adds information
  const showProgram = Boolean(spec.program) && spec.program !== spec.specialty;

  return (
    <Link
      to={to}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="spec-card grad-border relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl px-4 py-5 sm:rounded-[20px] sm:px-7 sm:py-7"
      style={{
        background: "var(--bg-surface)",
        transform: h ? "translateY(-6px)" : "translateY(0)",
        transition: SMOOTH,
      }}
    >
      {/* Radial spotlight glow */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "-40%",
          right: "-25%",
          width: "85%",
          height: "85%",
          background: "radial-gradient(circle, rgba(166,132,255,0.28) 0%, rgba(81,162,255,0.10) 40%, transparent 70%)",
          opacity: h ? 1 : 0.45,
          transition: SMOOTH,
          pointerEvents: "none",
        }}
      />

      {/* Header: code chip + degree badge */}
      <div className="relative z-[1] mb-5 flex items-center justify-between gap-3">
        <span
          className="font-display"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.04em",
            padding: "5px 12px",
            borderRadius: 999,
            color: h ? "#fff" : "var(--text-muted)",
            background: h ? "rgba(166,132,255,0.20)" : "rgba(255,255,255,0.05)",
            transition: SMOOTH,
          }}
        >
          {codeLabel} {spec.code}
        </span>

        {spec.degree && (
          <span
            className="font-display inline-block uppercase"
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.05em",
              padding: "5px 14px",
              borderRadius: 999,
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

      {/* Specialty name */}
      <h3
        className="font-display relative z-[1] font-extrabold uppercase"
        style={{
          fontSize: "clamp(1.05rem, 1.4vw, 1.45rem)",
          letterSpacing: "-0.01em",
          lineHeight: 1.22,
          marginBottom: 16,
          minHeight: "2.44em",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          color: h ? "transparent" : "var(--text-primary)",
          background: h ? "linear-gradient(100deg, #ffffff 0%, #d7c9ff 55%, #9fc6ff 100%)" : "none",
          WebkitBackgroundClip: h ? "text" : "border-box",
          backgroundClip: h ? "text" : "border-box",
          transition: SMOOTH,
        }}
      >
        {spec.specialty}
      </h3>

      {/* Educational program name */}
      {showProgram && (
        <div className="relative z-[1]" style={{ marginBottom: 4 }}>
          <div
            className="font-display uppercase"
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: h ? "#a78bfa" : "var(--text-subtle)",
              marginBottom: 5,
              transition: SMOOTH,
            }}
          >
            {programLabel}
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.4,
              fontWeight: 500,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              color: h ? "rgba(255,255,255,0.9)" : "var(--text-muted)",
              transition: SMOOTH,
            }}
          >
            {spec.program}
          </div>
        </div>
      )}

      {/* Spacer: grows to push footer down, but keeps a minimum gap above the divider */}
      <div aria-hidden style={{ flex: 1, minHeight: 28 }} />

      {/* Footer CTA */}
      <div
        className="relative z-[1] flex items-center justify-between gap-4 pt-6"
        style={{ borderTop: "1px solid var(--border-ui-sm)" }}
      >
        <span
          className="font-display uppercase"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: h ? "#fff" : "var(--text-muted)",
            transform: h ? "translateX(2px)" : "translateX(0)",
            transition: SMOOTH,
          }}
        >
          {ctaLabel}
        </span>
        <div
          className="flex flex-shrink-0 items-center justify-center"
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: h ? "linear-gradient(135deg, #a684ff, #51a2ff)" : "rgba(255,255,255,0.06)",
            color: h ? "#fff" : "var(--text-muted)",
            boxShadow: h ? "0 6px 20px rgba(139,92,246,0.45)" : "none",
            transform: h ? "translateX(4px)" : "translateX(0)",
            transition: SMOOTH,
            fontSize: 16,
          }}
        >
          →
        </div>
      </div>
    </Link>
  );
}
