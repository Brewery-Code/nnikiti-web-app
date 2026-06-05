import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { PageTransition } from "@/widgets";
import { Stagger, StaggerItem } from "@/shared/ui";
import {
  EntrantHero,
  ProgramCard,
  StepItem,
  DateCard,
  SectionHead,
  EntrantCta,
} from "./ui";
import type { Program, Step, KeyDate } from "./ui";
import { loadTranslations } from "./locales";

function UndergraduatePage() {
  useLoadNamespace("entrant", loadTranslations);
  const { t } = useTranslation("entrant");

  const rawStats = t("undergraduate.stats", { returnObjects: true });
  const stats: { value: string; label: string }[] = Array.isArray(rawStats) ? rawStats : [];
  const rawPrograms = t("undergraduate.programs", { returnObjects: true });
  const programs: Program[] = Array.isArray(rawPrograms) ? rawPrograms : [];
  const rawSteps = t("undergraduate.steps", { returnObjects: true });
  const steps: Step[] = Array.isArray(rawSteps) ? rawSteps : [];
  const rawDates = t("undergraduate.dates", { returnObjects: true });
  const dates: KeyDate[] = Array.isArray(rawDates) ? rawDates : [];

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <EntrantHero
        eyebrow={t("undergraduate.eyebrow")}
        title={t("undergraduate.title")}
        gradientWord={t("undergraduate.gradientWord")}
        description={t("undergraduate.description")}
        imageSeed="/images/students-lecture.jpg"
        stats={stats}
      />

      <div>
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container-v2">
            <SectionHead
              eyebrow={t("undergraduate.programsEyebrow")}
              title={t("undergraduate.programsTitle")}
              gradientTitle={t("undergraduate.programsGradientTitle")}
              subtitle={t("undergraduate.programsSubtitle")}
            />
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07} amount={0.05}>
              {programs.map((p, i) => (
                <StaggerItem key={i} mode="up">
                  <ProgramCard program={p} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container-v2">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <SectionHead
                eyebrow={t("undergraduate.admissionEyebrow")}
                title={t("undergraduate.admissionTitle")}
                gradientTitle={t("undergraduate.admissionGradientTitle")}
              />
              <Stagger className="flex flex-col" stagger={0.1} amount={0.1}>
                {steps.map((s, i) => (
                  <StaggerItem key={i} mode="right">
                    <StepItem
                      step={s}
                      number={i + 1}
                      index={i}
                      total={steps.length}
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container-v2">
            <SectionHead
              eyebrow={t("undergraduate.datesEyebrow")}
              title={t("undergraduate.datesTitle")}
              gradientTitle={t("undergraduate.datesGradientTitle")}
              subtitle={t("undergraduate.datesSubtitle")}
            />
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08} amount={0.1}>
              {dates.map((d, i) => (
                <StaggerItem key={i} mode="up">
                  <DateCard date={d} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <EntrantCta
          title={t("undergraduate.ctaTitle")}
          subtitle={t("undergraduate.ctaSubtitle")}
        />
      </div>
    </PageTransition>
  );
}

export const Component = UndergraduatePage;
