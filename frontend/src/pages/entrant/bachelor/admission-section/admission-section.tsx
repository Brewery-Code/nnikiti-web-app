import { useTranslation } from "react-i18next";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { SectionHead, StepItem, type Step } from "../../ui";
import { linkedStepText } from "../../lib";

export function AdmissionSection() {
  const { t } = useTranslation("entrant");

  const steps: Step[] = [
    {
      title: t("bachelor.steps.0.title"),
      text: linkedStepText(t("bachelor.steps.0.text"), t("bachelor.steps.0.linkText"), t("bachelor.steps.0.linkHref")),
    },
    {
      title: t("bachelor.steps.1.title"),
      text: t("bachelor.steps.1.text"),
    },
    {
      title: t("bachelor.steps.2.title"),
      text: linkedStepText(t("bachelor.steps.2.text"), t("bachelor.steps.2.linkText"), t("bachelor.steps.2.linkHref")),
    },
    {
      title: t("bachelor.steps.3.title"),
      text: t("bachelor.steps.3.text"),
    },
    {
      title: t("bachelor.steps.4.title"),
      text: linkedStepText(t("bachelor.steps.4.text"), t("bachelor.steps.4.linkText"), t("bachelor.steps.4.linkHref")),
    },
  ];

  const rawNmtSubjects = t("bachelor.nmtSubjects", { returnObjects: true });
  const nmtSubjects: { subject: string; required: boolean }[] = Array.isArray(rawNmtSubjects) ? rawNmtSubjects : [];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <div className="grid gap-12 sm:gap-14 lg:grid-cols-2 lg:items-start">
          <Reveal mode="left" amount={0.1}>
            <SectionHead
              eyebrow={t("bachelor.admissionEyebrow")}
              title={t("bachelor.admissionTitle")}
              gradientTitle={t("bachelor.admissionGradientTitle")}
              subtitle={t("bachelor.admissionSubtitle")}
            />

            <div className="grad-border mt-6 rounded-[20px] bg-surface p-6 backdrop-blur-xl sm:mt-8">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
                {t("bachelor.nmtSubjectsLabel")}
              </p>
              {nmtSubjects.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 border-b border-ui-sm py-3 last:border-0"
                >
                  <span
                    aria-hidden
                    className="h-2 w-2 flex-shrink-0 rounded-full"
                    style={{
                      background: item.required
                        ? "linear-gradient(135deg, #a684ff, #51a2ff)"
                        : "var(--text-subtle)",
                    }}
                  />
                  <span className="text-[14px] text-primary/75">
                    {item.subject}
                  </span>
                  {item.required && (
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.06em] text-violet-300">
                      {t("bachelor.required")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

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
  );
}
