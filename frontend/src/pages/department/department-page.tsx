import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { DEPARTMENTS_DATA, type DepartmentData } from "@/shared/model/departments-data";
import clsx from "clsx";
import { PageTransition } from "@/widgets";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { profilePlaceholder } from "@/shared/icons";

const avatar = (_img: number) => profilePlaceholder;
const DEPT_PHOTOS = [
  "/images/students-stage.jpg",
  "/images/students-lecture.jpg",
  "/images/students-christmas.jpg",
  "/images/noosphere-workshop.jpg",
  "/images/students-event.jpg",
  "/images/students-tennis.jpg",
  "/images/vodnik-mascot.jpg",
  "/images/halloween-event.jpg",
  "/images/students-hall.jpg",
  "/images/students-audience.jpg",
  "/images/students-workshop.jpg",
  "/images/students-sport.jpg",
  "/images/students-guitar.jpg",
];
const cover = (seed: number) => DEPT_PHOTOS[seed % DEPT_PHOTOS.length];

const sections = [
  { id: "overview",   label: "Про кафедру" },
  { id: "curriculum", label: "Навчальний план" },
  { id: "team",       label: "Команда" },
  { id: "history",    label: "Історія" },
  { id: "contacts",   label: "Контакти" },
];

function useSectionSpy() {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActive(id);
        },
        { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);
  return active;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 88,
    behavior: "smooth",
  });
}

