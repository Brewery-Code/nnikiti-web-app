import { PageTransition } from "@/widgets";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { profilePlaceholder } from "@/shared/icons";

const avatar = (_img: number) => profilePlaceholder;

interface Person {
  name: string;
  title: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  img: number;
  tags?: string[];
}

const LEADERSHIP: Person[] = [
  {
    name: "Трофименко Олег Васильович",
    title: "Директор ННІКІТІ",
    subtitle: "Доктор технічних наук, професор",
    email: "trofymenko@nuwm.edu.ua",
    phone: "+380362633201",
    img: 33,
    tags: ["Управління", "Стратегія", "IT-освіта"],
  },
  {
    name: "Коваленко Ірина Петрівна",
    title: "Заступник з навчальної роботи",
    subtitle: "Кандидат педагогічних наук, доцент",
    email: "kovalenko.i@nuwm.edu.ua",
    phone: "+380362633202",
    img: 1,
    tags: ["Навчальний процес", "Методологія", "Якість освіти"],
  },
  {
    name: "Бойченко Михайло Сергійович",
    title: "Заступник з наукової роботи",
    subtitle: "Доктор технічних наук, доцент",
    email: "boichenko.m@nuwm.edu.ua",
    phone: "+380362633203",
    img: 18,
    tags: ["Наука", "Гранти", "Публікації Scopus"],
  },
];

