import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { PAGE_HERO_IMAGE } from "./model";
import { ScienceHero } from "./hero-section";
import { ResearchDeptSection, DEPARTMENTS, type DeptSlug } from "./research-dept-section";

function ResearchPage() {
  const { t } = useTranslation("science");
  const loaded = useLoadNamespace("science", loadTranslations);
  const [activeDept, setActiveDept] = useState<DeptSlug>(DEPARTMENTS[0].slug);

  const heroData = useMemo(
    () => ({
      heroImage: PAGE_HERO_IMAGE["research"],
      eyebrow: t("common.heroEyebrow"),
      title: t("pages.research.title"),
      gradientTitle: t("pages.research.gradientTitle"),
      intro: t("pages.research.intro"),
      activitiesTitle: "",
      activitiesIntro: "",
      activities: [],
    }),
    [t, loaded]
  );

  const deptTabs = (
    <div className="flex flex-wrap gap-2">
      {DEPARTMENTS.map((dept) => (
        <button
          key={dept.slug}
          type="button"
          onClick={() => setActiveDept(dept.slug)}
          className={clsx(
            "flex-shrink-0 whitespace-nowrap rounded-[12px] px-5 py-2.5 text-[14px] font-semibold transition-all duration-200",
            activeDept === dept.slug
              ? "bg-gradient-to-r from-violet-500 to-blue-500 text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)]"
              : "grad-border bg-surface-md text-primary/60 backdrop-blur-md hover:bg-surface-xl hover:text-primary"
          )}
        >
          {dept.name}
        </button>
      ))}
    </div>
  );

  if (!loaded) return null;

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <ScienceHero data={heroData} currentKind="research" customNav={deptTabs} />
      <ResearchDeptSection activeDept={activeDept} />
    </PageTransition>
  );
}

export const Component = ResearchPage;
