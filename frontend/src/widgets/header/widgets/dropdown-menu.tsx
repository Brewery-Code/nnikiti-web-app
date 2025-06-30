import clsx from "clsx";

export default function DropdownMenu({
  className,
  isMenuOpen,
}: {
  className?: string;
  isMenuOpen: boolean;
}) {
  return (
    <div
      className={clsx(
        "absolute top-full w-auto min-w-full mt-1 transition-[opacity, transform] duration-300 ease-in-out rounded-lg bg-[rgba(0,0,0,0.1)] backdrop-blur-md before:absolute before:-top-1 before:h-2 before:w-full before:transition-opacity before:duration-300 before:ease-in-out",
        isMenuOpen
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none translate-y-6",
        className
      )}
    >
      <ul className="relative flex flex-col gap-1 p-2 border-1 border-[#161616] rounded-lg text-[#929292]">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <li
            className={clsx(
              "p-2 rounded-lg bg-[#242424c2] transition-[transform, color] duration-200 ease-in-out hover:text-white hover:scale-110 hover:bg-[#4b4b4b]"
            )}
            key={index}
          >
            Test
          </li>
        ))}
      </ul>
    </div>
  );
}
