import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/model/routes";
import { ProgramSpecCard } from "@/shared/ui";
import { type SpecData } from "../model";

export function SpecCard({ spec }: { spec: SpecData }) {
  const { t } = useTranslation("home");
  const to = spec.departmentSlug && spec.slug
    ? `/department/${spec.departmentSlug}/program/${spec.slug}`
    : ROUTES.BACHELOR;

  return (
    <ProgramSpecCard
      to={to}
      spec={{
        code: spec.code,
        specialty: spec.specialty,
        program: spec.program,
        degree: spec.degree,
      }}
      codeLabel={t("specialtiesSection.code")}
      programLabel={t("specialtiesSection.program")}
      specialtyLabel={t("specialtiesSection.specialty")}
    />
  );
}
