import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { DustEffect } from "./dust-effect";
import { motion } from "framer-motion";

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
    <div
      className="relative h-[calc(100dvh-64px)] bg-black 
      before:absolute before:top-full before:w-full before:h-32 before:bg-linear-180 before:from-black
      before:to-transparent"
    >
      <DustEffect />
      <div className="relative flex flex-col w-full h-full pt-28">
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
        <motion.p
          className="w-256 mt-8 mx-auto text-xl font-mono text-center"
          initial={{
            y: 50,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 4,
            duration: 0.5,
            repeatType: "loop",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed saepe
          ipsum praesentium cupiditate molestias nihil commodi perferendis
          recusandae eius necessitatibus veniam, excepturi beatae repudiandae
          at, minus atque facilis dolores quam?
        </motion.p>
        <div className="container-base relative flex flex-col justify-center items-center gap-16 mt-32">
          <p
            className="absolute -z-0 left-1/2 scale-75 w-128 p-4 bg-[rgba(140,140,140,0.1)] rounded-md
            backdrop-blur-xs text-xl font-mono"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
            doloribus illum veritatis earum, velit tempora cupiditate cum itaque
            dolorem molestiae ipsa fuga, adipisci nisi vero dolorum, inventore
            facere impedit deleniti?
          </p>
          <p
            className="relative z-10 w-128 p-4 bg-[rgba(50,50,50,0.5)] rounded-md backdrop-blur-xs text-xl
            font-mono"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
            doloribus illum veritatis earum, velit tempora cupiditate cum itaque
            dolorem molestiae ipsa fuga, adipisci nisi vero dolorum, inventore
            facere impedit deleniti?
          </p>
          <p
            className="absolute z-0 right-1/2 scale-75 w-128 p-4 bg-[rgba(140,140,140,0.1)] rounded-md 
            backdrop-blur-xs text-xl font-mono"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
            doloribus illum veritatis earum, velit tempora cupiditate cum itaque
            dolorem molestiae ipsa fuga, adipisci nisi vero dolorum, inventore
            facere impedit deleniti?
          </p>
        </div>
      </div>
    </div>
  );
}
