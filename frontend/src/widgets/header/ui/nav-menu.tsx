import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface NavItem {
  title: string;
  link: string;
  list?: { title: string; link: string }[];
}

export default function NavigationMenu() {
  const { t } = useTranslation("header");

  const navigationMenuData: NavItem[] = [
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
        { title: t("navigationMenu.contacts.contacts"), link: "/contacts" },
        { title: t("navigationMenu.contacts.FAQ"), link: "/faq" },
        { title: t("navigationMenu.contacts.question"), link: "#" },
        { title: t("navigationMenu.contacts.socialMedia"), link: "#" },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({
    listWidth: 30,
    listHeight: 10,
    x: window.innerWidth / 2,
    width: 0,
  });
  const listRef = useRef<HTMLUListElement>(null);
  const menuItemRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    if (listRef.current && menuItemRef.current) {
      const { scrollWidth, scrollHeight } = listRef.current;
      const { offsetLeft, offsetWidth } = menuItemRef.current;
      setDimensions({
        listWidth: scrollWidth,
        listHeight: scrollHeight,
        x: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeIndex]);

  return (
    <nav className="h-full" onMouseLeave={() => setActiveIndex(null)}>
      <ul className="hidden lg:flex items-center gap-4 xl:gap-6 h-full text-sm xl:text-base leading-6 font-semibold">
        {navigationMenuData.map((item, index) => (
          <li
            className={clsx(
              "flex items-center gap-2 h-full cursor-pointer",
              "transition-transform duration-200 ease-in-out",
              index === activeIndex && "scale-110"
            )}
            key={item.title}
            ref={index === activeIndex ? menuItemRef : null}
            onMouseEnter={() => setActiveIndex(index)}
          >
            {item.title}
          </li>
        ))}
      </ul>
      <div
        className={clsx(
          "absolute top-[calc(100%+1rem)] left-0 rounded-md bg-[#0000006e] whitespace-nowrap",
          "transition-[transform,width,height,opacity,background] duration-200 ease-in-out backdrop-blur-md",
          "before:absolute before:-top-1.5 before:left-1/2 before:-translate-1/2 before:border-x-transparent before:border-x-12 before:border-b-12 before:border-b-[#0000006e]",
          "before:transition-[border] before:duration-300 before:ease-in-out",
          "after:absolute after:-top-4 after:w-full after:h-4",
          activeIndex !== null
            ? "opacity-100 pointer-events-auto "
            : "opacity-0 pointer-events-none "
        )}
        style={{
          transform: `translateX(calc(${dimensions.x + (dimensions.width - dimensions.listWidth) / 2}px))`,
          width: `${dimensions.listWidth}px`,
          height: `${dimensions.listHeight}px`,
        }}
      >
        <div className="overflow-hidden relative w-full h-full rounded-l-md">
          {navigationMenuData.map((item, index) => (
            <ul
              className={clsx(
                "overflow-hidden absolute flex flex-col gap-1 py-4",
                "before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:bg-[#ff1a7a] before:rounded-l-md",
                "before:transition-[opacity] before:duration-200 before:ease-in-out",
                index === activeIndex
                  ? "before:opacity-100"
                  : "before:opacity-0"
              )}
              key={index}
              ref={index === activeIndex ? listRef : null}
            >
              {item.list?.map((subItem, subIndex) => (
                <Link
                  to={subItem.link}
                  className={clsx(
                    "overflow-hidden relative px-4 text-xl text-white font-semibold cursor-pointer",
                    "transition-opacity duration-200 ease-in-out",
                    "before:absolute before:-z-1 before:left-[7px] before:w-0 before:h-full before:bg-[linear-gradient(to_right,_#ff1a7a_8px,_#f8982e)]",
                    "before:transition-[width] before:duration-200 before:ease-in-out hover:before:w-full",
                    index === activeIndex
                      ? "opacity-100 pointer-events-auto z-10"
                      : "opacity-0 pointer-events-none"
                  )}
                  key={subIndex}
                >
                  {subItem.title}
                </Link>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </nav>
  );
}
