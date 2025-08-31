import gradient from "./card-gradient.module.css";
import OvalLabel from "../oval-label";
import clsx from "clsx";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../fade-in-animation";

export function SpecialtiesCard({ className }: { className?: string }) {
  return (
    <motion.div
      className={clsx(
        "relative flex h-[370px] w-72 cursor-pointer flex-col justify-between rounded-lg p-6 text-white",
        gradient.gradient,
        className
      )}
      {...fadeInAnimation}
      key={window.location.pathname}
    >
      <div>
        <div>
          <span className="font-bold text-[#717171]">Code:</span>
          <span className="ml-2 font-semibold">121</span>
        </div>
        <p className="mt-3.5 text-2xl leading-8 font-bold">SOFTWARE ENGINEERING</p>
        <div className="mt-3.5 flex flex-wrap gap-2">
          <OvalLabel bgColor="bg-[#0A56A8]">React</OvalLabel>
          <OvalLabel bgColor="bg-[#0A56A8]">SMTH</OvalLabel>
          <OvalLabel bgColor="bg-[#0A56A8]">OOP</OvalLabel>
          <OvalLabel bgColor="bg-[#0A56A8]">C++</OvalLabel>
          <OvalLabel bgColor="bg-[#0A56A8]">DATA BASE</OvalLabel>
          <OvalLabel bgColor="bg-[#0A56A8]">java script</OvalLabel>
        </div>
        <div className="mt-3.5 flex flex-wrap gap-2">
          <OvalLabel bgColor="bg-[#6C0AA8]">DAILY</OvalLabel>
          <OvalLabel bgColor="bg-[#6C0AA8]">Extramural studies</OvalLabel>
        </div>
        <div className="mt-3.5 flex flex-wrap gap-2">
          <OvalLabel bgColor="bg-[#A80A30]">Bachelor</OvalLabel>
          <OvalLabel bgColor="bg-[#A80A30]">Master</OvalLabel>
        </div>
      </div>
      <div className="font-bold text-[#717171]">Created by Jukovskiy O. M.</div>
    </motion.div>
  );
}
