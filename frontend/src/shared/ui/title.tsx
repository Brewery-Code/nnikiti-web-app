import clsx from "clsx";

export function Title({
  className,
  children,
  color,
}: {
  className?: string;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <h2
      className={clsx(
        "mb-8 font-open-sans text-4xl font-bold uppercase",
        color ? color : "text-white",
        className
      )}
    >
      {children}
    </h2>
  );
}
