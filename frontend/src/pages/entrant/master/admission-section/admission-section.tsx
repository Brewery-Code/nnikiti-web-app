import { useTranslation } from "react-i18next";
import { Stagger, StaggerItem } from "@/shared/ui";
import { SectionHead, StepItem, type Step } from "../../ui";
import { linkedStepText } from "../../lib";

export function AdmissionSection() {
  const { t } = useTranslation("entrant");

  const steps: Step[] = [
    {
      title: t("master.steps.0.title"),
      text: t("master.steps.0.text"),
    },
    {
      title: t("master.steps.1.title"),
      text: linkedStepText(t("master.steps.1.text"), t("master.steps.1.linkText"), t("master.steps.1.linkHref")),
    },
    {
      title: t("master.steps.2.title"),
      text: linkedStepText(t("master.steps.2.text"), t("master.steps.2.linkText"), t("master.steps.2.linkHref")),
    },
    {
      title: t("master.steps.3.title"),
      text: linkedStepText(t("master.steps.3.text"), t("master.steps.3.linkText"), t("master.steps.3.linkHref")),
    },
    {
      title: t("master.steps.4.title"),
      text: t("master.steps.4.text"),
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <div className="grid gap-12 sm:gap-14 lg:grid-cols-2 lg:items-start">
          <SectionHead
            eyebrow={t("master.admissionEyebrow")}
            title={t("master.admissionTitle")}
            gradientTitle={t("master.admissionGradientTitle")}
            subtitle={t("master.admissionSubtitle")}
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
  );
}
