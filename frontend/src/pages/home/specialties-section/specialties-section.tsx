import { useLoadNamespace } from "@/shared/hooks";
import { SpecialtiesCard, Title } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { loadTranslations } from "./locales";

export default function SpecialtiesSection({
  className = "",
}: {
  className?: string;
}) {
  const { t } = useTranslation("home");
  useLoadNamespace("home", loadTranslations);
  return (
    <div className={className}>
      <Title className="container-base">{t("specialties.title")}</Title>
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
