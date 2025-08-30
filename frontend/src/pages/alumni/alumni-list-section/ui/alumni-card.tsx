import { useRef, useState, type RefObject } from "react";
import clsx from "clsx";
import { OvalLabel, BlackAndWhiteButton } from "@/shared/ui";
import styled, { keyframes } from "styled-components";
import type { Alumni } from "../types";
import { AlumniModal } from "./alumni-modal";
import { useScrollDownAnimation } from "@/shared/hooks";
import { getYear } from "../alumni-list-section";

interface AlumniCardProps {
  className?: string;
  ref?: RefObject<HTMLDivElement | null>;
  alumni: Alumni;
  color: string;
}

const spin = keyframes`
    to {
      transform: rotate(360deg);
    }
  `;

const CardWrapper = styled.div<{ color: string }>`
  &::after {
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ color }) => color} 50%,
      transparent 100%
    );
    animation: ${spin} 8s linear infinite;
  }
`;

export function AlumniCard({ alumni, color, className }: AlumniCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollDownAnimation({ elementRef: cardRef });

  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  function toggleModal() {
    setIsDescriptionOpen((prev) => !prev);
  }

  return (
    <CardWrapper
      ref={cardRef}
      color={color}
      className={clsx(
        className,
        "relative min-h-104 w-full max-w-90 cursor-pointer overflow-hidden rounded-2xl p-0.5 transition duration-600 before:absolute before:-inset-15 before:-z-1 before:rotate-45 before:bg-[linear-gradient(90deg,_transparent_0%,_rgba(200,200,200,0.4)_50%,_transparent_100%)] before:transition-transform before:duration-1000 after:absolute after:top-1/2 after:left-1/2 after:-z-10 after:h-[160%] after:w-4/6 after:-translate-x-1/2 after:-translate-y-1/2",
        isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0",
        !isCardHovered
          ? "before:-translate-x-full before:-translate-y-full"
          : "before:translate-x-full before:translate-y-full"
      )}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div
        className="flex h-full w-full flex-col items-center rounded-2xl bg-[radial-gradient(circle,_rgba(21,21,21,1)_0%,_rgba(21,21,21,0.80)_50%,_rgba(21,21,21,1)_100%)] px-6 pt-8 pb-6 shadow-[0px_0px_12px_rgba(255,255,255,0.3)] backdrop-blur-3xl"
        onClick={toggleModal}
      >
        <OvalLabel
          className="absolute top-6 right-6 font-medium text-gray-100"
          style={{ background: color }}
        >
          {getYear(alumni.date_of_graduation)}
        </OvalLabel>
        <div className="relative max-h-32 max-w-32 overflow-hidden rounded-full border-2 border-gray-100 transition-[translate,width]">
          <img
            className="h-full w-full overflow-hidden rounded-full object-contain"
            src={alumni.image}
            alt="alumni photo"
          />
        </div>
        <div className="mt-2 flex flex-col items-center gap-1">
          <h2 className="text-center text-xl font-bold">{alumni.full_name}</h2>
          <span className="h-0.5 w-full bg-gray-400"></span>
          <div className="line-clamp-1 text-center leading-5 font-medium">
            {alumni.workplace}, {alumni.position}
          </div>
        </div>
        <div className="mt-3 flex h-14 flex-wrap items-start justify-center gap-2">
          <OvalLabel bgColor="bg-[#0A56A8]">{alumni.major}</OvalLabel>
          <OvalLabel bgColor="bg-[#A80A30]">{alumni.degree}</OvalLabel>
        </div>
        <p className={clsx("mt-3 line-clamp-3 overflow-hidden indent-4 leading-5 text-gray-300")}>
          {alumni.text}
        </p>
        <div className="pt-6">
          <BlackAndWhiteButton
            className="mt-auto h-7"
            color="white"
            size="s"
            isHovered={isCardHovered}
          >
            Read more
          </BlackAndWhiteButton>
        </div>
        <AlumniModal isOpen={isDescriptionOpen} toggleModal={toggleModal} alumni={alumni} />
      </div>
    </CardWrapper>
  );
}
