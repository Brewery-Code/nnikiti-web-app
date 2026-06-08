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

function BenefitCard({ b }: { b: { title: string; text: string } }) {
  return (
    <div className="grad-border card-hover rounded-[20px] bg-surface p-5 backdrop-blur-xl sm:p-7">
      <h3
        className="font-display mb-3 font-bold text-primary"
        style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
      >
        {b.title}
      </h3>
      <p className="text-[14px] leading-snug text-muted">{b.text}</p>
      <div className="mt-5 h-px w-full bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />
    </div>
  );
}

function PostgraduatePage() {
  useLoadNamespace("entrant", loadTranslations);
  const { t } = useTranslation("entrant");

  const rawStats = t("postgraduate.stats", { returnObjects: true });
  const stats: { value: string; label: string }[] = Array.isArray(rawStats) ? rawStats : [];
  const rawBenefits = t("postgraduate.benefits", { returnObjects: true });
  const benefits: { title: string; text: string }[] = Array.isArray(rawBenefits) ? rawBenefits : [];
  const rawPrograms = t("postgraduate.programs", { returnObjects: true });
  const programs: Program[] = Array.isArray(rawPrograms) ? rawPrograms : [];
  const rawSteps = t("postgraduate.steps", { returnObjects: true });
  const steps: (Step & { linkText?: string; linkHref?: string })[] = Array.isArray(rawSteps) ? rawSteps : [];
  const rawDates = t("postgraduate.dates", { returnObjects: true });
  const dates: KeyDate[] = Array.isArray(rawDates) ? rawDates : [];

  const stepsWithJsx: Step[] = steps.map((s) => {
    if (s.linkText && s.linkHref) {
      const parts = (s.text ?? "").toString().split(s.linkText);
      return {
        title: s.title,
        text: (
          <>
            {parts.map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <a href={s.linkHref} target="_blank" rel="noopener noreferrer">{s.linkText}</a>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </>
        ),
      };
    }
    return { title: s.title, text: s.text };
  });

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <EntrantHero
        eyebrow={t("postgraduate.eyebrow")}
        title={t("postgraduate.title")}
        gradientWord={t("postgraduate.gradientWord")}
        description={t("postgraduate.description")}
        imageSeed="/images/students-hall.jpg"
        stats={stats}
      />

      <div>
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container-v2">
            <SectionHead
              eyebrow={t("postgraduate.benefitsEyebrow")}
              title={t("postgraduate.benefitsTitle")}
              gradientTitle={t("postgraduate.benefitsGradientTitle")}
              subtitle={t("postgraduate.benefitsSubtitle")}
            />
            <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.08} amount={0.05}>
              {benefits.map((b, i) => (
                <StaggerItem key={i} mode="up">
                  <BenefitCard b={b} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container-v2">
            <SectionHead
              eyebrow={t("postgraduate.programsEyebrow")}
              title={t("postgraduate.programsTitle")}
              gradientTitle={t("postgraduate.programsGradientTitle")}
            />
            <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.08} amount={0.05}>
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
                eyebrow={t("postgraduate.admissionEyebrow")}
                title={t("postgraduate.admissionTitle")}
                gradientTitle={t("postgraduate.admissionGradientTitle")}
                subtitle={t("postgraduate.admissionSubtitle")}
              />
              <Stagger className="flex flex-col" stagger={0.1} amount={0.1}>
                {stepsWithJsx.map((s, i) => (
                  <StaggerItem key={i} mode="right">
                    <StepItem
                      step={s}
                      number={i + 1}
                      index={i}
                      total={stepsWithJsx.length}
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
              eyebrow={t("postgraduate.datesEyebrow")}
              title={t("postgraduate.datesTitle")}
              gradientTitle={t("postgraduate.datesGradientTitle")}
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
          title={t("postgraduate.ctaTitle")}
          subtitle={t("postgraduate.ctaSubtitle")}
          primaryLabel={t("postgraduate.ctaPrimaryLabel")}
        />
      </div>
    </PageTransition>
  );
}

export const Component = PostgraduatePage;
