import clsx from "clsx";
import { Reveal } from "@/shared/ui";

const events = [
  {
    year: "2004",
    title: "Заснування ННІ КІТІ",
    description:
      "Указом Президента України НУВГП отримав статус національного університету. У цьому ж році засновано ННІ комп'ютерних та інноваційних технологій та економіки — передовий навчальний центр, який стає драйвером цифрової трансформації.",
    tag: "Вітчизняний IT",
  },
  {
    year: "2008",
    title: "Перші IT-спеціалісти",
    description:
      "ННІКІТІ випускає перші когорти IT-фахівців. Випускники швидко знаходять роботу в провідних компаніях України та світу. Заклад набуває репутації навчального центру з сучасною IT-освітою.",
    tag: "Перші успіхи",
  },
  {
    year: "2012",
    title: "Відкриття лабораторії кібербезпеки",
    description:
      "ННІКІТІ відкриває спеціалізовану лабораторію кібербезпеки з сучасним обладнанням. Розпочинається підготовка фахівців у критично важливій сфері — захист від кіберзагроз.",
    tag: "Кібербезпека",
  },
  {
    year: "2015",
    title: "Розширення спеціальностей",
    description:
      "ННІКІТІ розширює перелік програм підготовки: додаються спеціальності з Data Science, Machine Learning та хмарних технологій. Інститут стає лідером в ІТ-освіті регіону.",
    tag: "Інновації",
  },
  {
    year: "2018",
    title: "Міжнародна акредитація",
    description:
      "Програми ННІКІТІ отримують міжнародну акредитацію. Інститут починає активну співпрацю з провідними закордонними університетами та IT-компаніями (Google, Microsoft, IBM).",
    tag: "Світовий рівень",
  },
  {
    year: "2020",
    title: "Інновації під час пандемії",
    description:
      "ННІКІТІ успішно адаптується до дистанційного навчання. Розробляється власна платформа для online-освіти. Інститут стає центром компетенцій з цифровізації освіти.",
    tag: "Адаптація",
  },
  {
    year: "2022",
    title: "Центр цифрових компетенцій",
    description:
      "ННІКІТІ запускає Центр цифрових компетенцій — сучасний простір для навчання, інноваційних проектів та стартапів. Тут зустрічаються студенти, які хочуть змінити світ технологіями.",
    tag: "Центр інновацій",
  },
  {
    year: "Сьогодні",
    title: "ННІКІТІ — флагман IT-освіти",
    description:
      "ННІ комп'ютерних та інноваційних технологій та економіки готує фахівців за 8+ спеціальностями в IT, автоматизації та кібербезпеці. Сучасні лабораторії, досвідчені викладачі, партнерство з лідерами industry 4.0, та студенти, які створюють майбутнє.",
    tag: "Майбутнє",
  },
];

function TimelineEvent({
  event,
  index,
}: {
  event: (typeof events)[0];
  index: number;
}) {
  const isToday = event.year === "Сьогодні";
  const isLast = index === events.length - 1;

  return (
    <Reveal
      mode="up"
      amount={0.2}
      className={clsx(
        "grid grid-cols-[80px_1fr] gap-6 border-t border-white/[0.07] py-8 md:grid-cols-[160px_1fr] md:gap-12 lg:py-10",
        isLast && "border-b border-white/[0.07]"
      )}
    >
      <div className="flex flex-col gap-2 pt-0.5">
        <span
          className="font-display leading-none"
          style={{
            fontWeight: 900,
            fontSize: "clamp(22px, 2.4vw, 44px)",
            letterSpacing: "-0.04em",
          }}
        >
          {isToday ? (
            <span className="text-grad">★</span>
          ) : (
            <span style={{ color: "var(--text-subtle)" }}>{event.year}</span>
          )}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-400/80">
          {event.tag}
        </span>
      </div>

      <div>
        <h3
          className="font-display mb-2 font-bold text-primary"
          style={{ fontSize: "1.15rem", letterSpacing: "-0.02em" }}
        >
          {event.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-muted">
          {event.description}
        </p>
      </div>
    </Reveal>
  );
}

export default function TimelineSection({ className }: { className?: string }) {
  return (
    <section className={clsx("py-12 sm:py-16 lg:py-20", className)}>
      <div className="container-v2">
        <Reveal mode="fade" className="mb-10 flex items-center gap-4 lg:mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/25">
            — Хронологія
          </span>
          <div className="h-px flex-1 bg-surface-lg" />
        </Reveal>

        <Reveal mode="up" className="mb-10 lg:mb-14">
          <h2
            className="font-display font-black text-primary"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Ключові моменти <span className="text-grad">нашої історії</span>
          </h2>
        </Reveal>

        <div>
          {events.map((event, i) => (
            <TimelineEvent key={i} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
