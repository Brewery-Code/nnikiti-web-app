import { useState } from "react";
import clsx from "clsx";
import { OvalLabel, BlackAndWhiteButton } from "@/shared/ui";
import styles from "./alumni-card.module.css";
import testImg from "./test.png";
import { AlumniModal } from "./alumni-modal";
import { type Alumni } from "./types";

interface AlumniCardProps {
  alumni: Alumni;
  color: string;
}

export function AlumniCard({ alumni, color }: AlumniCardProps) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const toggleModal = () => {
    setIsDescriptionOpen((prev) => !prev);
  };

  return (
    <div
      className={clsx(
        styles.cardWrapper,
        "overflow-hidden relative w-full max-w-90 min-h-104 p-0.5 cursor-pointer rounded-2xl",
        "before:-z-1 before:absolute before:-inset-15 before:rotate-45 before:bg-[linear-gradient(90deg,_transparent_0%,_rgba(200,200,200,0.4)_50%,_transparent_100%)]",
        "before:transition-transform before:duration-1000",
        !isCardHovered
          ? "before:-translate-x-full before:-translate-y-full"
          : "before:translate-x-full before:translate-y-full",
        "after:-z-10 after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2",
        "after:w-4/6 after:h-[160%]"
      )}
      style={{
        ["--after-gradient" as any]: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
      }}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div
        className="flex flex-col items-center w-full h-full px-6 pt-8 pb-6 bg-[radial-gradient(circle,_rgba(21,21,21,1)_0%,_rgba(21,21,21,0.80)_50%,_rgba(21,21,21,1)_100%)] 
        backdrop-blur-3xl rounded-2xl shadow-[0px_0px_12px_rgba(255,255,255,0.3)]"
        onClick={toggleModal}
      >
        <OvalLabel
          className="absolute top-6 right-6 text-gray-100 font-medium "
          style={{ background: color }}
        >
          {alumni.date_of_graduation}
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
        <div className="flex flex-col items-center gap-1 mt-2">
          <h2 className="text-xl font-bold">{alumni.full_name}</h2>
          <span className="w-full h-0.5 bg-gray-400"></span>
          <div className="line-clamp-1 text-center font-medium leading-5">
            {alumni.workplace}, {alumni.position}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          <OvalLabel bgColor="bg-[#0A56A8]">{alumni.major}</OvalLabel>
          <OvalLabel className="w-auto" bgColor="bg-[#A80A30]">
            {alumni.degree}
          </OvalLabel>
        </div>
        <p
          className={clsx(
            "overflow-hidden mt-3 line-clamp-3 text-gray-300 indent-4 leading-5"
          )}
        >
          {alumni.text}
        </p>
        <div className="pt-6">
          <BlackAndWhiteButton
            className="h-7 mt-auto"
            color="white"
            size="s"
            isHovered={isCardHovered}
          >
            Read more
          </BlackAndWhiteButton>
        </div>
        <AlumniModal isOpen={isDescriptionOpen} toggleModal={toggleModal} />
      </div>
    </div>
  );
}
