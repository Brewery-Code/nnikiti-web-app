import { publicRqClient } from "@/shared/api/instance";
import clsx from "clsx";
import styled, { css, keyframes } from "styled-components";
import { RenderSlider } from "./render-slider";

interface SliderProps {
  className?: string;
}

const sliderAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const SliderWrapper = styled.div<{ sliderLength: number }>`
  ${({ sliderLength }) => css`
    animation: ${sliderAnimation} ${sliderLength * 6}s linear infinite;
  `}
`;

export function Slider({ className }: SliderProps) {
  const sliderData =
    publicRqClient.useQuery("get", "/core/alumni-slider-items/").data ?? [];

  const half = Math.ceil(sliderData.length / 2);
  const firstSliderLine = sliderData.slice(0, half);
  const secondSliderLine = sliderData.slice(half);

  return (
    <div
      className={clsx(
        "relative overflow-hidden h-64 sm:h-86 -my-3 py-3",
        className
      )}
    >
      <SliderWrapper
        sliderLength={sliderData.length}
        className={clsx(`absolute flex flex-col gap-2 sm:gap-4`)}
      >
        <RenderSlider sliderData={firstSliderLine} />
        <RenderSlider
          className="-translate-x-34"
          sliderData={secondSliderLine}
        />
      </SliderWrapper>
    </div>
  );
}
