import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { type DepartmentData } from "@/shared/model/departments-data";
import { avatar } from "../../lib";

export function TeamMemberCard({ member, large = false }: { member: DepartmentData["team"][number]; large?: boolean }) {
  const { t } = useTranslation("department");
  const hasUrl = !!member.url;
  return (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0a0b12] shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-300",
        hasUrl &&
          "cursor-pointer hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_10px_34px_rgba(166,132,255,0.28),0_0_0_1px_rgba(166,132,255,0.25)]"
      )}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <img
          src={avatar(member.imageUrl)}
          alt={member.name}
          loading="lazy"
          className={clsx(
            "h-full w-full object-cover object-top transition-transform duration-500",
            hasUrl && "group-hover:scale-105"
          )}
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0a0b12] to-transparent" />
        {member.audience && (
          <span className="absolute right-3 top-3 rounded-[8px] border border-white/10 bg-[#08090f]/75 px-2.5 py-1 text-[10px] text-subtle backdrop-blur-sm">
            {t("team.audience_prefix")} <span className="font-display font-bold text-primary">{member.audience}</span>
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className={clsx("font-display font-bold leading-tight text-primary", large ? "text-[17px]" : "text-[13px] sm:text-[14px]")}>
            {member.name}
          </p>
          <p className={clsx("mt-0.5 text-muted", large ? "text-[13px]" : "text-[10px] sm:text-[11px]")}>{member.role}</p>
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className={clsx("relative z-20 mt-1.5 inline-block max-w-full truncate text-violet-300", large ? "text-[12px]" : "text-[10px] sm:text-[11px]")}
            >
              {member.email}
            </a>
          )}
        </div>
      </div>

      {/* Stretched link — keeps the email anchor clickable (no nested <a>) */}
      {hasUrl && (
        <a
          href={member.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={member.name}
          className="absolute inset-0 z-10"
        />
      )}
    </div>
  );
}
