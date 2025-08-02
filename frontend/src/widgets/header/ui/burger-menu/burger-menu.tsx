import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { rqClient } from "@/shared/api/instance";
import type { NavigationMenuData } from "../../types";
import { ChangeLanguage } from "../../ui";
import Accordion from "./accordion";
import style from "./burger-menu.module.css";
import { BlackAndWhiteButton } from "@/shared/ui";
import { googleLogin } from "@/features/auth";

export default function BurgerMenu({
  className,
  burgerMenuData,
}: {
  className?: string;
  burgerMenuData: NavigationMenuData[];
}) {
  const { t } = useTranslation("header");
  const userData = rqClient.useQuery("get", "/users/me/").data;

  const extendedBurgerMenuData = [...burgerMenuData];

  if (userData?.first_name) {
    extendedBurgerMenuData.push({
      title: userData.first_name,
      link: "#",
      list: [
        {
          title: t("studentAccount.schedule"),
          link: "https://desk.nuwm.edu.ua/cgi-bin/timetable.cgi",
        },
        {
          title: t("studentAccount.journal"),
          link: "https://desk.nuwm.edu.ua/cgi-bin/kaf.cgi?n=999&t=98",
        },
        { title: t("studentAccount.logout"), link: "/sign-up" },
      ],
    });
  }

  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean | null>(null);
  const handleBurgerClick = () => {
    setIsBurgerOpen((prev) => (prev === true ? false : true));
  };

  const [whichAccordionIsOpen, setWhichAccordionIsOpen] = useState(-1);
  const toggleAccordion = (index: number) => {
    if (index === whichAccordionIsOpen) setWhichAccordionIsOpen(-1);
    else setWhichAccordionIsOpen(index);
  };

  const burgerButtonClass = () => {
    if (isBurgerOpen === null) return "";
    else if (isBurgerOpen) return style["burger-button_active"];
    else return style["burger-button_inactive"];
  };

  return (
    <div className={clsx(className)}>
      <div
        className={clsx("z-10", style["burger-button"], burgerButtonClass())}
        onClick={() => {
          handleBurgerClick();
          toggleAccordion(-1);
        }}
      >
        <span />
      </div>
      <div
        className={clsx(
          "overflow-y-auto absolute left-0 top-0 flex w-dvw h-dvh py-16 bg-black",
          "transition-transform duration-500 ease-in-out",
          isBurgerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <ul className="container-base flex flex-col gap-4">
          {extendedBurgerMenuData.map((item, index) => (
            <Accordion
              key={index}
              data={item}
              isAccordionOpen={index === whichAccordionIsOpen}
              toggleAccordion={() => toggleAccordion(index)}
              whichAccordionIsOpen={whichAccordionIsOpen}
              handleBurgerClick={handleBurgerClick}
            />
          ))}
          <Link
            to="/"
            className={clsx(
              "text-3xl font-bold transition-colors duration-200 ease-in-out",
              whichAccordionIsOpen !== -1 && "text-gray-500"
            )}
            onClick={() => {
              handleBurgerClick();
              toggleAccordion(-1);
            }}
          >
            {t("burgerMenu.home")}
          </Link>
          <div className="grid grid-cols-[100px_100px] gap-4 justify-center  mt-auto">
            <ChangeLanguage />
            <BlackAndWhiteButton color="black" onClick={googleLogin}>
              {t("signIn")}
            </BlackAndWhiteButton>
          </div>
        </ul>
      </div>
    </div>
  );
}
