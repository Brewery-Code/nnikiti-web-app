import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { useLoadNamespace } from "@/shared/hooks";
import { profilePlaceholder } from "@/shared/icons";
import { publicRqClient } from "@/shared/api/instance";
import { resolveMediaUrl } from "@/shared/model/config";
import { loadTranslations } from "./locales";

function avatar(url?: string | null) {
  return url ?? profilePlaceholder;
}



/* ─── Card ───────────────────────────────────────────────────── */
function PersonCard({
  name, role, sub, email, badge, imgUrl,
}: {
  name: string; role: string; sub?: string;
  email?: string; badge?: string; imgUrl?: string | null;
}) {
  return (
    <div className="group overflow-hidden rounded-[16px] border border-white/[0.07] bg-[#0a0b12] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
        <img
          src={avatar(imgUrl)}
          alt={name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#08090f] via-[#08090f]/70 to-transparent" />

        {badge && (
          <span className="absolute right-2 top-2 rounded-[6px] border border-white/10 bg-[#08090f]/80 px-1.5 py-0.5 text-[8px] font-medium text-subtle backdrop-blur-sm">
            {badge}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <p className="font-display text-[13px] font-bold leading-tight text-white sm:text-[15px]">
            {name}
          </p>
          <p className="mt-0.5 text-[11px] leading-snug text-white/55 sm:text-[12px]">{role}</p>
          {sub && <p className="mt-0.5 hidden text-[10px] text-white/35 sm:block">{sub}</p>}
          {email && (
            <a href={`mailto:${email}`} className="mt-1 hidden max-w-full truncate text-[11px] text-violet-300/80 sm:inline-block">
              {email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Alternating rows grid (4 → 5 → 4 → 5 …) ──────────────── */
/*
  All cards share one fixed width = (100% - 4*gap) / 5
  (i.e. what fits 5 cards per row).
  Rows of 4 are flex-centered so the cards stay same size but sit
  symmetrically rather than stretching to fill the row.
*/
const GAP = 12; // px, matches gap-3

function AlternatingGrid<T>({
  items,
  firstRowSize = 4,
  secondRowSize = 5,
  renderItem,
  className,
}: {
  items: T[];
  firstRowSize?: number;
  secondRowSize?: number;
  renderItem: (item: T, idx: number) => React.ReactNode;
  className?: string;
}) {
  const maxPerRow = Math.max(firstRowSize, secondRowSize);
  // fixed card width based on the widest row
  const cardWidth = `calc((100% - ${(maxPerRow - 1) * GAP}px) / ${maxPerRow})`;

  const rows: T[][] = [];
  let i = 0;
  let toggle = true;
  while (i < items.length) {
    const size = toggle ? firstRowSize : secondRowSize;
    rows.push(items.slice(i, i + size));
    i += size;
    toggle = !toggle;
  }

  return (
    <div className={clsx("flex flex-col", className)} style={{ gap: GAP }}>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center" style={{ gap: GAP }}>
          {row.map((item, j) => {
            const globalIdx = rowIdx * firstRowSize + j;
            return (
              <Reveal
                key={j}
                mode="up"
                amount={0.1}
                delay={j * 0.07}
                style={{ flex: `0 0 ${cardWidth}`, minWidth: 0 }}
              >
                {renderItem(item, globalIdx)}
              </Reveal>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ─── Section heading ───────────────────────────────────────── */
function SectionHeading({ sectionKey }: { sectionKey: "deptHeads" | "staff" }) {
  const { t } = useTranslation("team");
  return (
    <Reveal mode="up" className="mb-8 lg:mb-10">
      <h2
        className="font-display font-black leading-tight text-primary"
        style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
      >
        {t(`sections.${sectionKey}.title`)}{" "}
        <span className="text-grad">{t(`sections.${sectionKey}.accent`)}</span>
      </h2>
    </Reveal>
  );
}

/* ─── Hero ──────────────────────────────────────────────────── */
function HeroSection() {
  const { t } = useTranslation("team");
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-24 lg:pt-52 lg:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[30%] h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[10%] h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(81,162,255,0.12) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <Stagger className="container-v2 relative z-[1] text-center" stagger={0.1} delay={0.35} inView={false}>
        <StaggerItem
          as="h1"
          mode="up"
          className="font-display font-black leading-none text-primary"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", letterSpacing: "-0.05em" }}
        >
          {t("hero.title")} <span className="text-grad">{t("hero.titleAccent")}</span>
        </StaggerItem>
        <StaggerItem
          as="p"
          mode="up"
          className="mx-auto mt-6 text-[15px] text-muted sm:text-[17px]"
          style={{ lineHeight: 1.55, maxWidth: 600 }}
        >
          {t("hero.description")}
        </StaggerItem>
      </Stagger>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
function TeamPage() {
  useLoadNamespace("team", loadTranslations);

  const staffQuery = publicRqClient.useQuery("get", "/departments/staff/", {}, { retry: false });
  const staffData = staffQuery.data ?? [];
  const heads = staffData.filter((m) => m.type === "head");
  const faculty = staffData.filter((m) => m.type === "faculty");

  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">
      <HeroSection />
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="container-v2 flex flex-col gap-16 lg:gap-24">

          {/* Dept heads */}
          {heads.length > 0 && (
            <div>
              <SectionHeading sectionKey="deptHeads" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {heads.map((p, i) => (
                  <Reveal key={p.id ?? i} mode="up" amount={0.1} delay={i * 0.08}>
                    <PersonCard
                      name={p.full_name ?? ""}
                      role={p.regalia ?? ""}
                      email={p.email ?? undefined}
                      imgUrl={resolveMediaUrl(p.image)}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Staff */}
          {faculty.length > 0 && (
            <div>
              <SectionHeading sectionKey="staff" />

              {/* Mobile: regular 2-col */}
              <div className="grid grid-cols-2 gap-3 sm:hidden">
                {faculty.map((m, i) => (
                  <Reveal key={m.id ?? i} mode="up" amount={0.1} delay={(i % 2) * 0.07}>
                    <PersonCard
                      name={m.name ?? ""}
                      role={m.role ?? ""}
                      sub={m.specialty ?? undefined}
                      email={m.email ?? undefined}
                      imgUrl={resolveMediaUrl(m.image)}
                    />
                  </Reveal>
                ))}
              </div>

              {/* sm+: alternating 4 → 5 → 4 … */}
              <AlternatingGrid
                className="hidden sm:flex"
                items={faculty}
                firstRowSize={4}
                secondRowSize={5}
                renderItem={(m) => (
                  <PersonCard
                    name={m.name ?? ""}
                    role={m.role ?? ""}
                    sub={m.specialty ?? undefined}
                    email={m.email ?? undefined}
                    imgUrl={resolveMediaUrl(m.image)}
                  />
                )}
              />
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
}

export const Component = TeamPage;
