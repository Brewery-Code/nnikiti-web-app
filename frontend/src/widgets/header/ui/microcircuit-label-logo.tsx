import { logoMicrocircuitWhite } from "@/shared/icons";

export default function MicrocircuitLabelLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <img
        className="w-10 md:w-12 h-10 md:h-12"
        src={logoMicrocircuitWhite}
        alt="Microcircuit White Logo"
      />
      <span className="hidden md:block text-xl leading-[18px] font-bold ">
        ННІ
        <br />
        КІТІ
      </span>
    </div>
  );
}
