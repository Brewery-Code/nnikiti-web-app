import clsx from "clsx";
import { useTranslation } from "react-i18next";

export default function ChangeLanguage() {
  const { i18n } = useTranslation("header");

  const languageHandler = () => {
    i18n.changeLanguage(i18n.language === "uk" ? "en" : "uk");
  };

  return (
    <button
      className={clsx(
        "relative flex justify-around items-center gap-3 px-2 py-1 rounded-4xl text-base leading-6 text-black font-bold cursor-pointer outline-2 outline-[white]",
        "transition-shadow duration-300 ease hover:shadow-[0px_2px_18px_-4px_#fff]",
        "before:absolute before:w-[50%] before:h-4/5 before:rounded-xl before:bg-white",
        "before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.23,1,0.32,1)]",
        i18n.language === "uk"
          ? "before:-translate-x-[45%]"
          : "before:translate-x-[45%]"
      )}
      onClick={languageHandler}
    >
      <div
        className={clsx(
          "z-10 uppercase transition-transform duration-500 ease",
          i18n.language !== "uk" && "scale-90 text-white"
        )}
      >
        Uk
      </div>
      <div
        className={clsx(
          "z-10 uppercase transition-transform duration-500 ease",
          i18n.language !== "en" && "scale-90 text-white"
        )}
      >
        En
      </div>
    </button>
  );
}
