import { logoMicrocircuitWhite } from "@/shared/icons";

export default function MicrocircuitLabelLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <img
        className="hidden h-10 w-10 md:block md:h-12 md:w-12"
        src={logoMicrocircuitWhite}
        alt="Microcircuit White Logo"
      />
      <span className="text-xl leading-[18px] font-bold">
        ННІ
        <br />
        КІТІ
      </span>
    </div>
  );
}
