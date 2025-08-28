import clsx from "clsx";

export default function SearchBar({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "relative w-[calc(60%-32px)] transition-[width] duration-200 ease-in-out focus-within:w-[calc(60%+32px)]",
        className
      )}
    >
      <input
        type="text"
        placeholder="Search"
        name="text"
        className={`w-full rounded-full border-gray-800 bg-[rgba(255,255,255,0.8)] py-2 pr-3 pl-10 text-gray-800 placeholder-gray-800 backdrop-blur-sm transition-colors duration-200 ease-in-out outline-none focus:bg-white`}
      />
      <svg
        className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 transform"
        fill="#000000"
        width="20px"
        height="20px"
        viewBox="0 0 1920 1920"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
          fillRule="evenodd"
        ></path>
      </svg>
    </div>
  );
}
