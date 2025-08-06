import clsx from "clsx";
import img1 from "./imgs/1.jpg";
import img2 from "./imgs/2.jpg";
import img3 from "./imgs/3.jpg";
import img4 from "./imgs/4.jpg";
import img5 from "./imgs/5.jpg";
import img6 from "./imgs/6.jpg";
import img7 from "./imgs/7.jpg";
import img8 from "./imgs/8.jpg";
import img9 from "./imgs/9.jpg";
import img10 from "./imgs/10.jpg";
import img11 from "./imgs/11.jpg";
import img12 from "./imgs/12.jpg";
import img13 from "./imgs/13.jpg";
import img14 from "./imgs/14.jpg";
import img15 from "./imgs/15.jpg";
import img16 from "./imgs/16.jpg";
import img17 from "./imgs/17.jpg";
import img18 from "./imgs/18.jpg";
import img19 from "./imgs/19.jpg";
import img20 from "./imgs/20.jpg";
import img21 from "./imgs/21.jpg";
import img22 from "./imgs/22.jpg";
import img23 from "./imgs/23.jpg";
import img24 from "./imgs/24.jpg";
import styled, { keyframes } from "styled-components";

interface SliderData {
  id: number;
  img: string;
}

interface RenderSliderProps {
  className?: string;
  sliderData: SliderData[];
}

interface SliderItemProps {
  className?: string;
  sliderItem: SliderData;
}

const sliderData: SliderData[] = [
  { id: 0, img: img1 },
  { id: 1, img: img2 },
  { id: 2, img: img3 },
  { id: 3, img: img4 },
  { id: 4, img: img5 },
  { id: 5, img: img6 },
  { id: 6, img: img7 },
  { id: 7, img: img8 },
  { id: 8, img: img9 },
  { id: 9, img: img10 },
  { id: 10, img: img11 },
  { id: 11, img: img12 },
  { id: 12, img: img13 },
  { id: 13, img: img14 },
  { id: 14, img: img15 },
  { id: 15, img: img16 },
  { id: 16, img: img17 },
  { id: 17, img: img18 },
  { id: 18, img: img19 },
  { id: 19, img: img20 },
  { id: 20, img: img21 },
  { id: 21, img: img22 },
  { id: 22, img: img23 },
  { id: 23, img: img24 },
];

const firstSlider = sliderData.slice(0, 12);
const secondSlider = sliderData.slice(12, 24);

const sliderAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const SliderWrapper = styled.div`
  animation: ${sliderAnimation} ${sliderData.length * 6}s linear infinite;
`;

function SliderItem({ className, sliderItem }: SliderItemProps) {
  return (
    <div
      className={clsx(
        "grow min-w-68 h-38 shadow-[0px_2px_8px_rgba(255,255,255,0.15)]",
        className
      )}
    >
      <img
        className="object-cover w-full h-full rounded-md"
        src={sliderItem.img}
        alt=""
      />
    </div>
  );
}

function RenderSlider({ className, sliderData }: RenderSliderProps) {
  return (
    <div className={clsx("flex gap-4", className)}>
      {sliderData.map((item) => (
        <SliderItem sliderItem={item} />
      ))}
      {sliderData.map((item) => (
        <SliderItem sliderItem={item} />
      ))}
    </div>
  );
}

export function Slider() {
  return (
    <div className="relative overflow-hidden h-86 -my-3 py-3">
      <SliderWrapper className={clsx(`absolute flex flex-col gap-4`)}>
        <RenderSlider sliderData={firstSlider} />
        <RenderSlider className="-translate-x-34" sliderData={secondSlider} />
      </SliderWrapper>
    </div>
  );
}
