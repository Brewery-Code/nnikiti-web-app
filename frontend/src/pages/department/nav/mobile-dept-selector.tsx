import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

export function MobileDeptSelector({
  deptList,
  departmentId,
}: {
  deptList: { id: number; name: string }[];
  departmentId: string;
}) {
  const { t } = useTranslation("department");

  return (
    <div className="mb-14 lg:hidden">
      <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.22em] text-violet-400">
        {t("mobile_selector.label")}
      </p>
      <div className="flex flex-col gap-1.5">
        {deptList.map((d) => {
          const isActive = String(d.id) === departmentId;
          return (
            <Link
              key={d.id}
              to={`/department/${d.id}`}
              className={clsx(
                "flex items-center gap-3 rounded-[12px] px-4 py-3 text-[14px] font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-violet-500/20 to-blue-500/10 text-white border border-violet-500/25"
                  : "border border-white/[0.06] bg-white/[0.03] text-white/50 active:bg-white/[0.06] active:text-white/80"
              )}
            >
              <span
                className={clsx(
                  "h-2 w-2 flex-shrink-0 rounded-full transition-all",
                  isActive ? "bg-violet-400" : "bg-white/15"
                )}
              />
              <span className="leading-snug">{d.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
