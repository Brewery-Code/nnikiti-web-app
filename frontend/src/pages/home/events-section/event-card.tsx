import { useState } from "react";
import clsx from "clsx";
import { OvalLabel } from "@/shared/ui";
import bgImg from "./test-bg.jpeg";

export default function EventCard({ className }: { className?: string }) {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <div
      className={clsx(
        "relative flex cursor-pointer flex-col rounded-[10px] bg-cover bg-center bg-no-repeat p-4 shadow-[0px_0px_16px_0px_rgba(13,134,0,0.4)] transition-shadow duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0px_0px_16px_1px_rgba(13,134,0,0.8)]",
        "before:absolute before:inset-0 before:bg-[rgba(0,0,0,0.3)] before:transition-opacity before:duration-300 before:ease-in-out",
        isCardHovered ? "before:opacity-100" : "before:opacity-0",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.3)), url(${bgImg})`,
      }}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div className="flex">
        <OvalLabel className="z-10 w-auto" bgColor="bg-[rgba(13,134,0,0.8)]">
          News
        </OvalLabel>
      </div>

      <div className="mt-auto overflow-hidden">
        <div
          className={clsx(
            "transition-transform duration-400 ease-in-out",
            isCardHovered ? "translate-y-0" : "translate-y-22"
          )}
        >
          <h3 className="line-clamp-2 text-[28px] leading-8 font-bold">
            Somthing incredible hapends at this university so Lorem, ipsum dolor sit amet
            consectetur
          </h3>
          <p className="mt-2 line-clamp-4 text-base leading-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate officia, numquam
            facere itaque ea illum nam doloribus hic facilis magni ullam neque ducimus repellat
            tenetur eligendi provident ab non quidem? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Cupiditate officia, numquam facere itaque ea illum nam doloribus hic
            facilis magni ullam neque ducimus repellat tenetur eligendi provident ab non quidem?
          </p>
        </div>
      </div>
      <div className="z-10 mt-4 text-[14px] text-[#b9b9b9]">May 9, 2025</div>
    </div>
  );
}
