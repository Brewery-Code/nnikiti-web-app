import { useLoadNamespace, useScrollDownAnimation } from "@/shared/hooks";
import { SpecialtiesCard, Title } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { loadTranslations } from "./locales";
import { useRef } from "react";

export default function SpecialtiesSection({
  className = "",
}: {
  className?: string;
}) {
  useLoadNamespace("home", loadTranslations);
  const { t } = useTranslation("home");

  const blockRef = useRef<HTMLDivElement>(null);
  useScrollDownAnimation({ elementRef: blockRef });

  return (
    <div className={className} ref={blockRef}>
      <Title className="container-base !mb-0">{t("specialties.title")}</Title>
      <div className="flex justify-between gap-6 px-8 -mt-2 -mb-10 py-10 overflow-x-scroll scrollbar-hidden">
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
        <SpecialtiesCard className="shrink-0 hover:-translate-y-6 hover:scale-105 transition-all duration-300 ease-in-out" />
      </div>
    </div>
  );
}
