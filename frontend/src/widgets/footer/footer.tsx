import clsx from "clsx";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { logoCat } from "@/shared/icons";

const NAV_COLS: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Інститут",
    links: [
      { label: "Про інститут", to: ROUTES.HISTORY },
      { label: "Кафедри", to: `/department/1` },
      { label: "Команда", to: ROUTES.TEAM },
      { label: "Галерея", to: ROUTES.GALLERY },
    ],
  },
  {
    heading: "Вступникам",
    links: [
      { label: "Бакалаврат", to: ROUTES.BACHELOR },
      { label: "Магістратура", to: ROUTES.MASTER },
      { label: "Аспірантура", to: ROUTES.POSTGRADUATE },
      { label: "Контакти", to: ROUTES.CONTACTS },
    ],
  },
  {
    heading: "Наука",
    links: [
      { label: "Публікації", to: ROUTES.SCIENCE_PUBLICATIONS },
      { label: "Дослідження", to: ROUTES.SCIENCE_RESEARCH },
      { label: "Конференції", to: ROUTES.SCIENCE_CONFERENCES },
      { label: "Партнери", to: ROUTES.PARTNERS_BUSINESS },
    ],
  },
];


export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={clsx("relative bg-[#07080e]", className)}
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", zIndex: 2 }}
    >
      {/* Main grid */}
      <div className="container-v2 pt-16 pb-10 sm:pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-14">

          {/* Brand */}
          <div>
            <Link to={ROUTES.HOME} className="inline-flex items-center mb-5">
              <img src={logoCat} alt="ННІ КІТІ" style={{ height: 40, width: "auto" }} />
            </Link>
            <p className="text-[13px] leading-[1.75] text-white/35 max-w-[280px]">
              Національний університет водного господарства
              та природокористування, вул. Соборна, 11, Рівне.
            </p>
            <p className="mt-4 text-[12px] text-white/20">nni-akot@nuwm.edu.ua</p>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.heading}>
              <p
                className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/25"
              >
                {col.heading}
              </p>
              <div className="flex flex-col gap-2.5">
                {col.links.map((lk) => (
                  <Link
                    key={lk.label}
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
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="container-v2 py-5 flex justify-center">
          <span className="text-[12px] text-white/20">
            © 2026 НУВГП. Усі права захищено.
          </span>
        </div>
      </div>
    </footer>
  );
}
