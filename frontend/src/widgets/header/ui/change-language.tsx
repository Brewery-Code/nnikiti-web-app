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
        "cursor-pointer rounded-lg border border-white/10 bg-transparent px-3 py-1.5",
        "text-[11px] font-bold uppercase tracking-[0.09em] text-white/40 transition-colors duration-150",
        "hover:border-white/25 hover:text-white"
      )}
      onClick={languageHandler}
    >
      {i18n.language === "uk" ? "EN" : "UA"}
    </button>
  );
}
