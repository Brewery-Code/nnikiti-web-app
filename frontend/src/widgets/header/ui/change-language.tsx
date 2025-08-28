import { queryClient } from "@/shared/api/query-client";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export default function ChangeLanguage() {
  const { i18n } = useTranslation("header");

  const languageHandler = () => {
    i18n.changeLanguage(i18n.language === "uk" ? "en" : "uk").then(() => {
      queryClient.invalidateQueries();
    });
  };

  return (
    <button
      className={clsx(
        "relative flex w-25 cursor-pointer items-center justify-around gap-3 rounded-4xl px-2 py-1 text-base leading-6 font-bold text-black outline-2 outline-white",
        "ease transition-shadow duration-300 hover:shadow-[0px_2px_18px_-4px_#fff]",
        "before:absolute before:h-4/5 before:w-[50%] before:rounded-xl before:bg-white",
        "before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.23,1,0.32,1)]",
        i18n.language === "uk" ? "before:-translate-x-[45%]" : "before:translate-x-[45%]"
      )}
      onClick={languageHandler}
    >
      <div
        className={clsx(
          "ease z-10 uppercase transition-transform duration-500",
          i18n.language !== "uk" && "scale-90 text-white"
        )}
      >
        Uk
      </div>
      <div
        className={clsx(
          "ease z-10 uppercase transition-transform duration-500",
          i18n.language !== "en" && "scale-90 text-white"
        )}
      >
        En
      </div>
    </button>
  );
}
