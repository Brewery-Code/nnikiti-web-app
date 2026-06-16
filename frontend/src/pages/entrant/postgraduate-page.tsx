import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { PageTransition } from "@/widgets";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { EntrantCta, EntrantHero, SectionHead, StepItem, type Step } from "./ui";
import { loadTranslations } from "./locales";
import { linkedStepText } from "./lib";

const REQ_POINTS = [
  "Диплом магістра або спеціаліста",
  "Конкурсний відбір на основі балів ЄВІ + ЄВВ",
  "Подання заяв через електронний кабінет ЄДЕБО",
];

const SCORE_FORMULA = [
  { label: "ЄВІ", desc: "Єдиний вступний іспит" },
  { label: "ЄВВ", desc: "Єдине вступне випробування" },
  { label: "Бал диплому", desc: "Середній бал диплому магістра" },
];

const EVI_PARTS = [
  {
    name: "Тест загальної навчальної компетентності (ТЗНК)",
    desc: "Логіка, аналітика та критичне мислення — оцінка здатності до наукової роботи.",
  },
  {
    name: "Тест з іноземної мови",
    desc: "Рівень знань іноземної мови відповідно до обраної спеціальності.",
  },
];

const EVV_PARTS = [
  {
    name: "Тест з методології наукових досліджень (МНД)",
    desc: "Знання принципів, методів та форм наукових досліджень.",
  },
];

const NUWM_URL = "https://nuwm.edu.ua/admission/aspirantura/";

