import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useSectionSpy } from "./use-section-spy";
import { SECTION_IDS, scrollToSection } from "./section-ids";

const ICONS: Record<(typeof SECTION_IDS)[number], ReactNode> = {
  programs: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  team: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  history: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  contacts: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
};

export function Sidebar() {
  const activeSection = useSectionSpy();
  const { t } = useTranslation("department");

  const sections = SECTION_IDS.map((id) => ({
    id,
    label: t(`sections.${id}`),
    icon: ICONS[id],
  }));

  return (
    <aside className="hidden flex-shrink-0 self-start lg:sticky lg:top-24 lg:flex lg:w-64 xl:w-72">
      <div className="flex w-full flex-col gap-4">
        <div className="grad-border rounded-[18px] bg-surface p-4 backdrop-blur-xl">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
            {t("sidebar.heading_sections")}
          </p>
          <ul className="flex flex-col gap-1">
            {sections.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => scrollToSection(s.id)}
                    className={clsx(
                      "group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-[12px] px-3 py-2.5 text-left text-[14px] transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-br from-violet-500/[0.16] to-blue-500/[0.10] font-semibold text-primary"
                        : "text-subtle hover:bg-surface-md hover:text-primary/80"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-violet-500 to-blue-500" />
                    )}
                    <span
                      className={clsx(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-[0_4px_12px_rgba(166,132,255,0.35)]"
                          : "bg-white/[0.05] text-subtle group-hover:bg-white/[0.08] group-hover:text-primary/70"
                      )}
                    >
                      <svg
                        className="h-[15px] w-[15px]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {s.icon}
                      </svg>
                    </span>
                    <span className="flex-1">{s.label}</span>
                    <svg
                      className={clsx(
                        "h-4 w-4 shrink-0 transition-all duration-200",
                        isActive
                          ? "translate-x-0 text-violet-300 opacity-100"
                          : "-translate-x-1 text-subtle opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                      )}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
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
