import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/model/routes";
import { Reveal } from "@/shared/ui";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "../hero-section/locales";

const PDF_PATH = "/nnikiti-25-rokiv.pdf";

export default function ClosingSection({ className }: { className?: string }) {
  useLoadNamespace("history", loadTranslations);
  const { t } = useTranslation("history");

  return (
    <section className={clsx("border-t border-white/[0.07]", className)}>
      <div className="container-v2 py-16 sm:py-24 lg:py-32">
        <div className="grid gap-fluid-2xl lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal mode="left" amount={0.2}>
            <h2
              className="font-display leading-none text-primary"
              style={{
                fontWeight: 900,
                fontSize: "clamp(2.2rem, 8vw, 8rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {t("closing.title1")}
              <br />
              <span className="text-grad">{t("closing.title2")}</span>
            </h2>
          </Reveal>

          <Reveal mode="right" amount={0.15} className="flex flex-col gap-10 lg:max-w-sm lg:pb-2">
            <div className="flex flex-col gap-4">
              <p className="text-[15px] leading-relaxed text-muted sm:text-[17px]">
                {t("closing.description")}
              </p>
              <blockquote className="border-l-2 border-violet-500/50 pl-4">
                <p className="text-[14px] italic leading-relaxed text-subtle">
                  {t("closing.quote")}
                </p>
              </blockquote>
            </div>

            {/* Download PDF */}
            <a
              href={PDF_PATH}
              download
              className="group flex items-center gap-4 rounded-[18px] border border-white/[0.08] p-4 transition-all duration-200 hover:border-violet-500/25 hover:bg-violet-500/[0.06] active:scale-[0.98]"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[12px] transition-colors duration-200 group-hover:bg-violet-500/20"
                style={{ background: "rgba(139,92,246,0.15)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-white/80 group-hover:text-white transition-colors duration-150">
                  {t("closing.download")}
                </p>
                <p className="text-[11px] text-white/35 mt-0.5">{t("closing.downloadTitle")}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 transition-colors duration-200 group-hover:stroke-violet-400">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/department/1"
                className="inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95"
              >
                {t("closing.depts")} <span aria-hidden>→</span>
              </Link>
              <Link
                to={ROUTES.ALUMNI}
                className="inline-flex items-center gap-2 rounded-[14px] border border-white/15 bg-surface-md px-6 py-3.5 text-[15px] font-semibold text-primary backdrop-blur-md transition-all duration-200 hover:bg-surface-xl active:scale-95"
              >
                {t("closing.alumni")} <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
