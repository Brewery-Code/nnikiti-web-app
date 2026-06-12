import { useTranslation } from "react-i18next";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { type ThemeItem } from "../model";

export function CrossThemes() {
  const { t } = useTranslation("strategy");
  const items = t("themes.items", { returnObjects: true }) as ThemeItem[];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <Reveal mode="up" className="mb-10 text-center lg:mb-14">
          <h2
            className="font-display font-black text-primary"
            style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
          >
            {t("themes.title")} <span className="text-grad">{t("themes.titleAccent")}</span>
          </h2>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08} amount={0.05}>
          {Array.isArray(items) && items.map((item, i) => (
            <StaggerItem
              key={i}
              mode="up"
              className="grad-border relative overflow-hidden rounded-[20px] bg-surface p-5 backdrop-blur-xl sm:p-6"
            >
              <span className="text-grad mb-4 block" style={{ fontSize: "1.7rem" }}>
                {item.icon}
              </span>
              <h3
                className="font-display mb-2 font-bold text-primary"
                style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}
              >
                {item.title}
              </h3>
              <p className="text-[13px] leading-snug text-muted">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
