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
    <footer className={clsx("relative bg-[#07080e]", className)} style={{ zIndex: 2 }}>
      {/* Top gradient line */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5) 30%, rgba(96,165,250,0.5) 70%, transparent)" }} />

      <div className="container-v2 pt-14 pb-10 sm:pt-16">
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-14">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <Link to={ROUTES.HOME} className="inline-flex items-center mb-4">
              <img src={logoCat} alt="ННІКІТІ" loading="lazy" style={{ height: 36, width: "auto" }} />
            </Link>
            <p className="text-[13px] leading-[1.75] text-white/30 max-w-[300px] mb-6">
              {t("universityName")}
            </p>
            {/* <div className="flex flex-wrap gap-2">
              {socialMediaLinks.instagram && <FooterSocialLink icon="instagram" label="Instagram" href={socialMediaLinks.instagram} />}
              {socialMediaLinks.facebook  && <FooterSocialLink icon="facebook"  label="Facebook"  href={socialMediaLinks.facebook} />}
              {socialMediaLinks.youtube   && <FooterSocialLink icon="youtube"   label="YouTube"   href={socialMediaLinks.youtube} />}
              {socialMediaLinks.telegram  && <FooterSocialLink icon="telegram"  label="Telegram"  href={socialMediaLinks.telegram} />}
            </div> */}
          </div>

          {/* Nav columns — 2-col on mobile, each col on desktop */}
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

        {/* Divider */}
        <div className="mt-12 h-px bg-white/[0.05]" />

        {/* Bottom */}
        <div className="mt-5 flex justify-center">
          <span className="text-[12px] text-white/20">{t("copyright")}</span>
        </div>
      </div>
    </footer>
  );
}
