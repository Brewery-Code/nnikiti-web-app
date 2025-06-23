import { logoMicrocircuitWhite } from "@/shared/icons";

export default function MicrocircuitLabelLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <img
        className="w-12 h-12"
        src={logoMicrocircuitWhite}
        alt="Microcircuit White Logo"
      />
      <span className="text-xl leading-[18px] font-bold ">
        ННІ
        <br />
        КІТІ
      </span>
    </div>
  );
}
