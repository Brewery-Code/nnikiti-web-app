import { avatar } from "../lib";

export function PersonCard({
  name, role, sub, email, badge, imgUrl,
}: {
  name: string; role: string; sub?: string;
  email?: string; badge?: string; imgUrl?: string | null;
}) {
  return (
    <div className="group overflow-hidden rounded-[16px] border border-white/[0.07] bg-[#0a0b12] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
        <img
          src={avatar(imgUrl)}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#08090f] via-[#08090f]/70 to-transparent" />

        {badge && (
          <span className="absolute right-2 top-2 rounded-[6px] border border-white/10 bg-[#08090f]/80 px-1.5 py-0.5 text-[8px] font-medium text-subtle backdrop-blur-sm">
            {badge}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <p className="font-display text-[13px] font-bold leading-tight text-white sm:text-[15px]">
            {name}
          </p>
          <p className="mt-0.5 text-[11px] leading-snug text-white/55 sm:text-[12px]">{role}</p>
          {sub && <p className="mt-0.5 hidden text-[10px] text-white/35 sm:block">{sub}</p>}
          {email && (
            <a href={`mailto:${email}`} className="mt-1 hidden max-w-full truncate text-[11px] text-violet-300/80 sm:inline-block">
              {email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
