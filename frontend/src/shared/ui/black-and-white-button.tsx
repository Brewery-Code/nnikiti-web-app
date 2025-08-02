import clsx from "clsx";

interface BackAndWhiteButtonProps {
  className?: string;
  color?: "black" | "white";
  size?: "s" | "m";
  children: React.ReactNode;
  onClick?: () => void;
  isHovered?: boolean;
}

export function BlackAndWhiteButton({
  className,
  color = "black",
  size = "m",
  children,
  onClick,
  isHovered,
}: BackAndWhiteButtonProps) {
  return (
    <button
      className={clsx(
        className,
        color === "black" &&
          !isHovered &&
          "bg-black outline-white text-white hover:text-black hover:outline-black before:bg-white",
        color === "white" &&
          !isHovered &&
          "bg-white outline-black text-black hover:text-white hover:outline-white before:bg-black",
        size === "s" && "text-sm",
        size === "m" && "text-base",
        isHovered &&
          "scale-110 shadow-[4px_5px_17px_-4px_#268391] before:w-[250%]",
        isHovered &&
          color === "black" &&
          "bg-black text-black outline-black before:bg-white",
        !isHovered && color === "black" && "text-white outline-white",
        isHovered &&
          color === "white" &&
          "bg-white text-white outline-white before:bg-black",
        !isHovered && color === "white" && "text-black outline-black",
        "overflow-hidden relative px-3 py-1 font-bold rounded-2xl outline-2 tracking-widest uppercase cursor-pointer",
        "transition-[scale,outline,color,box-shadow] duration-300 hover:scale-110 hover:shadow-[4px_5px_17px_-4px_#268391]",
        "before:absolute before:-left-full before:top-0 before:w-0 before:h-full before:skew-x-12 before:-z-10 before:transition-[width] before:duration-500 hover:before:w-[250%]"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
