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
import { MicrocircuitLabelLogo, ChangeLanguage } from "../../ui";
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
  const userData = (rqClient.useQuery("get", "/users/me/", {}).data) as { first_name?: string } | undefined;

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

    const nav = navRef.current;
    const stopProp = (e: WheelEvent) => e.stopPropagation();
    nav?.addEventListener("wheel", stopProp, { passive: true });

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
        onClick={toggleMenu}
        className={clsx(
          "relative z-[110] flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-[10px] transition-all duration-300",
          isOpen
            ? "bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_4px_20px_rgba(139,92,246,0.5)]"
            : "border border-white/[0.10] bg-surface-md hover:border-violet-500/40 hover:bg-violet-500/[0.12] hover:shadow-[0_4px_16px_rgba(166,132,255,0.18)]"
        )}
      >
        <span
          className={clsx(
            "block h-[1.5px] w-[18px] origin-center transition-all duration-300",
            isOpen ? "translate-y-[7.5px] rotate-45 bg-white" : "bg-primary"
          )}
        />
        <span
          className={clsx(
            "block h-[1.5px] w-[18px] transition-all duration-300",
            isOpen ? "scale-x-0 opacity-0 bg-white" : "scale-x-100 opacity-100 bg-primary"
          )}
        />
        <span
          className={clsx(
            "block h-[1.5px] w-[18px] origin-center transition-all duration-300",
            isOpen ? "-translate-y-[7.5px] -rotate-45 bg-white" : "bg-primary"
          )}
        />
      </button>

      {/* Menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col overflow-hidden"
            style={{ background: "var(--bg-base, #07080e)" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {/* Top gradient accent line */}
            <div
              className="absolute inset-x-0 top-0 h-[2px] flex-shrink-0"
              style={{ background: "linear-gradient(90deg, rgba(139,92,246,1) 0%, rgba(96,165,250,1) 100%)" }}
            />

            {/* Ambient decorations */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-[30%] top-0 h-[600px] w-[600px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
                filter: "blur(100px)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-[20%] bottom-0 h-[500px] w-[500px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
                filter: "blur(100px)",
              }}
            />

            {/* Header row — matches site header */}
            <div className="flex h-16 flex-shrink-0 items-center px-4 sm:px-6">
              <Link to="/" onClick={toggleMenu}>
                <MicrocircuitLabelLogo />
              </Link>
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 + index * 0.04, ease: EASE }}
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.08 + extendedBurgerMenuData.length * 0.04,
                    ease: EASE,
                  }}
                  className="py-6"
                >
                  <div className="flex items-center gap-3">
                    <Link
                      to="/"
                      onClick={toggleMenu}
                      className="group inline-flex items-center gap-2.5 rounded-xl border border-white/[0.08] px-5 py-3 text-[14px] font-semibold text-white/50 transition-all duration-200 hover:border-white/[0.15] hover:text-white/80"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-x-0.5">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                      {t("burgerMenu.home")}
                    </Link>
                    <ChangeLanguage />
                  </div>
                </motion.div>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
