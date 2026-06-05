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
  "121": { departmentId: 4, budget: 20, contract: 40 },
  "122": { departmentId: 2, budget: 15, contract: 35 },
  "123": { departmentId: 3, budget: 12, contract: 30 },
  "125": { departmentId: 3, budget: 18, contract: 25 },
  "126": { departmentId: 2, budget: 0, contract: 35 },
  "051": { departmentId: 2, budget: 0, contract: 28 },
  "113": { departmentId: 1, budget: 10, contract: 0 },
  "111": { departmentId: 1, budget: 8, contract: 0 },
};

const SPACE_BETWEEN_PX = 20;

type SpecData = {
  id: number;
  code: string;
  name: string;
  tags: string[];
  departmentId: number | null;
  budget: number;
  contract: number;
};

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

      <div className="mb-6 flex flex-wrap gap-2">
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

export default function SpecialtiesSection({ className = "" }: { className?: string }) {
  useLoadNamespace("home", loadTranslations);
  const { t } = useTranslation("home");
  const swiperRef = useRef<SwiperType | null>(null);

  const { data: apiPrograms = [] } = publicRqClient.useQuery("get", "/core/educational-programs/", {});

  const specialties: SpecData[] = (apiPrograms ?? [])
    .filter((p) => p.code && p.name)
    .map((p) => {
      const meta = PROGRAM_META[p.code!] ?? { departmentId: null, budget: 0, contract: 0 };
      // Derive departmentId from code "F1" → 1, "F2" → 2, etc. if not in local meta
      const deptId = meta.departmentId ?? (p.code ? parseInt(p.code.replace(/\D/g, "")) || null : null);
      return {
        id: p.id ?? 0,
        code: p.code!,
        name: p.name!,
        tags: (p.subject ?? []).map((s) => s.name ?? "").filter(Boolean),
        departmentId: deptId,
        budget: meta.budget,
        contract: meta.contract,
      };
    });

  return (
    <section className={clsx("py-16 lg:py-24", className)}>
      <div className="container-v2">
        <Reveal mode="up" className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end lg:mb-14">
          <div>
            <h2
              className="font-display font-black leading-none text-primary"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
            >
              {t("specialtiesSection.heading")} <span className="text-grad">{t("specialtiesSection.headingAccent")}</span>
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <Link
              to={ROUTES.BACHELOR}
              className="inline-flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.04em] text-subtle transition-colors hover:text-primary"
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
          allowTouchMove={isTouchDevice}
          grabCursor={isTouchDevice}
          className="specialties-swiper !overflow-visible py-2 [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
        >
          {specialties.map((s) => (
            <SwiperSlide
              key={s.code}
              className="!w-[240px] xs:!w-[260px] sm:!w-[300px] lg:!w-[340px] xl:!w-[380px] 2xl:!w-[420px]"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              <SpecCard spec={s} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
