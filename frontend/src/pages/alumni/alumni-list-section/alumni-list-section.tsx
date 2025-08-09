import { BlackAndWhiteButton } from "@/shared/ui";
import { useLoadNamespace, useScrollDownAnimation } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { publicRqClient } from "@/shared/api/instance";
import { AlumniList } from "./ui";

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

export function getColor(year?: number) {
  if (!year) return "transparent";
  const lastDigit = year % 10;
  return yearColor[lastDigit];
}

export function getYear(dateStr?: string) {
  if (!dateStr) return undefined;
  return Number(dateStr.split("-")[0]);
}

export function AlumniListSection() {
  useLoadNamespace("alumni", loadTranslations);
  const { t } = useTranslation("alumni");

  const graduationYears =
    publicRqClient.useQuery("get", "/core/alumni/years/").data ?? [];

  const alumniListData =
    publicRqClient.useQuery("get", "/core/alumni/").data ?? [];

  const navigationListRef = useRef<HTMLDivElement>(null);
  useScrollDownAnimation({
    elementRef: navigationListRef,
    isDefaultAnimationOn: true,
  });

  return (
    <div className="container-base">
      <div
        className="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-24"
        ref={navigationListRef}
      >
        {graduationYears.map((year, index) => (
          <a href={"#" + year} key={index}>
            <BlackAndWhiteButton>{year}</BlackAndWhiteButton>
          </a>
        ))}
      </div>
      {graduationYears.map((year) => {
        const matchingAlumni = alumniListData.filter(
          (alumni) => getYear(alumni.date_of_graduation) === year
        );
        return (
          <AlumniList
            key={year}
            year={year}
            alumniList={matchingAlumni}
            titleText={t("alumniList.title")}
          />
        );
      })}
    </div>
  );
}
