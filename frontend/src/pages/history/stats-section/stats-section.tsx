import { useRef } from "react";
import { useScrollDownAnimation } from "@/shared/hooks";

const stats = [
  { value: "20+", label: "Років IT-освіти",                 accent: "#3b82f6" },
  { value: "3500+", label: "Випускників за 20 років",       accent: "#a855f7" },
  { value: "8+", label: "Спеціальностей у IT",              accent: "#ec4899" },
  { value: "95%", label: "Тривіальність трудевлаштування",  accent: "#10b981" },
];

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

