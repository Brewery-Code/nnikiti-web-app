import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/model/routes";
import { type SpecData } from "../model";

export function SpecCard({ spec }: { spec: SpecData }) {
  const [h, setH] = useState(false);
  const { t } = useTranslation("home");
  const to = spec.departmentId
    ? `/department/${spec.departmentId}?program_id=${spec.id}#curriculum`
    : ROUTES.BACHELOR;
  return (
    <Link
      to={to}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="spec-card grad-border flex h-full cursor-pointer flex-col rounded-2xl px-4 py-5 sm:rounded-[20px] sm:px-7 sm:py-7"
      style={{
        background: h
          ? "linear-gradient(135deg, rgba(166,132,255,0.10) 0%, rgba(81,162,255,0.08) 100%)"
          : "var(--bg-surface)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.02em",
          marginBottom: 14,
          color: "var(--text-subtle)",
          transition: "color 200ms",
        }}
      >
        {t("specialtiesSection.code")}{" "}
        <span style={{ color: h ? "#fff" : "var(--text-muted)" }}>{spec.code}</span>
      </div>

      <h3
        className="font-display font-extrabold uppercase"
        style={{
          fontSize: "clamp(1rem, 1.4vw, 1.4rem)",
          letterSpacing: "-0.01em",
          lineHeight: 1.25,
          marginBottom: 18,
          minHeight: "2.5em",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          color: h ? "#fff" : "var(--text-primary)",
          transition: "color 200ms",
        }}
      >
        {spec.name}
      </h3>

      <div className="mb-6 flex flex-col gap-2">
        {spec.levels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {spec.levels.map((level) => (
              <span
                key={level}
                className="font-display inline-block uppercase"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  padding: "5px 14px",
                  borderRadius: 999,
                  color: h ? "#c4b5fd" : "#a78bfa",
                  border: "1px solid",
                  borderColor: h ? "rgba(196,181,253,0.4)" : "rgba(167,139,250,0.3)",
                  background: "transparent",
                  transition: "color 200ms, border-color 200ms",
                }}
              >
                {level}
              </span>
            ))}
          </div>
        )}
        {spec.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {spec.tags.map((tag) => (
              <span
                key={tag}
                className="font-display inline-block uppercase"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  padding: "6px 16px",
                  borderRadius: 999,
                  color: "#fff",
                  background: "linear-gradient(135deg, #a684ff 0%, #51a2ff 100%)",
                  boxShadow: "0 4px 14px rgba(166,132,255,0.25)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 pt-4">
        <div className="flex gap-5">
          {spec.budget > 0 && (
            <div>
              <div className="font-display font-extrabold" style={{ fontSize: "1rem" }}>{spec.budget}</div>
              <div style={{ fontSize: 9, color: "var(--text-subtle)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {t("specialtiesSection.budget")}
              </div>
            </div>
          )}
          {spec.contract > 0 && (
            <div>
              <div className="font-display font-extrabold" style={{ fontSize: "1rem" }}>{spec.contract}</div>
              <div style={{ fontSize: 9, color: "var(--text-subtle)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {t("specialtiesSection.contract")}
              </div>
            </div>
          )}
        </div>
        <div
          className="flex flex-shrink-0 items-center justify-center"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: h ? "linear-gradient(135deg, #a684ff, #51a2ff)" : "rgba(255,255,255,0.06)",
            color: h ? "#fff" : "var(--text-muted)",
            transition: "all 200ms",
            fontSize: 16,
          }}
        >
          ↗
        </div>
      </div>
    </Link>
  );
}
