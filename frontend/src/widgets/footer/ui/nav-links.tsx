import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";

interface NavLinksProps {
  className?: string;
}

const links = [
  { labelKey: "linkHome", to: ROUTES.HOME },
  { labelKey: "linkHistory", to: ROUTES.HISTORY },
  { labelKey: "linkAlumni", to: ROUTES.ALUMNI },
  { labelKey: "linkContacts", to: ROUTES.CONTACTS },
  { labelKey: "linkFaq", to: ROUTES.FAQ },
  { labelKey: "linkAskQuestion", to: ROUTES.ASK_QUESTION },
] as const;

export function NavLinks({ className }: NavLinksProps) {
  const { t } = useTranslation("footer");

  return (
    <div className={clsx(className)}>
      <p className="mb-2 text-fluid-xs font-bold uppercase tracking-[0.32em] text-slate-500">
        {t("navigation")}
      </p>
      <ul className="flex flex-col">
        {links.map(({ labelKey, to }) => (
          <li key={to}>
            <Link
              to={to}
              className="group flex items-center gap-3 py-1.5 text-fluid-lg leading-tight text-slate-400 transition-colors duration-200 hover:text-white"
            >
              <span className="h-px w-3 bg-slate-700 transition-all duration-300 group-hover:w-5 group-hover:bg-white" />
              {t(labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
