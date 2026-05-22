import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";
import { publicRqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";

const QUICK_LINKS = [
  { label: "Абітурієнтам", to: ROUTES.BACHELOR },
  { label: "Студентам", to: ROUTES.HOME },
  { label: "Випускникам", to: ROUTES.ALUMNI },
  { label: "Іноземним", to: ROUTES.HOME },
];

const FALLBACK_SLIDES = [
  { image: "/images/students-stage.jpg" },
  { image: "/images/students-lecture.jpg" },
  { image: "/images/students-christmas.jpg" },
];

function HeroQuickLink({ q }: { q: { label: string; to: string } }) {
  return (
    <Link
      to={q.to}
      className="group inline-flex items-center gap-1.5 rounded-[10px] border border-white/[0.10] bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-white/55 backdrop-blur-md transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/[0.10] hover:text-white"
    >
      {q.label}
      <span className="text-white/30 transition-colors group-hover:text-violet-500">
        ›
      </span>
    </Link>
  );
}

export default function HeroSection({ className = "" }: { className?: string }) {
  const sliderQuery = publicRqClient.useQuery("get", "/core/main-slider-items/");
  const slides = sliderQuery.data?.length ? sliderQuery.data : FALLBACK_SLIDES;

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setCurrentImg((p) => (p + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  // Parallax scroll values (apply within sticky hero box)
  const { scrollY } = useScroll();
  const sliderY = useTransform(scrollY, [0, 800], [0, 140]);
  const sliderScale = useTransform(scrollY, [0, 800], [1.05, 1.15]);
  const contentY = useTransform(scrollY, [0, 600], [0, -90]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0.15]);
  const cardsY = useTransform(scrollY, [0, 600], [0, -50]);
  const indicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section
      className={clsx(
        "sticky top-0 z-0 h-screen min-h-[600px] w-full overflow-hidden lg:min-h-[720px]",
        className
      )}
    >
      {/* ── Full-bleed slider with crossfade + parallax ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: sliderY, scale: sliderScale }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            aria-hidden={i !== currentImg}
            className={clsx(
              "absolute inset-0 transition-opacity duration-[1500ms] ease-out",
              i === currentImg ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </motion.div>

      {/* ── Dark overlay layers for legibility ── */}
      {/* vertical fade (top dim, mid clear, deep bottom for fade-out into next section) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090f]/80 via-[#08090f]/40 to-[#08090f]" />
      {/* radial vignette focusing on center */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(8,9,15,0.25) 0%, rgba(8,9,15,0.85) 100%)",
        }}
      />
      {/* brand color glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[15%] -top-[20%] h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[15%] -right-[10%] h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(81,162,255,0.16) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Centered content ── */}
      <motion.div
        className="relative z-[2] mx-auto flex h-full max-w-[1280px] flex-col items-center justify-center px-5 text-center sm:px-8 lg:px-10"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Top 44 badge */}
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md"
        >
          <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-white">
            ТОП 44
          </span>
          <span className="text-[12px] text-white/70">
            університетів України
          </span>
        </div>

        <h1
          className="font-display font-black text-white"
          style={{
            fontSize: "clamp(2.4rem, 7vw, 7rem)",
            letterSpacing: "-0.05em",
            lineHeight: 0.92,
            marginBottom: 24,
            textShadow: "0 4px 40px rgba(0,0,0,0.5)",
          }}
        >
          <span className="text-grad">Кожен</span> великий
          <br />
          стрибок
        </h1>

        <p
          className="mx-auto text-[14px] text-white/65 sm:text-[16px]"
          style={{ lineHeight: 1.7, maxWidth: 560, marginBottom: 32 }}
        >
          Національний університет водного господарства та природокористування —
          інженерія, ІТ, екологія та водне господарство.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.BACHELOR}
            className="inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95 sm:px-9 sm:py-4 sm:text-[15px]"
          >
            Подати заявку
            <span aria-hidden>→</span>
          </Link>
          <Link
            to={ROUTES.BACHELOR}
            className="inline-flex items-center gap-2 rounded-[14px] border border-white/20 bg-white/[0.06] px-6 py-3.5 text-[14px] font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/[0.12] active:scale-95 sm:px-9 sm:py-4 sm:text-[15px]"
          >
            Програми
          </Link>
        </div>

        <div className="mt-8 hidden flex-wrap justify-center gap-2.5 sm:flex">
          {QUICK_LINKS.map((q) => (
            <HeroQuickLink key={q.label} q={q} />
          ))}
        </div>
      </motion.div>

      {/* ── Floating glass cards — positioned over the slider ── */}
      {/* Top-right: 3.4K+ students */}
      <motion.div
        className="grad-border card-hover absolute z-[3] hidden lg:block"
        style={{
          top: "18%",
          right: "5%",
          padding: "16px 22px",
          borderRadius: 16,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(81,162,255,0.20)",
          y: cardsY,
        }}
      >
        <div
          className="font-display font-extrabold text-blue-500"
          style={{ fontSize: "1.6rem", letterSpacing: "-0.03em" }}
        >
          3.4K+
        </div>
        <div className="mt-0.5 text-[11px] text-white/50">студентів</div>
      </motion.div>

      {/* Mid-right: 40+ partners */}
      <motion.div
        className="grad-border card-hover absolute z-[3] hidden lg:flex"
        style={{
          top: "44%",
          right: "8%",
          padding: "12px 18px",
          borderRadius: 14,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          alignItems: "center",
          gap: 8,
          y: cardsY,
        }}
      >
        <span className="text-violet-500" style={{ fontSize: 16 }}>★</span>
        <span className="text-[12px] font-bold text-violet-400">
          40+ партнерів
        </span>
      </motion.div>

      {/* Bottom-left: Top 1 у Рівному */}
      <motion.div
        className="grad-border card-hover absolute z-[3] hidden lg:block"
        style={{
          bottom: "12%",
          left: "5%",
          padding: "18px 24px",
          borderRadius: 18,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 12px 40px rgba(166,132,255,0.25)",
          y: cardsY,
        }}
      >
        <div
          className="font-display font-black"
          style={{ fontSize: "2.2rem", letterSpacing: "-0.04em", lineHeight: 1 }}
        >
          <span className="text-grad">Top 1</span>
        </div>
        <div className="mt-1 text-[11px] uppercase tracking-[0.1em] text-white/45">
          у Рівному
        </div>
      </motion.div>

      {/* Top-left: Заснований 1922 */}
      <motion.div
        className="absolute z-[3] hidden lg:flex"
        style={{
          top: "16%",
          left: "5%",
          padding: "10px 16px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          alignItems: "center",
          gap: 10,
          y: cardsY,
        }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45"
        >
          Засн.
        </span>
        <span className="font-display text-[14px] font-extrabold text-white">
          1922
        </span>
      </motion.div>

      {/* ── Slide indicator dots at bottom ── */}
      {slides.length > 1 && (
        <motion.div
          className="absolute bottom-8 left-1/2 z-[3] flex -translate-x-1/2 gap-2"
          style={{ opacity: indicatorOpacity }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImg(i)}
              aria-label={`Slide ${i + 1}`}
              className={clsx(
                "h-1 rounded-full transition-all duration-300",
                i === currentImg
                  ? "w-10 bg-gradient-to-r from-violet-500 to-blue-500"
                  : "w-2 bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}
