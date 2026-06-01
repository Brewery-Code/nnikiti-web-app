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
    <li className="border-b border-white/[0.06] last:border-b-0">
      <button
        type="button"
        onClick={toggleAccordion}
        className="flex w-full select-none items-center justify-between py-5 text-left outline-none"
      >
        <span
          className={clsx(
            "font-display text-[1.45rem] font-black leading-none",
            isAccordionOpen
              ? "bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"
              : "text-primary"
          )}
          style={{ letterSpacing: "-0.03em" }}
        >
          {data.title}
        </span>

        <motion.span
          animate={{ rotate: isAccordionOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className={clsx(
            "flex-shrink-0 text-[22px] font-thin leading-none transition-colors duration-300",
            isAccordionOpen ? "text-violet-400" : "text-white/25"
          )}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isAccordionOpen && (
          <motion.ul
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="flex flex-col overflow-hidden"
          >
            <div className="pb-4 pl-2">
              {data.list?.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.04, ease: "easeOut" }}
                >
                  {item.onClick ? (
                    <button
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13.5px] font-medium text-white/40 transition-all duration-200 hover:bg-white/[0.05] hover:text-white/80"
                      onClick={() => { item.onClick!(); handleBurgerClick(); toggleAccordion(); }}
                    >
                      <span className="h-[3px] w-[3px] flex-shrink-0 rounded-full bg-violet-400/60" />
                      {item.title}
                    </button>
                  ) : (
                    <Link
                      to={item.link}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-white/40 transition-all duration-200 hover:bg-white/[0.05] hover:text-white/80"
                      onClick={() => { handleBurgerClick(); toggleAccordion(); }}
                    >
                      <span className="h-[3px] w-[3px] flex-shrink-0 rounded-full bg-violet-400/60" />
                      {item.title}
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
