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
        "relative flex items-center gap-3 px-2 py-1 rounded-4xl bg-[#3d3d3d] text-base leading-6 font-semibold cursor-pointer transition-shadow duration-500 ease hover:shadow-[0_0_10px_0_rgba(0,0,0,0.5)]",
        "before:absolute before:w-1/2 before:h-4/5 before:rounded-xl before:bg-black before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.23,1,0.32,1)]",
        i18n.language === "uk"
          ? "before:-translate-x-1.5"
          : "before:translate-x-9/12"
      )}
      onClick={languageHandler}
    >
      <div
        className={clsx(
          "z-10 uppercase transition-transform duration-500 ease",
          i18n.language !== "uk" && "scale-90"
        )}
      >
        Uk
      </div>
      <div
        className={clsx(
          "z-10 uppercase transition-transform duration-500 ease",
          i18n.language !== "en" && "scale-90"
        )}
      >
        En
      </div>
    </button>
  );
}
