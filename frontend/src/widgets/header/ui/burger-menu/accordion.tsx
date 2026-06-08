import { AnimatePresence, motion } from "framer-motion";
import type { NavigationMenuData } from "../../types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Accordion({
  data,
  isAccordionOpen,
  toggleAccordion,
  handleBurgerClick,
}: {
  data: NavigationMenuData;
  isAccordionOpen: boolean;
  toggleAccordion: () => void;
  whichAccordionIsOpen: number;
  handleBurgerClick: () => void;
}) {
  return (
    <li className="border-b border-white/[0.05] last:border-b-0">
      <button
        type="button"
        onClick={toggleAccordion}
        className="group flex w-full select-none items-center py-[1.1rem] text-left outline-none active:scale-100"
      >
        <span
          className={clsx(
            "font-display text-[1.9rem] font-black leading-none transition-all duration-500",
            isAccordionOpen
              ? "bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"
              : "text-primary"
          )}
          style={{ letterSpacing: "-0.035em" }}
        >
          {data.title}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isAccordionOpen && (
          <motion.ul
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mb-4 ml-1 flex flex-col gap-0.5 border-l-2 border-violet-500/30 pl-4">
              {data.list?.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.06 + index * 0.06, ease: EASE }}
                >
                  {item.onClick ? (
                    <button
                      className="flex w-full items-center rounded-xl px-3 py-2.5 text-left transition-colors duration-200 active:scale-100 hover:text-white"
                      onClick={() => { item.onClick!(); handleBurgerClick(); toggleAccordion(); }}
                    >
                      <span className="text-[15px] font-medium text-white/65">
                        {item.title}
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={item.link}
                      className="flex items-center rounded-xl px-3 py-2.5 transition-colors duration-200 active:scale-100 hover:text-white"
                      onClick={() => { handleBurgerClick(); toggleAccordion(); }}
                    >
                      <span className="text-[15px] font-medium text-white/65">
                        {item.title}
                      </span>
                    </Link>
                  )}
                </motion.li>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
