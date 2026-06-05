import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/shared/ui";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "../hero-section/locales";

type Chapter = { label: string; title: string; paragraphs: string[] };

function Chapter({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <div className="grid grid-cols-[64px_1fr] gap-8 py-12 md:grid-cols-[120px_1fr] md:gap-12 lg:py-16">
      <div className="flex flex-col items-start pt-1">
        <span
          className="font-display text-grad"
          style={{
            fontWeight: 900,
            fontSize: "clamp(28px, 2.5vw, 48px)",
            letterSpacing: "-0.04em",
            opacity: 0.45,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div>
        <h3
          className="font-display mb-6 font-black leading-tight text-primary"
          style={{
            fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {chapter.title}
        </h3>
        <div className="flex flex-col gap-4">
          {chapter.paragraphs.map((p, i) => (
            <p
              key={i}
              className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutSection({ className }: { className?: string }) {
  useLoadNamespace("history", loadTranslations);
  const { t } = useTranslation("history");

  const chapters = t("about.chapters", { returnObjects: true }) as Chapter[];

  return (
    <section className={clsx("py-12 sm:py-16 lg:py-20", className)}>
      <div className="container-v2">
<Reveal mode="up" className="mb-10 lg:mb-14">
          <h2
            className="font-display font-black text-primary"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.04em",
            }}
          >
            {t("about.sectionTitle")}{" "}
            <span className="text-grad">{t("about.sectionTitleAccent")}</span>
          </h2>
        </Reveal>

        {Array.isArray(chapters) &&
          chapters.map((chapter, i) => (
            <Reveal key={i} mode="up" amount={0.1}>
              <Chapter chapter={chapter} index={i} />
            </Reveal>
          ))}
      </div>
    </section>
  );
}
