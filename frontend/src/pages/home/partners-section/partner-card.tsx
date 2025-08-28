import clsx from "clsx";

export default function PartnerCard({
  className,
  children,
  colSpan,
  rowSpan,
}: {
  className?: string;
  children?: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
}) {
  return (
    <div
      className={clsx(
        "flex max-h-24 items-center justify-center rounded-xl bg-gradient-to-br from-[#F1F5F9] to-[#CBD5E1] text-black shadow-[0px_0px_10px_2px_rgba(255,255,255,0.3)]",
        className && className
      )}
      style={{
        gridColumn: colSpan ? `span ${colSpan}` : "",
        gridRow: rowSpan ? `span ${rowSpan}` : "",
      }}
    >
      {children}
    </div>
  );
}
