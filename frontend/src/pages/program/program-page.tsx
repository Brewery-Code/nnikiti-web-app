import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { marked } from "marked";
import { ROUTES } from "@/shared/model/routes";
import { PageTransition } from "@/widgets";
import { publicRqClient } from "@/shared/api/instance";
import { useLoadNamespace } from "@/shared/hooks";
import { useSeo, Reveal } from "@/shared/ui";
import { SITE_NAME, clampText, stripMarkup } from "@/shared/model/seo";
import { loadTranslations } from "@/pages/department/locales";
import { mapApiToDept } from "@/pages/department/lib";

type DeptListItem = { id?: number; name?: string; slug?: string };

function ProgramPage() {
  useLoadNamespace("department", loadTranslations);
  const { t } = useTranslation("department");
  const navigate = useNavigate();
  const { departmentSlug, programSlug } = useParams<{ departmentSlug: string; programSlug: string }>();

  const deptListQuery = publicRqClient.useQuery("get", "/departments/", {}, { retry: false });
  const deptEntry = (deptListQuery.data as DeptListItem[] ?? []).find(d => d.slug === departmentSlug);
  const numDeptId = deptEntry?.id ?? 0;

  const deptQuery = publicRqClient.useQuery(
    "get",
    "/departments/{id}/",
    { params: { path: { id: numDeptId } } },
    { retry: false, enabled: numDeptId > 0 },
  );

  const dept = deptQuery.data ? mapApiToDept(deptQuery.data) : null;
  const prog = dept?.programs.find((p) => p.slug === programSlug) ?? null;

  useSeo(
    prog
      ? {
          title: `${prog.nameOp || prog.name} — ${SITE_NAME}`,
          description: clampText(
            stripMarkup(prog.description || "") ||
              `${prog.nameOp || prog.name} — освітня програма ННІКІТІ НУВГП`,
          ),
        }
      : null,
  );

  if (deptQuery.isError) { return <Navigate to={ROUTES.ERROR} replace />; }
  if (deptQuery.isPending) { return null; }
  if (!prog) { return <Navigate to={`/department/${departmentSlug}`} replace />; }

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  const allSubjects = prog.subjects ?? [];
  const metaItems = [
    { label: t("curriculum.meta_duration"), value: prog.duration },
    { label: t("curriculum.meta_form"), value: prog.form },
    ...(prog.totalCredits ? [{ label: t("curriculum.meta_credits"), value: String(prog.totalCredits) }] : []),
    ...(allSubjects.length ? [{ label: t("curriculum.disciplines_label"), value: String(allSubjects.length) }] : []),
  ].filter((m) => m.value);

  return (
    <PageTransition>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[130px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-blue-600/8 blur-[100px]" />

        <div className="container-v2 pb-10 pt-8 sm:pb-14 sm:pt-10">
          {/* Back button */}
          <Reveal mode="up" className="mb-8">
            <button
              type="button"
              onClick={handleBack}
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[13px] text-subtle transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-primary active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              {t("nav.back")}
            </button>
          </Reveal>

          {/* Degree badge + code */}
          <Reveal mode="up" className="mb-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.08] py-1.5 pl-2 pr-4">
              {prog.degree && (
                <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_2px_8px_rgba(139,92,246,0.4)]">
                  {prog.degree}
                </span>
              )}
              <span className="text-[12px] font-semibold text-white/40">{prog.code}</span>
            </div>
          </Reveal>

          {/* Title */}
          <Reveal mode="up">
            <h1
              className="mb-3 font-display font-black text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", letterSpacing: "-0.04em", lineHeight: 1.05 }}
            >
              {prog.nameOp || prog.name}
            </h1>
            {prog.nameOp && prog.nameOp !== prog.name && (
              <p className="text-[15px] font-medium text-white/40">
                {t("curriculum.card_specialty_label")}:&nbsp;
                <span className="text-white/60">{prog.name}</span>
              </p>
            )}
          </Reveal>

          {/* Meta stats */}
          {metaItems.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {metaItems.map((meta, i) => (
                <motion.div
                  key={meta.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.1 + i * 0.06, ease: "easeOut" }}
                  className="relative overflow-hidden rounded-[16px] border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 pl-5"
                >
                  <span className="absolute left-0 top-2 h-[calc(100%-16px)] w-[3px] rounded-r-full bg-gradient-to-b from-violet-400/70 to-blue-500/60" />
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">{meta.label}</span>
                  <span className="mt-1.5 block font-display text-[20px] font-extrabold leading-none text-primary">{meta.value}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="container-v2 py-10 sm:py-14">

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
          className="mb-6 overflow-hidden rounded-[20px] border border-white/[0.06] bg-white/[0.015]"
        >
          <div className="border-b border-white/[0.06] px-5 py-4">
            <h3 className="font-display text-[16px] font-bold text-primary">{t("curriculum.about_label")}</h3>
          </div>
          <div
            className="news-body prose prose-invert max-w-none p-5 text-[13.5px] sm:p-6 sm:text-[14px]
              prose-p:my-2.5 prose-p:leading-relaxed prose-p:text-primary/65
              prose-headings:font-display prose-headings:font-black prose-headings:text-primary
              prose-strong:font-semibold prose-strong:text-primary/90
              prose-a:text-violet-300 hover:prose-a:text-white
              prose-ul:my-2.5 prose-li:my-1 prose-li:text-primary/65 prose-li:marker:text-violet-400"
            dangerouslySetInnerHTML={{
              __html: marked.parse(prog.description?.trim() || t("curriculum.description_placeholder"), {
                breaks: true,
                gfm: true,
              }) as string,
            }}
          />
        </motion.div>

        {/* Subjects list */}
        {allSubjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.22, ease: "easeOut" }}
            className="mb-8 overflow-hidden rounded-[20px] border border-white/[0.06] bg-white/[0.015]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4">
              <span className="font-display text-[16px] font-bold text-primary">{t("curriculum.subjects_label")}</span>
              <span className="rounded-full bg-violet-500/15 px-3 py-1 text-[12px] font-bold text-violet-200">
                {allSubjects.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 sm:p-5">
              {allSubjects.map((subject, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.25), ease: "easeOut" }}
                  className="flex items-center gap-3 rounded-[12px] border border-white/[0.045] bg-white/[0.018] px-3.5 py-2.5"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-gradient-to-br from-violet-500/20 to-blue-500/10 text-[10px] font-bold text-violet-300">
                    {i + 1}
                  </span>
                  <span className="text-[13px] leading-snug text-primary/75">
                    {subject.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Learn more */}
        {prog.learnMoreUrl && (
          <div className="flex justify-center">
            <a
              href={prog.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-3 text-[14px] font-semibold text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)] transition-all duration-200 hover:shadow-[0_6px_28px_rgba(139,92,246,0.5)] active:scale-95"
            >
              {t("curriculum.learn_more")}
            </a>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export const Component = ProgramPage;
