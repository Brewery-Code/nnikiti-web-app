import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContactsData } from "@/shared/hooks";
import { ROUTES } from "@/shared/model/routes";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";

export function ContactsHero() {
  const { t } = useTranslation("contacts");
  const { deaneryData } = useContactsData();

  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container-v2 relative z-[1]">
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <Stagger stagger={0.1} delay={0.35} inView={false}>
            <StaggerItem mode="scale">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
                <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
                  ННІКІТІ
                </span>
                <span className="text-[12px] text-primary/70">{t("hero.badge")}</span>
              </div>
            </StaggerItem>

            <StaggerItem
              as="h1"
              mode="up"
              className="font-display font-black text-primary"
              style={{
                fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
              }}
            >
              {t("hero.titleLead")} <span className="text-grad-animated">{t("hero.titleAccent")}</span>
            </StaggerItem>

            <StaggerItem
              as="p"
              mode="up"
              className="mt-6 max-w-xl text-[15px] text-muted sm:text-[17px]"
              style={{ lineHeight: 1.55 }}
            >
              {t("hero.description")}
            </StaggerItem>
          </Stagger>

          <Reveal mode="right" delay={0.65} inView={false} className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={`mailto:${deaneryData.dailyEducation.email}`}
              className="inline-flex items-center gap-2 rounded-[14px] border border-white/15 bg-surface-md px-6 py-3.5 text-[15px] font-semibold text-primary backdrop-blur-md transition-all duration-200 hover:bg-surface-xl active:scale-95"
            >
              <span aria-hidden>✉</span> {t("hero.writeEmail")}
            </a>
            <Link
              to={ROUTES.ASK_QUESTION}
              className="sheen inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95"
            >
              {t("hero.askQuestion")}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
