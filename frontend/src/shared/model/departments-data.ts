export type SubjectType = "Нормативна" | "Вибіркова";

export interface ProgramSubject {
  name: string;
  credits: number;
  semester: number;
  type: SubjectType;
}

export interface DepartmentData {
  id: number;
  name: string;
  description: string;
  email: string;
  address: string;
  phone: string;
  coverSeed: number;
  head: {
    full_name: string;
    regalia: string;
    email?: string;
    audience?: string;
    img: number;
  };
  programs: {
    id: number;
    code: string;
    name: string;
    description: string;
    degree: string;
    duration: string;
    form: string;
    totalCredits: number;
    subjects: ProgramSubject[];
  }[];
  team: {
    name: string;
    role: string;
    specialty: string;
    img: number;
  }[];
  history: {
    year: string;
    text: string;
  }[];
}

export const DEPARTMENTS_DATA: DepartmentData[] = [
  {
    id: 1,
    name: "Вищої математики",
    description:
      "Кафедра вищої математики — базовий підрозділ ННКІТІ, що забезпечує математичну підготовку студентів усіх спеціальностей інституту. Викладачі кафедри мають значний досвід науково-педагогічної роботи і провадять дослідження у сфері прикладної математики, чисельних методів та математичного моделювання.",
    email: "math@nuwm.edu.ua",
    address: "вул. Соборна, 11, корп. 1, ауд. 215, Рівне, 33000",
    phone: "+380362633209",
    coverSeed: 55,
    head: {
      full_name: "Бойко Ірина Петрівна",
      regalia: "Кандидат фізико-математичних наук, доцент",
      email: "boiko.i@nuwm.edu.ua",
      audience: "215",
      img: 5,
    },
    programs: [
      {
        id: 1,
        code: "111",
        name: "Математика",
        description: "Фундаментальна математична підготовка, методи аналізу, алгебра та математична логіка.",
        degree: "Бакалавр",
        duration: "4 роки",
        form: "Денна / заочна",
        totalCredits: 240,
        subjects: [
          { name: "Математичний аналіз",        credits: 12, semester: 1, type: "Нормативна" },
          { name: "Алгебра та геометрія",        credits: 8,  semester: 1, type: "Нормативна" },
          { name: "Дискретна математика",        credits: 6,  semester: 2, type: "Нормативна" },
          { name: "Теорія ймовірностей",         credits: 6,  semester: 3, type: "Нормативна" },
          { name: "Математична статистика",      credits: 5,  semester: 4, type: "Нормативна" },
          { name: "Математична логіка",          credits: 5,  semester: 3, type: "Нормативна" },
          { name: "Диференціальні рівняння",     credits: 8,  semester: 4, type: "Нормативна" },
          { name: "Функціональний аналіз",       credits: 6,  semester: 5, type: "Нормативна" },
          { name: "Топологія",                   credits: 5,  semester: 6, type: "Вибіркова"  },
          { name: "Теорія чисел",                credits: 4,  semester: 6, type: "Вибіркова"  },
          { name: "Педагогічна практика",        credits: 6,  semester: 7, type: "Нормативна" },
          { name: "Дипломна робота",             credits: 12, semester: 8, type: "Нормативна" },
        ],
      },
      {
        id: 2,
        code: "113",
        name: "Прикладна математика",
        description: "Математичне моделювання, чисельні методи, оптимізація та аналіз даних.",
        degree: "Бакалавр",
        duration: "4 роки",
        form: "Денна",
        totalCredits: 240,
        subjects: [
          { name: "Математичний аналіз",         credits: 12, semester: 1, type: "Нормативна" },
          { name: "Чисельні методи",             credits: 8,  semester: 2, type: "Нормативна" },
          { name: "Теорія ймовірностей",         credits: 6,  semester: 3, type: "Нормативна" },
          { name: "Математичне моделювання",     credits: 8,  semester: 4, type: "Нормативна" },
          { name: "Оптимізація та дослідження операцій", credits: 7, semester: 4, type: "Нормативна" },
          { name: "Програмування на Python",    credits: 6,  semester: 3, type: "Нормативна" },
          { name: "Статистичний аналіз даних",  credits: 6,  semester: 5, type: "Нормативна" },
          { name: "Теорія ігор",                credits: 5,  semester: 5, type: "Вибіркова"  },
          { name: "Комп'ютерна графіка",        credits: 4,  semester: 6, type: "Вибіркова"  },
          { name: "Методи штучного інтелекту",  credits: 6,  semester: 6, type: "Вибіркова"  },
          { name: "Переддипломна практика",     credits: 6,  semester: 7, type: "Нормативна" },
          { name: "Дипломна робота",            credits: 12, semester: 8, type: "Нормативна" },
        ],
      },
    ],
    team: [
      { name: "Бойко Ірина Петрівна",    role: "Кандидат ф-м. наук, доцент",   specialty: "Математичний аналіз",   img: 5  },
      { name: "Ткач Олексій Миколайович", role: "Доктор тех. наук, професор",   specialty: "Чисельні методи",       img: 12 },
      { name: "Сидоренко Марія Василівна",role: "Кандидат ф-м. наук, доцент",   specialty: "Алгебра та геометрія",  img: 9  },
      { name: "Гриценко Петро Андрійович",role: "Старший викладач",              specialty: "Теорія ймовірностей",   img: 23 },
      { name: "Кравченко Ольга Іванівна", role: "Асистент",                      specialty: "Дискретна математика",  img: 16 },
    ],
    history: [
      { year: "2004", text: "Кафедру засновано як підрозділ новоствореного факультету інформаційних технологій НУВГП для забезпечення математичної підготовки ІТ-студентів." },
      { year: "2010-ті", text: "Активний розвиток наукових напрямів: захищено кандидатські дисертації, встановлено партнерство з польськими та словацькими університетами." },
      { year: "2019", text: "Після реорганізації кафедра увійшла до складу ННКІТІ та оновила навчальні плани відповідно до стандартів Нової освіти." },
      { year: "Сьогодні", text: "Кафедра веде активну наукову діяльність, публікує результати у виданнях Scopus, бере участь у міжнародних освітніх проєктах Erasmus+." },
    ],
  },
  {
    id: 2,
    name: "Комп'ютерних технологій та економічної кібернетики",
    description:
      "Кафедра є одним із ключових підрозділів ННКІТІ, що готує фахівців на перетині інформаційних технологій та економіки. Студенти отримують ґрунтовну підготовку з розробки програмного забезпечення, економічного аналізу та бізнес-інтелекту.",
    email: "ktek@nuwm.edu.ua",
    address: "вул. Соборна, 11, корп. 1, ауд. 318, Рівне, 33000",
    phone: "+380362633210",
    coverSeed: 60,
    head: {
      full_name: "Приймак Михайло Васильович",
      regalia: "Доктор технічних наук, професор",
      email: "pryimak.m@nuwm.edu.ua",
      audience: "318",
      img: 32,
    },
    programs: [
      {
        id: 1,
        code: "122",
        name: "Комп'ютерні науки",
        description: "Розробка програмного забезпечення, алгоритми, структури даних, штучний інтелект.",
        degree: "Бакалавр",
        duration: "4 роки",
        form: "Денна",
        totalCredits: 240,
        subjects: [
          { name: "Алгоритми та структури даних", credits: 8,  semester: 1, type: "Нормативна" },
          { name: "ООП та патерни проектування",  credits: 8,  semester: 2, type: "Нормативна" },
          { name: "Бази даних та SQL",             credits: 7,  semester: 3, type: "Нормативна" },
          { name: "Комп'ютерні мережі",            credits: 6,  semester: 3, type: "Нормативна" },
          { name: "Операційні системи",            credits: 6,  semester: 4, type: "Нормативна" },
          { name: "Веб-розробка (Full-stack)",     credits: 8,  semester: 4, type: "Нормативна" },
          { name: "Машинне навчання",              credits: 7,  semester: 5, type: "Нормативна" },
          { name: "Хмарні технології",             credits: 5,  semester: 6, type: "Вибіркова"  },
          { name: "Мобільна розробка",             credits: 5,  semester: 6, type: "Вибіркова"  },
          { name: "Управління IT-проєктами",       credits: 4,  semester: 7, type: "Вибіркова"  },
          { name: "Переддипломна практика",        credits: 6,  semester: 7, type: "Нормативна" },
          { name: "Дипломна робота",               credits: 12, semester: 8, type: "Нормативна" },
        ],
      },
      {
        id: 2,
        code: "051",
        name: "Економічна кібернетика",
        description: "Математичне моделювання економічних систем, аналіз даних і підтримка прийняття рішень.",
        degree: "Бакалавр",
        duration: "4 роки",
        form: "Денна / заочна",
        totalCredits: 240,
        subjects: [
          { name: "Математичне моделювання економіки", credits: 8,  semester: 1, type: "Нормативна" },
          { name: "Дослідження операцій",             credits: 7,  semester: 2, type: "Нормативна" },
          { name: "Теорія ймовірностей та статистика", credits: 7, semester: 2, type: "Нормативна" },
          { name: "Бази даних та аналіз даних",       credits: 7,  semester: 3, type: "Нормативна" },
          { name: "Економетрика",                     credits: 6,  semester: 4, type: "Нормативна" },
          { name: "Теорія прийняття рішень",          credits: 5,  semester: 4, type: "Нормативна" },
          { name: "Business Intelligence",            credits: 6,  semester: 5, type: "Нормативна" },
          { name: "Фінансове моделювання",            credits: 5,  semester: 5, type: "Вибіркова"  },
          { name: "Нейронні мережі в економіці",      credits: 5,  semester: 6, type: "Вибіркова"  },
          { name: "Переддипломна практика",           credits: 6,  semester: 7, type: "Нормативна" },
          { name: "Дипломна робота",                  credits: 12, semester: 8, type: "Нормативна" },
        ],
      },
      {
        id: 3,
        code: "126",
        name: "Інформаційні системи та технології",
        description: "Проектування та розробка корпоративних ІС, ERP-систем, бізнес-аналітика.",
        degree: "Бакалавр",
        duration: "4 роки",
        form: "Денна / заочна",
        totalCredits: 240,
        subjects: [
          { name: "Системний аналіз",             credits: 7,  semester: 1, type: "Нормативна" },
          { name: "Проектування ІС",              credits: 8,  semester: 2, type: "Нормативна" },
          { name: "Бази даних та СУБД",           credits: 7,  semester: 3, type: "Нормативна" },
          { name: "ERP-системи (SAP, 1C)",        credits: 7,  semester: 4, type: "Нормативна" },
          { name: "Бізнес-аналітика та BI",       credits: 6,  semester: 4, type: "Нормативна" },
          { name: "Хмарні технології (AWS/Azure)", credits: 6, semester: 5, type: "Нормативна" },
          { name: "Безпека інформаційних систем", credits: 5,  semester: 5, type: "Нормативна" },
          { name: "Управління IT-проєктами",      credits: 5,  semester: 6, type: "Вибіркова"  },
          { name: "DevOps та CI/CD",              credits: 5,  semester: 6, type: "Вибіркова"  },
          { name: "Переддипломна практика",       credits: 6,  semester: 7, type: "Нормативна" },
          { name: "Дипломна робота",              credits: 12, semester: 8, type: "Нормативна" },
        ],
      },
    ],
    team: [
      { name: "Приймак Михайло Васильович", role: "Доктор тех. наук, професор",   specialty: "Системний аналіз",        img: 32 },
      { name: "Волошин Дмитро Сергійович",  role: "Кандидат тех. наук, доцент",   specialty: "Веб-розробка",            img: 29 },
      { name: "Романюк Наталія Андріївна",  role: "Кандидат екон. наук, доцент",  specialty: "Економічна кібернетика",  img: 3  },
      { name: "Лисенко Артем Олегович",     role: "Старший викладач",             specialty: "Бази даних та SQL",       img: 15 },
      { name: "Марченко Юлія Вікторівна",   role: "Асистент",                     specialty: "Frontend-розробка",       img: 21 },
      { name: "Степаненко Роман Іванович",  role: "Асистент",                     specialty: "Python та Data Science",  img: 13 },
    ],
    history: [
      { year: "2004", text: "Кафедра заснована у складі факультету інформаційних технологій як підрозділ, що поєднує навчання з комп'ютерних технологій та економічного моделювання." },
      { year: "2009", text: "Відкрито нову спеціальність «Економічна кібернетика», розроблено авторські навчальні курси з аналізу економічних систем." },
      { year: "2013", text: "Разом з усім інститутом кафедра увійшла до складу ННКІТІ. Встановлено партнерство з IT-компаніями регіону для практичного навчання студентів." },
      { year: "Сьогодні", text: "Кафедра є лідером у підготовці full-stack розробників та data-аналітиків. Випускники успішно працюють в українських та міжнародних IT-компаніях." },
    ],
  },
  {
    id: 3,
    name: "Обчислювальної техніки",
    description:
      "Кафедра обчислювальної техніки спеціалізується на підготовці інженерів у галузі апаратного та системного програмного забезпечення, комп'ютерних мереж та вбудованих систем. Лабораторна база кафедри оснащена сучасним обладнанням для практичних занять.",
    email: "ot@nuwm.edu.ua",
    address: "вул. Соборна, 11, корп. 2, ауд. 112, Рівне, 33000",
    phone: "+380362633211",
    coverSeed: 65,
    head: {
      full_name: "Кузьменко Олег Васильович",
      regalia: "Кандидат технічних наук, доцент",
      email: "kuzmenko.o@nuwm.edu.ua",
      audience: "112",
      img: 14,
    },
    programs: [
      {
        id: 1,
        code: "123",
        name: "Комп'ютерна інженерія",
        description: "Архітектура комп'ютерів, операційні системи, мікроконтролери та вбудовані системи.",
        degree: "Бакалавр",
        duration: "4 роки",
        form: "Денна",
        totalCredits: 240,
        subjects: [
          { name: "Архітектура комп'ютерів",    credits: 8,  semester: 1, type: "Нормативна" },
          { name: "Цифрова схемотехніка",       credits: 7,  semester: 2, type: "Нормативна" },
          { name: "Операційні системи",         credits: 7,  semester: 3, type: "Нормативна" },
          { name: "Мікропроцесорні системи",    credits: 8,  semester: 3, type: "Нормативна" },
          { name: "Комп'ютерні мережі",         credits: 7,  semester: 4, type: "Нормативна" },
          { name: "Вбудовані системи",          credits: 7,  semester: 4, type: "Нормативна" },
          { name: "Інтернет речей (IoT)",       credits: 6,  semester: 5, type: "Вибіркова"  },
          { name: "Системне програмування",     credits: 6,  semester: 5, type: "Нормативна" },
          { name: "FPGA та ASIC",               credits: 5,  semester: 6, type: "Вибіркова"  },
          { name: "Паралельні обчислення",      credits: 5,  semester: 6, type: "Вибіркова"  },
          { name: "Переддипломна практика",     credits: 6,  semester: 7, type: "Нормативна" },
          { name: "Дипломна робота",            credits: 12, semester: 8, type: "Нормативна" },
        ],
      },
      {
        id: 2,
        code: "125",
        name: "Кібербезпека",
        description: "Захист комп'ютерних мереж, криптографія, аудит безпеки та реагування на інциденти.",
        degree: "Бакалавр",
        duration: "4 роки",
        form: "Денна",
        totalCredits: 240,
        subjects: [
          { name: "Основи кібербезпеки",             credits: 7,  semester: 1, type: "Нормативна" },
          { name: "Криптографія та захист даних",    credits: 8,  semester: 2, type: "Нормативна" },
          { name: "Комп'ютерні мережі та протоколи", credits: 7,  semester: 2, type: "Нормативна" },
          { name: "Захист операційних систем",       credits: 7,  semester: 3, type: "Нормативна" },
          { name: "Аналіз вразливостей (Pentesting)", credits: 8, semester: 4, type: "Нормативна" },
          { name: "Безпека веб-застосунків",         credits: 6,  semester: 4, type: "Нормативна" },
          { name: "Цифрова форензика",               credits: 6,  semester: 5, type: "Нормативна" },
          { name: "Реагування на кіберінциденти",    credits: 6,  semester: 5, type: "Нормативна" },
          { name: "Соціальна інженерія та OSINT",    credits: 5,  semester: 6, type: "Вибіркова"  },
          { name: "Безпека хмарних середовищ",       credits: 5,  semester: 6, type: "Вибіркова"  },
          { name: "Переддипломна практика",          credits: 6,  semester: 7, type: "Нормативна" },
          { name: "Дипломна робота",                 credits: 12, semester: 8, type: "Нормативна" },
        ],
      },
    ],
    team: [
      { name: "Кузьменко Олег Васильович",     role: "Кандидат тех. наук, доцент", specialty: "Архітектура ЕОМ",               img: 14 },
      { name: "Федоренко Сергій Миколайович",  role: "Кандидат тех. наук, доцент", specialty: "Комп'ютерні мережі",            img: 17 },
      { name: "Павленко Вікторія Олексіївна",  role: "Старший викладач",           specialty: "Кібербезпека",                  img: 6  },
      { name: "Захаренко Ігор Петрович",       role: "Старший викладач",           specialty: "Системне програмування",        img: 30 },
      { name: "Дяченко Тетяна Миколаївна",     role: "Асистент",                   specialty: "Linux та мережеве адміністрування", img: 22 },
    ],
    history: [
      { year: "2004", text: "Кафедру засновано для підготовки інженерів-системотехніків. Перші лабораторії обладнано сучасними на той час персональними комп'ютерами." },
      { year: "2012", text: "Відкрито спеціалізовану лабораторію мереж та телекомунікацій, запроваджено курси з кібербезпеки та захисту інформації." },
      { year: "2019", text: "Кафедра реструктурована у складі ННКІТІ, розпочато підготовку за спеціальністю «Кібербезпека» відповідно до нових стандартів вищої освіти." },
      { year: "Сьогодні", text: "Лабораторія IoT та вбудованих систем дозволяє студентам працювати з Arduino, Raspberry Pi та промисловими контролерами. Партнерство з Cisco Networking Academy." },
    ],
  },
  {
    id: 4,
    name: "Комп'ютерних наук та прикладної математики",
    description:
      "Кафедра поєднує глибоку математичну підготовку з практичними навичками програмування та аналізу даних. Студенти досліджують алгоритми, машинне навчання, комп'ютерну графіку та методи обчислювального інтелекту.",
    email: "csnm@nuwm.edu.ua",
    address: "вул. Соборна, 11, корп. 1, ауд. 420, Рівне, 33000",
    phone: "+380362633212",
    coverSeed: 70,
    head: {
      full_name: "Демченко Людмила Анатоліївна",
      regalia: "Доктор фізико-математичних наук, професор",
      email: "demchenko.l@nuwm.edu.ua",
      audience: "420",
      img: 26,
    },
    programs: [
      {
        id: 1,
        code: "122",
        name: "Комп'ютерні науки (AI/ML)",
        description: "Штучний інтелект, машинне навчання, обробка природних мов і комп'ютерний зір.",
        degree: "Бакалавр",
        duration: "4 роки",
        form: "Денна",
        totalCredits: 240,
        subjects: [
          { name: "Алгоритми та математика для ML",  credits: 8,  semester: 1, type: "Нормативна" },
          { name: "Машинне навчання (основи)",        credits: 8,  semester: 2, type: "Нормативна" },
          { name: "Нейронні мережі та Deep Learning", credits: 9,  semester: 3, type: "Нормативна" },
          { name: "Обробка природної мови (NLP)",    credits: 7,  semester: 4, type: "Нормативна" },
          { name: "Комп'ютерний зір (CV)",           credits: 7,  semester: 4, type: "Нормативна" },
          { name: "MLOps та розгортання моделей",    credits: 6,  semester: 5, type: "Нормативна" },
          { name: "Reinforcement Learning",          credits: 6,  semester: 5, type: "Вибіркова"  },
          { name: "Генеративні моделі (GANs/LLM)",  credits: 6,  semester: 6, type: "Вибіркова"  },
          { name: "Хмарні платформи AI (AWS/GCP)",  credits: 5,  semester: 6, type: "Вибіркова"  },
          { name: "Етика штучного інтелекту",        credits: 4,  semester: 7, type: "Вибіркова"  },
          { name: "Переддипломна практика",          credits: 6,  semester: 7, type: "Нормативна" },
          { name: "Дипломна робота",                 credits: 12, semester: 8, type: "Нормативна" },
        ],
      },
      {
        id: 2,
        code: "113",
        name: "Прикладна математика",
        description: "Оптимізація, дослідження операцій, математичне моделювання складних систем.",
        degree: "Бакалавр",
        duration: "4 роки",
        form: "Денна",
        totalCredits: 240,
        subjects: [
          { name: "Математичний аналіз",             credits: 12, semester: 1, type: "Нормативна" },
          { name: "Чисельні методи",                 credits: 8,  semester: 2, type: "Нормативна" },
          { name: "Теорія ймовірностей",             credits: 6,  semester: 3, type: "Нормативна" },
          { name: "Математичне моделювання",         credits: 8,  semester: 4, type: "Нормативна" },
          { name: "Оптимізація та дослідження операцій", credits: 7, semester: 4, type: "Нормативна" },
          { name: "Програмування та чисельний аналіз", credits: 6, semester: 3, type: "Нормативна" },
          { name: "Статистичний аналіз даних",       credits: 6,  semester: 5, type: "Нормативна" },
          { name: "Теорія ігор",                     credits: 5,  semester: 5, type: "Вибіркова"  },
          { name: "Методи штучного інтелекту",       credits: 6,  semester: 6, type: "Вибіркова"  },
          { name: "Переддипломна практика",          credits: 6,  semester: 7, type: "Нормативна" },
          { name: "Дипломна робота",                 credits: 12, semester: 8, type: "Нормативна" },
        ],
      },
      {
        id: 3,
        code: "121",
        name: "Інженерія програмного забезпечення",
        description: "Сучасні методології розробки ПЗ, DevOps, тестування та управління якістю.",
        degree: "Бакалавр",
        duration: "4 роки",
        form: "Денна",
        totalCredits: 240,
        subjects: [
          { name: "Алгоритми та структури даних",   credits: 8,  semester: 1, type: "Нормативна" },
          { name: "ООП та патерни проектування",    credits: 8,  semester: 2, type: "Нормативна" },
          { name: "Архітектура програмного забезпечення", credits: 7, semester: 3, type: "Нормативна" },
          { name: "Тестування та якість ПЗ",        credits: 7,  semester: 3, type: "Нормативна" },
          { name: "Бази даних та ORM",              credits: 6,  semester: 4, type: "Нормативна" },
          { name: "DevOps та CI/CD",                credits: 7,  semester: 4, type: "Нормативна" },
          { name: "Мікросервіси та REST API",       credits: 7,  semester: 5, type: "Нормативна" },
          { name: "Agile та управління проєктами",  credits: 5,  semester: 5, type: "Нормативна" },
          { name: "Хмарні технології (AWS/Azure)",  credits: 6,  semester: 6, type: "Вибіркова"  },
          { name: "Безпека програмного забезпечення", credits: 5, semester: 6, type: "Вибіркова"  },
          { name: "Переддипломна практика",         credits: 6,  semester: 7, type: "Нормативна" },
          { name: "Дипломна робота",                credits: 12, semester: 8, type: "Нормативна" },
        ],
      },
    ],
    team: [
      { name: "Демченко Людмила Анатоліївна", role: "Доктор ф-м. наук, професор",  specialty: "Теорія алгоритмів",   img: 26 },
      { name: "Хоменко Андрій Іванович",      role: "Кандидат тех. наук, доцент",  specialty: "Машинне навчання",    img: 28 },
      { name: "Білоус Оксана Сергіївна",      role: "Кандидат ф-м. наук, доцент",  specialty: "Комп'ютерна графіка", img: 7  },
      { name: "Гончаренко Максим Петрович",   role: "Старший викладач",             specialty: "Python та Data Science",img: 19 },
      { name: "Олексієнко Валерія Дмитрівна", role: "Асистент",                     specialty: "Deep Learning",       img: 25 },
      { name: "Savchenko Oleh",               role: "Запрошений викладач-практик",  specialty: "MLOps та хмарні рішення",img: 11},
    ],
    history: [
      { year: "2004", text: "Кафедру засновано для підготовки фахівців у галузі теоретичної інформатики та прикладної математики в рамках новоствореного ІТ-факультету." },
      { year: "2015", text: "Відкрито нову спеціалізацію з штучного інтелекту та Data Science, одну з перших серед регіональних закладів вищої освіти України." },
      { year: "2020", text: "Запущено навчально-науковий центр AI/ML разом з компанією-партнером. Перші спільні публікації з міжнародними університетами у Scopus." },
      { year: "Сьогодні", text: "Кафедра є визнаним центром AI-освіти в регіоні. Студенти перемагають у всеукраїнських олімпіадах з програмування та хакатонах." },
    ],
  },
];
