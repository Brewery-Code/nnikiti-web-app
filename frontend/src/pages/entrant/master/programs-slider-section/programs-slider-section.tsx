import { useTranslation } from "react-i18next";
import { Reveal } from "@/shared/ui";
import { publicRqClient } from "@/shared/api/instance";
import { isMasterDegree, type ProgramData } from "./model";
import { SpecCard } from "./ui";

export function ProgramsSlider() {
  const { t } = useTranslation("entrant");

  const { data: apiPrograms = [] } = publicRqClient.useQuery("get", "/core/educational-programs/", {});

  type ApiProgramExt = { slug?: string; department_slug?: string };
  const programs: ProgramData[] = (apiPrograms ?? [])
    .filter((p) => p.code && p.name && isMasterDegree(p.degree ?? ""))
    .map((p) => {
      const ext = p as typeof p & ApiProgramExt;
      return {
        id: p.id ?? 0,
        slug: ext.slug ?? "",
        code: p.code!,
        specialty: p.name!,
        program: p.name_op ?? "",
        degree: p.degree ?? "",
        departmentSlug: ext.department_slug ?? null,
      };
    });

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <Reveal mode="up" className="mb-8 sm:mb-10 lg:mb-14">
          <h2
            className="font-display font-black leading-none text-primary"
            style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
          >
            {t("master.sliderTitle")} <span className="text-grad">{t("master.sliderGradient")}</span>
          </h2>
          <p className="mt-3 text-[15px] text-muted" style={{ maxWidth: 480 }}>
            {t("master.sliderSubtitle")}
          </p>
        </Reveal>

        <Reveal mode="up">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {programs.map((p) => (
              <SpecCard key={p.id} spec={p} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
