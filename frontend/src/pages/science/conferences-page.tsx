import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { PAGE_HERO_IMAGE } from "./model";
import { ScienceHero } from "./hero-section";

type DocType = "pdf" | "docx";

const DOCUMENTS: { name: string; file: string; type: DocType }[] = [
  {
    name: "Звіт з інноваційної діяльності. Форма інновації КТЕК 2025",
    file: "Звіт з інноваційної діяльності Форма інновації ктек 2025.pdf",
    type: "pdf",
  },
  {
    name: "Конференція ННІ АКОТ 2022",
    file: "Конференція ННІ АКОТ 2022.pdf",
    type: "pdf",
  },
  {
    name: "Конференція ННІ АКОТ 2022 (виправлена)",
    file: "Конференція ННІ АКОТ 2022_2v_випр_1.pdf",
    type: "pdf",
  },
  {
    name: "Стартап «GridHarmony» підкорює міжнародну арену на «Sikorsky Challenge Lviv 2026»",
    file: "Стартап «GridHarmony» підкорює міжнародну арену на «Sikorsky Challenge Lviv 2026».docx",
    type: "docx",
  },
  {
    name: "Тези конференції ННІ АКОТ 2022–2023 (виправлені)",
    file: "Тези КОНФ ННІ АКОТ__20122023_випр.pdf",
    type: "pdf",
  },
  {
    name: "Тези конференції ННІ АКОТ 2023",
    file: "Тези КОНФ ННІ АКОТ__2023.pdf",
    type: "pdf",
  },
  {
    name: "Тези конференції ННІКІТІ 2025",
    file: "Тези_КОНФ_ННІКІТІ_2025.pdf",
    type: "pdf",
  },
  {
    name: "Тези конференції ННІКІТІ 2025 (від 21.10.2025)",
    file: "Тези_КОНФ_ННІКІТІ_2025_від_21.10.2025.pdf",
    type: "pdf",
  },
];

function FileIcon({ type }: { type: DocType }) {
  const color = type === "pdf" ? "text-red-400" : "text-blue-400";
  const label = type === "pdf" ? "PDF" : "DOC";
  return (
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/5 text-[10px] font-bold tracking-wider ${color}`}>
      {label}
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-muted opacity-50 transition-opacity group-hover:opacity-100"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function DocumentsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <div className="mb-8">
          <h2 className="font-display text-[1.6rem] font-black text-primary sm:text-[2rem]">
            Збірник матеріалів
          </h2>
          <p className="mt-2 text-[15px] text-muted">
            Документи конференцій для завантаження
          </p>
        </div>

        <div className="grad-border overflow-hidden rounded-[20px] bg-surface backdrop-blur-xl">
          {DOCUMENTS.map((doc, i) => (
            <a
              key={doc.file}
              href={`/confirenses/${encodeURIComponent(doc.file)}`}
              download
              className={
                "group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/5" +
                (i !== DOCUMENTS.length - 1 ? " border-b border-white/5" : "")
              }
            >
              <FileIcon type={doc.type} />

              <span className="flex-1 text-[14px] leading-snug text-primary/80 transition-colors group-hover:text-primary">
                {doc.name}
              </span>

              <DownloadIcon />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConferencesPage() {
  const { t } = useTranslation("science");
  const loaded = useLoadNamespace("science", loadTranslations);

  const heroData = useMemo(
    () => ({
      heroImage: PAGE_HERO_IMAGE["conferences"],
      eyebrow: t("common.heroEyebrow"),
      title: t("pages.conferences.title"),
      gradientTitle: t("pages.conferences.gradientTitle"),
      intro: t("pages.conferences.intro"),
      activitiesTitle: "",
      activitiesIntro: "",
      activities: [],
    }),
    [t, loaded]
  );

  if (!loaded) return null;

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <ScienceHero data={heroData} currentKind="conferences" hideNav />
      <DocumentsSection />
    </PageTransition>
  );
}

export const Component = ConferencesPage;
