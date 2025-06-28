import gradient from "./card-gradient.module.css";
import OvalLabel from "../oval-label";
import clsx from "clsx";

export default function SpecialtiesCard({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "relative flex flex-col justify-between w-72 h-[370px] p-6 rounded-lg text-white cursor-pointer ",
        gradient.gradient,
        className
      )}
    >
      <div className="">
        <div>
          <span className="font-bold text-[#717171] ">Code:</span>
          <span className="ml-2 font-semibold">121</span>
        </div>
        <p className="mt-3.5 text-2xl leading-8 font-bold">
          SOFTWARE ENGINEERING
        </p>
        <div className="flex flex-wrap gap-2 mt-3.5">
          <OvalLabel bgColor="bg-[#0A56A8]">React</OvalLabel>
          <OvalLabel bgColor="bg-[#0A56A8]">SMTH</OvalLabel>
          <OvalLabel bgColor="bg-[#0A56A8]">OOP</OvalLabel>
          <OvalLabel bgColor="bg-[#0A56A8]">C++</OvalLabel>
          <OvalLabel bgColor="bg-[#0A56A8]">DATA BASE</OvalLabel>
          <OvalLabel bgColor="bg-[#0A56A8]">java script</OvalLabel>
        </div>
        <div className="flex flex-wrap gap-2 mt-3.5">
          <OvalLabel bgColor="bg-[#6C0AA8]">DAILY</OvalLabel>
          <OvalLabel bgColor="bg-[#6C0AA8]">Extramural studies</OvalLabel>
        </div>
        <div className="flex flex-wrap gap-2 mt-3.5">
          <OvalLabel bgColor="bg-[#A80A30]">Bachelor</OvalLabel>
          <OvalLabel bgColor="bg-[#A80A30]">Master</OvalLabel>
        </div>
      </div>
      <div className="text-[#717171] font-bold">Created by Jukovskiy O. M.</div>
    </div>
  );
}
