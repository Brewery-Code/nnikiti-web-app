import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { PageTransition } from "@/widgets";
import { EntrantHero, EntrantCta, AdmissionContacts } from "./ui";
import { loadTranslations } from "./locales";
import { ProgramsSlider } from "./bachelor/programs-slider-section";
import { AdmissionSection } from "./bachelor/admission-section";

function BachelorPage() {
  useLoadNamespace("entrant", loadTranslations);
  const { t } = useTranslation("entrant");

  const rawStats = t("bachelor.stats", { returnObjects: true });
  const stats: { value: string; label: string }[] = Array.isArray(rawStats) ? rawStats : [];

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <EntrantHero
        eyebrow={t("bachelor.eyebrow")}
        title={t("bachelor.title")}
        gradientWord={t("bachelor.gradientWord")}
        description={t("bachelor.description")}
        imageSeed="/main/nuwm_1920x900.jpg"
        stats={stats}
      />

      <div>
        <ProgramsSlider />
        <AdmissionSection />
        <AdmissionContacts docsHref="https://nuwm.edu.ua/admission/bakalavrat/" />
        <EntrantCta
          title={t("bachelor.ctaTitle")}
          subtitle={t("bachelor.ctaSubtitle")}
          primaryLabel={t("bachelor.ctaPrimaryLabel")}
          primaryHref="https://nuwm.edu.ua/admission/kontakty-pryimalnoi-komisii/"
        />
      </div>
    </PageTransition>
  );
}

export const Component = BachelorPage;
