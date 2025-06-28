import clsx from "clsx";

export default function Title({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={clsx(
        "font-open-sans text-white text-4xl font-bold uppercase",
        className
      )}
    >
      {children}
    </h2>
  );
}
