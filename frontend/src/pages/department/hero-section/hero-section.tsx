import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { DustEffect } from "./dust-effect";
import c from "./img/c++.png";
import { SpecialtiesCard } from "@/shared/ui";

const blink = keyframes`
  50% { border-color: transparent; }
`;

function typing(length: number) {
  return keyframes`
  0% { width: 0; }
    1%, 99% { border-right: 1px solid orange; }
    100% { border-right: none; width: ${length}ch; }
  `;
}

const Department = styled.div<{ length: number }>`
  font-family: "Fira Code", monospace;
  animation: ${({ length }) => typing(length)} 2s
    steps(${({ length }) => length}, end) forwards;
`;

function textAppearance(length: number) {
  return keyframes`
    0% { background-position: 0 0; opacity: 0; width: 0; }
    1% { background-position: 0 0; opacity: 1; border-right: 1px solid orange; }
    50% { background-position: ${length / 3}px 0; opacity: 1; border-right: 1px solid orange; }
    100% { background-position: ${length}px 0; opacity: 1; border-right: 1px solid orange; width: ${length}px; }
  `;
}

const DepartmentName = styled.div<{ length: number; charCount: number }>`
  font-family: "Work Sans", sans-serif;
  animation:
    ${({ length }) => textAppearance(length)} 2s
      steps(${({ charCount }) => charCount}, end) 2s forwards,
    ${blink} 0.5s step-end infinite alternate;
`;

export function HeroSection() {
  const departmentName = useRef<HTMLDivElement>(null);
  const [departmentNameLength, setDepartmentNameLength] = useState(0);

  useEffect(() => {
    if (departmentName.current) {
      setDepartmentNameLength(departmentName.current.offsetWidth);
    }
  }, [departmentName]);

  return (
    <div className="relative  h-[calc(100dvh-64px)]">
      <DustEffect />
      <div className="flex flex-col justify-center w-full h-full pt-28">
        <Department
          length={"Department of".length}
          className="overflow-hidden mx-auto font-extrabold text-2xl whitespace-nowrap"
        >
          Department of
        </Department>
        <DepartmentName
          length={departmentNameLength}
          charCount={"Computer Engineering".length}
          className="overflow-hidden mx-auto bg-linear-to-r opacity-0 from-pink-500 to-violet-500 bg-clip-text
          text-8xl leading-30 text-transparent font-extrabold whitespace-nowrap"
          ref={departmentName}
        >
          Computer Engineering
        </DepartmentName>
        <div className="flex justify-center gap-16 mt-32">
          <SpecialtiesCard />
          <SpecialtiesCard />
          <SpecialtiesCard />
          <SpecialtiesCard />
        </div>
      </div>
    </div>
  );
}
