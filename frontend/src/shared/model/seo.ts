import { ROUTES } from "./routes";

export const SITE_URL = "https://nnikiti.duckdns.org";
export const SITE_NAME = "ННІКІТІ";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/students-hall.jpg`;

export type Lang = "uk" | "en";

export interface SeoMeta {
  title: string;
  description: string;
}

type SeoEntry = Record<Lang, SeoMeta>;

/**
 * Per-route SEO metadata. Keys are concrete pathnames (matching ROUTES).
 * The rendered <Seo /> component looks the current pathname up here and
 * falls back to DEFAULT_SEO for dynamic / unmapped routes.
 */
export const SEO_BY_PATH: Record<string, SeoEntry> = {
  [ROUTES.HOME]: {
    uk: {
      title: "ННІКІТІ — Інститут комп'ютерних та інноваційних технологій | НУВГП",
      description:
        "Навчально-науковий інститут комп'ютерних та інноваційних технологій та економіки НУВГП у Рівному. Вступ, спеціальності, наука, події та контакти.",
    },
    en: {
      title: "NNIKITI — Institute of Computer and Innovative Technologies | NUWEE",
      description:
        "Institute of Computer and Innovative Technologies and Economics at NUWEE in Rivne. Admissions, programmes, science, events and contacts.",
    },
  },
  [ROUTES.HISTORY]: {
    uk: {
      title: "Історія інституту — ННІКІТІ",
      description: "Історія та розвиток ННІ комп'ютерних та інноваційних технологій НУВГП з 2004 року.",
    },
    en: {
      title: "History — NNIKITI",
      description: "History and development of the Institute of Computer and Innovative Technologies at NUWEE since 2004.",
    },
  },
  [ROUTES.STRATEGY]: {
    uk: {
      title: "Стратегія розвитку — ННІКІТІ",
      description: "Стратегія та напрями розвитку ННІКІТІ НУВГП.",
    },
    en: {
      title: "Strategy — NNIKITI",
      description: "Development strategy and priorities of NNIKITI at NUWEE.",
    },
  },
  [ROUTES.TEAM]: {
    uk: {
      title: "Команда — ННІКІТІ",
      description: "Викладачі та співробітники ННІ комп'ютерних та інноваційних технологій НУВГП.",
    },
    en: {
      title: "Team — NNIKITI",
      description: "Lecturers and staff of the Institute of Computer and Innovative Technologies at NUWEE.",
    },
  },
  [ROUTES.ALUMNI]: {
    uk: {
      title: "Випускники — ННІКІТІ",
      description: "Випускники ННІКІТІ та їхні історії успіху в IT та науці.",
    },
    en: {
      title: "Alumni — NNIKITI",
      description: "NNIKITI alumni and their success stories in IT and science.",
    },
  },
  [ROUTES.GALLERY]: {
    uk: {
      title: "Галерея — ННІКІТІ",
      description: "Фотогалерея подій, заходів та студентського життя ННІКІТІ.",
    },
    en: {
      title: "Gallery — NNIKITI",
      description: "Photo gallery of events and student life at NNIKITI.",
    },
  },
  [ROUTES.GALLERY_ALL]: {
    uk: {
      title: "Усі альбоми — Галерея ННІКІТІ",
      description: "Повна фотогалерея ННІКІТІ: усі альбоми подій, заходів та студентського життя.",
    },
    en: {
      title: "All Albums — NNIKITI Gallery",
      description: "Full photo gallery of NNIKITI: all albums of events and student life.",
    },
  },
  [ROUTES.EVENTS]: {
    uk: {
      title: "Події та новини — ННІКІТІ",
      description: "Актуальні події, новини та анонси заходів ННІКІТІ НУВГП.",
    },
    en: {
      title: "Events & News — NNIKITI",
      description: "Latest events, news and announcements from NNIKITI at NUWEE.",
    },
  },
  [ROUTES.UNDERGRADUATE]: {
    uk: {
      title: "Вступникам — ННІКІТІ",
      description: "Все про вступ до ННІКІТІ НУВГП: спеціальності, програми, умови та строки.",
    },
    en: {
      title: "For Entrants — NNIKITI",
      description: "Everything about admission to NNIKITI, NUWEE: programmes, requirements and deadlines.",
    },
  },
  [ROUTES.BACHELOR]: {
    uk: {
      title: "Бакалаврат — Вступ до ННІКІТІ",
      description: "Спеціальності бакалаврату, умови вступу та освітні програми ННІКІТІ НУВГП.",
    },
    en: {
      title: "Bachelor's — Admission to NNIKITI",
      description: "Bachelor's programmes, admission requirements and curricula at NNIKITI, NUWEE.",
    },
  },
  [ROUTES.MASTER]: {
    uk: {
      title: "Магістратура — Вступ до ННІКІТІ",
      description: "Спеціальності магістратури, умови вступу та освітні програми ННІКІТІ НУВГП.",
    },
    en: {
      title: "Master's — Admission to NNIKITI",
      description: "Master's programmes, admission requirements and curricula at NNIKITI, NUWEE.",
    },
  },
  [ROUTES.POSTGRADUATE]: {
    uk: {
      title: "Аспірантура — Вступ до ННІКІТІ",
      description: "Програми аспірантури та наукова підготовка в ННІКІТІ НУВГП.",
    },
    en: {
      title: "Postgraduate — Admission to NNIKITI",
      description: "Postgraduate programmes and research training at NNIKITI, NUWEE.",
    },
  },
  [ROUTES.SCIENCE_PUBLICATIONS]: {
    uk: {
      title: "Публікації — Наука ННІКІТІ",
      description: "Наукові публікації викладачів та дослідників ННІКІТІ НУВГП.",
    },
    en: {
      title: "Publications — NNIKITI Science",
      description: "Scientific publications by researchers of NNIKITI, NUWEE.",
    },
  },
  [ROUTES.SCIENCE_RESEARCH]: {
    uk: {
      title: "Дослідження — Наука ННІКІТІ",
      description: "Наукові напрями та дослідницькі проєкти ННІКІТІ НУВГП.",
    },
    en: {
      title: "Research — NNIKITI Science",
      description: "Research areas and projects at NNIKITI, NUWEE.",
    },
  },
  [ROUTES.SCIENCE_CONFERENCES]: {
    uk: {
      title: "Конференції — Наука ННІКІТІ",
      description: "Наукові конференції та семінари за участі ННІКІТІ НУВГП.",
    },
    en: {
      title: "Conferences — NNIKITI Science",
      description: "Scientific conferences and seminars at NNIKITI, NUWEE.",
    },
  },
  [ROUTES.SCIENCE_GRANTS]: {
    uk: {
      title: "Гранти — Наука ННІКІТІ",
      description: "Грантові програми та можливості фінансування досліджень у ННІКІТІ.",
    },
    en: {
      title: "Grants — NNIKITI Science",
      description: "Grant programmes and research funding opportunities at NNIKITI.",
    },
  },
  [ROUTES.PARTNERS_BUSINESS]: {
    uk: {
      title: "Бізнес-партнери — ННІКІТІ",
      description: "Партнерство з IT-компаніями та бізнесом для студентів ННІКІТІ НУВГП.",
    },
    en: {
      title: "Business Partners — NNIKITI",
      description: "Partnerships with IT companies and business for NNIKITI students.",
    },
  },
  [ROUTES.PARTNERS_ACADEMIC_MOBILITY]: {
    uk: {
      title: "Академічна мобільність — ННІКІТІ",
      description: "Програми академічної мобільності та міжнародної співпраці ННІКІТІ НУВГП.",
    },
    en: {
      title: "Academic Mobility — NNIKITI",
      description: "Academic mobility and international cooperation programmes at NNIKITI.",
    },
  },
  [ROUTES.CONTACTS]: {
    uk: {
      title: "Контакти — ННІКІТІ",
      description: "Контакти деканату ННІКІТІ НУВГП: адреса, телефони та електронна пошта, Рівне.",
    },
    en: {
      title: "Contacts — NNIKITI",
      description: "Contact details of NNIKITI at NUWEE: address, phone and email, Rivne.",
    },
  },
  [ROUTES.FAQ]: {
    uk: {
      title: "Часті питання — ННІКІТІ",
      description: "Відповіді на часті питання про вступ, навчання та життя в ННІКІТІ НУВГП.",
    },
    en: {
      title: "FAQ — NNIKITI",
      description: "Answers to frequently asked questions about admission and studies at NNIKITI.",
    },
  },
  [ROUTES.ASK_QUESTION]: {
    uk: {
      title: "Задати питання — ННІКІТІ",
      description: "Поставте своє питання приймальній комісії та деканату ННІКІТІ НУВГП.",
    },
    en: {
      title: "Ask a Question — NNIKITI",
      description: "Ask the admissions office and dean's office of NNIKITI, NUWEE.",
    },
  },
};

export const DEFAULT_SEO: SeoEntry = SEO_BY_PATH[ROUTES.HOME];

export function getSeoForPath(pathname: string, lang: Lang): SeoMeta {
  const entry = SEO_BY_PATH[pathname] ?? DEFAULT_SEO;
  return entry[lang] ?? entry.uk;
}

/** Strip HTML/Markdown markup and collapse whitespace — for building descriptions. */
export function stripMarkup(text: string): string {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_`>[\]!]|\(https?:\/\/[^)]*\)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Clamp a description to a search-friendly length (~155 chars). */
export function clampText(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}
