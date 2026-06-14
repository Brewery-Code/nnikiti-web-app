import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { marked } from "marked";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { type DepartmentData } from "@/shared/model/departments-data";
import { Reveal } from "@/shared/ui";
import { SectionTitle } from "../ui";

const DEGREE_KEYS = ["bachelor", "master", "postgraduate"] as const;

export function CurriculumSection({ dept }: { dept: DepartmentData }) {
  const { t } = useTranslation("department");
  const [searchParams] = useSearchParams();
  const programCode = searchParams.get("program");
  const programIdParam = searchParams.get("program_id");

  const DEGREE_OPTIONS = DEGREE_KEYS.map((key) => t(`degrees.${key}`));
  const DEGREE_LABELS = Object.fromEntries(
    DEGREE_KEYS.map((key) => [t(`degrees.${key}`), t(`degree_labels.${key}`)])
  );

  const availableDegrees = DEGREE_OPTIONS.filter((d) =>
    dept.programs.some((p) => p.degree === d)
  );

  const findProgram = () => {
    if (programIdParam) return dept.programs.find((p) => p.id === parseInt(programIdParam));
    if (programCode) return dept.programs.find((p) => p.code === programCode);
    return undefined;
  };

  const initialDegree = (() => {
    const p = findProgram();
    if (p?.degree && (DEGREE_OPTIONS as string[]).includes(p.degree)) return p.degree;
    return availableDegrees[0] ?? "";
  })();

  const [activeDegree, setActiveDegree] = useState(initialDegree);

  const degreePrograms = dept.programs.filter((p) => p.degree === activeDegree);

  const initialProgramIdx = (() => {
    const p = findProgram();
    if (p) return Math.max(0, degreePrograms.findIndex((dp) => dp.id === p.id));
    return 0;
  })();

  const [activeProgramIdx, setActiveProgramIdx] = useState(initialProgramIdx);

  const handleDegreeChange = (degree: string) => {
    setActiveDegree(degree);
    setActiveProgramIdx(0);
  };

  const hasDeepLink = !!(programCode || programIdParam);

  useEffect(() => {
    if (!hasDeepLink) { return; }
    const el = document.getElementById("curriculum");
    if (!el) { return; }
    const timeout = setTimeout(() => {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
    }, 400);
    return () => clearTimeout(timeout);
  }, [hasDeepLink]);

  const prog = degreePrograms[activeProgramIdx] ?? degreePrograms[0];

  const allSubjects = prog?.subjects ?? [];

  const metaItems = [
    { label: t("curriculum.meta_duration"), value: prog?.duration },
    { label: t("curriculum.meta_form"),     value: prog?.form },
    ...(prog?.totalCredits ? [{ label: t("curriculum.meta_credits"), value: String(prog.totalCredits) }] : []),
    ...(allSubjects.length ? [{ label: t("curriculum.disciplines_label"), value: String(allSubjects.length) }] : []),
  ].filter((m) => m.value);

  return (
    <section id="curriculum">
      <SectionTitle title={prog?.nameOp || prog?.name || ""} />

      {/* Degree selector */}
      <Reveal mode="up" className="mb-6">
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
          {t("curriculum.degree_label")}
        </p>
        <div className="flex flex-wrap gap-2">
          {DEGREE_OPTIONS.map((degree) => {
            const available = availableDegrees.includes(degree);
            const active = degree === activeDegree;
            return (
              <button
                key={degree}
                onClick={() => available && handleDegreeChange(degree)}
                disabled={!available}
                className={clsx(
                  "group relative flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200",
                  active
                    ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_4px_16px_rgba(166,132,255,0.35)]"
                    : available
                      ? "cursor-pointer border border-white/[0.14] bg-surface-md text-primary/70 hover:-translate-y-0.5 hover:border-violet-500/50 hover:text-primary hover:shadow-[0_4px_14px_rgba(166,132,255,0.18)] active:translate-y-0 active:scale-95"
                      : "cursor-not-allowed border border-dashed border-white/[0.08] bg-transparent text-white/25"
                )}
              >
                <span
                  className={clsx(
                    "h-1.5 w-1.5 rounded-full transition-colors",
                    active
                      ? "bg-white"
                      : available
                        ? "bg-violet-500/50 group-hover:bg-violet-400"
                        : "bg-white/15"
                  )}
                />
                {DEGREE_LABELS[degree] ?? degree}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Program selector */}
      {degreePrograms.length > 0 && (
        <Reveal mode="up" className="mb-8">
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
            {t("curriculum.card_specialty_label")}
          </p>
          <div className="program-selector no-active-scale grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {degreePrograms.map((p, i) => {
              const active = i === activeProgramIdx;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProgramIdx(i)}
                  className={clsx(
                    "group relative flex h-full cursor-pointer items-center gap-3 overflow-hidden rounded-[14px] p-3.5 text-left outline-none transition-all duration-200 focus:outline-none focus-visible:outline-none",
                    active
                      ? "grad-border bg-gradient-to-br from-violet-500/[0.16] to-blue-500/[0.08] shadow-[0_6px_22px_rgba(166,132,255,0.18)]"
                      : "border border-white/[0.07] bg-surface-md hover:-translate-y-0.5 hover:border-violet-500/40 hover:bg-white/[0.05]"
                  )}
                >
                  <span
                    className={clsx(
                      "flex h-9 w-fit shrink-0 items-center justify-center rounded-[10px] px-2.5 text-[12px] font-bold transition-colors",
                      active
                        ? "bg-gradient-to-br from-violet-500 to-blue-500 text-white"
                        : "bg-white/[0.06] text-primary/60 group-hover:text-primary"
                    )}
                  >
                    {p.code}
                  </span>

                  <span
                    className={clsx(
                      "min-w-0 text-[13px] font-semibold leading-snug transition-colors",
                      active ? "text-primary" : "text-primary/70 group-hover:text-primary"
                    )}
                  >
                    {p.name}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      )}

      {prog && <AnimatePresence mode="wait">
        <motion.div
          key={`${activeDegree}-${activeProgramIdx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {/* Selected program: specialty + educational programme in one row */}
          <div className="mb-6 flex flex-col gap-3 overflow-hidden rounded-[16px] border border-white/[0.07] bg-white/[0.015] px-4 py-3.5 sm:flex-row sm:items-center sm:gap-5 sm:px-5">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-500/80 shrink-0">
                {t("curriculum.card_specialty_label")}
              </span>
              <span className="font-display text-[15px] font-bold leading-snug text-primary sm:text-[16px]">
                {prog.name}
              </span>
            </div>
            {prog.nameOp && prog.nameOp !== prog.name && (
              <>
                <span className="hidden h-5 w-px shrink-0 bg-white/10 sm:block" />
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-500/80 shrink-0">
                    {t("curriculum.card_program_label")}
                  </span>
                  <span className="text-[14px] font-semibold leading-snug text-primary/80 sm:text-[15px]">
                    {prog.nameOp}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Stats row */}
          {metaItems.length > 0 && (
            <div className="mb-6 grid grid-cols-2 gap-2.5 pb-px sm:grid-cols-4">
              {metaItems.map((meta, i) => (
                <motion.div
                  key={meta.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.25, delay: i * 0.06, ease: "easeOut" }}
                  className="relative flex flex-col overflow-hidden rounded-[14px] border border-white/[0.06] bg-white/[0.015] px-4 py-3 pl-5"
                >
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-violet-500/70 to-blue-500/70" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">
                    {meta.label}
                  </span>
                  <span className="mt-1 font-display text-[18px] font-extrabold text-primary">{meta.value}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-8 overflow-hidden rounded-[20px] border border-white/[0.06] bg-white/[0.015] p-5 sm:p-7"
          >
            <div className="mb-4 border-b border-ui-sm pb-4">
              <h3 className="font-display text-[19px] font-extrabold leading-tight text-primary sm:text-[22px]">
                {t("curriculum.about_label")}
              </h3>
            </div>
            <div
              className="news-body prose prose-invert max-w-none text-[13px] sm:text-[14px]
                prose-p:my-2.5 prose-p:leading-relaxed prose-p:text-primary/70
                prose-headings:font-display prose-headings:font-black prose-headings:text-primary
                prose-strong:font-bold prose-strong:text-primary
                prose-a:text-violet-300 hover:prose-a:text-white
                prose-ul:my-2.5 prose-li:my-1 prose-li:text-primary/70 prose-li:marker:text-violet-400"
              dangerouslySetInnerHTML={{
                __html: marked.parse(prog.description?.trim() || t("curriculum.description_placeholder"), {
                  breaks: true,
                  gfm: true,
                }) as string,
              }}
            />
          </motion.div>

          {/* Subjects grid */}
          {allSubjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden rounded-[20px] border border-white/[0.06] bg-white/[0.015]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-ui-sm px-4 py-3.5 sm:px-5 sm:py-4">
                <span className="font-display text-[13px] font-bold text-primary sm:text-[14px]">
                  {t("curriculum.subjects_label")}
                </span>
                <span className="rounded-full bg-gradient-to-r from-violet-500/20 to-blue-500/15 px-3 py-1 text-[12px] font-bold text-violet-200">
                  {allSubjects.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2.5 p-4 sm:grid-cols-2 sm:p-5">
                {allSubjects.map((subject, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.22, delay: Math.min(i * 0.025, 0.3), ease: "easeOut" }}
                    className="flex items-center gap-3 rounded-[12px] border border-white/[0.05] bg-white/[0.02] px-3.5 py-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-br from-violet-500/20 to-blue-500/10 text-[11px] font-bold text-violet-200">
                      {i + 1}
                    </span>
                    <span className="text-[13px] leading-snug text-primary/80 sm:text-[13.5px]">
                      {subject.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {prog.learnMoreUrl && (
            <motion.div
              className="mt-10 flex justify-center"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            >
              <a
                href={prog.learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(166,132,255,0.45)] active:scale-95"
              >
                {t("curriculum.learn_more")}
              </a>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>}
    </section>
  );
}
