import { useRef } from "react";
import { useScrollDownAnimation, useLoadNamespace } from "@/shared/hooks";
import { useTranslation } from "react-i18next";
import { loadTranslations } from "../hero-section/locales";

const ACCENTS = ["#3b82f6", "#a855f7", "#ec4899", "#10b981"];

type StatItem = { value: string; label: string; accent: string };

function StatCard({ value, label, accent, delay }: { value: string; label: string; accent: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useScrollDownAnimation({ elementRef: ref });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-fluid-xs rounded-fluid-md border border-white/[0.13] bg-white/[0.065] p-fluid-lg text-center transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
        borderTopColor: accent,
        borderTopWidth: "2px",
      }}
    >
      <span className="text-fluid-4xl font-extrabold" style={{ color: accent }}>
        {value}
      </span>
      <span className="text-fluid-sm font-medium leading-snug text-gray-400">{label}</span>
    </div>
  );
}

export default function StatsSection({ className }: { className?: string }) {
  useLoadNamespace("history", loadTranslations);
  const { t } = useTranslation("history");

  const rawStats = t("stats.items", { returnObjects: true });
  const stats = (Array.isArray(rawStats) ? rawStats as Omit<StatItem, "accent">[] : []).map(
    (item, i) => ({ ...item, accent: ACCENTS[i] })
  );

  return (
    <section className={className}>
      <div className="container-base">
        <div className="grid grid-cols-2 gap-fluid-md lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
