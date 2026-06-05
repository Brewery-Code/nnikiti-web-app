import { Link } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function BackButton({ to, label, onClick, className }: BackButtonProps) {
  const cls = `group inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-medium text-white/50 backdrop-blur-sm transition-all duration-200 hover:border-violet-500/30 hover:bg-violet-500/[0.08] hover:text-white/85 ${className ?? ""}`;

  const inner = (
    <>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      >
        <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </>
  );

  if (onClick) {
    return <button onClick={onClick} className={cls}>{inner}</button>;
  }

  return <Link to={to!} className={cls}>{inner}</Link>;
}
