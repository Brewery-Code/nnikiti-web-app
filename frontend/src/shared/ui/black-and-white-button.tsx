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
          "bg-black text-white outline-white before:bg-white hover:text-black hover:outline-black",
        color === "white" &&
          !isHovered &&
          "bg-white text-black outline-black before:bg-black hover:text-white hover:outline-white",
        size === "s" && "text-sm",
        size === "m" && "text-base",
        isHovered && "scale-110 shadow-[4px_5px_17px_-4px_#268391] before:w-[250%]",
        isHovered && color === "black" && "bg-black text-black outline-black before:bg-white",
        !isHovered && color === "black" && "text-white outline-white",
        isHovered && color === "white" && "bg-white text-white outline-white before:bg-black",
        !isHovered && color === "white" && "text-black outline-black",
        "relative cursor-pointer overflow-hidden rounded-2xl px-3 py-1 font-bold tracking-widest uppercase outline-2",
        "transition-[scale,outline,color,box-shadow] duration-300 hover:scale-110 hover:shadow-[4px_5px_17px_-4px_#268391]",
        "before:absolute before:top-0 before:-left-full before:-z-10 before:h-full before:w-0 before:skew-x-12 before:transition-[width] before:duration-500 hover:before:w-[250%]"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
