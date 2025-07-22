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
        "relative py-8 bg-black bg-center bg-cover bg-no-repeat",
        "before:absolute before:-top-16 before:w-full before:h-16 before:bg-[linear-gradient(0deg,_rgba(0,0,0,1)_0%,_rgba(0,0,0,0)_100%)]",
        className
      )}
    >
      <div className="container-base grid grid-cols-1 md:grid-cols-[auto_auto] xl:grid-cols-[auto_1fr_auto] place-items-center md:place-items-start gap-4">
        <Logo className="row-span-2" />
        <Contacts className="xl:mx-auto" />
        <SocialMediaLinks className="flex-wrap md:flex-nowrap justify-center md:justify-start mt-4 md:mt-0 xl:mt-4" />
      </div>
      <p className="mt-6 lg:mt-12 text-xs text-center text-[#807F7F]">
        {t("rightsReserved")}
      </p>
    </footer>
  );
}
