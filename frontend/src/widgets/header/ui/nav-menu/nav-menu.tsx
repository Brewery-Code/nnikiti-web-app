import { useLayoutEffect, useRef, useState } from "react";
import { ArrowIcon } from "../../icons";
import clsx from "clsx";

interface NavItem {
  title: string;
  link: string;
  list?: { title: string; link: string }[];
}

const navigationMenuData: NavItem[] = [
  {
    title: "About us",
    link: "#",
    list: [
      { title: "History", link: "#" },
      { title: "Strategy", link: "#" },
      { title: "Team", link: "#" },
    ],
  },
  {
    title: "Departments",
    link: "#",
    list: [
      { title: "Higher mathematics", link: "#" },
      { title: "Physics", link: "#" },
      { title: "Chemistry", link: "#" },
      { title: "Biology", link: "#" },
      { title: "Computer Science", link: "#" },
    ],
  },
  {
    title: "Events",
    link: "#",
    list: [
      { title: "Conferences", link: "#" },
      { title: "Workshops", link: "#" },
      { title: "Seminars", link: "#" },
    ],
  },
  {
    title: "Resources",
    link: "#",
    list: [
      { title: "Publications", link: "#" },
      { title: "Research", link: "#" },
      { title: "Data", link: "#" },
    ],
  },
  {
    title: "Contact & FAQ",
    link: "#",
    list: [{ title: "", link: "#" }],
  },
];

export default function NavigationMenu() {
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
            className="flex items-center gap-2 h-full cursor-pointer"
            key={item.title}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <span
              className="flex items-center cursor-pointer"
              ref={index === activeIndex ? menuItemRef : null}
            >
              {item.title}
            </span>
            <ArrowIcon className="mt-0.5" />
          </li>
        ))}
      </ul>
      <div
        className={clsx(
          "absolute top-[calc(100%+1rem)] left-0 rounded-md whitespace-nowrap transition-[transform,width,height,opacity,background] duration-200 ease-in-out",
          "before:transition-[border] before:duration-300 before:ease-in-out",
          activeIndex !== null &&
            navigationMenuData?.[activeIndex].list?.[0].title === ""
            ? "bg-transparent before:border-transparent before:border-x-2 before:border-b-2"
            : "bg-white ",
          "before:absolute before:-top-1 before:left-1/2 before:-translate-1/2 before:border-x-transparent before:border-x-12 before:border-b-12 before:border-t-black",
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
        {navigationMenuData.map((item, index) => (
          <ul
            className={clsx(
              "absolute p-2",
              item.list?.[0].title === "" ? "bg-transparent" : ""
            )}
            key={index}
            ref={index === activeIndex ? listRef : null}
          >
            {item.list?.map((subItem, subIndex) => (
              <li
                className={clsx(
                  "p-x-2 text-xl text-black font-semibold cursor-pointer transition-[opacity] duration-200 ease-in-out",
                  index === activeIndex ? "opacity-100 " : "opacity-0 "
                )}
                key={subIndex}
              >
                {subItem.title}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </nav>
  );
}
