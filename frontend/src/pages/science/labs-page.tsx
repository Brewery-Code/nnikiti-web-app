import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { PAGE_HERO_IMAGE } from "./model";
import { ScienceHero } from "./hero-section";
import { LabsSection } from "./labs-section";

function LabsPage() {
  const { t } = useTranslation("science");
  const loaded = useLoadNamespace("science", loadTranslations);

  const heroData = useMemo(
    () => ({
      heroImage: PAGE_HERO_IMAGE["labs"],
      eyebrow: t("common.heroEyebrow"),
      title: t("pages.labs.title"),
      gradientTitle: t("pages.labs.gradientTitle"),
      intro: t("pages.labs.intro"),
      activitiesTitle: "",
      activitiesIntro: "",
      activities: [],
    }),
    [t, loaded]
  );

  if (!loaded) return null;

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <ScienceHero data={heroData} currentKind="labs" customNav={<></>} />
      <LabsSection />
    </PageTransition>
  );
}

export const Component = LabsPage;
