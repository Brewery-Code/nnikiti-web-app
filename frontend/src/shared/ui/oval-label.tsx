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
        "rounded-full px-2 py-1 text-center font-bold uppercase",
        className && className,
        bgColor && bgColor
      )}
      style={style}
    >
      <div className="line-clamp-1 overflow-hidden">{children}</div>
    </span>
  );
}
