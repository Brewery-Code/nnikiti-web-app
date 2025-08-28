import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { SocialMediaLinks } from "@/widgets/social-media-links";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { Contacts, Logo } from "./ui";

export default function Footer({ className }: { className?: string }) {
  const { t } = useTranslation("footer");
  useLoadNamespace("footer", loadTranslations);
  return (
    <footer
      className={clsx(
        "relative bg-black bg-cover bg-center bg-no-repeat py-8",
        "before:absolute before:-top-16 before:h-16 before:w-full before:bg-[linear-gradient(0deg,_rgba(0,0,0,1)_0%,_rgba(0,0,0,0)_100%)]",
        className
      )}
    >
      <div className="container-base grid grid-cols-1 place-items-center gap-4 md:grid-cols-[auto_auto] md:place-items-start xl:grid-cols-[auto_1fr_auto]">
        <Logo className="row-span-2" />
        <Contacts className="xl:mx-auto" />
        <SocialMediaLinks className="mt-4 flex-wrap justify-center md:mt-0 md:flex-nowrap md:justify-start xl:mt-4" />
      </div>
      <p className="mt-6 text-center text-xs text-[#807F7F] lg:mt-12">{t("rightsReserved")}</p>
    </footer>
  );
}
