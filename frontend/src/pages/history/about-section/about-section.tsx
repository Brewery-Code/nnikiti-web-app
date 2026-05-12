import clsx from "clsx";
import { Reveal } from "@/shared/ui";

const chapters = [
  {
    label: "Витоки",
    title: "Від факультету до інституту",
    paragraphs: [
      "Історія ННКІТІ бере початок у 2000 році, коли в НУВГП було засновано факультет прикладної математики та комп'ютерно-інтегрованих систем. Відтоді ідея підготовки IT-фахівців у стінах технічного університету перетворилась на повноцінний стратегічний напрям розвитку закладу.",
      "12 квітня 2013 року наказом ректора на базі цього факультету створено Навчально-науковий інститут комп'ютерних та інноваційних технологій та економіки — ННКІТІ. Інститут об'єднав профільні кафедри й отримав самостійну адміністративну структуру, власний науковий потенціал та матеріально-технічну базу.",
    ],
  },
  {
    label: "Структура",
    title: "Кафедри та підрозділи",
    paragraphs: [
      "До складу ННКІТІ входять кафедри вищої математики, обчислювальної техніки, комп'ютерних наук та прикладної математики, автоматизації, електричних та комп'ютерно-інтегрованих технологій, а також кафедра комп'ютерних технологій та економічної кібернетики.",
      "Остання виникла у 2019 році шляхом злиття двох підрозділів — кафедри комп'ютерних наук (заснована липень 2013) та кафедри економічної кібернетики (заснована квітень 2013). Сьогодні тут зосереджені програми з інформаційних технологій в бізнесі, дистанційного навчання та економічної кібернетики.",
    ],
  },
  {
    label: "Наука",
    title: "Дослідження і партнерства",
    paragraphs: [
      "ННКІТІ активно провадить наукову діяльність: викладачі та студенти беруть участь у міжнародних грантових програмах, публікують роботи у виданнях, що індексуються Scopus та Web of Science, а також організовують щорічні науково-практичні конференції.",
      "Інститут співпрацює з провідними IT-компаніями регіону, які долучаються до розробки навчальних програм, забезпечують студентам доступ до реальних проєктів та надають потужні стажування. Завдяки цьому відсоток працевлаштування випускників стабільно залишається на рівні 90–95%.",
    ],
  },
  {
    label: "Сьогодення",
    title: "ННКІТІ у цифрову епоху",
    paragraphs: [
      "Нині ННКІТІ готує фахівців за восьма ліцензованими спеціальностями у сфері IT, автоматизації та кібербезпеки. В інституті функціонують сучасні комп'ютерні класи, лабораторія кібербезпеки та Центр цифрових компетенцій — простір для інноваційних проєктів і стартапів.",
      "У 2015 році НУВГП, до складу якого входить ННКІТІ, приєднався до Magna Charta Universitatum — міжнародної хартії університетів, що підтверджує відданість принципам академічної свободи. Для студентів доступні програми подвійних дипломів з європейськими університетами та академічна мобільність у рамках Erasmus+.",
    ],
  },
];

function Chapter({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[0];
  index: number;
}) {
  return (
    <div className="grid grid-cols-[64px_1fr] gap-8 border-t border-white/[0.07] py-12 md:grid-cols-[120px_1fr] md:gap-12 lg:py-16">
      <div className="flex flex-col items-start pt-1">
        <span
          className="font-display"
          style={{
            fontWeight: 900,
            fontSize: "clamp(28px, 2.5vw, 48px)",
            color: "rgba(255,255,255,0.10)",
            letterSpacing: "-0.04em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="mt-3 h-3 w-px bg-gradient-to-b from-violet-500 to-blue-500" />
      </div>

      <div>
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400">
          — {chapter.label}
        </p>
        <h3
          className="font-display mb-6 font-black leading-tight text-white"
          style={{
            fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {chapter.title}
        </h3>
        <div className="flex flex-col gap-4">
          {chapter.paragraphs.map((p, i) => (
            <p
              key={i}
              className="max-w-2xl text-[14px] leading-relaxed text-white/55 sm:text-[15px]"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutSection({ className }: { className?: string }) {
  return (
    <section className={clsx("py-12 sm:py-16 lg:py-20", className)}>
      <div className="container-v2">
        <Reveal mode="fade" className="mb-10 flex items-center gap-4 lg:mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/25">
            — Про інститут
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </Reveal>

        <Reveal mode="up" className="mb-10 lg:mb-14">
          <h2
            className="font-display font-black text-white"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Хто ми <span className="text-grad">насправді</span>
          </h2>
        </Reveal>

        {chapters.map((chapter, i) => (
          <Reveal key={i} mode="up" amount={0.1}>
            <Chapter chapter={chapter} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
