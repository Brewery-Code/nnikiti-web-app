import { useTranslation } from "react-i18next";
import { useContactsData, useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import clsx from "clsx";
import { SocialMediaLinks } from "@/widgets/social-media-links";
import { Logo } from "./ui";

export default function Footer({ className }: { className?: string }) {
  const { deaneryData } = useContactsData();

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
      <div className="container-base flex flex-col md:flex-row justify-between">
        <Logo />
        <div className="flex flex-col gap-4">
          <SocialMediaLinks />
          <div className="flex flex-wrap justify-center gap-1">
            <span>Деканат: </span>
            <span>{deaneryData.dailyEducation.email}</span>
          </div>
        </div>
      </div>
      <p className="mt-6 lg:mt-12 text-xs text-center text-[#807F7F]">
        {t("rightsReserved")}
      </p>
    </footer>
  );
}
