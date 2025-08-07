import { BlackAndWhiteButton, Title } from "@/shared/ui";
import { AlumniCard } from "./alumni-card";
import { useLoadNamespace, useScrollDownAnimation } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { useTranslation } from "react-i18next";
import type { Alumni } from "./types";
import { Link } from "react-router-dom";
import { useRef } from "react";

type AlumniList = {
  [year: number]: Alumni[];
};

const alumniData: AlumniList = {
  2028: [
    {
      id: 6,
      full_name: "Ольга Тимошенко",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2028-07-20T00:00:00",
      date_of_graduation: "2028-07-20",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",
      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
    {
      id: 11,
      full_name: "Людмила Гордієнко",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2028-06-10T00:00:00",
      date_of_graduation: "2028-06-10",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",
      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
    {
      id: 19,
      full_name: "Валентина Проценко",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2028-06-09T00:00:00",
      date_of_graduation: "2028-06-09",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
  ],
  2027: [
    {
      id: 5,
      full_name: "Ірина Петренко",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2027-06-10T00:00:00",
      date_of_graduation: "2027-06-10",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
    {
      id: 10,
      full_name: "Наталія Задорожна",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2027-05-06T00:00:00",
      date_of_graduation: "2027-05-06",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
    {
      id: 15,
      full_name: "Аліна Коваль",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2027-05-12T00:00:00",
      date_of_graduation: "2027-05-12",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
  ],
  2026: [
    {
      id: 4,
      full_name: "Олена Литвин",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2026-07-17T00:00:00",
      date_of_graduation: "2026-07-17",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
    {
      id: 8,
      full_name: "Катерина Романюк",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2026-07-03T00:00:00",
      date_of_graduation: "2026-07-03",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
    {
      id: 16,
      full_name: "Тарас Ющенко",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2026-07-27T00:00:00",
      date_of_graduation: "2026-07-27",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
  ],
  2025: [
    {
      id: 0,
      full_name: "Марія Іваненко",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2025-05-24T00:00:00",
      date_of_graduation: "2025-05-24",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
    {
      id: 3,
      full_name: "Юрій Мельник",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2025-05-18T00:00:00",
      date_of_graduation: "2025-05-18",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
    {
      id: 14,
      full_name: "Богдан Черненко",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2025-06-14T00:00:00",
      date_of_graduation: "2025-06-14",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
    {
      id: 18,
      full_name: "Євген Сидоренко",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2025-05-27T00:00:00",
      date_of_graduation: "2025-05-27",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
  ],
  2023: [
    {
      id: 1,
      full_name: "Олексій Шевченко",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2023-06-26T00:00:00",
      date_of_graduation: "2023-06-26",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
    {
      id: 2,
      full_name: "Андрій Савченко",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2023-05-21T00:00:00",
      date_of_graduation: "2023-05-21",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
    {
      id: 7,
      full_name: "Сергій Павленко",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2023-05-25T00:00:00",
      date_of_graduation: "2023-05-25",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
    {
      id: 9,
      full_name: "Максим Вовк",
      text: "Університет навчив мене багато чому, але найбільше — бути собою. Сьогодні я займаюсь тим, що дійсно люблю, і вдячний(а) за кожен пройдений крок.",
      image: "string",
      created_at: "2023-07-08T00:00:00",
      date_of_graduation: "2023-07-08",
      major: "Computer Since",
      degree: "Magister",
      workplace: "Honeycomb",
      position: "Frontend developer",

      links: {
        instagram: "https://instagram.com/example",
        telegram: "https://t.me/example",
        facebook: "https://facebook.com/example",
      },
    },
  ],
};

const yearColor = [
  "#F42272",
  "#FFA500",
  "#63C132",
  "#89A6FB",
  "#1400cc",
  "#c49a02",
  "#FF57BB",
  "#7f03fc",
  "#c40202",
  "#6EFAFB",
];

const getColor = (year: number) => {
  const lastDigit = year % 10;
  return yearColor[lastDigit];
};

export function AlumniListSection() {
  useLoadNamespace("alumni", loadTranslations);
  const { t } = useTranslation("alumni");

  const listRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollDownAnimation({ elementRef: listRef });

  return (
    <div className="container-base">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-24">
        {Object.keys(alumniData)
          .map(Number)
          .sort((a, b) => b - a)
          .map((year) => (
            <a href={"#" + year}>
              <BlackAndWhiteButton>{year}</BlackAndWhiteButton>
            </a>
          ))}
      </div>
      {Object.keys(alumniData)
        .map(Number)
        .sort((a, b) => b - a)
        .map((year) => {
          const listRef = useRef<HTMLDivElement>(null);
          const isVisible = useScrollDownAnimation({ elementRef: listRef });
          return (
            <div
              className={`transition duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              ref={listRef}
            >
              <div
                className="relative before:absolute before:bottom-0 before:w-full before:h-0.5 before:bg-white"
                id={year.toString()}
              >
                <Title className="mt-8">
                  {t("alumniList.title")}
                  {year}
                </Title>
              </div>
              <div className="grid grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
                {alumniData[year].map((alumni) => (
                  <AlumniCard alumni={alumni} color={getColor(year)} />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
