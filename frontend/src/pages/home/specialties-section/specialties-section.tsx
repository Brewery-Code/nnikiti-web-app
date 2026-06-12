import { useRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { Reveal } from "@/shared/ui";
import { publicRqClient } from "@/shared/api/instance";
import { loadTranslations } from "../events-section/locales";
import { PROGRAM_META, SPACE_BETWEEN_PX, detectLevel, type SpecData } from "./model";
import { getSlideOffset, isTouchDevice } from "./lib";
import { SpecCard } from "./ui";

import "swiper/css";
import "swiper/css/autoplay";

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
