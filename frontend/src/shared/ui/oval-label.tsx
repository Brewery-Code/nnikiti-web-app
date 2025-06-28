import clsx from "clsx";

export default function OvalLabel({
  className,
  children,
  bgColor,
}: {
  className?: string;
  children: React.ReactNode;
  bgColor: string;
}) {
  return (
    <span
      className={clsx(
        "flex justify-center items-center text-xs font-bold uppercase py-1 px-2 rounded-full",
        className && className,
        bgColor && bgColor
      )}
    >
      {children}
    </span>
  );
}
