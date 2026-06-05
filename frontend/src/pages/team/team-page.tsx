import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { useLoadNamespace } from "@/shared/hooks";
import { profilePlaceholder } from "@/shared/icons";
import { loadTranslations } from "./locales";

const avatar = (_img: number) => profilePlaceholder;

interface Person {
  name: string;
  title: string;
  subtitle?: string;
  email?: string;
  img: number;
}

const LEADERSHIP: Person[] = [
  {
    name: "Трофименко Олег Васильович",
    title: "Директор ННІКІТІ",
    subtitle: "Доктор технічних наук, професор",
    email: "trofymenko@nuwm.edu.ua",
    img: 33,
  },
  {
    name: "Коваленко Ірина Петрівна",
    title: "Заступник з навчальної роботи",
    subtitle: "Кандидат педагогічних наук, доцент",
    email: "kovalenko.i@nuwm.edu.ua",
    img: 1,
  },
  {
    name: "Бойченко Михайло Сергійович",
    title: "Заступник з наукової роботи",
    subtitle: "Доктор технічних наук, доцент",
    email: "boichenko.m@nuwm.edu.ua",
    img: 18,
  },
];

const DEPT_HEADS: Person[] = [
  {
    name: "Бойко Ірина Петрівна",
    title: "Завідувач · Вища математика",
    subtitle: "Кандидат фізико-математичних наук, доцент",
    email: "boiko.i@nuwm.edu.ua",
    img: 5,
  },
  {
    name: "Приймак Михайло Васильович",
    title: "Завідувач · КТ та ЕК",
    subtitle: "Доктор технічних наук, професор",
    email: "pryimak.m@nuwm.edu.ua",
    img: 32,
  },
  {
    name: "Кузьменко Олег Васильович",
    title: "Завідувач · Обчислювальна техніка",
    subtitle: "Кандидат технічних наук, доцент",
    email: "kuzmenko.o@nuwm.edu.ua",
    img: 14,
  },
  {
    name: "Демченко Людмила Анатоліївна",
    title: "Завідувач · КН та ПМ",
    subtitle: "Доктор фізико-математичних наук, професор",
    email: "demchenko.l@nuwm.edu.ua",
    img: 26,
  },
];

interface StaffMember {
  name: string;
  role: string;
  specialty: string;
  img: number;
  dept: string;
}

const STAFF: StaffMember[] = [
  { name: "Ткач Олексій Миколайович",     role: "Доктор тех. наук, професор",  specialty: "Чисельні методи",          img: 12, dept: "Вища математика" },
  { name: "Волошин Дмитро Сергійович",    role: "Кандидат тех. наук, доцент",  specialty: "Веб-розробка",             img: 29, dept: "КТ та ЕК" },
  { name: "Романюк Наталія Андріївна",    role: "Кандидат екон. наук, доцент", specialty: "Економічна кібернетика",   img: 3,  dept: "КТ та ЕК" },
  { name: "Федоренко Сергій Миколайович", role: "Кандидат тех. наук, доцент",  specialty: "Комп'ютерні мережі",       img: 17, dept: "ОТ" },
  { name: "Павленко Вікторія Олексіївна", role: "Старший викладач",            specialty: "Кібербезпека",             img: 6,  dept: "ОТ" },
  { name: "Хоменко Андрій Іванович",      role: "Кандидат тех. наук, доцент",  specialty: "Машинне навчання",         img: 28, dept: "КН та ПМ" },
  { name: "Білоус Оксана Сергіївна",      role: "Кандидат ф-м. наук, доцент",  specialty: "Комп'ютерна графіка",      img: 7,  dept: "КН та ПМ" },
  { name: "Сидоренко Марія Василівна",    role: "Кандидат ф-м. наук, доцент",  specialty: "Алгебра та геометрія",     img: 9,  dept: "Вища математика" },
  { name: "Лисенко Артем Олегович",       role: "Старший викладач",            specialty: "Бази даних та SQL",        img: 15, dept: "КТ та ЕК" },
  { name: "Захаренко Ігор Петрович",      role: "Старший викладач",            specialty: "Системне програмування",   img: 30, dept: "ОТ" },
  { name: "Гончаренко Максим Петрович",   role: "Старший викладач",            specialty: "Python та Data Science",   img: 19, dept: "КН та ПМ" },
  { name: "Гриценко Петро Андрійович",    role: "Старший викладач",            specialty: "Теорія ймовірностей",      img: 23, dept: "Вища математика" },
  { name: "Марченко Юлія Вікторівна",     role: "Асистент",                   specialty: "Frontend-розробка",        img: 21, dept: "КТ та ЕК" },
  { name: "Дяченко Тетяна Миколаївна",    role: "Асистент",                   specialty: "Linux та адміністрування", img: 22, dept: "ОТ" },
  { name: "Олексієнко Валерія Дмитрівна", role: "Асистент",                   specialty: "Deep Learning",            img: 25, dept: "КН та ПМ" },
  { name: "Кравченко Ольга Іванівна",     role: "Асистент",                   specialty: "Дискретна математика",     img: 16, dept: "Вища математика" },
];

