import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ROUTES } from "@/shared/model/routes";
import { Reveal } from "@/shared/ui";

import "swiper/css";
import "swiper/css/autoplay";

const SPECIALTIES = [
  {
    code: "121",
    departmentId: 4,
    name: "Інженерія програмного забезпечення",
    tags: ["Backend", "Frontend", "AI", "DevOps"],
    budget: 20,
    contract: 40,
  },
  {
    code: "122",
    departmentId: 2,
    name: "Комп'ютерні науки",
    tags: ["Algorithms", "ML", "Networks"],
    budget: 15,
    contract: 35,
  },
  {
    code: "126",
    departmentId: 2,
    name: "Інформаційні системи",
    tags: ["ERP", "Cloud", "BI"],
    budget: 18,
    contract: 30,
  },
  {
    code: "192",
    departmentId: null,
    name: "Будівництво та цив. інженерія",
    tags: ["BIM", "Hydro", "Design"],
    budget: 25,
    contract: 25,
  },
  {
    code: "193",
    departmentId: null,
    name: "Геодезія та землеустрій",
    tags: ["GIS", "Remote Sensing"],
    budget: 12,
    contract: 20,
  },
  {
    code: "101",
    departmentId: null,
    name: "Екологія",
    tags: ["Water", "Environment", "Policy"],
    budget: 16,
    contract: 22,
  },
];

const SPACE_BETWEEN_PX = 20;

function SeeAll() {
  const [h, setH] = useState(false);
  return (
    <Link
      to={ROUTES.BACHELOR}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="inline-flex items-center text-[14px] font-semibold uppercase tracking-[0.04em] transition-all duration-150"
      style={{
        gap: h ? 12 : 8,
        color: h ? "#fff" : "var(--text-subtle)",
      }}
    >
      Усі програми
      <span style={{ color: h ? "#a684ff" : "var(--text-subtle)" }}>↗</span>
    </Link>
  );
}

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Попередня програма" : "Наступна програма"}
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/[0.12] bg-surface-md text-primary/70 transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500 hover:text-primary active:scale-95"
    >
      <span style={{ fontSize: 18, lineHeight: 1 }}>
        {direction === "prev" ? "←" : "→"}
      </span>
    </button>
  );
}

function SpecCard({ spec }: { spec: (typeof SPECIALTIES)[0] }) {
  const [h, setH] = useState(false);
  const to = spec.departmentId
    ? `/department/${spec.departmentId}?program=${spec.code}#curriculum`
    : ROUTES.BACHELOR;
  return (
    <Link
      to={to}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="spec-card grad-border flex h-full cursor-pointer flex-col rounded-2xl px-6 py-6 sm:rounded-[20px] sm:px-7 sm:py-7"
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
        Code:{" "}
        <span style={{ color: h ? "#fff" : "var(--text-muted)" }}>
          {spec.code}
        </span>
      </div>

      <h3
        className="font-display font-extrabold uppercase"
        style={{
          fontSize: "clamp(1.15rem, 1.4vw, 1.4rem)",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          marginBottom: 22,
          minHeight: "2.4em",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          color: h ? "#fff" : "var(--text-primary)",
          transition: "color 200ms",
        }}
      >
        {spec.name}
      </h3>

      <div className="mb-6 flex flex-wrap gap-2">
        {spec.tags.map((t) => (
          <span
            key={t}
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
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 pt-4">
        <div className="flex gap-5">
          <div>
            <div className="font-display font-extrabold" style={{ fontSize: "1rem" }}>
              {spec.budget}
            </div>
            <div
              style={{
                fontSize: 9,
                color: "var(--text-subtle)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              бюджет
            </div>
          </div>
          <div>
            <div className="font-display font-extrabold" style={{ fontSize: "1rem" }}>
              {spec.contract}
            </div>
            <div
              style={{
                fontSize: 9,
                color: "var(--text-subtle)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              контракт
            </div>
          </div>
        </div>
        <div
          className="flex flex-shrink-0 items-center justify-center"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: h
              ? "linear-gradient(135deg, #a684ff, #51a2ff)"
              : "rgba(255,255,255,0.06)",
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

export default function SpecialtiesSection({
  className = "",
}: {
  className?: string;
}) {
  const swiperRef = useRef<SwiperType | null>(null);

  function handlePrev() {
    swiperRef.current?.slidePrev(600);
  }

  function handleNext() {
    swiperRef.current?.slideNext(600);
  }

  return (
    <section className={clsx("bg-base py-16 lg:py-24", className)}>
      <div className="container-v2">
        <Reveal mode="up" className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end lg:mb-14">
          <div>
            <div className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-500">
              — Спеціальності
            </div>
            <h2
              className="font-display font-black leading-none text-primary"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Програми <span className="text-grad">навчання</span>
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <SeeAll />
            <div className="flex items-center gap-2.5">
              <NavButton direction="prev" onClick={handlePrev} />
              <NavButton direction="next" onClick={handleNext} />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="overflow-hidden">
        <Swiper
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={600}
          slidesPerView="auto"
          spaceBetween={SPACE_BETWEEN_PX}
          allowTouchMove
          grabCursor
          className="specialties-swiper !overflow-visible py-2 [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
        >
          {SPECIALTIES.map((s) => (
            <SwiperSlide
              key={s.code}
              className="!w-[260px] sm:!w-[300px] lg:!w-[340px] xl:!w-[380px] 2xl:!w-[420px]"
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
