import { useLoadNamespace, useScrollDownAnimation } from "@/shared/hooks";
import { SpecialtiesCard, Title } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { loadTranslations } from "./locales";
import { useRef } from "react";

export default function SpecialtiesSection({ className = "" }: { className?: string }) {
  useLoadNamespace("home", loadTranslations);
  const { t } = useTranslation("home");

  const blockRef = useRef<HTMLDivElement>(null);
  useScrollDownAnimation({ elementRef: blockRef });

  return (
    <div className={className} ref={blockRef}>
      <Title className="container-base !mb-0">{t("specialties.title")}</Title>
      <div className="scrollbar-hidden -mt-2 -mb-10 flex justify-between gap-6 overflow-x-scroll px-8 py-10">
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
        <SpecialtiesCard className="shrink-0 transition-all duration-300 ease-in-out hover:-translate-y-6 hover:scale-105" />
      </div>
    </div>
  );
}
