import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { BlackAndWhiteButton } from "@/shared/ui";
import { Slider } from "./slider";
import { loadTranslations } from "./locales";

export function HeroSection() {
  useLoadNamespace("alumni", loadTranslations);
  const { t } = useTranslation("alumni");

  return (
    <>
      <Slider />
      <div className="mt-16 text-8xl font-bold text-center">
        {t("heroSection.title")}
      </div>
      <div className="flex flex-col gap-4 justify-center items-center mt-8">
        <p className="text-xl font-semibold">{t("heroSection.formTitle")}</p>
        <BlackAndWhiteButton color="white">
          {t("heroSection.fillForm")}
        </BlackAndWhiteButton>
      </div>
    </>
  );
}
