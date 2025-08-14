import clsx from "clsx";

interface OvalLabelProps {
  className?: string;
  children: React.ReactNode;
  bgColor?: string;
  size?: "s" | "m" | "l";
  style?: React.CSSProperties;
}

export default function OvalLabel({
  className,
  children,
  bgColor,
  size = "s",
  style,
}: OvalLabelProps) {
  return (
    <span
      className={clsx(
        size === "s" && "text-xs",
        size === "m" && "text-base",
        size === "l" && "text-lg",
        "font-bold uppercase py-1 px-2 rounded-full text-center",
        className && className,
        bgColor && bgColor
      )}
      style={style}
    >
      <div className="overflow-hidden line-clamp-1">{children}</div>
    </span>
  );
}