/* ─── Square card ───────────────────────────────────────────── */
function PersonCard({
  name, role, sub, email, badge, img,
}: {
  name: string; role: string; sub?: string;
  email?: string; badge?: string; img: number;
}) {
  return (
    <div className="group overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#0a0b12] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="relative overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
        <img
          src={avatar(img)}
          alt={name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#08090f] via-[#08090f]/60 to-transparent" />

        {badge && (
          <span className="absolute right-2.5 top-2.5 rounded-[7px] border border-white/10 bg-[#08090f]/80 px-2 py-0.5 text-[9px] font-medium text-subtle backdrop-blur-sm">
            {badge}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-display text-[16px] font-bold leading-tight text-white">
            {name}
          </p>
          <p className="mt-1 text-[13px] leading-snug text-white/55">{role}</p>
          {sub && <p className="mt-0.5 text-[12px] text-white/35">{sub}</p>}
          {email && (
            <a href={`mailto:${email}`} className="mt-1.5 inline-block max-w-full truncate text-[12px] text-violet-300/80">
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
function SectionHeading({ sectionKey }: { sectionKey: "leadership" | "deptHeads" | "staff" }) {
  const { t } = useTranslation("team");
  return (
    <Reveal mode="up" className="mb-8 lg:mb-10">
      <h2
        className="font-display font-black text-primary"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "-0.04em" }}
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
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">

<Stagger className="container-v2 relative z-[1] text-center" stagger={0.1} delay={0.35} inView={false}>
<StaggerItem
          as="h1"
          mode="up"
          className="font-display font-black leading-none text-primary"
          style={{ fontSize: "clamp(2rem, 6.5vw, 5.5rem)", letterSpacing: "-0.05em" }}
        >
          {t("hero.title")} <span className="text-grad">{t("hero.titleAccent")}</span>
        </StaggerItem>
        <StaggerItem
          as="p"
          mode="up"
          className="mx-auto mt-6 text-[15px] text-muted sm:text-[17px]"
          style={{ lineHeight: 1.7, maxWidth: 600 }}
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
  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">
      <HeroSection />
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="container-v2 flex flex-col gap-16 lg:gap-24">

          {/* Leadership */}
          <div>
            <SectionHeading sectionKey="leadership" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {LEADERSHIP.map((p, i) => (
                <Reveal key={p.name} mode="up" amount={0.1} delay={i * 0.08}>
                  <PersonCard name={p.name} role={p.title} sub={p.subtitle} email={p.email} img={p.img} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Dept heads */}
          <div>
            <SectionHeading sectionKey="deptHeads" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {DEPT_HEADS.map((p, i) => (
                <Reveal key={p.name} mode="up" amount={0.1} delay={i * 0.08}>
                  <PersonCard name={p.name} role={p.subtitle ?? ""} sub={p.title} email={p.email} img={p.img} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Staff */}
          <div>
            <SectionHeading sectionKey="staff" />

            {/* Mobile: regular 2-col */}
            <div className="grid grid-cols-2 gap-3 sm:hidden">
              {STAFF.map((m, i) => (
                <Reveal key={m.name} mode="up" amount={0.1} delay={(i % 2) * 0.07}>
                  <PersonCard name={m.name} role={m.role} sub={m.specialty} badge={m.dept} img={m.img} />
                </Reveal>
              ))}
            </div>

            {/* sm+: alternating 4 → 5 → 4 … */}
            <AlternatingGrid
              className="hidden sm:flex"
              items={STAFF}
              firstRowSize={4}
              secondRowSize={5}
              renderItem={(m) => (
                <PersonCard name={m.name} role={m.role} sub={m.specialty} badge={m.dept} img={m.img} />
              )}
            />
          </div>

        </div>
      </div>
    </PageTransition>
  );
}

export const Component = TeamPage;
