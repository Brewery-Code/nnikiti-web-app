import { ChangeLanguage, MicrocircuitLabelLogo, NavigationMenu } from "./ui";
import { useTranslation } from "react-i18next";
import { loadTranslations } from "./locales";
import { useLoadNamespace } from "@/shared/hooks";

export default function Header() {
  const { t, i18n } = useTranslation("header");

  useLoadNamespace("header", loadTranslations);

  return (
    <header
      className="fixed z-[100] flex justify-center w-full h-16 bg-[#3333335e] bg-[linear-gradient(180deg,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0.5)_50%,_rgba(0,0,0,0.3)_100%)] 
    before:fixed before:-z-1 before:inset-0 before:w-full before:h-16 before:backdrop-blur-md"
    >
      <div className="container-base grid grid-cols-[auto_auto_auto] justify-between items-center h-full">
        <MicrocircuitLabelLogo />
        <nav className="grow flex justify-center items-center gap-4 w-auto h-full">
          <NavigationMenu />
        </nav>
        <div className="hidden lg:grid grid-cols-2 items-center gap-4">
          <ChangeLanguage />
          <button
            className="px-2 py-1 rounded-4xl bg-[#3d3d3d] text-base leading-6 font-semibold cursor-pointer transition-shadow duration-500 ease hover:shadow-[0_0_10px_0_rgba(0,0,0,0.5)]"
            onClick={() =>
              (window.location.href =
                "http://127.0.0.1:8000/api/v1/users/login/google-oauth2/")
            }
          >
            Sign In
          </button>
        </div>
        <div className="relative flex lg:hidden justify-center items-center w-8 h-8">
          <span
            className="w-7 h-[1px] bg-white 
            before:absolute before:top-1 before:w-7 before:h-[1px] before:bg-white 
            after:absolute after:bottom-1 after:w-7 after:h-[1px] after:bg-white"
          ></span>
        </div>
      </div>
    </header>
  );
}
