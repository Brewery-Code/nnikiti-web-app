import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { ROUTES } from "@/shared/model/routes";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { loadTranslations } from "./locales";

export type PartnersPageKind = "academic" | "business";

type PartnerProposition = {
  id: number;
  partner: string;
  name: string;
  description: string;
  type: string;
  direction: string;
  format: string;
  deadline: string;
  skills: string[];
  link: string;
};

type PartnersPageData = {
  title: string;
  gradientTitle: string;
  intro: string;
  heroImage: string;
  propositions: PartnerProposition[];
};

type PartnersLabels = {
  instituteName: string;
  navAcademic: string;
  navBusiness: string;
  heroEyebrow: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionIntro: string;
  results: string;
  search: string;
  searchPlaceholder: string;
  direction: string;
  type: string;
  all: string;
  reset: string;
  neededSkills: string;
  deadline: string;
  moreInfo: string;
  noResultsTitle: string;
  noResultsText: string;
};

const PAGE_HERO_IMAGE: Record<PartnersPageKind, string> = {
  academic: "/images/students-audience.jpg",
  business: "/images/noosphere-workshop.jpg",
};

const PROPOSITIONS_META: Record<
  PartnersPageKind,
  Array<{ deadline: string; link: string }>
> = {
  academic: [
    { deadline: "2026-05-24", link: "https://www.gallaudet.edu/" },
    { deadline: "2026-06-12", link: "https://erasmus-plus.ec.europa.eu/" },
    { deadline: "2026-05-31", link: "https://education.ec.europa.eu/" },
    { deadline: "2026-06-20", link: "https://www.openaire.eu/" },
  ],
  business: [
    { deadline: "2026-05-18", link: "https://career.softserveinc.com/" },
    { deadline: "2026-06-02", link: "https://www.gen.tech/careers/" },
    { deadline: "2026-05-29", link: "https://www.epam.com/careers" },
    { deadline: "2026-06-15", link: "https://ajax.systems/careers/" },
  ],
};

const NAV_ITEMS = [
  {
    kind: "academic",
    labelKey: "common.navAcademic",
    route: ROUTES.PARTNERS_ACADEMIC_MOBILITY,
  },
  {
    kind: "business",
    labelKey: "common.navBusiness",
    route: ROUTES.PARTNERS_BUSINESS,
  },
] satisfies Array<{ kind: PartnersPageKind; labelKey: string; route: string }>;

function PartnersHero({
  data,
  labels,
  currentKind,
}: {
  data: PartnersPageData;
  labels: PartnersLabels;
  currentKind: PartnersPageKind;
}) {
  const { t } = useTranslation("partners");

  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
      <img
        src={data.heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-[#08090f]/85 to-[#08090f]/60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <Stagger className="container-v2 relative z-[1]" stagger={0.08} delay={0.35} inView={false}>
        <StaggerItem mode="scale" className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
          <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
            ННІКІТІ
          </span>
          <span className="text-[12px] text-primary/70">{labels.heroEyebrow}</span>
        </StaggerItem>

        <StaggerItem
          as="h1"
          mode="up"
          className="font-display max-w-5xl font-black text-primary"
          style={{
            fontSize: "clamp(2rem, 6.5vw, 5.5rem)",
            letterSpacing: "-0.05em",
            lineHeight: 0.95,
          }}
        >
          {data.title} <span className="text-grad">{data.gradientTitle}</span>
        </StaggerItem>
        <StaggerItem
          as="p"
          mode="up"
          className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]"
          style={{ lineHeight: 1.7 }}
        >
          {data.intro}
        </StaggerItem>

        <StaggerItem mode="up" className="mt-10 flex flex-wrap gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.kind}
              to={item.route}
              className={clsx(
                "rounded-[12px] px-5 py-2.5 text-[14px] font-semibold transition-all duration-200",
                item.kind === currentKind
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)]"
                  : "grad-border bg-surface-md text-primary/60 backdrop-blur-md hover:bg-surface-xl hover:text-primary"
              )}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </StaggerItem>
      </Stagger>
    </section>
  );
}

