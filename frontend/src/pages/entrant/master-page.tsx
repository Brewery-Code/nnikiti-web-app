import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { PageTransition } from "@/widgets";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { EntrantHero, StepItem, SectionHead, EntrantCta } from "./ui";
import type { Step } from "./ui";
import { loadTranslations } from "./locales";

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
  seats: string;
};

const programsMeta: { code: string; departmentId: number }[] = [
  { code: "121", departmentId: 4 },
  { code: "122", departmentId: 2 },
  { code: "123", departmentId: 3 },
  { code: "125", departmentId: 3 },
  { code: "126", departmentId: 2 },
];

function SpecCard({ spec }: { spec: ProgramData }) {
  const [h, setH] = useState(false);
  const { t } = useTranslation("entrant");
  return (
    <Link
      to={`/department/${spec.departmentId}?program=${spec.code}#curriculum`}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="spec-card grad-border flex h-full cursor-pointer flex-col rounded-2xl px-6 py-6 sm:rounded-[20px] sm:px-7 sm:py-7"
      style={{ background: h ? "linear-gradient(135deg, rgba(166,132,255,0.10) 0%, rgba(81,162,255,0.08) 100%)" : "var(--bg-surface)" }}
    >
      <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.02em", marginBottom: 14, color: "var(--text-subtle)" }}>
        {t("common.code")} <span style={{ color: h ? "#fff" : "var(--text-muted)", transition: "color 200ms" }}>{spec.code}</span>
      </div>
      <h3
        className="font-display font-extrabold uppercase"
        style={{ fontSize: "clamp(1.15rem, 1.4vw, 1.4rem)", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: 22, minHeight: "2.4em", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", color: h ? "#fff" : "var(--text-primary)", transition: "color 200ms" }}
      >
        {spec.name}
      </h3>
      <div className="mb-6 flex flex-wrap gap-2">
        {spec.tags.map((tag) => (
          <span key={tag} className="font-display inline-block uppercase" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", padding: "6px 16px", borderRadius: 999, color: "#fff", background: "linear-gradient(135deg, #a684ff 0%, #51a2ff 100%)", boxShadow: "0 4px 14px rgba(166,132,255,0.25)" }}>
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-end justify-between gap-4 pt-4">
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
          {spec.seats}
        </span>
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

  const rawProgramsI18n = t("master.programs", { returnObjects: true });
  const programsI18n: { code: string; name: string; tags: string[]; seats: string }[] = Array.isArray(rawProgramsI18n) ? rawProgramsI18n : [];

  const programs: ProgramData[] = programsMeta.map((meta, i) => ({
    ...meta,
    name: programsI18n[i]?.name ?? meta.code,
    tags: programsI18n[i]?.tags ?? [],
    seats: programsI18n[i]?.seats ?? "",
  }));

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <Reveal mode="up" className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end lg:mb-14">
          <div>
            <h2 className="font-display font-black leading-none text-primary" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}>
              {t("master.sliderTitle")} <span className="text-grad">{t("master.sliderGradient")}</span>
            </h2>
            <p className="mt-3 text-[15px] text-muted" style={{ maxWidth: 480 }}>
              {t("master.sliderSubtitle")}
            </p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2.5">
            <button type="button" onClick={() => swiperRef.current?.slidePrev()} aria-label={t("common.prevProgram")} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/[0.12] bg-surface-md text-primary/70 transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500 hover:text-primary active:scale-95">
              <span style={{ fontSize: 18, lineHeight: 1 }}>←</span>
            </button>
            <button type="button" onClick={() => swiperRef.current?.slideNext()} aria-label={t("common.nextProgram")} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/[0.12] bg-surface-md text-primary/70 transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500 hover:text-primary active:scale-95">
              <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
            </button>
          </div>
        </Reveal>
      </div>
      <div className="overflow-hidden" style={{ transform: "translateZ(0)" }}>
        <Swiper
          onSwiper={(s) => { swiperRef.current = s; }}
          loop
          speed={400}
          slidesPerView="auto"
          spaceBetween={20}
          allowTouchMove={isTouchDevice}
          touchStartPreventDefault={false}
          className="specialties-swiper !overflow-visible py-2 [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
        >
          {programs.map((p) => (
            <SwiperSlide key={p.code} className="!w-[260px] sm:!w-[300px] lg:!w-[340px] xl:!w-[380px] 2xl:!w-[420px]" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
              <SpecCard spec={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function TracksSection() {
  const { t } = useTranslation("entrant");
  const rawTracks = t("master.tracks", { returnObjects: true });
  const tracks: { icon: string; title: string; text: string }[] = Array.isArray(rawTracks) ? rawTracks : [];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <SectionHead
          eyebrow={t("master.tracksEyebrow")}
          title={t("master.tracksTitle")}
          gradientTitle={t("master.tracksGradientTitle")}
          subtitle={t("master.tracksSubtitle")}
        />
        <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.12} amount={0.15}>
          {tracks.map((track, i) => (
            <StaggerItem
              key={i}
              mode="up"
              className="grad-border relative overflow-hidden rounded-[20px] bg-surface p-6 backdrop-blur-xl sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
                style={{
                  background:
                    i === 0
                      ? "radial-gradient(circle, rgba(166,132,255,0.20) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(81,162,255,0.20) 0%, transparent 70%)",
                }}
              />
              <span className="text-grad mb-5 block text-3xl">{track.icon}</span>
              <h3
                className="font-display mb-3 font-bold text-primary"
                style={{ fontSize: "1.2rem", letterSpacing: "-0.02em" }}
              >
                {track.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-primary/60">{track.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function MasterPage() {
  useLoadNamespace("entrant", loadTranslations);
  const { t } = useTranslation("entrant");

  const rawStats = t("master.stats", { returnObjects: true });
  const stats: { value: string; label: string }[] = Array.isArray(rawStats) ? rawStats : [];

  const steps: Step[] = [
    {
      title: t("master.steps.0.title"),
      text: t("master.steps.0.text"),
    },
    {
      title: t("master.steps.1.title"),
      text: (
        <>
          {t("master.steps.1.text").split(t("master.steps.1.linkText")).map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <L href={t("master.steps.1.linkHref")}>{t("master.steps.1.linkText")}</L>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </>
      ),
    },
    {
      title: t("master.steps.2.title"),
      text: (
        <>
          {t("master.steps.2.text").split(t("master.steps.2.linkText")).map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <L href={t("master.steps.2.linkHref")}>{t("master.steps.2.linkText")}</L>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </>
      ),
    },
    {
      title: t("master.steps.3.title"),
      text: (
        <>
          {t("master.steps.3.text").split(t("master.steps.3.linkText")).map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <L href={t("master.steps.3.linkHref")}>{t("master.steps.3.linkText")}</L>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </>
      ),
    },
    {
      title: t("master.steps.4.title"),
      text: t("master.steps.4.text"),
    },
  ];

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <EntrantHero
        eyebrow={t("master.eyebrow")}
        title={t("master.title")}
        gradientWord={t("master.gradientWord")}
        description={t("master.description")}
        imageSeed="/images/students-workshop.jpg"
        stats={stats}
      />

      <div>
        <ProgramsSlider />

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container-v2">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
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

        <TracksSection />

        <EntrantCta
          title={t("master.ctaTitle")}
          subtitle={t("master.ctaSubtitle")}
          primaryLabel={t("master.ctaPrimaryLabel")}
        />
      </div>
    </PageTransition>
  );
}

export const Component = MasterPage;
