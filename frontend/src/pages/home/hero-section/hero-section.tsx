import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { publicRqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "../events-section/locales";

function HeroQuickLink({ q }: { q: { label: string; to: string } }) {
  return (
    <Link
      to={q.to}
      className="group inline-flex items-center gap-1 rounded-[8px] border border-ui bg-surface-md px-3 py-1.5 text-[11px] font-medium text-muted backdrop-blur-md transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/[0.10] hover:text-primary sm:gap-1.5 sm:rounded-[10px] sm:px-4 sm:py-2 sm:text-[14px]"
    >
      {q.label}
      <span className="text-subtle transition-colors group-hover:text-violet-500">›</span>
    </Link>
  );
}

export default function HeroSection({ className = "" }: { className?: string }) {
  useLoadNamespace("home", loadTranslations);
  const { t } = useTranslation("home");
  const QUICK_LINKS = [
    { label: t("heroSection.quickBachelor"), to: ROUTES.BACHELOR },
    { label: t("heroSection.quickMaster"), to: ROUTES.MASTER },
  ];
  const sliderQuery = publicRqClient.useQuery("get", "/core/main-slider-items/", {});
  const slides = (sliderQuery.data ?? []) as { image: string }[];

  const currentRef = useRef(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const switchTo = (next: number) => {
    const prev = currentRef.current;
    if (prev === next) return;
    const prevSlide = slideRefs.current[prev];
    const nextSlide = slideRefs.current[next];
    if (prevSlide) prevSlide.style.opacity = "0";
    if (nextSlide) nextSlide.style.opacity = "1";
    dotRefs.current[prev]?.setAttribute("data-active", "false");
    dotRefs.current[next]?.setAttribute("data-active", "true");
    currentRef.current = next;
  };

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => switchTo((currentRef.current + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  // Disable parallax on mobile — JS scroll transforms are too expensive
  const mobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  const { scrollY } = useScroll();
  const sliderY = useTransform(scrollY, [0, 800], [0, mobile ? 0 : 140]);
  const sliderScale = useTransform(scrollY, [0, 800], [1.05, mobile ? 1.05 : 1.15]);
  const contentY = useTransform(scrollY, [0, 600], [0, mobile ? 0 : -90]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, mobile ? 1 : 0.15]);
  const indicatorOpacity = useTransform(scrollY, [0, 200], [1, mobile ? 1 : 0]);

  return (
    <section
      className={clsx(
        "dark-context sticky top-0 z-0 h-svh min-h-[600px] w-full overflow-hidden lg:min-h-[720px]",
        className
      )}
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: sliderY, scale: sliderScale, willChange: "transform" }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{
              opacity: i === 0 ? 1 : 0,
              transition: "opacity 1400ms cubic-bezier(0.4, 0, 0.2, 1)",
              willChange: "opacity",
            }}
          >
            <img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
            />
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
        className="pointer-events-none absolute -left-[15%] -top-[20%] hidden h-[600px] w-[600px] rounded-full md:block"
        style={{ background: "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[15%] -right-[10%] hidden h-[500px] w-[500px] rounded-full md:block"
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
              fontSize: "clamp(2rem, 9vw, 7rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.92,
              marginBottom: 20,
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}
          >
            <span className="text-grad">{t("heroSection.heading")}</span>
            <br />
            {t("heroSection.headingAccent")}
          </h1>

          <p
            className="mx-auto px-2 text-[13px] text-muted sm:px-0 sm:text-[17px]"
            style={{ lineHeight: 1.55, maxWidth: 560, marginBottom: 28 }}
          >
            {t("heroSection.subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          <Link
            to={ROUTES.BACHELOR}
            className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-3 text-[14px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95 sm:rounded-[14px] sm:px-9 sm:py-4 sm:text-[17px]"
          >
            {t("heroSection.ctaEntrant")}
            <span aria-hidden>→</span>
          </Link>
          <Link
            to="/#programs"
            className="inline-flex items-center gap-2 rounded-[12px] border border-ui bg-surface-lg px-5 py-3 text-[14px] font-semibold text-primary backdrop-blur-md transition-all duration-200 hover:bg-surface-xl active:scale-95 sm:rounded-[14px] sm:px-9 sm:py-4 sm:text-[17px]"
            onClick={(e) => {
              const el = document.getElementById("programs");
              if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
            }}
          >
            {t("heroSection.ctaPrograms")}
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-2.5">
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
              ref={(el) => { dotRefs.current[i] = el; }}
              data-active={i === 0 ? "true" : "false"}
              onClick={() => switchTo(i)}
              aria-label={t("heroSection.slideLabel", { n: i + 1 })}
              className="h-1 rounded-full transition-all duration-300 data-[active=true]:w-10 data-[active=true]:bg-gradient-to-r data-[active=true]:from-violet-500 data-[active=true]:to-blue-500 data-[active=false]:w-2 data-[active=false]:bg-violet-500/25 hover:data-[active=false]:bg-violet-500/50"
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}
