import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { useLoadNamespace } from "@/shared/hooks";
import { publicRqClient } from "@/shared/api/instance";
import { loadTranslations } from "./locales";
import type { NavigationMenuData } from "./types";
import {
  ChangeLanguage,
  MicrocircuitLabelLogo,
  NavigationMenu,
  SearchBar,
  BurgerMenu,
} from "./ui";

export function Header() {
  const { t } = useTranslation("header");
  useLoadNamespace("header", loadTranslations);

  const departments = publicRqClient.useQuery("get", "/departments/").data ?? [];

  const navigationMenuData: NavigationMenuData[] = [
    {
      title: t("navigationMenu.aboutUs"),
      link: ROUTES.HISTORY,
      list: [
        { title: t("navigationMenu.history"), link: ROUTES.HISTORY },
        { title: t("navigationMenu.strategy"), link: ROUTES.STRATEGY },
        { title: t("navigationMenu.team"), link: ROUTES.TEAM },
        { title: t("navigationMenu.gallery"), link: ROUTES.GALLERY },
        { title: t("navigationMenu.graduates"), link: ROUTES.ALUMNI },
      ],
    },
    {
      title: t("navigationMenu.forEntrant"),
      link: ROUTES.BACHELOR,
      list: [
        { title: t("navigationMenu.undergraduateStudies"), link: ROUTES.UNDERGRADUATE },
        { title: t("navigationMenu.bachelorDegree"), link: ROUTES.BACHELOR },
        { title: t("navigationMenu.masterDegree"), link: ROUTES.MASTER },
        { title: t("navigationMenu.postgraduateStudies"), link: ROUTES.POSTGRADUATE },
      ],
    },
    {
      title: t("navigationMenu.departments"),
      link: `/department/${departments[0]?.id ?? 1}`,
      list: departments.map((dept) => ({
        title: dept.name ?? "",
        link: `/department/${dept.id}`,
      })),
    },
    {
      title: t("navigationMenu.events"),
      link: ROUTES.EVENTS,
      list: [
        { title: t("navigationMenu.eventsCalendar"), link: `${ROUTES.EVENTS}#calendar` },
        { title: t("navigationMenu.news"), link: `${ROUTES.EVENTS}#news` },
      ],
    },
    {
      title: t("navigationMenu.science"),
      link: ROUTES.SCIENCE_PUBLICATIONS,
      list: [
        { title: t("navigationMenu.publications"), link: ROUTES.SCIENCE_PUBLICATIONS },
        { title: t("navigationMenu.research"), link: ROUTES.SCIENCE_RESEARCH },
        { title: t("navigationMenu.conferences"), link: ROUTES.SCIENCE_CONFERENCES },
        { title: t("navigationMenu.grants"), link: ROUTES.SCIENCE_GRANTS },
      ],
    },
    {
      title: t("navigationMenu.partners"),
      link: ROUTES.PARTNERS_BUSINESS,
      list: [
        { title: t("navigationMenu.academicMobility"), link: ROUTES.PARTNERS_ACADEMIC_MOBILITY },
        { title: t("navigationMenu.businessPartners"), link: ROUTES.PARTNERS_BUSINESS },
      ],
    },
    {
      title: t("navigationMenu.contacts"),
      link: ROUTES.CONTACTS,
      list: [
        { title: t("navigationMenu.contacts"), link: ROUTES.CONTACTS },
        { title: t("navigationMenu.FAQ"), link: ROUTES.FAQ },
        { title: t("navigationMenu.question"), link: ROUTES.ASK_QUESTION },
      ],
    },
  ];

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-[100] h-16 w-full lg:h-20"
    >
      <div
        className={clsx(
          "absolute inset-0 transition-all duration-[350ms]",
          scrolled
            ? "border-b border-violet-500/10 backdrop-blur-[24px]"
            : "border-b border-transparent bg-transparent"
        )}
        style={scrolled ? { background: "color-mix(in srgb, var(--bg-base) 88%, transparent)" } : undefined}
      />
      <div className="relative mx-auto flex h-full max-w-[1600px] items-center gap-8 px-4 sm:px-6 lg:px-10">
        <Link to="/" className="flex-shrink-0">
          <MicrocircuitLabelLogo />
        </Link>
        <NavigationMenu
          className="hidden flex-1 justify-center lg:flex"
          navigationMenuData={navigationMenuData}
        />
        <SearchBar className="flex flex-1 justify-center lg:hidden" />
        <div className="hidden flex-shrink-0 items-center gap-2.5 lg:flex">
          <ChangeLanguage />
          <Link
            to={ROUTES.BACHELOR}
            className={clsx(
              "inline-flex items-center gap-2 rounded-[10px]",
              "bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-2.5",
              "text-[12px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.2)]",
              "transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.45)]"
            )}
          >
            {t("apply", "Вступити")}
          </Link>
        </div>
        <BurgerMenu className="lg:hidden" burgerMenuData={navigationMenuData} />
      </div>
    </header>
  );
}
