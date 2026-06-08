import clsx from "clsx";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/shared/ui";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "../events-section/locales";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

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
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">

          {/* ── Photo collage ──────────────────────────────────────── */}
          <Reveal mode="left" amount={0.15}>
            <div className="relative">

              {/* Mobile: big photo + 2 small below */}
              <div className="flex flex-col gap-2 sm:hidden" style={{ height: "clamp(260px, 72vw, 360px)" }}>
                <div className="min-h-0 flex-[1.4] overflow-hidden rounded-[18px]">
                  <img src="/images/students-lecture.jpg" alt=""
                    className="block h-full w-full object-cover" />
                </div>
                <div className="flex min-h-0 flex-1 gap-2">
                  <div className="flex-1 overflow-hidden rounded-[18px]">
                    <img src="/images/students-sport.jpg" alt=""
                      className="block h-full w-full object-cover" />
                  </div>
                  <div className="relative flex-1 overflow-hidden rounded-[18px]">
                    <img src="/images/noosphere-workshop.jpg" alt=""
                      className="block h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090f]/70 to-transparent" />
                  </div>
                </div>
              </div>

              {/* sm+: original 3-photo collage */}
              <div
                className="hidden gap-2.5 sm:grid sm:gap-3"
                style={{
                  gridTemplateColumns: "1.65fr 1fr",
                  gridTemplateRows: "1fr 1fr",
                  height: "clamp(280px, 50vw, 520px)",
                }}
              >
                <div className="row-span-2 overflow-hidden rounded-[22px]">
                  <img src="/images/students-lecture.jpg" alt=""
                    className="block h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
                </div>
                <div className="overflow-hidden rounded-[22px]">
                  <img src="/images/students-sport.jpg" alt=""
                    className="block h-full w-full object-cover transition-transform duration-700 hover:scale-[1.06]" />
                </div>
                <div className="relative overflow-hidden rounded-[22px]">
                  <img src="/images/noosphere-workshop.jpg" alt=""
                    className="block h-full w-full object-cover transition-transform duration-700 hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090f]/80 to-transparent" />
                </div>
              </div>

            </div>
          </Reveal>

          {/* ── Heading + advantages ─────────────────────────────── */}
          <div className="lg:pl-2">
            <Reveal mode="up" amount={0.2}>
              <h2
                className="font-display font-black text-white"
                style={{
                  fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                  marginBottom: "2.25rem",
                }}
              >
                {t("whySection.heading")}{" "}
                <span className="text-grad">{t("whySection.headingAccent")}</span>
              </h2>
            </Reveal>

            <motion.div
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {ADVANTAGES.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="group flex gap-5 border-t border-white/[0.06] py-[1.35rem] last-of-type:border-b"
                >
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
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
