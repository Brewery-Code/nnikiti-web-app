import { logoLion } from "@/shared/icons";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import clsx from "clsx";

export default function Footer({ className }: { className?: string }) {
  const { t } = useTranslation("footer");
  useLoadNamespace("footer", loadTranslations);
  return (
    <footer
      className={clsx(
        "relative py-8 bg-black bg-center bg-cover bg-no-repeat",
        "before:absolute before:-top-16 before:w-full before:h-16 before:bg-[linear-gradient(0deg,_rgba(0,0,0,1)_0%,_rgba(0,0,0,0)_100%)]",
        className
      )}
    >
      <div className="container-base flex">
        <div className="flex justify-center items-center gap-5">
          <img
            className="w-20 lg:w-28 h-23 lg:h-32"
            src={logoLion}
            alt="Logo"
          />
          <p className="max-w-[428px] text-xl lg:text-[28px] leading-[30px] font-bold uppercase ">
            The National University of Water and Environmental Engineering
          </p>
        </div>
      </div>
      <p className="mt-6 lg:mt-12 text-xs text-center text-[#807F7F]">
        {t("rightsReserved")}
      </p>
    </footer>
  );
}
