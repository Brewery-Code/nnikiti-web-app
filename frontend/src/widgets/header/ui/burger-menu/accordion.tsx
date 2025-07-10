import { useEffect, useRef, useState } from "react";
import type { NavigationMenuData } from "../../types";
import clsx from "clsx";
import { Link } from "react-router-dom";

export default function Accordion({
  data,
  isAccordionOpen,
  toggleAccordion,
  whichAccordionIsOpen,
  handleBurgerClick,
}: {
  data: NavigationMenuData;
  isAccordionOpen: boolean;
  toggleAccordion: () => void;
  whichAccordionIsOpen: number;
  handleBurgerClick: () => void;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [listHeight, setListHeight] = useState(0);
  useEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.scrollHeight);
    }
  }, [isAccordionOpen]);

  return (
    <li
      className={clsx(
        "relative transition-colors duration-200 ease-in-out",
        whichAccordionIsOpen !== -1 && !isAccordionOpen && "text-gray-500"
      )}
    >
      <div onClick={toggleAccordion} className="cursor-pointer">
        <span
          className={clsx(
            "relative text-3xl font-bold",
            "before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-white before:transition-[width] before:duration-300 before:ease-[cubic-bezier(0.23,1,0.32,1)]",
            isAccordionOpen && "before:w-full"
          )}
        >
          {data.title}
        </span>
      </div>
      <ul
        className="overflow-hidden flex flex-col gap-2 transition-[height,margin] duration-300 ease-in-out"
        style={{
          height: isAccordionOpen ? listHeight : 0,
          marginTop: isAccordionOpen ? 16 : 0,
        }}
        ref={listRef}
      >
        {data.list?.map((item, index) => (
          <li
            className="text-xl font-medium"
            key={index}
            onClick={() => {
              handleBurgerClick();
              toggleAccordion();
            }}
          >
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
