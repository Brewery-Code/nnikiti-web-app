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
import { useLoadNamespace } from "@/shared/hooks";
import { BlackAndWhiteButton, OvalLabel, Title } from "@/shared/ui";
import { PageTransition } from "@/widgets";
import { useTranslation } from "react-i18next";
import { loadTranslations } from "./locales";
import { AlumniCard } from "./alumni-card";
import clsx from "clsx";

const sliderAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const Slider = styled.div`
  animation: ${sliderAnimation} 120s linear infinite;
`;

const sliderData = [
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

const yearColor = [
  "#F42272",
  "#FFA500",
  "#63C132",
  "#89A6FB",
  "#1400cc",
  "#c49a02",
  "#FF57BB",
  "#7f03fc",
  "#c40202",
  "#6EFAFB",
];

const getColor = (year: number) => {
  const lastDigit = year % 10;
  const color = `bg-[${yearColor[lastDigit]}]`;
  return color;
};

const firstSlider = sliderData.slice(0, 12);
const secondSlider = sliderData.slice(12, 24);

function AlumniPage() {
  useLoadNamespace("graduates", loadTranslations);
  const { t } = useTranslation("graduates");

  return (
    <PageTransition className="pb-24" isPaddingOn={false}>
      <div className="relative overflow-hidden h-86 -my-3 py-3">
        <Slider className={clsx(`absolute flex flex-col gap-4`)}>
          <div className="flex gap-4">
            {firstSlider.map((item) => (
              <div className="grow min-w-68 h-38 shadow-[0px_2px_8px_rgba(255,255,255,0.15)]">
                <img
                  className="object-cover w-full h-full rounded-md "
                  src={item.img}
                  alt=""
                />
              </div>
            ))}
            {firstSlider.map((item) => (
              <div className="grow min-w-68 h-38 shadow-[0px_2px_8px_rgba(255,255,255,0.15)]">
                <img
                  className="object-cover w-full h-full rounded-md "
                  src={item.img}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            {secondSlider.map((item) => (
              <div className="grow min-w-68 h-38 -translate-x-34 shadow-[0px_2px_8px_rgba(255,255,255,0.15)]">
                <img
                  className="object-cover w-full h-full rounded-md "
                  src={item.img}
                  alt=""
                />
              </div>
            ))}
            {secondSlider.map((item) => (
              <div className="grow min-w-68 h-38 -translate-x-34 shadow-[0px_2px_8px_rgba(255,255,255,0.15)]">
                <img
                  className="object-cover w-full h-full rounded-md "
                  src={item.img}
                  alt=""
                />
              </div>
            ))}
          </div>
        </Slider>
      </div>
      <div className="container-base">
        <div className="mt-12 text-8xl font-bold text-center">
          НАШІ ВИПУСКНИКИ
        </div>
        <div className="flex flex-col gap-4 justify-center items-center mt-8">
          <p className="text-xl font-semibold">
            Випускник? Хочеш розповісти про себе? Заповнюй форму і ми додамо
            тебе до сторінки!
          </p>
          <BlackAndWhiteButton color="white">
            Заповнити форму
          </BlackAndWhiteButton>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-24">
          {Array.from({ length: 2024 - 2000 + 1 }, (_, i) => {
            const year = 2024 - i;
            return <BlackAndWhiteButton>{year}</BlackAndWhiteButton>;
          })}
        </div>
        <div className="relative before:absolute before:bottom-0 before:w-full before:h-0.5 before:bg-white">
          <Title className="mt-8">ВИПУСК 2024</Title>
        </div>
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
          <AlumniCard />
          <AlumniCard />
          <AlumniCard />
          <AlumniCard />
        </div>
        <div className="relative before:absolute before:bottom-0 before:w-full before:h-0.5 before:bg-white">
          <Title className="mt-8">ВИПУСК 2023</Title>
        </div>
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
          <AlumniCard />
          <AlumniCard />
          <AlumniCard />
          <AlumniCard />
        </div>
        <div className="relative before:absolute before:bottom-0 before:w-full before:h-0.5 before:bg-white">
          <Title className="mt-8">ВИПУСК 2022</Title>
        </div>
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
          <AlumniCard />
          <AlumniCard />
          <AlumniCard />
          <AlumniCard />
        </div>
      </div>
    </PageTransition>
  );
}

export const Component = AlumniPage;
