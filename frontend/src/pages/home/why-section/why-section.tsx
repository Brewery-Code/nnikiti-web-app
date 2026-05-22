import clsx from "clsx";
import { Reveal } from "@/shared/ui";

const ADVANTAGES = [
  {
    title: "Навчання, яке відповідає ринку праці",
    desc: "Програми розроблені разом із SoftServe, EPAM та GlobalLogic. Реальні проєкти, актуальний стек технологій і викладачі-практики з індустрії.",
  },
  {
    title: "Навчання за кордоном за програмою Erasmus+",
    desc: "Партнерства з університетами Польщі, Чехії, Литви та ще 15 країн ЄС. Гранти покривають проживання, переїзд та навчання.",
  },
  {
    title: "Стажування ще під час першого-другого курсу",
    desc: "Компанії-партнери запрошують студентів на оплачувану практику. Більшість випускників мають офер ще до захисту диплому.",
  },
  {
    title: "Університет заснований у 1922 році",
    desc: "Понад 100 років академічної традиції, 29 000 випускників по всьому світу та стабільний Топ-44 рейтинг серед ЗВО України.",
  },
];

export default function WhySection({ className = "" }: { className?: string }) {
  return (
    <section
      className={clsx("relative overflow-hidden py-16 lg:py-24", className)}
      style={{ background: "linear-gradient(180deg, #08090f 0%, #0d0e1a 55%, #08090f 100%)" }}
    >
      {/* ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: "5%", left: "-8%",
          width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(166,132,255,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          bottom: "5%", right: "-8%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(81,162,255,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
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
                  height: "clamp(340px, 50vw, 520px)",
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
                    Воркшоп з IT-компаніями
                  </p>
                </div>
              </div>

              {/* Floating stat badge */}
              <div
                className="absolute -bottom-4 left-[calc(62.5%+8px)] right-0 rounded-[18px] px-5 py-4"
                style={{
                  background: "rgba(8,9,15,0.82)",
                  border: "1px solid rgba(166,132,255,0.22)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <p
                  className="font-display font-black text-white"
                  style={{ fontSize: "1.55rem", letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  Топ-44
                </p>
                <p className="mt-1 text-[10px] leading-[1.5] text-white/35">
                  університет України з 1922 року
                </p>
              </div>

            </div>
          </Reveal>

          {/* ── Right: heading + advantages ─────────────────────────────── */}
          <Reveal mode="right" amount={0.15}>
            <div className="lg:pl-2">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-500">
                — Наші переваги
              </p>
              <h2
                className="font-display font-black text-white"
                style={{
                  fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                  marginBottom: "2.75rem",
                }}
              >
                Чому обирають{" "}
                <span className="text-grad">НУВГП</span>
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
                      <p className="text-[13px] leading-[1.72] text-white/38">
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
