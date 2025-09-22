import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { BlackAndWhiteButton } from "@/shared/ui";
import { Slider } from "./ui/slider/slider";
import { loadTranslations } from "./locales";
import { Arrow } from "@/pages/home/hero-section/icons";
import { useEffect, useState } from "react";
import { NewAlumniModalForm } from "./ui";

export function HeroSection() {
  useLoadNamespace("alumni", loadTranslations);
  const { t } = useTranslation("alumni");

  const [isNewAlumniFormOpen, setIsNewAlumniFormOpen] = useState(false);
  function toggleAlumniForm() {
    setIsNewAlumniFormOpen((prev) => !prev);
  }

  return (
    <div className="flex flex-col">
      <Slider className="mt-8" />
      <div className="container-base mt-16 text-center text-3xl font-bold uppercase sm:text-6xl xl:text-8xl">
        {t("heroSection.title")} <br />
        та наша гордість
      </div>
      <div className="container-base mt-4 flex flex-col items-center justify-center gap-4 sm:mt-8 lg:mt-12">
        <p className="text-center text-base font-semibold sm:text-xl">
          {t("heroSection.formTitle")}
        </p>
        <BlackAndWhiteButton color="white" onClick={toggleAlumniForm}>
          {t("heroSection.fillForm")}
          <NewAlumniModalForm isFormOpen={isNewAlumniFormOpen} toggleForm={toggleAlumniForm} />
        </BlackAndWhiteButton>
      </div>
      <div className="mt-12 flex grow items-center justify-center sm:mt-20">
        <Arrow className="animate-bounce" />
      </div>
    </div>
  );
}
