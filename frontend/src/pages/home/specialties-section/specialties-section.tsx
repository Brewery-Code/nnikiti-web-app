import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { ROUTES } from "@/shared/model/routes";
import { Reveal } from "@/shared/ui";
import { publicRqClient } from "@/shared/api/instance";
import { loadTranslations } from "../events-section/locales";

import "swiper/css";
import "swiper/css/autoplay";

const PROGRAM_META: Record<string, { departmentId: number; budget: number; contract: number }> = {
  "F1": { departmentId: 1, budget: 10, contract: 0 },   // Прикладна математика
  "F2": { departmentId: 4, budget: 20, contract: 40 },  // Інженерія ПЗ
  "F3": { departmentId: 2, budget: 15, contract: 35 },  // Комп'ютерні науки
  "F4": { departmentId: 3, budget: 12, contract: 30 },  // Прикладна інформатика
  "F5": { departmentId: 3, budget: 18, contract: 25 },  // Інформаційна безпека
  "F6": { departmentId: 2, budget: 0, contract: 35 },   // Інформаційні системи
  "F7": { departmentId: 3, budget: 12, contract: 30 },  // Комп'ютерна інженерія
  "A5": { departmentId: 2, budget: 0, contract: 28 },   // Інженерія даних
};

const SPACE_BETWEEN_PX = 20;

type SpecData = {
  id: number;
  code: string;
  name: string;
  tags: string[];
  levels: string[];
  departmentId: number | null;
  budget: number;
  contract: number;
};

const LEVEL_LABELS: Record<string, string> = {
  бакалавр: "Бакалаврат",
  магістр: "Магістратура",
  аспірантура: "Аспірантура",
};

function detectLevel(name: string, levelTagNames: string[]): string {
  const sources = [...levelTagNames, name].map((s) => s.toLowerCase());
  for (const src of sources) {
    for (const [key, label] of Object.entries(LEVEL_LABELS)) {
      if (src.includes(key)) return label;
    }
  }
  return "";
}

function SpecCard({ spec }: { spec: SpecData }) {
  const [h, setH] = useState(false);
  const { t } = useTranslation("home");
  const to = spec.departmentId
    ? `/department/${spec.departmentId}?program_id=${spec.id}#curriculum`
    : ROUTES.BACHELOR;
  return (
    <Link
      to={to}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="spec-card grad-border flex h-full cursor-pointer flex-col rounded-2xl px-4 py-5 sm:rounded-[20px] sm:px-7 sm:py-7"
      style={{
        background: h
          ? "linear-gradient(135deg, rgba(166,132,255,0.10) 0%, rgba(81,162,255,0.08) 100%)"
          : "var(--bg-surface)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.02em",
          marginBottom: 14,
          color: "var(--text-subtle)",
          transition: "color 200ms",
        }}
      >
        {t("specialtiesSection.code")}{" "}
        <span style={{ color: h ? "#fff" : "var(--text-muted)" }}>{spec.code}</span>
      </div>

      <h3
        className="font-display font-extrabold uppercase"
        style={{
          fontSize: "clamp(1rem, 1.4vw, 1.4rem)",
          letterSpacing: "-0.01em",
          lineHeight: 1.25,
          marginBottom: 18,
          minHeight: "2.5em",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          color: h ? "#fff" : "var(--text-primary)",
          transition: "color 200ms",
        }}
      >
        {spec.name}
      </h3>

      <div className="mb-6 flex flex-col gap-2">
        {spec.levels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {spec.levels.map((level) => (
              <span
                key={level}
                className="font-display inline-block uppercase"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  padding: "5px 14px",
                  borderRadius: 999,
                  color: h ? "#c4b5fd" : "#a78bfa",
                  border: "1px solid",
                  borderColor: h ? "rgba(196,181,253,0.4)" : "rgba(167,139,250,0.3)",
                  background: "transparent",
                  transition: "color 200ms, border-color 200ms",
                }}
              >
                {level}
              </span>
            ))}
          </div>
        )}
        {spec.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {spec.tags.map((tag) => (
              <span
                key={tag}
                className="font-display inline-block uppercase"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  padding: "6px 16px",
                  borderRadius: 999,
                  color: "#fff",
                  background: "linear-gradient(135deg, #a684ff 0%, #51a2ff 100%)",
                  boxShadow: "0 4px 14px rgba(166,132,255,0.25)",
                }}
              >
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
              <div style={{ fontSize: 9, color: "var(--text-subtle)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {t("specialtiesSection.budget")}
              </div>
            </div>
          )}
          {spec.contract > 0 && (
            <div>
              <div className="font-display font-extrabold" style={{ fontSize: "1rem" }}>{spec.contract}</div>
              <div style={{ fontSize: 9, color: "var(--text-subtle)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {t("specialtiesSection.contract")}
              </div>
            </div>
          )}
        </div>
        <div
          className="flex flex-shrink-0 items-center justify-center"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: h ? "linear-gradient(135deg, #a684ff, #51a2ff)" : "rgba(255,255,255,0.06)",
            color: h ? "#fff" : "var(--text-muted)",
            transition: "all 200ms",
            fontSize: 16,
          }}
        >
          ↗
        </div>
      </div>
    </Link>
  );
}

