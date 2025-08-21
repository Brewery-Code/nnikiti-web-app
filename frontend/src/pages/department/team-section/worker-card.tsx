import { useState } from "react";
import workerPhoto from "./worker-photo.jpg";
import clsx from "clsx";

export function WorkerCard() {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden flex flex-col items-center gap-4 w-full max-w-60 p-8 bg-cover bg-center
      rounded-3xl cursor-pointer
      shadow-[2px_3px_10px_rgba(255,255,255,0.2)]"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <img
        className={clsx(
          "absolute inset-0 w-full h-full object-cover grayscale-100",
          "transition-[scale,filter] duration-500",
          !isCardHovered ? "blur-sm" : "scale-110 blur-md"
        )}
        src={workerPhoto}
        alt=""
      />
      <div className="w-32 h-32 border-4 rounded-full">
        <img
          className="relative w-full h-full object-cover border-2 border-amber-50 rounded-full"
          src={workerPhoto}
          alt=""
        />
      </div>
      <div className="relative text-2xl font-semibold">African Kid</div>
      <ul className="relative">
        <li>Cool boy</li>
      </ul>
    </div>
  );
}