function Sidebar({
  departments,
  currentId,
}: {
  departments: DepartmentData[];
  currentId: string;
}) {
  const activeSection = useSectionSpy();

  return (
    <aside className="hidden flex-shrink-0 self-start lg:sticky lg:top-24 lg:flex lg:w-64 xl:w-72">
      <div className="flex w-full flex-col gap-4">
        <div className="grad-border rounded-[18px] bg-surface p-4 backdrop-blur-xl">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
            — Кафедри
          </p>
          <ul className="flex flex-col gap-0.5">
            {departments.map((dept) => {
              const isActive = String(dept.id) === currentId;
              return (
                <li key={dept.id}>
                  <Link
                    to={`/department/${dept.id}`}
                    className={clsx(
                      "group relative flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-br from-violet-500/[0.15] to-blue-500/[0.10] font-semibold text-primary"
                        : "text-subtle hover:bg-surface-md hover:text-primary/80"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-violet-500 to-blue-500" />
                    )}
                    <span
                      className={clsx(
                        "h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all",
                        isActive
                          ? "bg-violet-400"
                          : "bg-white/15 group-hover:bg-white/40"
                      )}
                    />
                    <span className="leading-snug">{dept.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grad-border rounded-[18px] bg-surface p-4 backdrop-blur-xl">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
            — Розділи
          </p>
          <ul className="flex flex-col gap-0.5">
            {sections.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => scrollToSection(s.id)}
                    className={clsx(
                      "group relative flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[14px] transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-br from-violet-500/[0.15] to-blue-500/[0.10] font-semibold text-primary"
                        : "text-subtle hover:bg-surface-md hover:text-primary/80"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-violet-500 to-blue-500" />
                    )}
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

function SectionTitle({
  title,
  highlight,
}: {
  title: string;
  highlight: string;
}) {
  return (
    <Reveal mode="up" className="mb-10 text-center">
      <h2
        className="font-display font-black text-primary"
        style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", letterSpacing: "-0.04em" }}
      >
        {title} <span className="text-grad">{highlight}</span>
      </h2>
    </Reveal>
  );
}

function OverviewSection({ dept }: { dept: DepartmentData }) {
  const { head } = dept;
  return (
    <section id="overview">
      <div className="grid gap-fluid-sm lg:grid-cols-[1fr_340px]">
        <Stagger className="flex flex-col gap-6" stagger={0.12} delay={0.35} inView={false}>
          <StaggerItem mode="up">
          <div className="grad-border rounded-[20px] bg-surface p-5 backdrop-blur-xl sm:p-7">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
              — Кафедра
            </p>
            <h1
              className="font-display font-black text-primary"
              style={{
                fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
              }}
            >
              {dept.name}
            </h1>
            <div className="mt-5 h-px w-full bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />
            <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-[17px]">
              {dept.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-5">
              <a
                href={`mailto:${dept.email}`}
                className="flex items-center gap-2 text-[14px] text-muted transition-colors hover:text-primary"
              >
                <span className="text-violet-400">✉</span>
                {dept.email}
              </a>
              <span className="flex items-center gap-2 text-[14px] text-muted">
                <span className="text-blue-400">◎</span>
                {dept.address}
              </span>
            </div>
          </div>
          </StaggerItem>

          <StaggerItem mode="up">
          <div className="grad-border flex items-center gap-4 rounded-[18px] bg-surface p-5 backdrop-blur-xl">
            <div className="grad-border flex-shrink-0 overflow-hidden rounded-full bg-[#111] p-[2px]">
              <img
                src={avatar(head.img)}
                alt={head.full_name}
                className="h-14 w-14 rounded-full object-cover object-top sm:h-16 sm:w-16"
              />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
                Завідувач кафедри
              </p>
              <p className="mt-0.5 font-display text-[16px] font-bold text-primary">
                {head.full_name}
              </p>
              <p className="text-[12px] text-subtle">{head.regalia}</p>
              {head.email && (
                <a
                  href={`mailto:${head.email}`}
                  className="mt-1 inline-block text-[12px] text-violet-300 hover:underline"
                >
                  {head.email}
                </a>
              )}
            </div>
            {head.audience && (
              <span className="ml-auto rounded-[10px] border border-ui bg-surface-md px-3 py-2 text-center text-[10px] text-subtle">
                Ауд.
                <br />
                <span className="font-display text-[16px] font-bold text-primary">
                  {head.audience}
                </span>
              </span>
            )}
          </div>
          </StaggerItem>
        </Stagger>

        <Reveal mode="fade" delay={0.55} inView={false} className="hidden lg:block">
          <div className="grad-border sticky top-28 overflow-hidden rounded-[20px]">
            <img
              src={cover(dept.coverSeed)}
              alt={dept.name}
              className="h-[420px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="rounded-full border border-violet-500/25 bg-violet-500/15 px-3 py-1.5 text-[11px] font-bold text-violet-100 backdrop-blur-md">
                {dept.name}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CurriculumSection({ dept }: { dept: DepartmentData }) {
  const [searchParams] = useSearchParams();
  const programCode = searchParams.get("program");
  const initialIdx = programCode
    ? Math.max(0, dept.programs.findIndex((p) => p.code === programCode))
    : 0;
  const [activeIdx, setActiveIdx] = useState(initialIdx);

  useEffect(() => {
    if (!programCode) return;
    const el = document.getElementById("curriculum");
    if (!el) return;
    const timeout = setTimeout(() => {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
    }, 400);
    return () => clearTimeout(timeout);
  }, [programCode]);
  const prog = dept.programs[activeIdx] ?? dept.programs[0];

  const years = [1, 2, 3, 4]
    .map((year) => ({
      year,
      subjects: prog.subjects.filter(
        (s) => s.semester === year * 2 - 1 || s.semester === year * 2
      ),
    }))
    .filter((y) => y.subjects.length > 0);

  const mandatory = prog.subjects.filter((s) => s.type === "Нормативна");
  const elective   = prog.subjects.filter((s) => s.type === "Вибіркова");

  return (
    <section id="curriculum" className="m-section">
      <SectionTitle title="Програма" highlight="навчання" />

      {dept.programs.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {dept.programs.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIdx(i)}
              className={clsx(
                "rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-200",
                i === activeIdx
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)]"
                  : "grad-border bg-surface-md text-primary/60 backdrop-blur-md hover:text-primary"
              )}
            >
              <span className="mr-1.5 opacity-50">{p.code}</span>
              {p.name}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div className="mb-8 flex flex-wrap gap-3 pb-px">
            {[
              { label: "Рівень",     value: prog.degree },
              { label: "Тривалість", value: prog.duration },
              { label: "Форма",      value: prog.form },
            ].map((meta) => (
              <div
                key={meta.label}
                className="grad-border flex flex-col rounded-[14px] bg-surface px-4 py-3 backdrop-blur-xl"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">
                  {meta.label}
                </span>
                <span className="mt-0.5 text-[14px] font-semibold text-primary">{meta.value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {years.map(({ year, subjects }, yi) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: yi * 0.06, ease: "easeOut" }}
                className="grad-border rounded-[20px] bg-white/[0.02] backdrop-blur-xl"
              >
                <div className="flex items-center gap-3 border-b border-ui-sm px-5 py-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[11px] font-extrabold text-primary">
                    {year}
                  </span>
                  <span className="font-display text-[14px] font-bold text-primary">
                    {year} курс — {year * 2 - 1} та {year * 2} семестри
                  </span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {subjects.map((subject, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                      <span className="min-w-0 flex-1 text-[14px] text-primary/80">
                        {subject.name}
                      </span>
                      <div className="flex shrink-0 items-center gap-2">
                        <span
                          className={clsx(
                            "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em]",
                            subject.type === "Нормативна"
                              ? "border border-violet-500/30 bg-violet-500/[0.12] text-violet-300"
                              : "border border-ui bg-surface-md text-subtle"
                          )}
                        >
                          {subject.type === "Нормативна" ? "Норм." : "Вибір."}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pb-px">
            <div className="grad-border rounded-[16px] bg-surface p-4 text-center backdrop-blur-xl">
              <p className="font-display text-[1.8rem] font-extrabold text-primary">
                {prog.subjects.length}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-subtle">
                Дисциплін
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function TeamSection({ dept }: { dept: DepartmentData }) {
  return (
    <section id="team" className="m-section">
      <SectionTitle title="Команда" highlight="кафедри" />
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" stagger={0.05} amount={0.05}>
        {dept.team.map((member, i) => (
          <StaggerItem
            key={i}
            mode="up"
            className="grad-border card-hover flex gap-4 rounded-[18px] bg-surface p-4 backdrop-blur-xl"
          >
            <div className="grad-border flex-shrink-0 overflow-hidden rounded-full bg-[#111] p-[2px]">
              <img
                src={avatar(member.img)}
                alt={member.name}
                className="h-14 w-14 rounded-full object-cover object-top"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display truncate text-[15px] font-bold text-primary">
                {member.name}
              </p>
              <p className="mt-0.5 text-[12px] text-subtle">{member.role}</p>
              <span className="mt-1.5 inline-block rounded-full border border-ui bg-surface-md px-2.5 py-0.5 text-[11px] text-muted">
                {member.specialty}
              </span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function HistorySection({ dept }: { dept: DepartmentData }) {
  return (
    <section id="history" className="m-section">
      <SectionTitle title="Історія" highlight="кафедри" />

      <div className="grad-border relative mb-10 overflow-hidden rounded-[20px]">
        <img
          src={cover(dept.coverSeed + 10)}
          alt=""
          className="h-[200px] w-full object-cover sm:h-[256px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090f] via-[#08090f]/60 to-transparent" />
        <div className="absolute inset-0 flex items-center p-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-300">
              З 2004 року
            </p>
            <p className="font-display mt-1 text-[18px] font-bold text-primary sm:text-[22px]">
              Кафедра {dept.name.toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      <Stagger className="relative flex flex-col gap-7 pl-8" stagger={0.1} amount={0.05}>
        <div className="absolute bottom-0 left-1.5 top-0 w-px bg-gradient-to-b from-violet-500/40 via-blue-500/20 to-transparent" />
        {dept.history.map((item, i) => (
          <StaggerItem key={i} mode="left" className="relative">
            <div className="absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-violet-400 bg-base" />
            <span className="font-display text-[12px] font-bold text-violet-300">
              {item.year}
            </span>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function ContactsSection({ dept }: { dept: DepartmentData }) {
  const { head } = dept;
  return (
    <section id="contacts" className="m-section">
      <SectionTitle title="Контакти" highlight="кафедри" />

      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.1} amount={0.05}>
        <StaggerItem mode="left">
        <a
          href={`mailto:${dept.email}`}
          className="grad-border card-hover flex items-center gap-4 rounded-[18px] bg-surface p-5 backdrop-blur-xl"
        >
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-lg text-violet-300">
            ✉
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subtle">
              Email кафедри
            </p>
            <p className="mt-0.5 text-[14px] font-semibold text-primary">{dept.email}</p>
          </div>
        </a>
        </StaggerItem>
        <StaggerItem mode="right">
        <div className="grad-border flex items-center gap-4 rounded-[18px] bg-surface p-5 backdrop-blur-xl">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-lg text-blue-300">
            ◎
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subtle">
              Адреса
            </p>
            <p className="mt-0.5 text-[14px] font-semibold text-primary">{dept.address}</p>
          </div>
        </div>
        </StaggerItem>
      </Stagger>

      <Reveal mode="up" delay={0.15} className="mt-4">
      <div className="grad-border flex items-center gap-4 rounded-[18px] bg-gradient-to-br from-violet-500/[0.08] to-blue-500/[0.04] p-5 backdrop-blur-xl">
        <div className="grad-border flex-shrink-0 overflow-hidden rounded-full bg-[#111] p-[2px]">
          <img
            src={avatar(head.img)}
            alt={head.full_name}
            className="h-14 w-14 rounded-full object-cover object-top"
          />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
            Завідувач кафедри
          </p>
          <p className="font-display text-[15px] font-bold text-primary">
            {head.full_name}
          </p>
          <p className="text-[12px] text-subtle">{head.regalia}</p>
          {head.email && (
            <a
              href={`mailto:${head.email}`}
              className="mt-0.5 inline-block text-[12px] text-violet-300 hover:underline"
            >
              {head.email}
            </a>
          )}
        </div>
      </div>
      </Reveal>
    </section>
  );
}

function DepartmentPage() {
  const { departmentId } = useParams<{ departmentId: string }>();
  const dept =
    DEPARTMENTS_DATA.find((d) => String(d.id) === departmentId) ??
    DEPARTMENTS_DATA[0];

  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden bg-base sm:h-80 md:h-96">
        <img
          src={cover(dept.coverSeed)}
          alt={dept.name}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090f]/50 via-[#08090f]/40 to-[#08090f]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] -top-[20%] h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="container-v2 absolute inset-0 flex items-end pb-10">
          <Stagger className="flex flex-col items-start" stagger={0.12} delay={0.35} inView={false}>
            <StaggerItem mode="up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
                <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
                  ННІКІТІ
                </span>
                <span className="text-[12px] text-primary/70">Кафедра</span>
              </div>
            </StaggerItem>
            <StaggerItem mode="up">
              <h1
                className="font-display font-black text-primary"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4.5rem)",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.95,
                }}
              >
                {dept.name}
              </h1>
            </StaggerItem>
          </Stagger>
        </div>
      </div>

      <div className="bg-base py-12 sm:py-16 lg:py-20">
        <div className="container-v2">
          {/* Mobile department selector */}
          <div className="mb-8 -mx-4 overflow-x-auto px-4 scrollbar-hidden lg:hidden">
            <div className="flex w-max gap-2">
              {DEPARTMENTS_DATA.map((d) => {
                const isActive = String(d.id) === (departmentId ?? "");
                return (
                  <Link
                    key={d.id}
                    to={`/department/${d.id}`}
                    className={clsx(
                      "shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-violet-500 to-blue-500 text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)]"
                        : "grad-border bg-surface-md text-primary/60 backdrop-blur-md hover:text-primary"
                    )}
                  >
                    {d.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex gap-fluid-sm">
            <Sidebar
              departments={DEPARTMENTS_DATA}
              currentId={departmentId ?? ""}
            />
            <main className="min-w-0 flex-1">
              <OverviewSection dept={dept} />
              <CurriculumSection dept={dept} />
              <TeamSection dept={dept} />
              <HistorySection dept={dept} />
              <ContactsSection dept={dept} />
            </main>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export const Component = DepartmentPage;