const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

function getSlideOffset() {
  if (typeof window === "undefined") return 16;
  const vw = window.innerWidth;
  if (vw >= 1280) return Math.max(24, Math.round((vw - 1280) / 2) + 24);
  if (vw >= 640) return 24;
  return 16;
}

export default function SpecialtiesSection({ className = "" }: { className?: string }) {
  useLoadNamespace("home", loadTranslations);
  const { t } = useTranslation("home");
  const swiperRef = useRef<SwiperType | null>(null);

  const { data: apiPrograms = [] } = publicRqClient.useQuery("get", "/core/educational-programs/", {});
  const { data: apiDepartments = [] } = publicRqClient.useQuery("get", "/departments/", {});
  const firstDeptId = (apiDepartments as { id?: number }[])[0]?.id ?? 1;

  const groupedByCode = new Map<string, typeof apiPrograms[number][]>();
  for (const p of apiPrograms ?? []) {
    if (!p.code || !p.name) continue;
    const existing = groupedByCode.get(p.code) ?? [];
    groupedByCode.set(p.code, [...existing, p]);
  }

  const specialties: SpecData[] = Array.from(groupedByCode.entries()).map(([code, programs]) => {
    const meta = PROGRAM_META[code] ?? { departmentId: null, budget: 0, contract: 0 };

    const allTags = [...new Set(
      programs.flatMap((p) => (p.subject ?? []).map((s) => s.name ?? "").filter(Boolean))
    )];

    const levels = [...new Set(
      programs.map((p) => {
        const levelNames = (p.education_levels ?? []).map((l) => l.name ?? "");
        const detected = detectLevel(p.name!, levelNames);
        if (!detected) {
          const lower = p.name!.toLowerCase();
          if (!lower.includes("магістр") && !lower.includes("аспір")) return "Бакалаврат";
        }
        return detected;
      }).filter(Boolean)
    )];

    const primary = programs.find((p) => !p.name!.toUpperCase().includes("МАГІСТР")) ?? programs[0];

    return {
      id: primary.id ?? 0,
      code,
      name: primary.name!,
      tags: allTags,
      levels,
      departmentId: meta.departmentId,
      budget: meta.budget,
      contract: meta.contract,
    };
  });

  return (
    <section id="programs" className={clsx("py-16 lg:py-24", className)}>
      <div className="container-v2">
        <Reveal mode="up" className="mb-10 lg:mb-14">
          <div className="flex items-center justify-between gap-4">
            <h2
              className="font-display font-black leading-none text-primary"
              style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
            >
              {t("specialtiesSection.heading")} <span className="text-grad">{t("specialtiesSection.headingAccent")}</span>
            </h2>
            {/* Desktop: link + arrows */}
            <div className="hidden items-center gap-5 lg:flex">
              <Link
                to={`/department/${firstDeptId}`}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-subtle transition-colors hover:text-primary"
              >
                {t("specialtiesSection.seeAll")} <span className="text-violet-400">↗</span>
              </Link>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => swiperRef.current?.slidePrev(600)}
                  aria-label={t("specialtiesSection.prevProgram")}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/[0.12] bg-surface-md text-primary/70 transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500 hover:text-primary active:scale-95"
                >
                  <span style={{ fontSize: 18, lineHeight: 1 }}>←</span>
                </button>
                <button
                  type="button"
                  onClick={() => swiperRef.current?.slideNext(600)}
                  aria-label={t("specialtiesSection.nextProgram")}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/[0.12] bg-surface-md text-primary/70 transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500 hover:text-primary active:scale-95"
                >
                  <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
                </button>
              </div>
            </div>
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
          spaceBetween={SPACE_BETWEEN_PX}
          slidesOffsetBefore={getSlideOffset()}
          slidesOffsetAfter={getSlideOffset()}
          allowTouchMove={isTouchDevice}
          grabCursor={isTouchDevice}
          className="specialties-swiper !overflow-visible py-2 [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
        >
          {specialties.map((s) => (
            <SwiperSlide
              key={s.code}
              className="!w-[72vw] xs:!w-[65vw] sm:!w-[300px] lg:!w-[340px] xl:!w-[380px] 2xl:!w-[420px]"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              <SpecCard spec={s} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile: "Детальніше" button below slider */}
      <div className="container-v2 mt-8 flex justify-center lg:hidden">
        <Link
          to={`/department/${firstDeptId}`}
          className="inline-flex items-center justify-center rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-10 py-3 text-[14px] font-semibold text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] transition-all duration-200 hover:brightness-110 active:scale-95"
        >
          {t("specialtiesSection.seeAll")}
        </Link>
      </div>
    </section>
  );
}
