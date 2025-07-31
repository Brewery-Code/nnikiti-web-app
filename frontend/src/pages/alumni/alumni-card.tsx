import { OvalLabel, SocialLinkButtonGlassy } from "@/shared/ui";
import testImg from "./test.png";
import { useState } from "react";
import clsx from "clsx";

export function AlumniCard() {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <div
      className={clsx(
        "overflow-hidden relative flex flex-col items-center w-full max-w-80 h-90 p-8 bg-[linear-gradient(135deg,_rgba(72,72,72,0.7)_0%,_rgba(50,50,50,1)_50%,_rgba(72,72,72,0.7)_100%)] backdrop-blur-3xl rounded-2xl border-2 border-[rgba(100,100,100,0.5)] shadow-[2px_4px_12px_rgba(255,255,255,0.2)] cursor-pointer",
        "before:-z-10 before:absolute before:-inset-15 before:rotate-45 before:bg-[rgba(200,200,200,0.1)] before:transition-transform before:duration-1000",
        !isCardHovered
          ? "before:-translate-x-full before:-translate-y-full"
          : "before:translate-x-full before:translate-y-full"
      )}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <OvalLabel
        className="absolute top-6 right-6 text-gray-100 font-medium "
        bgColor="bg-[#902348]"
      >
        2022
      </OvalLabel>
      <div
        className={clsx(
          "relative max-w-32 p-1 border-2 border-gray-100 rounded-full transition-[translate,width]"
        )}
      >
        <img
          className="w-full h-full object-contain rounded-full"
          src={testImg}
          alt="alumni photo"
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <h2 className="text-xl font-bold">Pidr Pensionerskiy</h2>
        <span className="w-full h-0.5 bg-gray-400"></span>
        <h3 className="">Svarchik tretigo rosriada</h3>
      </div>
      <div className="relative">
        <p
          className={clsx(
            "overflow-hidden line-clamp-3 mt-4 indent-4 leading-5",
            "transition-transform duration-300",
            !isCardHovered ? "scale-100" : "scale-0"
          )}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis,
          facere debitis porro, ipsa obcaecati error doloremque quis ut eius
          asperiores deleniti harum tempore velit labore quasi doloribus, veniam
          voluptate? Esse?Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Libero at, id esse perferendis illum error similique facere
          eius, neque dolor sed quibusdam, dignissimos odit nulla necessitatibus
          possimus alias minima officia. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Provident incidunt sit ducimus maxime, recusandae
          delectus consequuntur repellat enim at nemo ipsa debitis similique
          odio aliquid placeat nulla reprehenderit! Perferendis, perspiciatis!
        </p>
        <button
          className={clsx(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-2 bg-white rounded-3xl text-black font-bold cursor-pointer",
            "transition-[scale,color,text,background-color] duration-300",
            "hover:bg-black hover:text-white",
            !isCardHovered ? "scale-0" : "scale-100"
          )}
        >
          Read more
        </button>
      </div>
      <span
        className="before:absolute before:-left-10 before:-bottom-4 before:opacity-40 before:bg-gray-500 before:w-24 before:h-12 before:rotate-45
            after:absolute after:-right-10 after:-bottom-4 after:opacity-40 after:bg-gray-500 after:w-24 after:h-12 after:-rotate-45"
      />
    </div>
  );
}
