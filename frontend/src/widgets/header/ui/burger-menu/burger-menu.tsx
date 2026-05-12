import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { rqClient } from "@/shared/api/instance";
import { globalLenis } from "@/shared/hooks";
import { logout } from "@/shared/model/session";
import { ROUTES } from "@/shared/model/routes";
import type { NavigationMenuData } from "../../types";
import { ChangeLanguage } from "../../ui";
import Accordion from "./accordion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function BurgerMenu({
  className,
  burgerMenuData,
}: {
  className?: string;
  burgerMenuData: NavigationMenuData[];
}) {
  const { t } = useTranslation("header");
  const navigate = useNavigate();
  const userData = rqClient.useQuery("get", "/users/me/").data;

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const extendedBurgerMenuData = [...burgerMenuData];

  if (userData?.first_name) {
    extendedBurgerMenuData.push({
      title: userData.first_name,
      link: "#",
      list: [
        { title: t("studentAccount.schedule"), link: "https://desk.nuwm.edu.ua/cgi-bin/timetable.cgi" },
        { title: t("studentAccount.journal"), link: "https://desk.nuwm.edu.ua/cgi-bin/kaf.cgi?n=999&t=98" },
        { title: t("studentAccount.logout"), link: "#", onClick: handleLogout },
      ],
    });
  }

  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    globalLenis?.stop();
    document.body.style.overflow = "hidden";

    // Prevent Lenis from seeing wheel events inside the nav.
    // Lenis listens on window in bubble phase, so stopPropagation
    // here keeps native overflow-scroll working in the menu.
    const nav = navRef.current;
    const stopProp = (e: WheelEvent) => e.stopPropagation();
    nav?.addEventListener("wheel", stopProp, { passive: true });

    // Block wheel scroll on everything outside the menu
    const blockOuter = (e: WheelEvent) => {
      if (!nav?.contains(e.target as Node)) e.preventDefault();
    };
    window.addEventListener("wheel", blockOuter, { passive: false });

    return () => {
      globalLenis?.start();
      document.body.style.overflow = "";
      nav?.removeEventListener("wheel", stopProp);
      window.removeEventListener("wheel", blockOuter);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setOpenIndex(-1);
  };

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className={clsx(className, "relative z-[100]")}>
      {/* Burger button */}
      <button
        aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
        className="relative z-[110] flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-[10px] transition-colors duration-200 hover:bg-white/10"
        onClick={toggleMenu}
      >
        <span
          className={clsx(
            "block h-[1.5px] w-[22px] origin-center bg-white transition-all duration-300",
            isOpen && "translate-y-[7.5px] rotate-45"
          )}
        />
        <span
          className={clsx(
            "block h-[1.5px] w-[22px] bg-white transition-all duration-300",
            isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
          )}
        />
        <span
          className={clsx(
            "block h-[1.5px] w-[22px] origin-center bg-white transition-all duration-300",
            isOpen && "-translate-y-[7.5px] -rotate-45"
          )}
        />
      </button>

      {/* Menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col overflow-hidden bg-[#08090f]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {/* Ambient decorations */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-[20%] top-[5%] h-[500px] w-[500px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(166,132,255,0.10) 0%, transparent 70%)",
                filter: "blur(80px)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-[10%] bottom-[10%] h-[400px] w-[400px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(81,162,255,0.08) 0%, transparent 70%)",
                filter: "blur(80px)",
              }}
            />

            {/* Header row */}
            <div className="flex h-16 flex-shrink-0 items-center px-6">
              <span
                className="font-display select-none font-black text-grad"
                style={{ fontSize: "1.3rem", letterSpacing: "-0.04em" }}
              >
                ННКІТІ
              </span>
            </div>

            {/* Nav list */}
            <nav
              ref={navRef}
              className="flex-1 overflow-y-auto overscroll-contain px-6 py-2"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
            >
              <ul className="flex flex-col">
                {extendedBurgerMenuData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + index * 0.045, ease: EASE }}
                  >
                    <Accordion
                      data={item}
                      isAccordionOpen={index === openIndex}
                      toggleAccordion={() => toggleAccordion(index)}
                      whichAccordionIsOpen={openIndex}
                      handleBurgerClick={toggleMenu}
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.1 + extendedBurgerMenuData.length * 0.045,
                    ease: EASE,
                  }}
                  className="border-t border-white/[0.07] py-5"
                >
                  <Link
                    to="/"
                    className={clsx(
                      "font-display text-[1.6rem] font-black text-white transition-colors duration-200 hover:text-violet-300",
                      openIndex !== -1 && "text-white/25"
                    )}
                    style={{ letterSpacing: "-0.03em" }}
                    onClick={toggleMenu}
                  >
                    {t("burgerMenu.home")}
                  </Link>
                </motion.div>
              </ul>
            </nav>

            {/* Bottom bar */}
            <motion.div
              className="flex flex-shrink-0 items-center border-t border-white/[0.07] px-6 py-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
            >
              <ChangeLanguage />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
