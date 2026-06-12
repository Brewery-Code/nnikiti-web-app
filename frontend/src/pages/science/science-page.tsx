import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { ACTIVITY_META, PAGE_HERO_IMAGE, type SciencePageKind } from "./model";
import { ScienceHero } from "./hero-section";
import { ActivitiesSection } from "./activities-section";

export function SciencePage({ kind }: { kind: SciencePageKind }) {
  const { t, i18n } = useTranslation("science");
  const loaded = useLoadNamespace("science", loadTranslations);

  const labels = useMemo(
    () => ({
      navPublications: t("common.navPublications"),
      navResearch: t("common.navResearch"),
      navConferences: t("common.navConferences"),
      navGrants: t("common.navGrants"),
      activities: t("common.activities"),
      results: t("common.results"),
      search: t("common.search"),
      searchPlaceholder: t("common.searchPlaceholder"),
      date: t("common.date"),
      theme: t("common.theme"),
      status: t("common.status"),
      all: t("common.all"),
      reset: t("common.reset"),
      location: t("common.location"),
      organizer: t("common.organizer"),
      noResultsTitle: t("common.noResultsTitle"),
      noResultsText: t("common.noResultsText"),
    }),
    [t, loaded]
  );

  const data = useMemo(() => {
    const heroImage = PAGE_HERO_IMAGE[kind];
    const pageKey = `pages.${kind}`;

    return {
      heroImage,
      eyebrow: t("common.heroEyebrow"),
      title: t(`${pageKey}.title`),
      gradientTitle: t(`${pageKey}.gradientTitle`),
      intro: t(`${pageKey}.intro`),
      activitiesTitle: t(`${pageKey}.activitiesTitle`),
      activitiesIntro: t(`${pageKey}.activitiesIntro`),
      activities: ACTIVITY_META[kind].map((activity, index) => {
        const itemKey = `${pageKey}.activities.${index}`;
        return {
          id: index + 1,
          title: t(`${itemKey}.title`),
          description: t(`${itemKey}.description`),
          author: t(`${itemKey}.author`),
          theme: t(`${itemKey}.theme`),
          location: t(`${itemKey}.location`),
          organizer: t(`${itemKey}.organizer`),
          tags: t(`${itemKey}.tags`).split("|"),
          status: activity.status,
          statusLabel: t(`common.statuses.${activity.status}`),
          date: activity.date,
        };
      }),
    };
  }, [kind, t, loaded]);

  if (!loaded) return null;

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <ScienceHero data={data} currentKind={kind} />
      <div>
        <ActivitiesSection data={data} labels={labels} dateLocale={i18n.language} />
      </div>
    </PageTransition>
  );
}
