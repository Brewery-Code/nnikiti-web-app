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
import { SPACE_BETWEEN_PX, type SpecData } from "./model";
import { isTouchDevice } from "./lib";
import { SpecCard } from "./ui";

import "swiper/css";
import "swiper/css/autoplay";

export default function SpecialtiesSection({ className = "" }: { className?: string }) {
  useLoadNamespace("home", loadTranslations);
  const { t } = useTranslation("home");
  const swiperRef = useRef<SwiperType | null>(null);

  type ApiProgramExt = { slug?: string; department_id?: number; department_slug?: string };
  const { data: apiPrograms = [] } = publicRqClient.useQuery("get", "/core/educational-programs/", {});
  const { data: apiDepartments = [] } = publicRqClient.useQuery("get", "/departments/", {});
  const firstDeptSlug = (apiDepartments as { id?: number; slug?: string }[])[0]?.slug
    ?? String((apiDepartments as { id?: number }[])[0]?.id ?? 1);

  const specialties: SpecData[] = (apiPrograms ?? [])
    .filter((p) => p.code && p.name)
    .map((p) => {
      const ext = p as typeof p & ApiProgramExt;
      return {
        id: p.id ?? 0,
        slug: ext.slug ?? "",
        code: p.code!,
        specialty: p.name!,
        program: p.name_op ?? "",
        degree: p.degree ?? "",
        departmentSlug: ext.department_slug ?? null,
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
            {/* Desktop: arrows */}
            <div className="hidden items-center gap-5 lg:flex">
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
        {specialties.length > 0 && (
          <Swiper
            // Force a clean re-init once async data arrives so loop clones and
            // autoplay are built against the real slides (not an empty list).
            key={specialties.length}
            onSwiper={(s) => { swiperRef.current = s; }}
            modules={[Autoplay]}
            loop
            loopAdditionalSlides={4}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            speed={600}
            slidesPerView="auto"
            spaceBetween={SPACE_BETWEEN_PX}
            allowTouchMove={isTouchDevice}
            grabCursor={isTouchDevice}
            observer
            observeParents
            resizeObserver
            className="specialties-swiper !overflow-visible py-2 [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
          >
            {specialties.map((s) => (
              <SwiperSlide
                key={s.id}
                className="!w-[72vw] xs:!w-[65vw] sm:!w-[300px] lg:!w-[340px] xl:!w-[380px] 2xl:!w-[420px]"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <SpecCard spec={s} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Mobile: "Детальніше" button below slider */}
      <div className="container-v2 mt-8 flex justify-center lg:hidden">
        <Link
          to={`/department/${firstDeptSlug}`}
          className="inline-flex items-center justify-center rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-10 py-3 text-[14px] font-semibold text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] transition-all duration-200 hover:brightness-110 active:scale-95"
        >
          {t("specialtiesSection.seeAll")}
        </Link>
      </div>
    </section>
  );
}
