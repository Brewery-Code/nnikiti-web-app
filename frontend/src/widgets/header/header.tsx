import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { googleLogin } from "@/features/auth";
import { ROUTES } from "@/shared/model/routes";
import { rqClient } from "@/shared/api/instance";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import type { NavigationMenuData } from "./types";
import {
  ChangeLanguage,
  MicrocircuitLabelLogo,
  NavigationMenu,
  SearchBar,
  BurgerMenu,
  SignInButton,
  UserMenu,
} from "./ui";
import { useEffect } from "react";

export default function Header() {
  const { t } = useTranslation("header");

  const navigationMenuData: NavigationMenuData[] = [
    {
      title: t("navigationMenu.aboutUs.title"),
      link: "#",
      list: [
        { title: t("navigationMenu.aboutUs.history"), link: "#" },
        { title: t("navigationMenu.aboutUs.strategy"), link: "#" },
        { title: t("navigationMenu.aboutUs.team"), link: "#" },
        { title: t("navigationMenu.aboutUs.gallery"), link: "#" },
      ],
    },
    {
      title: t("navigationMenu.entrant.title"),
      link: "#",
      list: [
        { title: t("navigationMenu.entrant.undergraduateStudies"), link: "#" },
        { title: t("navigationMenu.entrant.bachelorDegree"), link: "#" },
        { title: t("navigationMenu.entrant.masterDegree"), link: "#" },
        { title: t("navigationMenu.entrant.postgraduateStudies"), link: "#" },
        { title: t("navigationMenu.entrant.graduates"), link: "#" },
      ],
    },
    {
      title: t("navigationMenu.departments.title"),
      link: "#",
      list: [
        { title: t("navigationMenu.departments.higherMathematics"), link: "#" },
        {
          title: t(
            "navigationMenu.departments.computerTechnologiesAndEconomicCybernetics"
          ),
          link: "#",
        },
        {
          title: t("navigationMenu.departments.computingEngineering"),
          link: "#",
        },
        {
          title: t(
            "navigationMenu.departments.computerScienceAndAppliedMathematics"
          ),
          link: "#",
        },
      ],
    },
    {
      title: t("navigationMenu.events.title"),
      link: "#",
      list: [
        { title: t("navigationMenu.events.eventsCalendar"), link: "#" },
        { title: t("navigationMenu.events.news"), link: "#" },
        { title: t("navigationMenu.events.announcements"), link: "#" },
        { title: t("navigationMenu.events.activities"), link: "#" },
      ],
    },
    {
      title: t("navigationMenu.science.title"),
      link: "#",
      list: [
        { title: t("navigationMenu.science.publications"), link: "#" },
        { title: t("navigationMenu.science.research"), link: "#" },
        { title: t("navigationMenu.science.conferences"), link: "#" },
        { title: t("navigationMenu.science.grants"), link: "#" },
      ],
    },
    {
      title: t("navigationMenu.partners.title"),
      link: "#",
      list: [
        { title: t("navigationMenu.partners.academicMobility"), link: "#" },
        { title: t("navigationMenu.partners.businessPartners"), link: "#" },
      ],
    },
    {
      title: t("navigationMenu.contacts.title"),
      link: "#",
      list: [
        { title: t("navigationMenu.contacts.contacts"), link: ROUTES.CONTACTS },
        { title: t("navigationMenu.contacts.FAQ"), link: ROUTES.FAQ },
        {
          title: t("navigationMenu.contacts.question"),
          link: ROUTES.ASK_QUESTION,
        },
        { title: t("navigationMenu.contacts.socialMedia"), link: "#" },
      ],
    },
  ];

  useLoadNamespace("header", loadTranslations);

  const userRole = rqClient.useQuery("get", "/users/role/").data;
  const isUserLogin = () => {
    if (userRole?.role === "GU") {
      return false;
    }
    return true;
  };

  return (
    <header
      className="fixed z-[100] flex justify-center w-full h-16 bg-[#0000006e] bg-[linear-gradient(180deg,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0.5)_50%,_rgba(0,0,0,0.3)_100%)] 
      before:fixed before:-z-1 before:inset-0 before:w-full before:h-16 before:backdrop-blur-md"
    >
      <div className="container-base grid grid-cols-[64px_1fr_64px] md:grid-cols-[160px_1fr_160px] lg:grid-cols-[auto_auto_auto] lg:justify-between items-center h-full">
        <Link className="" to="/">
          <MicrocircuitLabelLogo />
        </Link>
        <NavigationMenu
          className="hidden lg:flex"
          navigationMenuData={navigationMenuData}
        />
        <SearchBar className="flex lg:hidden" />
        <div className="hidden lg:grid grid-cols-2 justify-end items-center gap-4">
          <ChangeLanguage />
          {isUserLogin() ? (
            <SignInButton onClick={() => googleLogin()} />
          ) : (
            <UserMenu />
          )}
        </div>
        <BurgerMenu className="lg:hidden" burgerMenuData={navigationMenuData} />
      </div>
    </header>
  );
}
