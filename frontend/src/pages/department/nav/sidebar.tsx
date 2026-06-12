import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useSectionSpy } from "./use-section-spy";
import { SECTION_IDS, scrollToSection } from "./section-ids";

export function Sidebar({
  departments,
  currentId,
}: {
  departments: { id: number; name: string }[];
  currentId: string;
}) {
  const activeSection = useSectionSpy();
  const { t } = useTranslation("department");

  const sections = SECTION_IDS.map((id) => ({
    id,
    label: t(`sections.${id}`),
  }));

  return (
    <aside className="hidden flex-shrink-0 self-start lg:sticky lg:top-24 lg:flex lg:w-64 xl:w-72">
      <div className="flex w-full flex-col gap-4">
        <div className="grad-border rounded-[18px] bg-surface p-4 backdrop-blur-xl">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
            {t("sidebar.heading_depts")}
          </p>
          <ul className="flex flex-col gap-0.5">
            {departments.map((dept) => {
              const isActive = String(dept.id) === currentId;
              return (
                <li key={dept.id}>
                  <Link
                    to={`/department/${dept.id}`}
                    className={clsx(
                      "group relative flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-br from-violet-500/[0.15] to-blue-500/[0.10] font-semibold text-primary"
                        : "text-subtle hover:bg-surface-md hover:text-primary/80"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-violet-500 to-blue-500" />
                    )}
                    <span
                      className={clsx(
                        "h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all",
                        isActive
                          ? "bg-violet-400"
                          : "bg-white/15 group-hover:bg-white/40"
                      )}
                    />
                    <span className="leading-snug">{dept.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grad-border rounded-[18px] bg-surface p-4 backdrop-blur-xl">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
            {t("sidebar.heading_sections")}
          </p>
          <ul className="flex flex-col gap-0.5">
            {sections.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => scrollToSection(s.id)}
                    className={clsx(
                      "group relative flex w-full cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[14px] transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-br from-violet-500/[0.15] to-blue-500/[0.10] font-semibold text-primary"
                        : "text-subtle hover:bg-surface-md hover:text-primary/80"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-violet-500 to-blue-500" />
                    )}
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
