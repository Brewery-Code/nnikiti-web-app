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

  const dimmed = whichAccordionIsOpen !== -1 && !isAccordionOpen;

  return (
    <li className="border-t border-white/[0.07]">
      <button
        type="button"
        onClick={toggleAccordion}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span
          className={clsx(
            "font-display text-[1.6rem] font-black transition-colors duration-200",
            isAccordionOpen ? "text-grad" : "text-primary",
            dimmed && "!text-primary/25"
          )}
          style={{ letterSpacing: "-0.03em" }}
        >
          {data.title}
        </span>

        <span
          className={clsx(
            "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            isAccordionOpen
              ? "border-violet-500/50 bg-violet-500/15 text-violet-300"
              : "border-white/15 bg-surface-md text-primary/50"
          )}
          style={{ fontSize: "14px" }}
        >
          {isAccordionOpen ? "−" : "+"}
        </span>
      </button>

      <ul
        ref={listRef}
        className="flex flex-col gap-1 overflow-hidden transition-[height,padding] duration-300 ease-in-out"
        style={{
          height: isAccordionOpen ? listHeight : 0,
          paddingBottom: isAccordionOpen ? 16 : 0,
        }}
      >
        {data.list?.map((item, index) => (
          <li key={index}>
            {item.onClick ? (
              <button
                className="block w-full rounded-[10px] px-4 py-2.5 text-left text-[14px] font-medium text-muted transition-all duration-200 hover:bg-surface-md hover:text-primary"
                onClick={() => {
                  item.onClick!();
                  handleBurgerClick();
                  toggleAccordion();
                }}
              >
                {item.title}
              </button>
            ) : (
              <Link
                to={item.link}
                className="block rounded-[10px] px-4 py-2.5 text-[14px] font-medium text-muted transition-all duration-200 hover:bg-surface-md hover:text-primary"
                onClick={() => {
                  handleBurgerClick();
                  toggleAccordion();
                }}
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </li>
  );
}
