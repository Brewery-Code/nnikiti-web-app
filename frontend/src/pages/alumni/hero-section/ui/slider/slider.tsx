import { publicRqClient } from "@/shared/api/instance";
import clsx from "clsx";
import styled, { css, keyframes } from "styled-components";
import { RenderSlider } from "./render-slider";

const FALLBACK_SLIDER_ITEMS = [
  { id: 0, image: "/images/students-guitar.jpg" },
  { id: 1, image: "/images/students-christmas.jpg" },
  { id: 2, image: "/images/students-stage.jpg" },
  { id: 3, image: "/images/students-event.jpg" },
  { id: 4, image: "/images/students-tennis.jpg" },
  { id: 5, image: "/images/noosphere-workshop.jpg" },
  { id: 6, image: "/images/vodnik-mascot.jpg" },
  { id: 7, image: "/images/halloween-event.jpg" },
  { id: 8, image: "/images/students-hall.jpg" },
  { id: 9, image: "/images/students-lecture.jpg" },
  { id: 10, image: "/images/students-workshop.jpg" },
  { id: 11, image: "/images/students-sport.jpg" },
];

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

const SliderWrapper = styled.div<{ $sliderLength: number }>`
  ${({ $sliderLength }) => css`
    animation: ${sliderAnimation} ${$sliderLength * 6}s linear infinite;
  `}
`;

export function Slider({ className }: SliderProps) {
  const rawSlider = publicRqClient.useQuery("get", "/core/alumni-slider-items/").data;
  const sliderData = rawSlider?.length ? rawSlider : FALLBACK_SLIDER_ITEMS;

  const half = Math.ceil(sliderData.length / 2);
  const firstSliderLine = sliderData.slice(0, half);
  const secondSliderLine = sliderData.slice(half);

  return (
    <div className={clsx("relative -my-3 h-64 overflow-hidden py-3 sm:h-86", className)}>
      <SliderWrapper
        $sliderLength={sliderData.length}
        className="absolute flex flex-col gap-2 sm:gap-4"
      >
        <RenderSlider sliderData={firstSliderLine} />
        <RenderSlider className="-translate-x-34" sliderData={secondSliderLine} />
      </SliderWrapper>
    </div>
  );
}
