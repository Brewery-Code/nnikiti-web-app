import { useState } from "react";
import workerPhoto from "./worker-photo.jpg";
import CupSvg from "./cup.svg?react";
import clsx from "clsx";

export function WorkerCard() {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    // <div
    //   className="relative overflow-hidden flex flex-col items-center gap-4 w-full max-w-60 p-8 bg-cover bg-center
    //   rounded-3xl cursor-pointer
    //   shadow-[2px_3px_10px_rgba(255,255,255,0.2)]"
    //   onMouseEnter={() => setIsCardHovered(true)}
    //   onMouseLeave={() => setIsCardHovered(false)}
    // >
    //   <img
    //     className={clsx(
    //       "absolute inset-0 w-full h-full object-cover grayscale-100",
    //       "transition-[scale,filter] duration-500",
    //       !isCardHovered ? "blur-sm" : "scale-110 blur-md"
    //     )}
    //     src={workerPhoto}
    //     alt=""
    //   />
    //   <div className="w-32 h-32 border-4 rounded-full">
    //     <img
    //       className="relative w-full h-full object-cover border-2 border-amber-50 rounded-full"
    //       src={workerPhoto}
    //       alt=""
    //     />
    //   </div>
    //   <div className="relative text-2xl font-semibold">African Kid</div>
    //   <ul className="relative">
    //     <li className="flex justify-center items-center gap-2">
    //       <CupSvg className="w-6 h-6"></CupSvg>
    //       <div className="text-md font-medium">Cool boy</div>
    //     </li>
    //   </ul>
    // </div>
    <div className="relative flex flex-col h-[calc(100%-56px)] px-8 pb-4 bg-[#1f1e1e] rounded-2xl">
      <div className="relative -top-14">
        <div
          className="overflow-hidden flex justify-center items-center max-w-48 w-full max-h-48 h-full 
        rounded-full border-8"
        >
          <img className="w-full h-full object-cover" src={workerPhoto} />
        </div>
        <div className="text-2xl text-center font-bold">Worker Name</div>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
