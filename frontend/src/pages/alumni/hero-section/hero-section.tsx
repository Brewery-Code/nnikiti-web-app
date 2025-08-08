import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { BlackAndWhiteButton } from "@/shared/ui";
import { Slider } from "./ui/slider/slider";
import { loadTranslations } from "./locales";
import { Arrow } from "@/pages/home/hero-section/icons";

export function HeroSection() {
  useLoadNamespace("alumni", loadTranslations);
  const { t } = useTranslation("alumni");

  return (
    <div className="flex flex-col h-dvh max-h-210 min-h-200">
      <Slider className="mt-8" />
      <div className="mt-16 text-8xl font-bold text-center uppercase">
        {t("heroSection.title")} <br />
        та наша гордість
      </div>
      <div className="flex flex-col gap-4 justify-center items-center mt-12">
        <p className="text-xl font-semibold ">{t("heroSection.formTitle")}</p>
        <BlackAndWhiteButton color="white">
          {t("heroSection.fillForm")}
        </BlackAndWhiteButton>
      </div>
      <div className="grow flex justify-center items-center mt-6">
        <Arrow className="animate-bounce" />
      </div>
    </div>
  );
}
