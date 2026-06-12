import { useMemo, useState } from "react";
import { Reveal } from "@/shared/ui";
import { type PartnersPageData, type PartnersLabels, type SelectOption } from "../model";
import { FilterSelect, PropositionCard } from "./ui";

export function PropositionsSection({
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
                fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
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
