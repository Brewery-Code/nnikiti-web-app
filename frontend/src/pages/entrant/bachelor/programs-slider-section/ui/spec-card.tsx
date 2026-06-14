import { useTranslation } from "react-i18next";
import { ProgramSpecCard } from "@/shared/ui";
import { type ProgramData } from "../model";

export function SpecCard({ spec }: { spec: ProgramData }) {
  const { t } = useTranslation("entrant");
  const to = spec.departmentId
    ? `/department/${spec.departmentId}?program_id=${spec.id}#curriculum`
    : "#";

  return (
    <ProgramSpecCard
      to={to}
      spec={{
        code: spec.code,
        specialty: spec.specialty,
        program: spec.program,
        degree: spec.degree,
      }}
      codeLabel={t("common.code")}
      programLabel={t("common.program")}
      ctaLabel={t("common.seeAll")}
    />
  );
}
