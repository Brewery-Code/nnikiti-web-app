import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/model/routes";
import { ProgramSpecCard } from "@/shared/ui";
import { type SpecData } from "../model";

export function SpecCard({ spec }: { spec: SpecData }) {
  const { t } = useTranslation("home");
  const to = spec.departmentId
    ? `/department/${spec.departmentId}?program_id=${spec.id}#curriculum`
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
      ctaLabel={t("specialtiesSection.seeAll")}
    />
  );
}
