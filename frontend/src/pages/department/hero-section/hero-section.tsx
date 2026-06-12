import { useTranslation } from "react-i18next";
import { type DepartmentData } from "@/shared/model/departments-data";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { CircuitBackground } from "./ui";
import { DeptPhoto } from "../ui";

export function HeroSection({ dept }: { dept: DepartmentData }) {
  const { t } = useTranslation("department");

  return (
    <div className="relative overflow-hidden">
      <CircuitBackground />

      {/* ── Desktop: full-height centered two-column ── */}
      <div className="hidden lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center">
        <div className="container-v2 relative py-28">
          <div className="grid w-full items-center gap-12 lg:grid-cols-2">
            <Stagger className="flex flex-col items-start" stagger={0.12} delay={0.2} inView={false}>
              <StaggerItem mode="up">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4">
                  <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-white">
                    {t("hero.badge_institute")}
                  </span>
                  <span className="text-[12px] text-white/55">{t("hero.badge_dept")}</span>
                </div>
              </StaggerItem>
              <StaggerItem mode="up">
                <h1
                  className="font-display font-black text-white"
                  style={{ fontSize: "clamp(2.6rem, 4.5vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.92 }}
                >
                  {dept.name}
                </h1>
              </StaggerItem>
              <StaggerItem mode="up">
                <p className="mt-6 text-[15px] leading-[1.8] text-white/50 sm:text-[16px]">
                  {dept.description}
                </p>
              </StaggerItem>
            </Stagger>
            <Reveal mode="fade" delay={0.4} inView={false}>
              <div className="overflow-hidden rounded-[22px] shadow-[0_16px_64px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]">
                <DeptPhoto
                  src={dept.imageUrl}
                  alt={dept.name}
                  className="aspect-[4/3] w-full object-cover object-top"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Mobile: badge + title → photo → description ── */}
      <div className="lg:hidden">
        {/* Badge + title */}
        <div className="container-v2 pb-6 pt-24">
          <Stagger className="flex flex-col items-start" stagger={0.12} delay={0.15} inView={false}>
            <StaggerItem mode="up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4">
                <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-white">
                  {t("hero.badge_institute")}
                </span>
                <span className="text-[12px] text-white/55">{t("hero.badge_dept")}</span>
              </div>
            </StaggerItem>
            <StaggerItem mode="up">
              <h1
                className="font-display font-black text-white"
                style={{ fontSize: "clamp(2rem, 7vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
              >
                {dept.name}
              </h1>
            </StaggerItem>
          </Stagger>
        </div>

        {/* Photo */}
        <Reveal mode="fade" delay={0.35} inView={false}>
          <div className="relative overflow-hidden">
            <DeptPhoto
              src={dept.imageUrl}
              alt={dept.name}
              className="h-[240px] w-full object-cover object-top sm:h-[300px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080e]/80 via-transparent to-transparent" />
          </div>
        </Reveal>

        {/* Description */}
        <Reveal mode="up" delay={0.1} className="container-v2 py-6">
          <p className="text-[14px] leading-[1.8] text-white/50">
            {dept.description}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
