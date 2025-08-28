import { logoLion } from "@/shared/icons";
import clsx from "clsx";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={clsx("flex items-center justify-center gap-3 sm:gap-5", className)}>
      <img className="h-23 w-20 lg:h-32 lg:w-28" src={logoLion} alt="Logo" />
      <p className="leading:xl max-w-[428px] text-base font-bold uppercase sm:text-xl sm:leading-[30px] lg:text-[28px]">
        The National University of Water and Environmental Engineering
      </p>
    </div>
  );
}
