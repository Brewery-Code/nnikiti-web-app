export interface Photo {
  id: number;
  src: string;
  alt: string;
  year: number;
  eventId?: string;
  wide: boolean;
}

export interface GalleryEvent {
  id: string;
  title: string;
  year: number;
  date: string;
  description: string;
  coverSeed: number;
}

export const GALLERY_PHOTOS = [
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

const p = (seed: number, _wide: boolean): string =>
  GALLERY_PHOTOS[seed % GALLERY_PHOTOS.length];

export const GALLERY_EVENTS: GalleryEvent[] = [
  {
    id: "vypusknyi-2024",
    title: "Випускний 2024",
    year: 2024,
    date: "22 червня 2024",
    description: "Урочиста церемонія вручення дипломів випускникам ННКІТІ 2024 року. Цього року інститут випустив понад 180 фахівців у галузі інформаційних технологій.",
    coverSeed: 10,
  },
  {
    id: "open-day-2024",
    title: "День відкритих дверей 2024",
    year: 2024,
    date: "15 квітня 2024",
    description: "Щорічний День відкритих дверей ННКІТІ зібрав понад 400 абітурієнтів та їхніх батьків. Студенти та викладачі провели екскурсії лабораторіями і майстер-класи.",
    coverSeed: 17,
  },
  {
    id: "marathon-2023",
    title: "IT-Марафон 2023",
    year: 2023,
    date: "14 жовтня 2023",
    description: "48-годинний хакатон, у якому взяли участь 15 команд із різних факультетів. Переможці розробили мобільний застосунок для моніторингу якості повітря.",
    coverSeed: 22,
  },
  {
    id: "olympiad-2023",
    title: "Олімпіада з програмування 2023",
    year: 2023,
    date: "18 березня 2023",
    description: "Всеукраїнська студентська олімпіада з програмування. Команда ННКІТІ здобула друге місце у командному заліку серед 32 університетів.",
    coverSeed: 28,
  },
  {
    id: "conference-2022",
    title: "Наукова конференція 2022",
    year: 2022,
    date: "25 листопада 2022",
    description: "Міжнародна науково-практична конференція «Інформаційні технології та кібербезпека». 120 доповідей від учасників із 8 країн.",
    coverSeed: 36,
  },
  {
    id: "festival-2022",
    title: "Студентський фестиваль 2022",
    year: 2022,
    date: "3 травня 2022",
    description: "Щорічний студентський фестиваль талантів ННКІТІ. Виступи, конкурси, виставки студентських проєктів та творчі майстерні.",
    coverSeed: 41,
  },
];

export const ALL_PHOTOS: Photo[] = [
  // Випускний 2024
  { id: 1,  src: p(10, true),  alt: "Випускний 2024 — церемонія вручення дипломів",         year: 2024, eventId: "vypusknyi-2024", wide: true  },
  { id: 2,  src: p(11, false), alt: "Випускний 2024 — радість випускників",                 year: 2024, eventId: "vypusknyi-2024", wide: false },
  { id: 3,  src: p(12, true),  alt: "Випускний 2024 — привітання ректора",                  year: 2024, eventId: "vypusknyi-2024", wide: true  },
  { id: 4,  src: p(13, false), alt: "Випускний 2024 — спільне фото групи",                  year: 2024, eventId: "vypusknyi-2024", wide: false },
  { id: 5,  src: p(14, true),  alt: "Випускний 2024 — вручення диплому",                    year: 2024, eventId: "vypusknyi-2024", wide: true  },
  { id: 6,  src: p(15, false), alt: "Випускний 2024 — фото на сходах корпусу",              year: 2024, eventId: "vypusknyi-2024", wide: false },
  // День відкритих дверей 2024
  { id: 7,  src: p(16, true),  alt: "День відкритих дверей 2024 — реєстрація гостей",       year: 2024, eventId: "open-day-2024",  wide: true  },
  { id: 8,  src: p(17, false), alt: "День відкритих дверей 2024 — презентація лабораторії", year: 2024, eventId: "open-day-2024",  wide: false },
  { id: 9,  src: p(18, true),  alt: "День відкритих дверей 2024 — майстер-клас з Python",   year: 2024, eventId: "open-day-2024",  wide: true  },
  { id: 10, src: p(19, false), alt: "День відкритих дверей 2024 — екскурсія корпусом",      year: 2024, eventId: "open-day-2024",  wide: false },
  { id: 11, src: p(20, true),  alt: "День відкритих дверей 2024 — стенди кафедр",           year: 2024, eventId: "open-day-2024",  wide: true  },
  { id: 12, src: p(21, false), alt: "День відкритих дверей 2024 — спілкування зі студентами",year: 2024, eventId: "open-day-2024",  wide: false },
  // IT-Марафон 2023
  { id: 13, src: p(22, true),  alt: "IT-Марафон 2023 — старт хакатону",                     year: 2023, eventId: "marathon-2023",  wide: true  },
  { id: 14, src: p(23, false), alt: "IT-Марафон 2023 — робота команди",                     year: 2023, eventId: "marathon-2023",  wide: false },
  { id: 15, src: p(24, true),  alt: "IT-Марафон 2023 — презентація проєктів",               year: 2023, eventId: "marathon-2023",  wide: true  },
  { id: 16, src: p(25, false), alt: "IT-Марафон 2023 — нагородження переможців",            year: 2023, eventId: "marathon-2023",  wide: false },
  { id: 17, src: p(26, true),  alt: "IT-Марафон 2023 — командна робота",                    year: 2023, eventId: "marathon-2023",  wide: true  },
  // Олімпіада 2023
  { id: 18, src: p(27, true),  alt: "Олімпіада 2023 — учасники за ноутбуками",              year: 2023, eventId: "olympiad-2023",  wide: true  },
  { id: 19, src: p(28, false), alt: "Олімпіада 2023 — відкриття змагань",                   year: 2023, eventId: "olympiad-2023",  wide: false },
  { id: 20, src: p(29, true),  alt: "Олімпіада 2023 — вирішення задачі",                    year: 2023, eventId: "olympiad-2023",  wide: true  },
  { id: 21, src: p(30, false), alt: "Олімпіада 2023 — нагородження призерів",               year: 2023, eventId: "olympiad-2023",  wide: false },
  { id: 22, src: p(31, true),  alt: "Олімпіада 2023 — команда ННКІТІ",                      year: 2023, eventId: "olympiad-2023",  wide: true  },
  // General 2023
  { id: 23, src: p(32, true),  alt: "Студентське життя ННКІТІ 2023",                        year: 2023, wide: true  },
  { id: 24, src: p(33, false), alt: "Заняття в комп'ютерній лабораторії 2023",              year: 2023, wide: false },
  { id: 25, src: p(34, true),  alt: "Студенти на парі з алгоритмів 2023",                   year: 2023, wide: true  },
  { id: 26, src: p(35, false), alt: "Захист дипломних робіт 2023",                          year: 2023, wide: false },
  // Наукова конференція 2022
  { id: 27, src: p(36, true),  alt: "Конференція 2022 — пленарне засідання",                year: 2022, eventId: "conference-2022", wide: true  },
  { id: 28, src: p(37, false), alt: "Конференція 2022 — доповідь студента",                 year: 2022, eventId: "conference-2022", wide: false },
  { id: 29, src: p(38, true),  alt: "Конференція 2022 — дискусійна панель",                 year: 2022, eventId: "conference-2022", wide: true  },
  { id: 30, src: p(39, false), alt: "Конференція 2022 — кулуарне спілкування",              year: 2022, eventId: "conference-2022", wide: false },
  // Студентський фестиваль 2022
  { id: 31, src: p(40, true),  alt: "Фестиваль 2022 — відкриття",                           year: 2022, eventId: "festival-2022", wide: true  },
  { id: 32, src: p(41, false), alt: "Фестиваль 2022 — виступ гурту",                        year: 2022, eventId: "festival-2022", wide: false },
  { id: 33, src: p(42, true),  alt: "Фестиваль 2022 — виставка проєктів",                   year: 2022, eventId: "festival-2022", wide: true  },
  { id: 34, src: p(43, false), alt: "Фестиваль 2022 — творчий конкурс",                     year: 2022, eventId: "festival-2022", wide: false },
  // General 2022
  { id: 35, src: p(44, true),  alt: "Лабораторне заняття з кібербезпеки 2022",              year: 2022, wide: true  },
  { id: 36, src: p(45, false), alt: "Захист курсових проєктів 2022",                        year: 2022, wide: false },
  // General 2021
  { id: 37, src: p(46, true),  alt: "Перший день навчального року 2021",                    year: 2021, wide: true  },
  { id: 38, src: p(47, false), alt: "Онлайн-захист дипломів 2021",                          year: 2021, wide: false },
  { id: 39, src: p(48, true),  alt: "Студентська рада ННКІТІ 2021",                         year: 2021, wide: true  },
  { id: 40, src: p(49, false), alt: "Дистанційне навчання 2021",                            year: 2021, wide: false },
];

export const GALLERY_YEARS = [2024, 2023, 2022, 2021] as const;