const DEPT_HEADS: Person[] = [
  {
    name: "Бойко Ірина Петрівна",
    title: "Кафедра вищої математики",
    subtitle: "Кандидат фізико-математичних наук, доцент",
    email: "boiko.i@nuwm.edu.ua",
    img: 5,
  },
  {
    name: "Приймак Михайло Васильович",
    title: "Кафедра КТ та ЕК",
    subtitle: "Доктор технічних наук, професор",
    email: "pryimak.m@nuwm.edu.ua",
    img: 32,
  },
  {
    name: "Кузьменко Олег Васильович",
    title: "Кафедра обчислювальної техніки",
    subtitle: "Кандидат технічних наук, доцент",
    email: "kuzmenko.o@nuwm.edu.ua",
    img: 14,
  },
  {
    name: "Демченко Людмила Анатоліївна",
    title: "Кафедра КН та ПМ",
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
  { name: "Ткач Олексій Миколайович",    role: "Доктор тех. наук, професор",        specialty: "Чисельні методи",          img: 12, dept: "Вищої математики" },
  { name: "Волошин Дмитро Сергійович",   role: "Кандидат тех. наук, доцент",        specialty: "Веб-розробка",             img: 29, dept: "КТ та ЕК" },
  { name: "Романюк Наталія Андріївна",   role: "Кандидат екон. наук, доцент",       specialty: "Економічна кібернетика",   img: 3,  dept: "КТ та ЕК" },
  { name: "Федоренко Сергій Миколайович",role: "Кандидат тех. наук, доцент",        specialty: "Комп'ютерні мережі",       img: 17, dept: "ОТ" },
  { name: "Павленко Вікторія Олексіївна",role: "Старший викладач",                  specialty: "Кібербезпека",             img: 6,  dept: "ОТ" },
  { name: "Хоменко Андрій Іванович",     role: "Кандидат тех. наук, доцент",        specialty: "Машинне навчання",         img: 28, dept: "КН та ПМ" },
  { name: "Білоус Оксана Сергіївна",     role: "Кандидат ф-м. наук, доцент",        specialty: "Комп'ютерна графіка",      img: 7,  dept: "КН та ПМ" },
  { name: "Сидоренко Марія Василівна",   role: "Кандидат ф-м. наук, доцент",        specialty: "Алгебра та геометрія",     img: 9,  dept: "Вищої математики" },
  { name: "Лисенко Артем Олегович",      role: "Старший викладач",                  specialty: "Бази даних та SQL",        img: 15, dept: "КТ та ЕК" },
  { name: "Захаренко Ігор Петрович",     role: "Старший викладач",                  specialty: "Системне програмування",   img: 30, dept: "ОТ" },
  { name: "Гончаренко Максим Петрович",  role: "Старший викладач",                  specialty: "Python та Data Science",   img: 19, dept: "КН та ПМ" },
  { name: "Гриценко Петро Андрійович",   role: "Старший викладач",                  specialty: "Теорія ймовірностей",      img: 23, dept: "Вищої математики" },
  { name: "Марченко Юлія Вікторівна",    role: "Асистент",                          specialty: "Frontend-розробка",        img: 21, dept: "КТ та ЕК" },
  { name: "Дяченко Тетяна Миколаївна",   role: "Асистент",                          specialty: "Linux та адміністрування", img: 22, dept: "ОТ" },
  { name: "Олексієнко Валерія Дмитрівна",role: "Асистент",                          specialty: "Deep Learning",            img: 25, dept: "КН та ПМ" },
  { name: "Кравченко Ольга Іванівна",    role: "Асистент",                          specialty: "Дискретна математика",     img: 16, dept: "Вищої математики" },
];

function SectionHeading({
  eyebrow: _eyebrow,
  title,
  highlight,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
}) {
  return (
    <Reveal mode="up" className="mb-10 text-center lg:mb-14">
      <h2
        className="font-display font-black text-primary"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
      >
        {title} <span className="text-grad">{highlight}</span>
      </h2>
    </Reveal>
  );
}

function LeaderCard({ person }: { person: Person }) {
  return (
    <div className="spec-card grad-border group relative flex h-full flex-col overflow-hidden rounded-[20px] bg-surface backdrop-blur-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={avatar(person.img)}
          alt={person.name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-[#08090f]/30 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3
            className="font-display font-bold leading-snug text-primary"
            style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
          >
            {person.name}
          </h3>
          <p className="text-grad mt-1 text-[14px] font-semibold">{person.title}</p>
          <p className="mt-0.5 text-[12px] text-subtle">{person.subtitle}</p>
        </div>

        {person.tags && (
          <div className="flex flex-wrap gap-1.5">
            {person.tags.map((tag) => (
              <span
                key={tag}
                className="font-display rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.04em] text-primary"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(166,132,255,0.20) 0%, rgba(81,162,255,0.20) 100%)",
                  border: "1px solid rgba(166,132,255,0.30)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-1.5 border-t border-ui-sm pt-4">
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="flex items-center gap-2 text-[12px] text-muted transition-colors hover:text-primary"
            >
              <span className="text-violet-400">✉</span>
              {person.email}
            </a>
          )}
          {person.phone && (
            <a
              href={`tel:${person.phone}`}
              className="flex items-center gap-2 text-[12px] text-muted transition-colors hover:text-primary"
            >
              <span className="text-blue-400">☎</span>
              {person.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function DeptHeadCard({ person }: { person: Person }) {
  return (
    <div className="grad-border card-hover group flex items-center gap-4 rounded-[18px] bg-surface p-4 backdrop-blur-xl">
      <div className="grad-border flex-shrink-0 overflow-hidden rounded-full bg-[#111] p-[2px]">
        <img
          src={avatar(person.img)}
          alt={person.name}
          className="h-14 w-14 rounded-full object-cover object-top sm:h-16 sm:w-16"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display truncate text-[15px] font-bold text-primary">
          {person.name}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-400">
          Завідувач кафедри
        </p>
        <p className="mt-0.5 truncate text-[12px] text-subtle">{person.title}</p>
      </div>
    </div>
  );
}

function StaffCard({ member }: { member: StaffMember }) {
  return (
    <div className="grad-border group flex items-center gap-3 rounded-[14px] bg-surface p-3 backdrop-blur-xl transition-colors hover:bg-surface-lg">
      <div className="flex-shrink-0 overflow-hidden rounded-full">
        <img
          src={avatar(member.img)}
          alt={member.name}
          className="h-12 w-12 rounded-full object-cover object-top"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display truncate text-[14px] font-semibold text-primary">
          {member.name}
        </p>
        <p className="truncate text-[11px] text-subtle">{member.role}</p>
        <span className="mt-1 inline-block rounded-full border border-violet-500/25 bg-violet-500/10 px-2 py-px text-[10px] font-medium text-violet-200">
          {member.specialty}
        </span>
      </div>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { value: "3", label: "Керівники", big: true },
    { value: "4", label: "Кафедри", big: true },
    { value: `${STAFF.length}+`, label: "Викладачів", big: false },
    { value: "12+", label: "Докторів наук", big: false },
  ];
  return (
    <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" stagger={0.1}>
      {stats.map((s) => (
        <StaggerItem
          key={s.label}
          mode="scale"
          className={
            "grad-border card-hover rounded-2xl px-5 py-7 text-center backdrop-blur-xl " +
            (s.big
              ? "bg-gradient-to-br from-violet-500/[0.12] to-blue-500/[0.12]"
              : "bg-surface")
          }
        >
          <div
            className="font-display font-black"
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
              letterSpacing: "-0.04em",
              marginBottom: 8,
            }}
          >
            {s.big ? <span className="text-grad">{s.value}</span> : s.value}
          </div>
          <div className="text-[12px] text-subtle">{s.label}</div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-base pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
      <div className="absolute inset-0 grid grid-cols-4 gap-0 opacity-15 sm:grid-cols-8">
        {[...LEADERSHIP, ...DEPT_HEADS, ...STAFF.slice(0, 5)]
          .slice(0, 8)
          .map((p, i) => (
            <div key={i} className="overflow-hidden grayscale">
              <img
                src={avatar(p.img)}
                alt=""
                className="h-full w-full object-cover object-top"
              />
            </div>
          ))}
      </div>
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

      <Stagger className="container-v2 relative z-[1] text-center" stagger={0.1} delay={0.35} inView={false}>
        <StaggerItem mode="scale" className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
          <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
            ННІКІТІ
          </span>
          <span className="text-[12px] text-primary/70">Команда інституту</span>
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
          Наша <span className="text-grad">команда</span>
        </StaggerItem>
        <StaggerItem
          as="p"
          mode="up"
          className="mx-auto mt-6 text-[15px] text-muted sm:text-[17px]"
          style={{ lineHeight: 1.7, maxWidth: 600 }}
        >
          Науково-педагогічний колектив, що об'єднує досвідчених вчених,
          практиків галузі та молодих дослідників.
        </StaggerItem>
      </Stagger>
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#08090f]" />
    </section>
  );
}

function TeamPage() {
  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">
      <HeroSection />
      <div className="bg-base py-12 sm:py-16 lg:py-24">
        <div className="container-v2 flex flex-col gap-fluid-2xl">
          <StatsBar />

          <div>
            <SectionHeading
              eyebrow="Керівництво"
              title="Керівний"
              highlight="склад"
            />
            <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1} amount={0.1}>
              {LEADERSHIP.map((p) => (
                <StaggerItem key={p.name} mode="up" className="h-full">
                  <LeaderCard person={p} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div>
            <SectionHeading
              eyebrow="Кафедри"
              title="Завідувачі"
              highlight="кафедр"
            />
            <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2" stagger={0.08} amount={0.1}>
              {DEPT_HEADS.map((p) => (
                <StaggerItem key={p.name} mode="up">
                  <DeptHeadCard person={p} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div>
            <SectionHeading
              eyebrow="Викладачі"
              title="Науково-педагогічний"
              highlight="склад"
            />
            <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.04} amount={0.05}>
              {STAFF.map((m) => (
                <StaggerItem key={m.name} mode="scale">
                  <StaffCard member={m} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export const Component = TeamPage;
