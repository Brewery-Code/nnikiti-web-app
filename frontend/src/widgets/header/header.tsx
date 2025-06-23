import { ChangeLanguage, MicrocircuitLabelLogo } from "@/widgets/index";
import Arrow from "@/shared/icons/arrows/common-arrow.svg?react";
import Search from "@/shared/icons/search.svg?react";

export default function Header() {
  return (
    <header className="absolute w-full h-20 bg-black before:absolute before:-bottom-5 before:w-full before:h-5 before:bg-[linear-gradient(180deg,_rgba(0,0,0,1)_0%,_rgba(0,0,0,0)_100%)]">
      <div className="container flex justify-between items-center h-full">
        <MicrocircuitLabelLogo />
        <ul className="flex items-center gap-6 text-base leading-6 font-bold">
          <li className="flex items-center gap-1.5">
            <span className=" ">Navigation Item</span>
            <Arrow className="mt-0.5" />
          </li>
          <li className="flex items-center gap-1.5">
            <span className=" ">Navigation Item</span>
            <Arrow className="mt-0.5" />
          </li>
          <li className="flex items-center gap-1.5">
            <span className=" ">Navigation Item</span>
            <Arrow className="mt-0.5" />
          </li>
          <li className="flex items-center gap-1.5">
            <span className=" ">Navigation Item</span>
            <Arrow className="mt-0.5" />
          </li>
          <li className="flex items-center gap-1.5">
            <span className=" ">Navigation Item</span>
            <Arrow className="mt-0.5" />
          </li>
          <Search className="-ml-2" />
        </ul>
        <ChangeLanguage />
      </div>
    </header>
  );
}
