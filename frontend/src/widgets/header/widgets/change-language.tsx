import { useState } from "react";
import clsx from "clsx";

export default function ChangeLanguage() {
  const [activeLanguage, setActiveLanguage] = useState("uk");
  const languageHandler = () => {
    setActiveLanguage((prev) => (prev === "uk" ? "en" : "uk"));
  };

  return (
    <button
      className={clsx(
        "relative flex items-center gap-3 px-2 py-1 rounded-4xl bg-[#3d3d3d] text-base leading-6 font-semibold tracking-wider cursor-pointer before:absolute before:w-1/2 before:h-4/5 before:rounded-xl before:bg-black before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.23,1,0.32,1)]",
        activeLanguage === "uk"
          ? "before:-translate-x-1.5"
          : "before:translate-x-9/12"
      )}
      onClick={languageHandler}
    >
      <div className={clsx("z-10 uppercase")}>Uk</div>
      <div className="z-10 uppercase">En</div>
    </button>
  );
}
