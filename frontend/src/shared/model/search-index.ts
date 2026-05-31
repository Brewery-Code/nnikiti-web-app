import { DEPARTMENTS_DATA } from "./departments-data";
import { ROUTES } from "./routes";

export interface SearchEntry {
  title: string;
  description: string;
  link: string;
  category: string;
  keywords?: string[];
}

const PAGES: SearchEntry[] = [
  {
    title: "Головна",
    description: "Головна сторінка ННІКІТІ — новини, спеціальності, статистика, партнери.",
    link: ROUTES.HOME,
    category: "Сторінки",
    keywords: ["ннкіті", "nuwm", "нувгп", "університет", "інститут"],
  },
  {
    title: "Історія",
    description: "Історія Національного університету водного господарства та природокористування.",
    link: ROUTES.HISTORY,
    category: "Про нас",
    keywords: ["заснування", "1922", "традиції", "розвиток"],
  },
  {
    title: "Стратегія розвитку",
    description: "Стратегічні цілі та пріоритети розвитку ННІКІТІ.",
    link: ROUTES.STRATEGY,
    category: "Про нас",
    keywords: ["місія", "бачення", "цілі", "план"],
  },
  {
    title: "Команда",
    description: "Викладацький склад та адміністрація інституту.",
    link: ROUTES.TEAM,
    category: "Про нас",
    keywords: ["викладачі", "персонал", "адміністрація", "деканат"],
  },
  {
    title: "Випускники",
    description: "Спільнота випускників ННІКІТІ — успішні кар'єри та досягнення.",
    link: ROUTES.ALUMNI,
    category: "Про нас",
    keywords: ["алумні", "alumni", "кар'єра"],
  },
  {
    title: "Новини та події",
    description: "Останні новини, анонси подій та заходи ННІКІТІ.",
    link: ROUTES.EVENTS,
    category: "Новини",
    keywords: ["анонси", "заходи", "конференції", "активності"],
  },
  {
    title: "Галерея",
    description: "Фотохроніка подій та заходів ННІКІТІ.",
    link: ROUTES.GALLERY,
    category: "Медіа",
    keywords: ["фото", "фотографії", "події", "альбоми"],
  },
  {
    title: "Бакалаврат",
    description: "Вступ на бакалаврат: спеціальності, умови, конкурс.",
    link: ROUTES.BACHELOR,
    category: "Вступникам",
    keywords: ["вступ", "НМТ", "бакалавр", "конкурс", "спеціальності"],
  },
  {
    title: "Магістратура",
    description: "Вступ на магістратуру: програми та умови прийому.",
    link: ROUTES.MASTER,
    category: "Вступникам",
    keywords: ["магістр", "ЄФВВ", "вступ", "другий рівень"],
  },
  {
    title: "Молодший спеціаліст",
    description: "Навчання на рівні молодшого спеціаліста.",
    link: ROUTES.UNDERGRADUATE,
    category: "Вступникам",
    keywords: ["молодший бакалавр", "коледж", "фаховий"],
  },
  {
    title: "Аспірантура",
    description: "Аспірантура та PhD-програми ННІКІТІ.",
    link: ROUTES.POSTGRADUATE,
    category: "Вступникам",
    keywords: ["PhD", "докторантура", "науковий ступінь", "дисертація"],
  },
  {
    title: "Публікації",
    description: "Наукові публікації викладачів та студентів інституту.",
    link: ROUTES.SCIENCE_PUBLICATIONS,
    category: "Наука",
    keywords: ["статті", "журнали", "індексування", "Scopus", "WoS"],
  },
  {
    title: "Дослідження",
    description: "Науково-дослідні проєкти та лабораторії ННІКІТІ.",
    link: ROUTES.SCIENCE_RESEARCH,
    category: "Наука",
    keywords: ["проєкти", "лабораторії", "гранти", "дослідження"],
  },
  {
    title: "Конференції",
    description: "Наукові конференції та семінари за участю ННІКІТІ.",
    link: ROUTES.SCIENCE_CONFERENCES,
    category: "Наука",
    keywords: ["семінари", "симпозіуми", "міжнародні"],
  },
  {
    title: "Гранти",
    description: "Грантові програми для студентів та викладачів.",
    link: ROUTES.SCIENCE_GRANTS,
    category: "Наука",
    keywords: ["фінансування", "конкурси", "erasmus", "горизонт"],
  },
  {
    title: "Академічна мобільність",
    description: "Програми обміну та навчання за кордоном для студентів.",
    link: ROUTES.PARTNERS_ACADEMIC_MOBILITY,
    category: "Партнери",
    keywords: ["erasmus", "обмін", "стажування", "закордон", "Польща", "ЄС"],
  },
  {
    title: "Бізнес-партнери",
    description: "IT-компанії та корпоративні партнери ННІКІТІ.",
    link: ROUTES.PARTNERS_BUSINESS,
    category: "Партнери",
    keywords: ["SoftServe", "EPAM", "GlobalLogic", "Intellias", "стажування", "практика"],
  },
  {
    title: "Контакти",
    description: "Адреса, телефони та електронна пошта ННІКІТІ.",
    link: ROUTES.CONTACTS,
    category: "Контакти",
    keywords: ["адреса", "телефон", "email", "пошта", "деканат", "приймальна комісія"],
  },
  {
    title: "Часті запитання (FAQ)",
    description: "Відповіді на найпоширеніші запитання абітурієнтів та студентів.",
    link: ROUTES.FAQ,
    category: "Контакти",
    keywords: ["питання", "відповіді", "допомога"],
  },
  {
    title: "Задати питання",
    description: "Форма для надсилання запитань до адміністрації.",
    link: ROUTES.ASK_QUESTION,
    category: "Контакти",
    keywords: ["зворотній зв'язок", "форма", "запит"],
  },
];

