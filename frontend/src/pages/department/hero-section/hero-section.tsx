import styled, { keyframes } from "styled-components";

const typing = keyframes`
  0% { width: 0; }
  1%, 99% { border-right: 1px solid orange; }
  100% { border-right: none; }
`;

const shrinkAnimation = keyframes`
  0% { background-position: 0 0; opacity: 0; width: 0; }
  1% { background-position: 0 0; opacity: 1; border-right: 1px solid orange; }
  50% { background-position: 150px 0; opacity: 1; border-right: 1px solid orange; }
  100% { background-position: 400px 0; opacity: 1; border-right: 1px solid orange; }
`;

const blink = keyframes`
  50% { border-color: transparent; }
`;

const TypingText = styled.h1`
  font-family: "Fira Code", monospace;
  font-weight: 800;
  font-size: 20px;
  margin: 0 0 0 35%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  width: 170px;
  animation: ${typing} 2s steps(40, end) forwards;
`;

// Styled component for second h1 (gradient text)
const GradientText = styled.h1`
  font-family: "Work Sans", sans-serif;
  font-weight: 800;
  font-size: 100px;
  width: 430px;
  height: 100px;
  margin: 0 auto;
  background: linear-gradient(to right, #f8b195, #f67280, #c06c84);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  overflow: hidden;
  animation:
    ${shrinkAnimation} 2.2s steps(40, end) 2s forwards,
    ${blink} 0.5s step-end infinite alternate;
`;
export function HeroSection() {
  return (
    <div className="h-dvh w-full text-center mt-24">
      <TypingText className="flex justify-center items-center">
        Hello
      </TypingText>
      <GradientText className="flex justify-center items-center">
        World
      </GradientText>
    </div>
  );
}
