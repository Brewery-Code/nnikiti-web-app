import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";
import { publicRqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";

const QUICK_LINKS = [
  { label: "Додипломна освіта", to: ROUTES.UNDERGRADUATE },
  { label: "Бакалаврат", to: ROUTES.BACHELOR },
  { label: "Магістратура", to: ROUTES.MASTER },
  { label: "Аспірантура", to: ROUTES.POSTGRADUATE },
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
      className="group inline-flex items-center gap-1.5 rounded-[10px] border border-ui bg-surface-md px-4 py-2 text-[14px] font-medium text-muted backdrop-blur-md transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/[0.10] hover:text-primary"
    >
      {q.label}
      <span className="text-subtle transition-colors group-hover:text-violet-500">›</span>
    </Link>
  );
}

export default function HeroSection({ className = "" }: { className?: string }) {
  const sliderQuery = publicRqClient.useQuery("get", "/core/main-slider-items/");
  const slides = sliderQuery.data?.length ? sliderQuery.data : FALLBACK_SLIDES;

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => setCurrentImg((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const { scrollY } = useScroll();
  const sliderY = useTransform(scrollY, [0, 800], [0, 140]);
  const sliderScale = useTransform(scrollY, [0, 800], [1.05, 1.15]);
  const contentY = useTransform(scrollY, [0, 600], [0, -90]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0.15]);
  const indicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section
      className={clsx(
        "dark-context sticky top-0 z-0 h-screen min-h-[600px] w-full overflow-hidden lg:min-h-[720px]",
        className
      )}
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: sliderY, scale: sliderScale, willChange: "auto" }}
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
            <img src={slide.image} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#08090f]/80 via-[#08090f]/40 to-[#08090f]" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(8,9,15,0.25) 0%, rgba(8,9,15,0.85) 100%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[15%] -top-[20%] h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[15%] -right-[10%] h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(81,162,255,0.16) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <motion.div
        className="relative z-[2] mx-auto flex h-full max-w-[1280px] flex-col items-center justify-center px-5 text-center sm:px-8 lg:px-10"
        style={{ y: contentY }}
      >
        <motion.div className="flex flex-col items-center" style={{ opacity: contentOpacity }}>
          <h1
            className="font-display font-black text-primary"
            style={{
              fontSize: "clamp(2.4rem, 7vw, 7rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.92,
              marginBottom: 24,
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}
          >
            <span className="text-grad">Майбутнє</span>
            <br />
            створюється тут
          </h1>

          <p
            className="mx-auto text-[15px] text-muted sm:text-[17px]"
            style={{ lineHeight: 1.7, maxWidth: 560, marginBottom: 32 }}
          >
            Навчально-науковий інститут кібернетики, інформаційних технологій та інженерії НУВГП
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.BACHELOR}
            className="inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95 sm:px-9 sm:py-4 sm:text-[17px]"
          >
            Абітурієнту
            <span aria-hidden>→</span>
          </Link>
          <Link
            to={ROUTES.BACHELOR}
            className="inline-flex items-center gap-2 rounded-[14px] border border-ui bg-surface-lg px-6 py-3.5 text-[15px] font-semibold text-primary backdrop-blur-md transition-all duration-200 hover:bg-surface-xl active:scale-95 sm:px-9 sm:py-4 sm:text-[17px]"
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
                  : "w-2 bg-violet-500/25 hover:bg-violet-500/50"
              )}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}