const SPECIALTIES: SearchEntry[] = [
  {
    title: "121 — Інженерія програмного забезпечення",
    description: "Backend, Frontend, AI, DevOps. Бюджет: 20 місць, контракт: 40 місць.",
    link: ROUTES.BACHELOR,
    category: "Спеціальності",
    keywords: ["121", "software engineering", "розробка", "програмування"],
  },
  {
    title: "122 — Комп'ютерні науки",
    description: "Алгоритми, машинне навчання, мережі. Бюджет: 15 місць, контракт: 35 місць.",
    link: ROUTES.BACHELOR,
    category: "Спеціальності",
    keywords: ["122", "computer science", "ML", "AI", "штучний інтелект"],
  },
  {
    title: "126 — Інформаційні системи та технології",
    description: "ERP, хмарні технології, BI. Бюджет: 18 місць, контракт: 30 місць.",
    link: ROUTES.BACHELOR,
    category: "Спеціальності",
    keywords: ["126", "information systems", "хмара", "cloud", "бізнес-аналітика"],
  },
  {
    title: "192 — Будівництво та цивільна інженерія",
    description: "BIM, гідротехніка, проєктування. Бюджет: 25 місць, контракт: 25 місць.",
    link: ROUTES.BACHELOR,
    category: "Спеціальності",
    keywords: ["192", "будівництво", "цивільна", "гідро"],
  },
  {
    title: "193 — Геодезія та землеустрій",
    description: "GIS, дистанційне зондування. Бюджет: 12 місць, контракт: 20 місць.",
    link: ROUTES.BACHELOR,
    category: "Спеціальності",
    keywords: ["193", "геодезія", "землеустрій", "GIS", "картографія"],
  },
  {
    title: "101 — Екологія",
    description: "Водні ресурси, природокористування, екологічна політика.",
    link: ROUTES.BACHELOR,
    category: "Спеціальності",
    keywords: ["101", "екологія", "водне господарство", "природа", "environment"],
  },
];

const DEPARTMENTS: SearchEntry[] = DEPARTMENTS_DATA.map((dept) => ({
  title: `Кафедра ${dept.name}`,
  description: dept.description,
  link: `/department/${dept.id}`,
  category: "Кафедри",
  keywords: [dept.name.toLowerCase()],
}));

export const SEARCH_INDEX: SearchEntry[] = [...PAGES, ...SPECIALTIES, ...DEPARTMENTS];

export function searchEntries(query: string): SearchEntry[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = SEARCH_INDEX.map((entry) => {
    const haystack = [
      entry.title,
      entry.description,
      entry.category,
      ...(entry.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    const matchCount = tokens.filter((t) => haystack.includes(t)).length;
    const titleMatch = tokens.some((t) => entry.title.toLowerCase().includes(t));

    return { entry, score: matchCount * (titleMatch ? 2 : 1) };
  });

  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.entry);
}
