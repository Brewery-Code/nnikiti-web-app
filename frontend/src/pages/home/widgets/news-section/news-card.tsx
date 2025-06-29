import { OvalLabel } from "@/shared/ui";
import bgImg from "./test-bg.jpeg";
import { useState } from "react";
import clsx from "clsx";
export default function NewsCard({ className }: { className?: string }) {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <div
      className={clsx(
        "relative flex flex-col  p-4 bg-cover bg-center bg-no-repeat rounded-[10px] shadow-[0px_0px_16px_0px_rgba(13,134,0,0.4)] cursor-pointer hover:shadow-[0px_0px_16px_1px_rgba(13,134,0,0.8)] transition-shadow duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] before:absolute before:inset-0 before:bg-[rgba(0,0,0,0.3)] before:transition-opacity before:duration-300 before:ease-in-out",
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
        <OvalLabel className="w-auto" bgColor="bg-[rgba(13,134,0,0.8)]">
          News
        </OvalLabel>
      </div>

      <div className="overflow-hidden mt-auto">
        <div
          className={clsx(
            "transition-transform duration-400 ease-in-out",
            isCardHovered ? "translate-y-0" : "translate-y-22"
          )}
        >
          <h3 className="text-[28px] leading-8 font-bold line-clamp-2">
            Somthing incredible hapends at this university so Lorem, ipsum dolor
            sit amet consectetur
          </h3>
          <p className="mt-2  text-base leading-5 line-clamp-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            officia, numquam facere itaque ea illum nam doloribus hic facilis
            magni ullam neque ducimus repellat tenetur eligendi provident ab non
            quidem? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Cupiditate officia, numquam facere itaque ea illum nam doloribus hic
            facilis magni ullam neque ducimus repellat tenetur eligendi
            provident ab non quidem?
          </p>
        </div>
      </div>
      <div className="mt-4 text-[#b9b9b9] text-[14px]">May 9, 2025</div>
    </div>
  );
}