function PostgraduatePage() {
  useLoadNamespace("entrant", loadTranslations);
  const { t } = useTranslation("entrant");

  const steps: Step[] = [
    { title: t("postgraduate.steps.0.title"), text: t("postgraduate.steps.0.text") },
    {
      title: t("postgraduate.steps.1.title"),
      text: linkedStepText(t("postgraduate.steps.1.text"), t("postgraduate.steps.1.linkText"), t("postgraduate.steps.1.linkHref")),
    },
    {
      title: t("postgraduate.steps.2.title"),
      text: linkedStepText(t("postgraduate.steps.2.text"), t("postgraduate.steps.2.linkText"), t("postgraduate.steps.2.linkHref")),
    },
    {
      title: t("postgraduate.steps.3.title"),
      text: linkedStepText(t("postgraduate.steps.3.text"), t("postgraduate.steps.3.linkText"), t("postgraduate.steps.3.linkHref")),
    },
    { title: t("postgraduate.steps.4.title"), text: t("postgraduate.steps.4.text") },
  ];

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <EntrantHero
        eyebrow={t("postgraduate.eyebrow")}
        title={t("postgraduate.title")}
        gradientWord={t("postgraduate.gradientWord")}
        description={t("postgraduate.description")}
        imageSeed="/main/nuwm_1920x900.jpg"
        stats={[]}
      />

      {/* Requirements section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-v2">
          <SectionHead
            eyebrow=""
            title={t("postgraduate.requirementsTitle")}
            gradientTitle={t("postgraduate.requirementsGradientTitle")}
          />
          <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.1} amount={0.05}>
            {/* Requirements card */}
            <StaggerItem mode="up">
              <div className="grad-border h-full rounded-[20px] bg-surface p-6 backdrop-blur-xl sm:p-8">
                <h3
                  className="font-display mb-4 font-bold text-primary"
                  style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}
                >
                  {t("postgraduate.reqCard1Title")}
                </h3>
                <ul className="flex flex-col gap-3">
                  {REQ_POINTS.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[10px] font-bold text-white"
                        aria-hidden
                      >
                        ✓
                      </span>
                      <span className="text-[14px] leading-snug text-primary/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>

            {/* Score formula card */}
            <StaggerItem mode="up">
              <div className="grad-border h-full rounded-[20px] bg-surface p-6 backdrop-blur-xl sm:p-8">
                <h3
                  className="font-display mb-5 font-bold text-primary"
                  style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}
                >
                  {t("postgraduate.scoreCard1Title")}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  {SCORE_FORMULA.map((part, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="rounded-[10px] bg-gradient-to-br from-violet-500/20 to-blue-500/20 px-3 py-1.5 text-[13px] font-semibold text-primary ring-1 ring-violet-500/30">
                        {part.label}
                      </div>
                      {i < SCORE_FORMULA.length - 1 && (
                        <span className="text-[16px] font-bold text-violet-400">+</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-muted">
                  {t("postgraduate.scoreDesc")}
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Exams section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-v2">
          <SectionHead
            eyebrow=""
            title={t("postgraduate.examsTitle")}
            gradientTitle={t("postgraduate.examsGradientTitle")}
            subtitle={t("postgraduate.examsSubtitle")}
          />
          <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.1} amount={0.05}>
            {/* EVI card */}
            <StaggerItem mode="up">
              <div className="grad-border h-full rounded-[20px] bg-surface p-6 backdrop-blur-xl sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex items-center rounded-[8px] bg-gradient-to-r from-violet-500 to-blue-500 px-3 py-1 text-[13px] font-extrabold text-white shadow-[0_2px_8px_rgba(166,132,255,0.4)]">
                    {t("postgraduate.eviLabel")}
                  </span>
                  <span className="text-[13px] text-muted">{t("postgraduate.eviFullName")}</span>
                </div>
                <div className="flex flex-col gap-4">
                  {EVI_PARTS.map((part, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-blue-500" />
                      <div>
                        <p className="text-[14px] font-semibold text-primary">{part.name}</p>
                        <p className="mt-0.5 text-[13px] leading-snug text-muted">{part.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>

            {/* EVV card */}
            <StaggerItem mode="up">
              <div className="grad-border h-full rounded-[20px] bg-surface p-6 backdrop-blur-xl sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex items-center rounded-[8px] bg-gradient-to-r from-violet-500 to-blue-500 px-3 py-1 text-[13px] font-extrabold text-white shadow-[0_2px_8px_rgba(166,132,255,0.4)]">
                    {t("postgraduate.evvLabel")}
                  </span>
                  <span className="text-[13px] text-muted">{t("postgraduate.evvFullName")}</span>
                </div>
                <div className="flex flex-col gap-4">
                  {EVV_PARTS.map((part, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-blue-500" />
                      <div>
                        <p className="text-[14px] font-semibold text-primary">{part.name}</p>
                        <p className="mt-0.5 text-[13px] leading-snug text-muted">{part.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact info */}
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted">
                    {t("postgraduate.examsContactLabel")}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <a
                      href={t("postgraduate.examsPhoneHref")}
                      className="text-[13px] text-violet-400 hover:underline"
                    >
                      {t("postgraduate.examsPhone")}
                    </a>
                    <a
                      href={`mailto:${t("postgraduate.examsEmail")}`}
                      className="text-[13px] text-violet-400 hover:underline"
                    >
                      {t("postgraduate.examsEmail")}
                    </a>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Testportal link */}
          <Reveal mode="up" className="mt-4">
            <div className="flex items-center justify-center gap-2 text-[13px] text-muted">
              <span>Реєстрація та результати —</span>
              <a
                href={t("postgraduate.examsPortalHref")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-violet-400 hover:underline"
              >
                {t("postgraduate.examsPortal")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Steps section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-v2">
          <div className="grid gap-12 sm:gap-14 lg:grid-cols-2 lg:items-start">
            <SectionHead
              eyebrow=""
              title={t("postgraduate.stepsTitle")}
              gradientTitle={t("postgraduate.stepsGradientTitle")}
              subtitle={t("postgraduate.stepsSubtitle")}
            />
            <Stagger className="flex flex-col" stagger={0.1} amount={0.1}>
              {steps.map((s, i) => (
                <StaggerItem key={i} mode="right">
                  <StepItem step={s} number={i + 1} index={i} total={steps.length} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <EntrantCta
        title={t("postgraduate.ctaTitle")}
        subtitle={t("postgraduate.ctaSubtitle")}
        primaryLabel={t("postgraduate.ctaLabel")}
        primaryHref={NUWM_URL}
      />
    </PageTransition>
  );
}

export const Component = PostgraduatePage;
