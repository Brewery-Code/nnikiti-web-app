import clsx from "clsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/model/routes";
import { logoCat } from "@/shared/icons";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";

export function Footer({ className }: { className?: string }) {
  useLoadNamespace("footer", loadTranslations);
  const { t } = useTranslation("footer");

  const NAV_COLS = [
    {
      heading: t("col_institute"),
      links: [
        { label: t("link_about"),       to: ROUTES.HISTORY },
        { label: t("link_departments"), to: `/department/1` },
        { label: t("link_team"),        to: ROUTES.TEAM },
        { label: t("link_gallery"),     to: ROUTES.GALLERY },
      ],
    },
    {
      heading: t("col_entrant"),
      links: [
        { label: t("link_bachelor"),     to: ROUTES.BACHELOR },
        { label: t("link_master"),       to: ROUTES.MASTER },
        { label: t("link_postgraduate"), to: ROUTES.POSTGRADUATE },
        { label: t("link_contacts"),     to: ROUTES.CONTACTS },
      ],
    },
    {
      heading: t("col_science"),
      links: [
        { label: t("link_publications"), to: ROUTES.SCIENCE_PUBLICATIONS },
        { label: t("link_research"),     to: ROUTES.SCIENCE_RESEARCH },
        { label: t("link_conferences"),  to: ROUTES.SCIENCE_CONFERENCES },
        { label: t("link_partners"),     to: ROUTES.PARTNERS_BUSINESS },
      ],
    },
  ];

  return (
    <footer
      className={clsx("relative bg-[#07080e]", className)}
      style={{ zIndex: 2 }}
    >
      {/* Main grid */}
      <div className="container-v2 pt-16 pb-10 sm:pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-14">

          {/* Brand */}
          <div>
            <Link to={ROUTES.HOME} className="inline-flex items-center mb-5">
              <img src={logoCat} alt="ННІКІТІ" style={{ height: 40, width: "auto" }} />
            </Link>
            <p className="text-[13px] leading-[1.75] text-white/35 max-w-[280px]">
              {t("address")}
            </p>
            <p className="mt-4 text-[12px] text-white/20">nni-akot@nuwm.edu.ua</p>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/25">
                {col.heading}
              </p>
              <div className="flex flex-col gap-2.5">
                {col.links.map((lk) => (
                  <Link
                    key={lk.to}
                    to={lk.to}
                    className="text-[13px] text-white/45 transition-colors duration-150 hover:text-white/90 w-fit"
                  >
                    {lk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div>
        <div className="container-v2 py-5 flex justify-center">
          <span className="text-[12px] text-white/20">
            {t("copyright")}
          </span>
        </div>
      </div>
    </footer>
  );
}
