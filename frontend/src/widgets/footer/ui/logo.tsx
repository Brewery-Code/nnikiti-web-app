import { logoCat } from "@/shared/icons";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const { t } = useTranslation("footer");

  return (
    <div className={clsx("flex max-w-xs flex-col gap-fluid-md", className)}>
      <div className="flex items-center gap-3">
        <img className="h-16 w-auto flex-shrink-0" src={logoCat} alt="ННІКІТІ логотип" />
      </div>
      <p className="text-fluid-xs leading-relaxed text-gray-500">
        {t("description")}
      </p>
      <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-purple-500" />
    </div>
  );
}
