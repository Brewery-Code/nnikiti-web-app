import { useRef } from "react";
import { useScrollDownAnimation, useLoadNamespace } from "@/shared/hooks";
import { useTranslation } from "react-i18next";
import { loadTranslations } from "../hero-section/locales";
import clsx from "clsx";

const ICONS = ["💻", "🔐", "🤖", "☁️", "📱", "📊"];
const COLORS = ["#3b82f6", "#ef4444", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

type ProgramItem = { title: string; description: string; icon: string; color: string };

function ProgramCard({
  program,
  delay,
}: {
  program: ProgramItem;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useScrollDownAnimation({ elementRef: ref });

  return (
    <div
      ref={ref}
      className={clsx(
        "rounded-fluid-md border border-white/[0.13] bg-white/[0.065] p-fluid-md transition-all duration-700 backdrop-blur-sm hover:border-white/[0.23] hover:bg-surface-xl",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-4xl mb-fluid-xs">{program.icon}</div>
      <h3 className="text-fluid-lg font-bold text-primary mb-fluid-xs">
        {program.title}
      </h3>
      <p className="text-fluid-sm text-gray-400 leading-relaxed">
        {program.description}
      </p>
      <div
        className="mt-fluid-md h-0.5 w-12"
        style={{ background: program.color }}
      />
    </div>
  );
}

export default function ProgramsSection({ className }: { className?: string }) {
  useLoadNamespace("history", loadTranslations);
  const { t } = useTranslation("history");

  const rawPrograms = t("programs.items", { returnObjects: true });
  const programs = (Array.isArray(rawPrograms) ? rawPrograms as Omit<ProgramItem, "icon" | "color">[] : []).map(
    (item, i) => ({ ...item, icon: ICONS[i], color: COLORS[i] })
  );

  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleVisible = useScrollDownAnimation({ elementRef: titleRef });

  return (
    <section className={className}>
      <div className="container-base">
        {/* Section title */}
        <div
          ref={titleRef}
          className={clsx(
            "mb-content-title transition-all duration-700",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <p className="mb-fluid-xs text-fluid-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            {t("programs.eyebrow")}
          </p>
          <h2 className="text-fluid-4xl font-bold text-primary">
            {t("programs.heading")}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t("programs.headingAccent")}
            </span>
          </h2>
        </div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 gap-fluid-md sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <ProgramCard key={i} program={program} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
