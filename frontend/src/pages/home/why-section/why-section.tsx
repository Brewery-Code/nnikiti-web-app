import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/shared/ui";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "../events-section/locales";

export default function WhySection({ className = "" }: { className?: string }) {
  useLoadNamespace("home", loadTranslations);
  const { t } = useTranslation("home");
  type Advantage = { title: string; desc: string };
  const rawAdvantages = t("whySection.advantages", { returnObjects: true });
  const ADVANTAGES: Advantage[] = Array.isArray(rawAdvantages) ? rawAdvantages : [];
  return (
    <section
      className={clsx("relative overflow-hidden py-16 lg:py-24", className)}
      style={{ background: "linear-gradient(180deg, #08090f 0%, #0d0e1a 55%, #08090f 100%)" }}
    >
      {/* ambient glows */}
      <div aria-hidden className="pointer-events-none absolute hidden md:block"
        style={{ top: "5%", left: "-8%", width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(166,132,255,0.07) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div aria-hidden className="pointer-events-none absolute hidden md:block"
        style={{ bottom: "5%", right: "-8%", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(81,162,255,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="container-v2 relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">

          {/* ── Left: photo collage ──────────────────────────────────────── */}
          <Reveal mode="left" amount={0.15}>
            <div className="relative">

              {/* 3-photo grid */}
              <div
                className="grid gap-2.5 sm:gap-3"
                style={{
                  gridTemplateColumns: "1.65fr 1fr",
                  gridTemplateRows: "1fr 1fr",
                  height: "clamp(260px, 50vw, 520px)",
                }}
              >
                {/* Main photo — spans 2 rows */}
                <div className="row-span-2 overflow-hidden rounded-[22px]">
                  <img
                    src="/images/students-lecture.jpg"
                    alt=""
                    className="block h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                </div>

                {/* Sport photo */}
                <div className="overflow-hidden rounded-[22px]">
                  <img
                    src="/images/students-sport.jpg"
                    alt=""
                    className="block h-full w-full object-cover transition-transform duration-700 hover:scale-[1.06]"
                  />
                </div>

                {/* Workshop photo */}
                <div className="relative overflow-hidden rounded-[22px]">
                  <img
                    src="/images/noosphere-workshop.jpg"
                    alt=""
                    className="block h-full w-full object-cover transition-transform duration-700 hover:scale-[1.06]"
                  />
                  {/* overlay label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090f]/80 to-transparent" />
                  <p className="absolute bottom-3 left-3 text-[10px] font-medium text-white/50">
                    {t("whySection.workshopCaption")}
                  </p>
                </div>
              </div>


            </div>
          </Reveal>

          {/* ── Right: heading + advantages ─────────────────────────────── */}
          <Reveal mode="right" amount={0.15}>
            <div className="lg:pl-2">

              <h2
                className="font-display font-black text-white"
                style={{
                  fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                  marginBottom: "2.75rem",
                }}
              >
                {t("whySection.heading")}{" "}
                <span className="text-grad">{t("whySection.headingAccent")}</span>
              </h2>

              <div>
                {ADVANTAGES.map((item, i) => (
                  <div
                    key={item.title}
                    className="group flex gap-5 border-t border-white/[0.06] py-[1.35rem] last-of-type:border-b"
                  >
                    {/* large muted number */}
                    <span
                      className="flex-shrink-0 font-display font-black leading-none transition-colors duration-200 group-hover:text-violet-500/40"
                      style={{
                        fontSize: "2rem",
                        letterSpacing: "-0.05em",
                        color: "rgba(255,255,255,0.18)",
                        marginTop: "-2px",
                        minWidth: "2.4rem",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3
                        className="font-display font-bold text-white/90 transition-colors duration-150 group-hover:text-white"
                        style={{ fontSize: "0.95rem", letterSpacing: "-0.02em", marginBottom: 6, lineHeight: 1.35 }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-[14px] leading-[1.72] text-white/38">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
