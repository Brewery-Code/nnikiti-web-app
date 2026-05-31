import clsx from "clsx";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { logoCat } from "@/shared/icons";

const NAV_COLS: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Університет",
    links: [
      { label: "Про нас", to: ROUTES.HISTORY },
      { label: "Кафедри", to: `/department/1` },
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
      className={clsx("bg-base", className)}
      style={{
        borderTop: "1px solid var(--border-ui-sm)",
        padding: "72px 0 40px",
      }}
    >
      <div className="container-v2">
        <div
          className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr_1fr_1fr]"
          style={{ gap: "40px 56px", marginBottom: 48 }}
        >
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              to={ROUTES.HOME}
              className="flex items-center"
              style={{ gap: 10, marginBottom: 20 }}
            >
              <img src={logoCat} alt="ННІКІТІ" style={{ height: "42px", width: "auto" }} />
            </Link>
            <p className="text-muted" style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 300 }}>
              Національний університет водного господарства та природокористування,
              вул. Соборна, 11, Рівне.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:contents">
            {NAV_COLS.map((col) => (
              <div key={col.heading}>
                <div
                  className="font-display text-subtle"
                  style={{
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
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
                      className="footer-col-link text-muted"
                      style={{ fontSize: 13 }}
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
            { label: "Кафедри",      to: `/department/1` },
            { label: "Події",        to: ROUTES.EVENTS },
            { label: "Партнери",     to: ROUTES.PARTNERS_BUSINESS },
            { label: "Контакти",     to: ROUTES.CONTACTS },
          ].map((lk) => (
            <Link
              key={lk.label}
              to={lk.to}
              className="nav-link text-muted text-[13px] font-medium"
            >
              {lk.label}
            </Link>
          ))}
        </div>

        <div className="border-ui-sm mb-7" style={{ height: 1, background: "var(--border-ui-sm)" }} />

        <div className="text-center">
          <span className="text-subtle" style={{ fontSize: 12 }}>
            © 2025 НУВГП. Усі права захищено.
          </span>
        </div>
      </div>
    </footer>
  );
}
