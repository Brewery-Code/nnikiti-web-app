import { logoLion } from "@/shared/icons";
import clsx from "clsx";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={clsx(
        "flex justify-center items-center gap-3 sm:gap-5",
        className
      )}
    >
      <img className="w-20 lg:w-28 h-23 lg:h-32" src={logoLion} alt="Logo" />
      <p className="max-w-[428px] text-base sm:text-xl lg:text-[28px] leading:xl sm:leading-[30px] font-bold uppercase ">
        The National University of Water and Environmental Engineering
      </p>
    </div>
  );
}
