import clsx from "clsx";
import { useState } from "react";
import style from "./burger-menu.module.css";

export default function BurgerMenu({ className }: { className?: string }) {
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean | null>(null);
  const handleBurgerClick = () => {
    setIsBurgerOpen((prev) => (prev === true ? false : true));
  };

  const burgerButtonClass = () => {
    if (isBurgerOpen === null) return "";
    else if (isBurgerOpen) return style["burger-button_active"];
    else return style["burger-button_inactive"];
  };

  return (
    <div className={className}>
      <div
        className={clsx("z-10", style["burger-button"], burgerButtonClass())}
        onClick={handleBurgerClick}
      >
        <span />
      </div>
      <div
        className={clsx(
          "absolute left-0 top-0 w-dvw h-dvh bg-amber-900 transition-transform duration-500 ease-in-out",
          isBurgerOpen ? "translate-x-0" : "translate-x-full"
        )}
      ></div>
    </div>
  );
}
