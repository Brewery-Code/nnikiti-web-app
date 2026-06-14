import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/shared/ui";
import { publicRqClient } from "@/shared/api/instance";
import { isTouchDevice, useCardsFit } from "../../lib";
import { PROGRAM_DEPARTMENTS, isBachelorDegree, type ProgramData } from "./model";
import { SpecCard } from "./ui";

import "swiper/css";
import "swiper/css/autoplay";

export function ProgramsSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const { t } = useTranslation("entrant");

  const { data: apiPrograms = [] } = publicRqClient.useQuery("get", "/core/educational-programs/", {});

  const programs: ProgramData[] = (apiPrograms ?? [])
    .filter((p) => p.code && p.name && isBachelorDegree(p.degree ?? ""))
    .map((p) => ({
      id: p.id ?? 0,
      code: p.code!,
      specialty: p.name!,
      program: p.name_op ?? "",
      degree: p.degree ?? "",
      departmentId: PROGRAM_DEPARTMENTS[p.code!] ?? null,
    }));

  const { ref: fitRef, fits } = useCardsFit(programs.length);

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div ref={fitRef} className="container-v2">
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
          {!fits && (
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
          )}
        </Reveal>
      </div>

      {fits ? (
        <div className="container-v2">
          <div className="flex flex-wrap gap-5">
            {programs.map((p) => (
              <div key={p.id} className="w-full sm:w-[300px] lg:w-[340px] xl:w-[380px] 2xl:w-[420px]">
                <SpecCard spec={p} />
              </div>
            ))}
          </div>
        </div>
      ) : (
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
                key={p.id}
                className="!w-[72vw] sm:!w-[300px] lg:!w-[340px] xl:!w-[380px] 2xl:!w-[420px]"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <SpecCard spec={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
