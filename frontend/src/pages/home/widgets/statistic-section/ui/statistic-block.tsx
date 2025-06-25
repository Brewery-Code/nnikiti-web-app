import clsx from "clsx";

export default function StatisticBlock({
  className,
  title,
  subtitle = "",
  col = 1,
  row = 1,
}: {
  className: string;
  title: string;
  subtitle?: string;
  col?: number;
  row?: number;
}) {
  return (
    <div
      className={clsx(
        className,
        "flex flex-col items-center justify-center p-4 rounded-xl text-black text-center",
        col === 2 && "col-span-2",
        col === 3 && "col-span-3",
        row === 2 && "row-span-2",
        row === 3 && "row-span-3"
      )}
    >
      <div className="text-6xl leading-20 font-bold">{title}</div>
      <p className="text-2xl leading-6 font-bold">{subtitle}</p>
    </div>
  );
}
