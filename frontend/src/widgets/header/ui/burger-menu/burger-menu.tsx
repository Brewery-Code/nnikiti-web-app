import clsx from "clsx";
import { useState } from "react";
import style from "./burger-menu.module.css";
import type { NavigationMenuData } from "../../types";
import Accordion from "./accordion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../change-language";
import SignInButton from "../sign-in-button";

export default function BurgerMenu({
  className,
  burgerMenuData,
}: {
  className?: string;
  burgerMenuData: NavigationMenuData[];
}) {
  const { t } = useTranslation("header");
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
          {burgerMenuData.map((item, index) => (
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
          <div className="flex justify-center gap-4 mt-auto">
            <ChangeLanguage />
            <SignInButton />
          </div>
        </ul>
      </div>
    </div>
  );
}
