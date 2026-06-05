import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/model/routes";
import { Reveal } from "@/shared/ui";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "../events-section/locales";

export default function EntrantCtaSection({
  className = "",
}: {
  className?: string;
}) {
  useLoadNamespace("home", loadTranslations);
  const { t } = useTranslation("home");
  return (
    <section
      className={clsx("py-12 lg:py-20", className)}
    >
      <div className="container-v2">
        <Reveal
          mode="scale"
          amount={0.2}
          className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border px-6 py-10 sm:rounded-[32px] sm:px-10 sm:py-12 sm:gap-8 md:flex-row md:items-center md:gap-10 lg:px-[72px] lg:py-16 lg:gap-12"
          style={{
            background: "var(--bg-cta)",
            borderColor: "var(--border-cta)",
          }}
        >
          {/* Glow accents */}
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              top: "-40%",
              left: "-10%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(166,132,255,0.2) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              bottom: "-40%",
              right: "-5%",
              width: 350,
              height: 350,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(81,162,255,0.2) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative z-[1]">
            <span
              className="inline-flex items-center gap-1.5"
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "4px 12px",
                borderRadius: 999,
                background:
                  "linear-gradient(90deg,rgba(166,132,255,0.2),rgba(81,162,255,0.2))",
                border: "1px solid rgba(166,132,255,0.35)",
                color: "#c4a8ff",
                marginBottom: 20,
              }}
            >
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                fill="none"
                style={{ width: 11, height: 11, flexShrink: 0 }}
              >
                <path d="M8 1L9.6 6H15L10.7 9.3L12.3 14.3L8 11L3.7 14.3L5.3 9.3L1 6H6.4L8 1Z" fill="currentColor" />
              </svg>
              {t("entrantCta.badge")}
            </span>
            <h2
              className="font-display font-black text-primary"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              {t("entrantCta.heading")}{" "}
              <span className="text-grad">{t("entrantCta.headingAccent")}</span>
            </h2>
            <p
              className="text-[16px] text-primary/70"
              style={{ lineHeight: 1.65, maxWidth: 440 }}
            >
              {t("entrantCta.description")}
            </p>
          </div>

          <div className="relative z-[1] flex w-full flex-shrink-0 flex-col gap-3 md:w-auto">
            <Link
              to={ROUTES.BACHELOR}
              className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-7 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.2)] transition-all duration-200 hover:scale-[1.02] active:scale-95 sm:px-9 sm:py-4 sm:text-[17px]"
            >
              {t("entrantCta.apply")} <span aria-hidden>→</span>
            </Link>
            <Link
              to={ROUTES.BACHELOR}
              className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-ui bg-transparent px-7 py-3.5 text-[15px] font-semibold text-primary/60 transition-all duration-200 hover:text-primary active:scale-95 sm:px-9 sm:py-4 sm:text-[17px]"
            >
              {t("entrantCta.learnMore")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
