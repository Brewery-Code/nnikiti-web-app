"use client";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { DustEffect, NavButton } from "./ui";

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

function textAppearance(length: number) {
  return keyframes`
    0% { background-position: 0 0; opacity: 0; width: 0; }
    1% { background-position: 0 0; opacity: 1; border-right: 1px solid orange; }
    50% { background-position: ${length / 3}px 0; opacity: 1; border-right: 1px solid orange; }
    100% { background-position: ${length}px 0; opacity: 1; border-right: 1px solid orange; width: ${length}px; }
  `;
}

function blockAppearance() {
  return keyframes`
    0% { transform: translateY(50px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  `;
}

const DepartmentLabel = styled.div<{ length: number }>`
  font-family: "Fira Code", monospace;
  animation: ${({ length }) => typing(length)} 2s steps(${({ length }) => length}, end) forwards;
`;

const DepartmentName = styled.div<{ length: number; charCount: number }>`
  font-family: "Work Sans", sans-serif;
  animation:
    ${({ length }) => textAppearance(length)} 2s steps(${({ charCount }) => charCount}, end) 2s
      forwards,
    ${blink} 0.5s step-end infinite alternate;
`;

const DepartmentDescription = styled.p`
  animation: ${blockAppearance} 1s ease forwards 4s;
`;

const NavigationBlock = styled.div`
  animation: ${blockAppearance} 1s ease forwards 4.5s;
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
    <div className="relative h-[calc(100dvh-64px)] bg-black before:absolute before:top-full before:h-32 before:w-full before:bg-linear-180 before:from-black before:to-transparent">
      <DustEffect />
      <div className="w-ful relative flex h-full flex-col pt-32">
        <div className="flex flex-col">
          <DepartmentLabel
            length={"Department of".length}
            className="leading mx-auto overflow-hidden text-2xl font-extrabold whitespace-nowrap"
          >
            Department of
          </DepartmentLabel>
          <DepartmentName
            length={departmentNameLength}
            charCount={"Computer Engineering".length}
            className="mx-auto overflow-hidden bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-8xl leading-30 font-extrabold whitespace-nowrap text-transparent opacity-0"
            ref={departmentName}
          >
            Computer Engineering
          </DepartmentName>
          <DepartmentDescription className="mx-auto mt-8 w-256 text-center font-mono text-xl opacity-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed saepe ipsum praesentium
            cupiditate molestias nihil commodi perferendis recusandae eius necessitatibus veniam,
            excepturi beatae repudiandae at, minus atque facilis dolores quam?
          </DepartmentDescription>
        </div>
        <NavigationBlock className="flex h-full items-center justify-center gap-12 opacity-0">
          <NavButton className="basis-50" active={false}>
            Contacts
          </NavButton>
          <NavButton className="basis-50" active={false}>
            History
          </NavButton>
          <NavButton className="basis-50" active={true}>
            Main
          </NavButton>
          <NavButton className="basis-50" active={false}>
            Since
          </NavButton>
          <NavButton className="basis-50" active={false}>
            Graduate
          </NavButton>
        </NavigationBlock>
      </div>
    </div>
  );
}
