import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { PAGE_HERO_IMAGE, PROPOSITIONS_META, type PartnersPageKind } from "./model";
import { PartnersHero } from "./hero-section";
import { PropositionsSection } from "./propositions-section";

export function PartnersPage({ kind }: { kind: PartnersPageKind }) {
  const { t, i18n } = useTranslation("partners");
  const loaded = useLoadNamespace("partners", loadTranslations);

  const labels = useMemo(
    () => ({
      instituteName: t("common.instituteName"),
      navAcademic: t("common.navAcademic"),
      navBusiness: t("common.navBusiness"),
      heroEyebrow: t("common.heroEyebrow"),
      sectionEyebrow: t("common.sectionEyebrow"),
      sectionTitle: t("common.sectionTitle"),
      sectionIntro: t("common.sectionIntro"),
      results: t("common.results"),
      search: t("common.search"),
      searchPlaceholder: t("common.searchPlaceholder"),
      direction: t("common.direction"),
      type: t("common.type"),
      all: t("common.all"),
      reset: t("common.reset"),
      neededSkills: t("common.neededSkills"),
      deadline: t("common.deadline"),
      moreInfo: t("common.moreInfo"),
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
      title: t(`${pageKey}.title`),
      gradientTitle: t(`${pageKey}.gradientTitle`),
      intro: t(`${pageKey}.intro`),
      propositions: PROPOSITIONS_META[kind].map((proposition, index) => {
        const itemKey = `${pageKey}.propositions.${index}`;
        return {
          id: index + 1,
          partner: t(`${itemKey}.partner`),
          name: t(`${itemKey}.name`),
          description: t(`${itemKey}.description`),
          type: t(`${itemKey}.type`),
          direction: t(`${itemKey}.direction`),
          format: t(`${itemKey}.format`),
          skills: t(`${itemKey}.skills`).split("|"),
          deadline: proposition.deadline,
          link: proposition.link,
        };
      }),
    };
  }, [kind, t, loaded]);

  if (!loaded) return null;

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <PartnersHero data={data} labels={labels} currentKind={kind} />
      <div>
        <PropositionsSection data={data} labels={labels} dateLocale={i18n.language} />
      </div>
    </PageTransition>
  );
}