function PropositionCard({
  proposition,
  labels,
  dateLocale,
}: {
  proposition: PartnerProposition;
  labels: PartnersLabels;
  dateLocale: string;
}) {
  const formattedDate = new Intl.DateTimeFormat(dateLocale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${proposition.deadline}T12:00:00`));

  return (
    <article className="grad-border card-hover relative grid gap-5 overflow-hidden rounded-[20px] bg-surface p-6 backdrop-blur-xl lg:grid-cols-[1fr_280px] lg:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(166,132,255,0.22) 0%, transparent 70%)",
        }}
      />

      <div className="relative min-w-0">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="font-display rounded-full border border-violet-500/30 bg-violet-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.04em] text-violet-200">
            {proposition.type}
          </span>
          <span className="rounded-full border border-ui bg-surface-md px-3 py-1 text-[10px] font-semibold text-muted">
            {proposition.direction}
          </span>
          <span className="rounded-full border border-ui bg-surface-md px-3 py-1 text-[10px] font-semibold text-muted">
            {proposition.format}
          </span>
        </div>

        <p className="text-grad font-display text-[14px] font-bold">
          {proposition.partner}
        </p>
        <h3
          className="font-display mt-2 font-bold text-primary"
          style={{ fontSize: "1.2rem", letterSpacing: "-0.02em" }}
        >
          {proposition.name}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          {proposition.description}
        </p>

        <div className="mt-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-subtle">
            {labels.neededSkills}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {proposition.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grad-border relative flex flex-col justify-between gap-5 rounded-[16px] bg-gradient-to-br from-violet-500/[0.10] to-blue-500/[0.06] p-5 backdrop-blur-xl">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subtle">
            {labels.deadline}
          </p>
          <p className="text-grad font-display mt-2 text-[20px] font-extrabold">
            {formattedDate}
          </p>
        </div>

        <a
          href={proposition.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-3 text-[14px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95"
        >
          {labels.moreInfo} <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}

type SelectOption = { value: string; label: string };

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const selected = options.find((o) => o.value === value);
  const isFiltered = value !== "";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "flex h-11 items-center gap-2 rounded-[12px] border px-4 text-[14px] font-medium transition-all duration-200",
          open
            ? "border-violet-500/40 bg-violet-500/[0.12] text-primary"
            : isFiltered
              ? "border-violet-500/30 bg-violet-500/[0.08] text-violet-200"
              : "border-ui bg-surface-md text-muted hover:border-white/15 hover:text-primary"
        )}
      >
        <span className="max-w-[140px] truncate">{isFiltered ? selected?.label : label}</span>
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          className={clsx("flex-shrink-0 transition-transform duration-200", open ? "rotate-180 text-violet-400" : "text-subtle")}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={clsx(
          "absolute top-[calc(100%+6px)] left-0 z-[100] min-w-[200px] overflow-hidden rounded-[14px] border border-white/[0.07] shadow-[0_24px_56px_rgba(0,0,0,0.9)] transition-all duration-150 origin-top-left",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        )}
        style={{ backgroundColor: "#0f1019", backdropFilter: "none" }}
      >
        <div className="h-px bg-gradient-to-r from-violet-500/50 via-blue-500/25 to-transparent" />
        <div className="flex flex-col p-1.5">
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => { onChange(option.value); setOpen(false); }}
                className={clsx(
                  "flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[14px] transition-colors duration-100",
                  isSelected
                    ? "bg-violet-500/[0.14] text-primary"
                    : "text-primary/50 hover:bg-surface-md hover:text-primary"
                )}
              >
                <span className={clsx("w-3.5 flex-shrink-0 text-[11px] font-bold leading-none", isSelected ? "text-violet-400" : "text-transparent")}>✓</span>
                <span className={clsx("truncate", isSelected && "font-semibold")}>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PropositionsSection({
  data,
  labels,
  dateLocale,
}: {
  data: PartnersPageData;
  labels: PartnersLabels;
  dateLocale: string;
}) {
  const [search, setSearch] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const directionOptions = useMemo<SelectOption[]>(
    () => [
      { value: "", label: labels.all },
      ...Array.from(new Set(data.propositions.map((item) => item.direction))).map((d) => ({ value: d, label: d })),
    ],
    [data.propositions, labels.all]
  );

  const typeOptions = useMemo<SelectOption[]>(
    () => [
      { value: "", label: labels.all },
      ...Array.from(new Set(data.propositions.map((item) => item.type))).map((t) => ({ value: t, label: t })),
    ],
    [data.propositions, labels.all]
  );

  const filteredPropositions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return data.propositions.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        [item.partner, item.name, item.description, item.direction, item.format, ...item.skills]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesDirection = !selectedDirection || item.direction === selectedDirection;
      const matchesType = !selectedType || item.type === selectedType;
      return matchesSearch && matchesDirection && matchesType;
    });
  }, [data.propositions, search, selectedDirection, selectedType]);

  const hasActiveFilters = !!(search || selectedDirection || selectedType);

  function resetFilters() {
    setSearch("");
    setSelectedDirection("");
    setSelectedType("");
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <Reveal mode="up" delay={0.55} inView={false} className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <h2
              className="font-display font-black text-primary"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {labels.sectionTitle}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
              {labels.sectionIntro}
            </p>
          </div>

          <div className="grad-border rounded-[18px] bg-surface p-5 backdrop-blur-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subtle">
              {labels.results}
            </p>
            <p className="font-display mt-2 text-[28px] font-extrabold">
              <span className="text-grad">{filteredPropositions.length}</span>
              <span className="text-[15px] text-subtle">
                {" "}
                / {data.propositions.length}
              </span>
            </p>
          </div>
        </Reveal>

        <div className="grad-border relative z-10 mb-8 rounded-[22px] bg-surface p-5 backdrop-blur-xl">
          {/* Search */}
          <div className="relative mb-3">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary/25"
              width="16" height="16" viewBox="0 0 16 16" fill="none"
            >
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="h-12 w-full rounded-[14px] border border-ui bg-surface-md pl-11 pr-4 text-[15px] text-primary placeholder-muted outline-none transition-all duration-200 focus:border-violet-500/40 focus:bg-surface-lg"
            />
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterSelect
              label={labels.direction}
              value={selectedDirection}
              options={directionOptions}
              onChange={setSelectedDirection}
            />
            <FilterSelect
              label={labels.type}
              value={selectedType}
              options={typeOptions}
              onChange={setSelectedType}
            />
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="ml-auto flex h-11 items-center gap-2 rounded-[12px] border border-ui bg-surface-md px-4 text-[12px] font-semibold text-primary/50 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/[0.08] hover:text-red-300"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {labels.reset}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredPropositions.length > 0 ? (
            filteredPropositions.map((proposition) => (
              <Reveal key={proposition.id} mode="up" amount={0.15}>
                <PropositionCard
                  proposition={proposition}
                  labels={labels}
                  dateLocale={dateLocale}
                />
              </Reveal>
            ))
          ) : (
            <div className="grad-border rounded-[20px] bg-surface p-10 text-center backdrop-blur-xl">
              <p className="font-display text-[18px] font-bold text-primary">
                {labels.noResultsTitle}
              </p>
              <p className="mt-2 text-[14px] text-muted">
                {labels.noResultsText}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function PartnersPage({ kind }: { kind: PartnersPageKind }) {
  const { t, i18n } = useTranslation("partners");
  const loaded = useLoadNamespace("partners", loadTranslations);

  const labels = useMemo(
    () => ({
      instituteName: t("common.instituteName"),
      navAcademic: t("common.navAcademic"),
      navBusiness: t("common.navBusiness"),
      heroEyebrow: t("common.heroEyebrow"),
      sectionEyebrow: t("common.sectionEyebrow"),
      sectionTitle: t("common.sectionTitle"),
      sectionIntro: t("common.sectionIntro"),
      results: t("common.results"),
      search: t("common.search"),
      searchPlaceholder: t("common.searchPlaceholder"),
      direction: t("common.direction"),
      type: t("common.type"),
      all: t("common.all"),
      reset: t("common.reset"),
      neededSkills: t("common.neededSkills"),
      deadline: t("common.deadline"),
      moreInfo: t("common.moreInfo"),
      noResultsTitle: t("common.noResultsTitle"),
      noResultsText: t("common.noResultsText"),
    }),
    [t, loaded]
  );

  const data = useMemo(() => {
    const heroImage = PAGE_HERO_IMAGE[kind];
    const pageKey = `pages.${kind}`;

    return {
      heroImage,
      title: t(`${pageKey}.title`),
      gradientTitle: t(`${pageKey}.gradientTitle`),
      intro: t(`${pageKey}.intro`),
      propositions: PROPOSITIONS_META[kind].map((proposition, index) => {
        const itemKey = `${pageKey}.propositions.${index}`;
        return {
          id: index + 1,
          partner: t(`${itemKey}.partner`),
          name: t(`${itemKey}.name`),
          description: t(`${itemKey}.description`),
          type: t(`${itemKey}.type`),
          direction: t(`${itemKey}.direction`),
          format: t(`${itemKey}.format`),
          skills: t(`${itemKey}.skills`).split("|"),
          deadline: proposition.deadline,
          link: proposition.link,
        };
      }),
    };
  }, [kind, t, loaded]);

  if (!loaded) return null;

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <PartnersHero data={data} labels={labels} currentKind={kind} />
      <div>
        <PropositionsSection
          data={data}
          labels={labels}
          dateLocale={i18n.language}
        />
      </div>
    </PageTransition>
  );
}
