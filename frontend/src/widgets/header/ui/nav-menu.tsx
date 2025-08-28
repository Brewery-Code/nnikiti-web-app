import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import type { NavigationMenuData } from "../types";

export function NavigationMenu({
  className,
  navigationMenuData,
}: {
  className?: string;
  navigationMenuData: NavigationMenuData[];
}) {
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
    <nav className={clsx("h-full", className)} onMouseLeave={() => setActiveIndex(null)}>
      <ul className="flex h-full items-center gap-4 text-sm leading-6 font-semibold xl:gap-6 xl:text-base">
        {navigationMenuData.map((item, index) => (
          <li
            className={clsx(
              "flex h-full cursor-pointer items-center gap-2",
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
          "backdrop-blur-md transition-[transform,width,height,opacity,background] duration-200 ease-in-out",
          "before:absolute before:-top-1.5 before:left-1/2 before:-translate-1/2 before:border-x-transparent",
          "before:border-x-12 before:border-b-12 before:border-b-[#0000006e] before:transition-[border]",
          "before:duration-300 before:ease-in-out after:absolute after:-top-4 after:h-4 after:w-full",
          activeIndex !== null ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        style={{
          transform: `translateX(calc(${dimensions.x + (dimensions.width - dimensions.listWidth) / 2}px))`,
          width: `${dimensions.listWidth}px`,
          height: `${dimensions.listHeight}px`,
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-l-md">
          {navigationMenuData.map((item, index) => (
            <ul
              className={clsx(
                "absolute flex flex-col gap-1 overflow-hidden py-4",
                "before:absolute before:top-0 before:left-0 before:h-full before:w-2 before:bg-[#ff1a7a]",
                "before:rounded-l-md before:transition-[opacity] before:duration-200 before:ease-in-out",
                index === activeIndex ? "before:opacity-100" : "before:opacity-0"
              )}
              key={index}
              ref={index === activeIndex ? listRef : null}
            >
              {item.list?.map((subItem, subIndex) => (
                <Link
                  to={subItem.link}
                  className={clsx(
                    "relative cursor-pointer overflow-hidden px-4 text-xl font-semibold text-white",
                    "transition-opacity duration-200 ease-in-out",
                    "before:absolute before:left-[7px] before:-z-1 before:h-full before:w-0",
                    "before:bg-[linear-gradient(to_right,_#ff1a7a_8px,_#f8982e)]",
                    "before:transition-[width] before:duration-200 before:ease-in-out hover:before:w-full",
                    index === activeIndex
                      ? "pointer-events-auto z-10 opacity-100"
                      : "pointer-events-none opacity-0"
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
