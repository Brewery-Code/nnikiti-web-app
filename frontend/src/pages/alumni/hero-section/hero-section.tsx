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
    <div className="flex flex-col">
      <Slider className="mt-8" />
      <div className="container-base mt-16 text-3xl sm:text-6xl xl:text-8xl font-bold text-center uppercase">
        {t("heroSection.title")} <br />
        та наша гордість
      </div>
      <div className="container-base flex flex-col gap-4 justify-center items-center mt-4 sm:mt-8 lg:mt-12">
        <p className="text-base sm:text-xl font-semibold text-center">
          {t("heroSection.formTitle")}
        </p>
        <BlackAndWhiteButton color="white">
          {t("heroSection.fillForm")}
        </BlackAndWhiteButton>
      </div>
      <div className="grow flex justify-center items-center mt-12 sm:mt-20">
        <Arrow className="animate-bounce" />
      </div>
    </div>
  );
}
