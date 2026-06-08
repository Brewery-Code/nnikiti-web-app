import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { PageTransition } from "@/widgets";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import {
  EntrantHero,
  StepItem,
  SectionHead,
  EntrantCta,
} from "./ui";
import type { Step } from "./ui";
import { loadTranslations } from "./locales";
import { publicRqClient } from "@/shared/api/instance";

import "swiper/css";
import "swiper/css/autoplay";

const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

const L = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

type ProgramData = {
  code: string;
  departmentId: number;
  name: string;
  tags: string[];
  budget: number;
  contract: number;
};

const PROGRAM_META: Record<string, { departmentId: number; budget: number; contract: number }> = {
  "121": { departmentId: 4, budget: 20, contract: 40 },
  "122": { departmentId: 2, budget: 15, contract: 35 },
  "123": { departmentId: 3, budget: 12, contract: 30 },
  "125": { departmentId: 3, budget: 18, contract: 25 },
  "126": { departmentId: 2, budget: 0, contract: 35 },
  "051": { departmentId: 2, budget: 0, contract: 28 },
  "113": { departmentId: 1, budget: 10, contract: 0 },
  "111": { departmentId: 1, budget: 8, contract: 0 },
};

function SpecCard({ spec }: { spec: ProgramData }) {
  const [h, setH] = useState(false);
  const { t } = useTranslation("entrant");
  return (
    <Link
      to={`/department/${spec.departmentId}?program=${spec.code}#curriculum`}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="spec-card grad-border flex h-full cursor-pointer flex-col rounded-2xl px-4 py-5 sm:rounded-[20px] sm:px-7 sm:py-7"
      style={{ background: h ? "linear-gradient(135deg, rgba(166,132,255,0.10) 0%, rgba(81,162,255,0.08) 100%)" : "var(--bg-surface)" }}
    >
      <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.02em", marginBottom: 14, color: "var(--text-subtle)", transition: "color 200ms" }}>
        {t("common.code")}{" "}
        <span style={{ color: h ? "#fff" : "var(--text-muted)" }}>{spec.code}</span>
      </div>

      <h3
        className="font-display font-extrabold uppercase"
        style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", letterSpacing: "-0.01em", lineHeight: 1.25, marginBottom: 18, minHeight: "2.5em", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", color: h ? "#fff" : "var(--text-primary)", transition: "color 200ms" }}
      >
        {spec.name}
      </h3>

      <div className="mb-6 flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <span
            className="font-display inline-block uppercase"
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", padding: "5px 14px", borderRadius: 999, color: h ? "#c4b5fd" : "#a78bfa", border: "1px solid", borderColor: h ? "rgba(196,181,253,0.4)" : "rgba(167,139,250,0.3)", background: "transparent", transition: "color 200ms, border-color 200ms" }}
          >
            Бакалаврат
          </span>
        </div>
        {spec.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {spec.tags.map((tag) => (
              <span key={tag} className="font-display inline-block uppercase" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", padding: "6px 16px", borderRadius: 999, color: "#fff", background: "linear-gradient(135deg, #a684ff 0%, #51a2ff 100%)", boxShadow: "0 4px 14px rgba(166,132,255,0.25)" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 pt-4">
        <div className="flex gap-5">
          {spec.budget > 0 && (
            <div>
              <div className="font-display font-extrabold" style={{ fontSize: "1rem" }}>{spec.budget}</div>
              <div style={{ fontSize: 9, color: "var(--text-subtle)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{t("common.budget")}</div>
            </div>
          )}
          {spec.contract > 0 && (
            <div>
              <div className="font-display font-extrabold" style={{ fontSize: "1rem" }}>{spec.contract}</div>
              <div style={{ fontSize: 9, color: "var(--text-subtle)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{t("common.contract")}</div>
            </div>
          )}
        </div>
        <div className="flex flex-shrink-0 items-center justify-center" style={{ width: 36, height: 36, borderRadius: 10, background: h ? "linear-gradient(135deg, #a684ff, #51a2ff)" : "rgba(255,255,255,0.06)", color: h ? "#fff" : "var(--text-muted)", transition: "all 200ms", fontSize: 16 }}>
          ↗
        </div>
      </div>
    </Link>
  );
}

function ProgramsSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const { t } = useTranslation("entrant");

  const { data: apiPrograms = [] } = publicRqClient.useQuery("get", "/core/educational-programs/", {});

  const programs: ProgramData[] = (apiPrograms ?? [])
    .filter((p) => p.code && p.name)
    .map((p) => {
      const meta = PROGRAM_META[p.code!] ?? { departmentId: 1, budget: 0, contract: 0 };
      return {
        code: p.code!,
        name: p.name!,
        tags: (p.subject ?? []).map((s) => s.name ?? "").filter(Boolean),
        departmentId: meta.departmentId,
        budget: meta.budget,
        contract: meta.contract,
      };
    });

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <Reveal mode="up" className="mb-6 flex items-end justify-between sm:mb-10 lg:mb-14">
          <div>
            <h2
              className="font-display font-black leading-none text-primary"
              style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
            >
              {t("bachelor.sliderTitle")} <span className="text-grad">{t("bachelor.sliderGradient")}</span>
            </h2>
            <p className="mt-3 text-[15px] text-muted" style={{ maxWidth: 480 }}>
              {t("bachelor.sliderSubtitle")}
            </p>
          </div>
          <div className="hidden flex-shrink-0 items-center gap-2.5 lg:flex">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev(600)}
              aria-label={t("common.prevProgram")}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/[0.12] bg-surface-md text-primary/70 transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500 hover:text-primary active:scale-95"
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>←</span>
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext(600)}
              aria-label={t("common.nextProgram")}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/[0.12] bg-surface-md text-primary/70 transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500 hover:text-primary active:scale-95"
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
            </button>
          </div>
        </Reveal>
      </div>

      <div className="overflow-hidden py-3">
        <Swiper
          onSwiper={(s) => { swiperRef.current = s; }}
          modules={[Autoplay]}
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={600}
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={20}
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}
          allowTouchMove={isTouchDevice}
          grabCursor={isTouchDevice}
          touchStartPreventDefault={false}
          className="specialties-swiper !overflow-visible py-2 [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
        >
          {programs.map((p) => (
            <SwiperSlide
              key={p.code}
              className="!w-[72vw] sm:!w-[300px] lg:!w-[340px] xl:!w-[380px] 2xl:!w-[420px]"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              <SpecCard spec={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function BachelorPage() {
  useLoadNamespace("entrant", loadTranslations);
  const { t } = useTranslation("entrant");

  const rawStats = t("bachelor.stats", { returnObjects: true });
  const stats: { value: string; label: string }[] = Array.isArray(rawStats) ? rawStats : [];

  const steps: Step[] = [
    {
      title: t("bachelor.steps.0.title"),
      text: (
        <>
          {t("bachelor.steps.0.text").split(t("bachelor.steps.0.linkText")).map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <L href={t("bachelor.steps.0.linkHref")}>{t("bachelor.steps.0.linkText")}</L>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </>
      ),
    },
    {
      title: t("bachelor.steps.1.title"),
      text: t("bachelor.steps.1.text"),
    },
    {
      title: t("bachelor.steps.2.title"),
      text: (
        <>
          {t("bachelor.steps.2.text").split(t("bachelor.steps.2.linkText")).map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <L href={t("bachelor.steps.2.linkHref")}>{t("bachelor.steps.2.linkText")}</L>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </>
      ),
    },
    {
      title: t("bachelor.steps.3.title"),
      text: t("bachelor.steps.3.text"),
    },
    {
      title: t("bachelor.steps.4.title"),
      text: (
        <>
          {t("bachelor.steps.4.text").split(t("bachelor.steps.4.linkText")).map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <L href={t("bachelor.steps.4.linkHref")}>{t("bachelor.steps.4.linkText")}</L>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </>
      ),
    },
  ];

  const rawNmtSubjects = t("bachelor.nmtSubjects", { returnObjects: true });
  const nmtSubjects: { subject: string; required: boolean }[] = Array.isArray(rawNmtSubjects) ? rawNmtSubjects : [];

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <EntrantHero
        eyebrow={t("bachelor.eyebrow")}
        title={t("bachelor.title")}
        gradientWord={t("bachelor.gradientWord")}
        description={t("bachelor.description")}
        imageSeed="/images/students-stage.jpg"
        stats={stats}
      />

      <div>
        <ProgramsSlider />

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

        <EntrantCta
          title={t("bachelor.ctaTitle")}
          subtitle={t("bachelor.ctaSubtitle")}
          primaryLabel={t("bachelor.ctaPrimaryLabel")}
        />
      </div>
    </PageTransition>
  );
}

export const Component = BachelorPage;
