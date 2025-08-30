import clsx from "clsx";

interface NavButtonProps {
  children: React.ReactNode;
  className?: string;
  active: boolean;
}

export function NavButton({ children, className, active }: NavButtonProps) {
  return (
    <button
      className={clsx(
        "cursor-pointer overflow-hidden rounded-xl bg-[rgb(14,14,26)] px-4 py-6 text-2xl font-bold text-[rgb(234,234,234)] uppercase transition-[scale,box-shadow] duration-400 hover:shadow-[0_0_60px_#1f4c65] active:scale-90",
        className,
        active && "shadow-[0_0_60px_#1f4c65]"
      )}
    >
      {children}
    </button>
  );
}
