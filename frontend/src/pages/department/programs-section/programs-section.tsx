import { useTranslation } from "react-i18next";
import { type DepartmentData } from "@/shared/model/departments-data";
import { ProgramSpecCard, Reveal } from "@/shared/ui";
import { SectionTitle } from "../ui";

export function ProgramsSection({ dept }: { dept: DepartmentData }) {
  const { t } = useTranslation("department");

  if (!dept.programs.length) { return null; }

  return (
    <section id="programs" className="mb-12 sm:mb-16">
      <SectionTitle
        title={t("programs.section_title")}
        highlight={t("programs.section_highlight")}
      />
      <Reveal mode="up">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {dept.programs.map((prog) => (
            <ProgramSpecCard
              key={prog.id}
              to={`/department/${dept.slug}/program/${prog.slug}`}
              spec={{
                code: prog.code,
                specialty: prog.name,
                program: prog.nameOp || undefined,
                degree: prog.degree || undefined,
              }}
              codeLabel={t("programs.code_label")}
              programLabel={t("programs.program_label")}
              specialtyLabel={t("programs.specialty_label")}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
