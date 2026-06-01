import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";

export interface Program {
  code: string;
  name: string;
  description: string;
  duration: string;
  seats?: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface KeyDate {
  period: string;
  label: string;
  note?: string;
}

export function EntrantHero({
  eyebrow,
  title,
  gradientWord,
  description,
  imageSeed,
  stats,
}: {
  eyebrow: string;
  title: string;
  gradientWord: string;
  description: string;
  accent?: string;
  imageSeed: string;
  stats: { value: string; label: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-base pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(81,162,255,0.16) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container-v2 relative z-[1]">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Stagger stagger={0.08} delay={0.35} inView={false}>
            <StaggerItem mode="scale" className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
              <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
                ННІКІТІ
              </span>
              <span className="text-[12px] text-primary/70">{eyebrow}</span>
            </StaggerItem>

            <StaggerItem
              as="h1"
              mode="up"
              className="font-display font-black text-primary"
              style={{
                fontSize: "clamp(2rem, 6.5vw, 5.5rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
              }}
            >
              {title} <span className="text-grad">{gradientWord}</span>
            </StaggerItem>

            <StaggerItem
              as="p"
              mode="up"
              className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted sm:text-[17px]"
              style={{ lineHeight: 1.7 }}
            >
              {description}
            </StaggerItem>

            <StaggerItem mode="up" className="mt-10 flex flex-wrap gap-3">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="grad-border flex flex-col rounded-[14px] bg-surface-md px-5 py-3 backdrop-blur-md"
                >
                  <span className="font-display text-[20px] font-extrabold text-primary">
                    <span className="text-grad">{s.value}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-subtle">
                    {s.label}
                  </span>
                </div>
              ))}
            </StaggerItem>
          </Stagger>

          <Reveal mode="right" delay={0.35} inView={false} className="grad-border relative hidden overflow-hidden rounded-[20px] lg:block">
            <img
              src={imageSeed}
              alt=""
              className="h-[420px] w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(166,132,255,0.30) 0%, transparent 60%), linear-gradient(to top, #08090f 0%, transparent 50%)",
              }}
            />
            <div className="font-display absolute bottom-6 left-6 rounded-full border border-violet-500/30 bg-violet-500/15 px-4 py-2 text-[11px] font-bold text-violet-100 backdrop-blur-md">
              {eyebrow}
            </div>
          </Reveal>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#08090f]" />
    </section>
  );
}

export function ProgramCard({
  program,
}: {
  program: Program;
  accent?: string;
  index?: number;
}) {
  return (
    <div className="spec-card grad-border group flex flex-col rounded-[20px] bg-surface p-5 backdrop-blur-xl sm:p-7">
      <span
        className="font-display mb-5 self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-primary"
        style={{
          background:
            "linear-gradient(135deg, rgba(166,132,255,0.85) 0%, rgba(81,162,255,0.85) 100%)",
        }}
      >
        {program.code}
      </span>

      <h3
        className="font-display mb-3 font-bold text-primary"
        style={{ fontSize: "1.05rem", letterSpacing: "-0.01em", lineHeight: 1.2 }}
      >
        {program.name}
      </h3>
      <p className="flex-1 text-[14px] leading-relaxed text-muted">
        {program.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-ui bg-surface-md px-3 py-1 text-[11px] text-muted">
          {program.duration}
        </span>
        {program.seats && (
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[11px] text-violet-200">
            {program.seats}
          </span>
        )}
      </div>
    </div>
  );
}

export function StepItem({
  step,
  number,
  index,
  total,
}: {
  step: Step;
  number: number;
  accent?: string;
  index?: number;
  total?: number;
}) {
  const isLast = total !== undefined && index === total - 1;
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center gap-2">
        <div className="font-display flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[15px] font-extrabold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.4)]">
          {number}
        </div>
        {!isLast && <div className="w-px flex-1 bg-gradient-to-b from-violet-500/40 to-blue-500/20" />}
      </div>

      <div className="pb-8">
        <h3
          className="font-display font-bold text-primary"
          style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
        >
          {step.title}
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">
          {step.text}
        </p>
      </div>
    </div>
  );
}

export function DateCard({
  date,
}: {
  date: KeyDate;
  accent?: string;
  index?: number;
}) {
  return (
    <div className="grad-border card-hover flex h-full flex-col rounded-[18px] bg-surface p-6 backdrop-blur-xl">
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-400">
        {date.period}
      </span>
      <p className="font-display mt-2 text-[15px] font-semibold text-primary">
        {date.label}
      </p>
      {date.note && <p className="mt-2 flex-1 text-[11px] text-subtle">{date.note}</p>}
      <div className="mt-5 h-px w-full bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />
    </div>
  );
}

export function SectionHead({
  eyebrow: _eyebrow,
  title,
  gradientTitle,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  gradientTitle: string;
  accent?: string;
  subtitle?: string;
}) {
  return (
    <Reveal mode="up" className="mb-10 lg:mb-14">
      <h2
        className="font-display font-black text-primary"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
      >
        {title} <span className="text-grad">{gradientTitle}</span>
      </h2>
      {subtitle && (
        <p
          className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-[17px]"
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

export function EntrantCta({
  title,
  subtitle,
  primaryLabel = "Подати заявку",
  primaryTo = ROUTES.CONTACTS,
  secondaryLabel = "Задати питання",
  secondaryTo = ROUTES.ASK_QUESTION,
}: {
  accent?: string;
  title: string;
  subtitle: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(166,132,255,0.10) 0%, transparent 70%)",
        }}
      />
      <Stagger className="container-v2 relative z-[1] flex flex-col items-center text-center" stagger={0.1}>
        <StaggerItem
          as="h2"
          mode="up"
          className="font-display font-black text-primary"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {title}
        </StaggerItem>
        <StaggerItem
          as="p"
          mode="up"
          className="mx-auto mt-6 text-[15px] leading-relaxed text-primary/60 sm:text-[17px]"
          style={{ maxWidth: 580 }}
        >
          {subtitle}
        </StaggerItem>
        <StaggerItem mode="up" className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to={primaryTo}
            className="inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-7 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95 sm:text-[17px]"
          >
            {primaryLabel} <span aria-hidden>→</span>
          </Link>
          <Link
            to={secondaryTo}
            className="inline-flex items-center gap-2 rounded-[14px] border border-white/15 bg-surface-md px-7 py-3.5 text-[15px] font-semibold text-primary backdrop-blur-md transition-all duration-200 hover:bg-surface-xl active:scale-95 sm:text-[17px]"
          >
            {secondaryLabel} <span aria-hidden>→</span>
          </Link>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
