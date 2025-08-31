import { useMemo } from "react";
import styled, { keyframes } from "styled-components";

const dustAnimation = keyframes`
  0% {
    transform: translateY(1000px) scale(1);
    opacity: 0;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
`;

const Dust = styled.span<{
  diameter: number;
  startX: number;
  duration: number;
  delay: number;
  scale: number;
}>`
  width: ${(props) => props.diameter}px;
  height: ${(props) => props.diameter}px;
  left: ${(props) => props.startX}%;
  transform: scale(${(props) => props.scale});
  animation: ${dustAnimation} ${(props) => props.duration}s linear infinite;
  animation-delay: ${(props) => props.delay}s;
`;

export function DustEffect() {
  const total = 40;

  const particles = useMemo(
    () =>
      Array.from({ length: total }).map(() => ({
        diameter: Math.round(Math.random() * 50 + 2) / 10,
        startX: Math.round(Math.random() * 1000) / 10 - 1,
        duration: Math.round((Math.random() * 2 + 10) * 10) / 10,
        delay: Math.round(Math.random() * 100) / 10,
        scale: Math.round((Math.random() * 2 + 1) * 10) / 10,
      })),
    [total]
  );

  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full">
      {particles.map((p, i) => (
        <Dust
          className="absolute rounded-full bg-white opacity-0"
          key={i}
          diameter={p.diameter}
          startX={p.startX}
          duration={p.duration}
          delay={p.delay}
          scale={p.scale}
        />
      ))}
    </div>
  );
}
