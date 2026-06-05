import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/shared/ui";
import { PageTransition } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";

export function ErrorPage() {
  useLoadNamespace("error", loadTranslations);
  const { t } = useTranslation("error");

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <section className="relative flex min-h-svh w-full items-center justify-center overflow-hidden px-5 py-24 text-center">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] -top-[10%] h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-[15%] -right-[10%] h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(81,162,255,0.16) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ x: [0, -25, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
        />

        <div className="container-v2 relative z-[1] flex flex-col items-center">
          <Reveal mode="scale" delay={0.4} inView={false}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
              <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
                {t("badge")}
              </span>
              <span className="text-[12px] text-primary/70">{t("badgeSub")}</span>
            </div>
          </Reveal>

          <Reveal mode="scale" delay={0.5} inView={false}>
            <h1
              className="font-display font-black"
              style={{
                fontSize: "clamp(4rem, 14vw, 12rem)",
                letterSpacing: "-0.06em",
                lineHeight: 0.9,
                textShadow: "0 4px 40px rgba(0,0,0,0.5)",
              }}
            >
              <span className="text-grad-animated">{t("heading")}</span>
            </h1>
          </Reveal>

          <Reveal mode="up" delay={0.65} inView={false}>
            <p
              className="mx-auto mt-6 text-[15px] text-muted sm:text-[17px]"
              style={{ lineHeight: 1.7, maxWidth: 480 }}
            >
              {t("description")}
            </p>
          </Reveal>

          <Reveal mode="up" delay={0.8} inView={false}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="sheen inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-7 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95 sm:text-[17px]"
              >
                {t("refresh")}
              </button>
              <Link
                to={ROUTES.HOME}
                className="inline-flex items-center gap-2 rounded-[14px] border border-ui bg-surface-lg px-7 py-3.5 text-[15px] font-semibold text-primary backdrop-blur-md transition-all duration-200 hover:bg-surface-xl active:scale-95 sm:text-[17px]"
              >
                {t("home")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}

export const Component = ErrorPage;
