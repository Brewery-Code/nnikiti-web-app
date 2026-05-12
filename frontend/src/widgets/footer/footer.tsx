import clsx from "clsx";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { DEPARTMENTS_DATA } from "@/shared/model/departments-data";
import { logoMicrocircuitWhite } from "@/shared/icons";

const NAV_COLS: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Університет",
    links: [
      { label: "Про нас", to: ROUTES.HISTORY },
      { label: "Кафедри", to: `/department/${DEPARTMENTS_DATA[0].id}` },
      { label: "Новини", to: ROUTES.EVENTS },
      { label: "Контакти", to: ROUTES.CONTACTS },
    ],
  },
  {
    heading: "Вступникам",
    links: [
      { label: "Програми", to: ROUTES.BACHELOR },
      { label: "Умови", to: ROUTES.BACHELOR },
      { label: "Навчання", to: ROUTES.MASTER },
      { label: "Заявка", to: ROUTES.BACHELOR },
    ],
  },
  {
    heading: "Ресурси",
    links: [
      { label: "Бібліотека", to: ROUTES.HOME },
      { label: "Розклад", to: ROUTES.HOME },
      { label: "Кампус", to: ROUTES.GALLERY },
      { label: "Партнери", to: ROUTES.PARTNERS_BUSINESS },
    ],
  },
];

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={clsx(className)}
      style={{
        background: "#060709",
        borderTop: "1px solid rgba(166,132,255,0.08)",
        padding: "72px 0 40px",
      }}
    >
      <div className="container-v2">
        <div
          className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr_1fr_1fr]"
          style={{ gap: "40px 56px", marginBottom: 48 }}
        >
          {/* Brand column — spans full width on mobile */}
          <div className="lg:col-span-1">
            <Link
              to={ROUTES.HOME}
              className="flex items-center"
              style={{ gap: 10, marginBottom: 20 }}
            >
              <img src={logoMicrocircuitWhite} alt="ННКІТІ" style={{ width: 44, height: 44 }} />
              <span className="text-xl font-bold leading-[18px] text-white">
                ННІ<br />КІТІ
              </span>
            </Link>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                maxWidth: 300,
              }}
            >
              Національний університет водного господарства та природокористування,
              вул. Соборна, 11, Рівне.
            </p>
          </div>

          {/* Nav columns — 3-col grid on mobile/tablet, flat on lg+ via contents */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:contents">
            {NAV_COLS.map((col) => (
              <div key={col.heading}>
                <div
                  className="font-display"
                  style={{
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: 16,
                  }}
                >
                  {col.heading}
                </div>
                <div className="flex flex-col" style={{ gap: 10 }}>
                  {col.links.map((lk) => (
                    <Link
                      key={lk.label}
                      to={lk.to}
                      className="footer-col-link"
                      style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}
                    >
                      {lk.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal nav row */}
        <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: "Про нас",      to: ROUTES.HISTORY },
            { label: "Вступникам",   to: ROUTES.BACHELOR },
            { label: "Кафедри",      to: `/department/${DEPARTMENTS_DATA[0].id}` },
            { label: "Події",        to: ROUTES.EVENTS },
            { label: "Партнери",     to: ROUTES.PARTNERS_BUSINESS },
            { label: "Контакти",     to: ROUTES.CONTACTS },
          ].map((lk) => (
            <Link
              key={lk.label}
              to={lk.to}
              className="nav-link text-[13px] font-medium"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {lk.label}
            </Link>
          ))}
        </div>

        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.06)",
            marginBottom: 28,
          }}
        />

        <div className="text-center">
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
            © 2025 НУВГП. Усі права захищено.
          </span>
        </div>
      </div>
    </footer>
  );
}
