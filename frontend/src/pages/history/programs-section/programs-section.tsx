import { useRef } from "react";
import { useScrollDownAnimation } from "@/shared/hooks";
import clsx from "clsx";

const programs = [
  {
    title: "Комп'ютерні науки",
    description: "Основи програмування, алгоритми, структури даних, архітектура комп'ютерів",
    icon: "💻",
    color: "#3b82f6",
  },
  {
    title: "Кібербезпека",
    description: "Захист від загроз, криптографія, аналіз вразливостей, етичний хакінг",
    icon: "🔐",
    color: "#ef4444",
  },
  {
    title: "AI & Machine Learning",
    description: "Штучний інтелект, нейронні мережі, обробка даних, розпізнавання образів",
    icon: "🤖",
    color: "#8b5cf6",
  },
  {
    title: "Cloud & DevOps",
    description: "Хмарні платформи, контейнеризація, CI/CD, інфраструктура як код",
    icon: "☁️",
    color: "#06b6d4",
  },
  {
    title: "Web & Mobile",
    description: "Розробка веб-додатків, мобільні платформи, фронтенд, бекенд технології",
    icon: "📱",
    color: "#10b981",
  },
  {
    title: "Комп'ютерна економіка",
    description: "Цифровий бізнес, стартапи, підприємництво, управління IT-проектами",
    icon: "📊",
    color: "#f59e0b",
  },
];

function ProgramCard({
  program,
  delay,
}: {
  program: (typeof programs)[0];
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
            Напрями підготовки
          </p>
          <h2 className="text-fluid-4xl font-bold text-primary">
            Спеціальності{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ННІКІТІ
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

