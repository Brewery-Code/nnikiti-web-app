import clsx from "clsx";
import { useState } from "react";

export default function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");

  return (
    <div
      className={clsx(
        "relative flex w-[calc(100%-16px)] items-center justify-center justify-self-center leading-7 sm:w-[calc(100%-32px)]",
        "ease transition-[width] duration-300 focus-within:w-[calc(100%+16px)] sm:focus-within:w-[calc(100%+32px)]",
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute left-4 h-4 w-4 fill-[#bdbecb]"
      >
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
        </g>
      </svg>
      <input
        type="search"
        name="searchbar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="h-8 w-full rounded-xl border-0 bg-[#16171d] pr-4 pl-10 text-[#bdbecb] shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_black] transition-[shadow,scale] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] outline-none hover:shadow-[0_0_0_2.5px_#2f303d,0_0_25px_-15px_black] focus:shadow-[0_0_0_2.5px_#2f303d]"
      />
    </div>
  );
}
