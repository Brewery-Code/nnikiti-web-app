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
  UserMenu,
} from "./ui";
import { BlackAndWhiteButton } from "@/shared/ui";

export default function Header() {
  const { t } = useTranslation("header");
  useLoadNamespace("header", loadTranslations);

  const navigationMenuData: NavigationMenuData[] = [
    {
      title: t("navigationMenu.aboutUs"),
      link: "#",
      list: [
        { title: t("navigationMenu.history"), link: "#" },
        { title: t("navigationMenu.strategy"), link: "#" },
        { title: t("navigationMenu.team"), link: "#" },
        { title: t("navigationMenu.gallery"), link: "#" },
        {
          title: t("navigationMenu.graduates"),
          link: ROUTES.ALUMNI,
        },
      ],
    },
    {
      title: t("navigationMenu.forEntrant"),
      link: "#",
      list: [
        { title: t("navigationMenu.undergraduateStudies"), link: "#" },
        { title: t("navigationMenu.bachelorDegree"), link: "#" },
        { title: t("navigationMenu.masterDegree"), link: "#" },
        { title: t("navigationMenu.postgraduateStudies"), link: "#" },
      ],
    },
    {
      title: t("navigationMenu.departments"),
      link: "#",
      list: [
        { title: t("navigationMenu.higherMathematics"), link: "#" },
        {
          title: t("navigationMenu.computerTechnologiesAndEconomicCybernetics"),
          link: "#",
        },
        {
          title: t("navigationMenu.computingEngineering"),
          link: "#",
        },
        {
          title: t("navigationMenu.computerScienceAndAppliedMathematics"),
          link: "#",
        },
      ],
    },
    {
      title: t("navigationMenu.events"),
      link: "#",
      list: [
        { title: t("navigationMenu.eventsCalendar"), link: "#" },
        { title: t("navigationMenu.news"), link: "#" },
        { title: t("navigationMenu.announcements"), link: "#" },
        { title: t("navigationMenu.activities"), link: "#" },
      ],
    },
    {
      title: t("navigationMenu.science"),
      link: "#",
      list: [
        { title: t("navigationMenu.publications"), link: "#" },
        { title: t("navigationMenu.research"), link: "#" },
        { title: t("navigationMenu.conferences"), link: "#" },
        { title: t("navigationMenu.grants"), link: "#" },
      ],
    },
    {
      title: t("navigationMenu.partners"),
      link: "#",
      list: [
        { title: t("navigationMenu.academicMobility"), link: "#" },
        { title: t("navigationMenu.businessPartners"), link: "#" },
      ],
    },
    {
      title: t("navigationMenu.contacts"),
      link: "#",
      list: [
        { title: t("navigationMenu.contacts"), link: ROUTES.CONTACTS },
        { title: t("navigationMenu.FAQ"), link: ROUTES.FAQ },
        {
          title: t("navigationMenu.question"),
          link: ROUTES.ASK_QUESTION,
        },
      ],
    },
  ];

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
            <BlackAndWhiteButton color="black" onClick={googleLogin}>
              {t("signIn")}
            </BlackAndWhiteButton>
          ) : (
            <UserMenu />
          )}
        </div>
        <BurgerMenu className="lg:hidden" burgerMenuData={navigationMenuData} />
      </div>
    </header>
  );
}
