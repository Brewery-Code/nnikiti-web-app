import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/shared/ui";
import { publicRqClient } from "@/shared/api/instance";
import { isTouchDevice } from "../../lib";
import { PROGRAM_META, type ProgramData } from "./model";
import { SpecCard } from "./ui";

import "swiper/css";
import "swiper/css/autoplay";

export function ProgramsSlider() {
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
