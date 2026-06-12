import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { PageTransition } from "@/widgets";
import { EntrantHero, EntrantCta } from "./ui";
import { loadTranslations } from "./locales";
import { ProgramsSlider } from "./master/programs-slider-section";
import { AdmissionSection } from "./master/admission-section";
import { TracksSection } from "./master/tracks-section";

function MasterPage() {
  useLoadNamespace("entrant", loadTranslations);
  const { t } = useTranslation("entrant");

  const rawStats = t("master.stats", { returnObjects: true });
  const stats: { value: string; label: string }[] = Array.isArray(rawStats) ? rawStats : [];

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <EntrantHero
        eyebrow={t("master.eyebrow")}
        title={t("master.title")}
        gradientWord={t("master.gradientWord")}
        description={t("master.description")}
        imageSeed="/images/students-workshop.jpg"
        stats={stats}
      />

      <div>
        <ProgramsSlider />
        <AdmissionSection />
        <TracksSection />
        <EntrantCta
          title={t("master.ctaTitle")}
          subtitle={t("master.ctaSubtitle")}
          primaryLabel={t("master.ctaPrimaryLabel")}
        />
      </div>
    </PageTransition>
  );
}

export const Component = MasterPage;
