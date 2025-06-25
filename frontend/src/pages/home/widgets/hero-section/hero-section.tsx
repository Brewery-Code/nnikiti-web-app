import { rqClient } from "@/shared/api/instance";
import NavigationButton from "./ui/navigation-button";
import studentImg from "./icons/student.svg";
import { useEffect, useState } from "react";
import clsx from "clsx";

const navigationButtons = [
  {
    img: studentImg,
    mainTitle: "Student",
    subTitle: "Secondary Title",
    description: "Description for student",
  },
  {
    img: studentImg,
    mainTitle: "Teacher",
    subTitle: "Secondary Title",
    description: "Description for teacher",
  },
  {
    img: studentImg,
    mainTitle: "Parent",
    subTitle: "Secondary Title",
    description: "Description for parent",
  },
  {
    img: studentImg,
    mainTitle: "Guest",
    subTitle: "Secondary Title",
    description: "Description for guest",
  },
];

export default function HeroSection() {
  const sliderImg = rqClient.useQuery("get", "/core/main-slider-item/");
  const [currentImg, setCurrentImg] = useState(0);
  const [nextImg, setNextImg] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!sliderImg.data || sliderImg.data.length === 0) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImg((prev) =>
          prev + 1 < sliderImg.data.length ? prev + 1 : 0
        );
        setIsTransitioning(false);
      }, 1000);
      setNextImg((prev) => (prev + 1 < sliderImg.data.length ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderImg.data]);

  return (
    <div
      className="relative w-full h-[calc(100dvh-80px)] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,1) 100%),
          url(${sliderImg.data?.[currentImg]?.image})
          `,
      }}
    >
      <div
        className={clsx(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
          isTransitioning ? "opacity-100" : "opacity-0"
        )}
        style={{
          backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,1) 100%),
          url(${sliderImg.data?.[nextImg]?.image})
          `,
        }}
      ></div>
      <div className="container-base flex flex-col justify-between h-full">
        <div className="z-10 mt-[6dvh]">
          <h1 className="text-4xl md:text-7xl xl:text-8xl  font-bold -tracking-tighter">
            EVERY GIANT LEAP STARTS WITH ONE SMALL STEP
          </h1>
          <h2 className="mt-4 text-base md:text-2xl leading-6 font-bold tracking-[0.12em]">
            EVERY GIANT LEAP STARTS WITH ONE SMALL STEP EVERY{" "}
          </h2>
        </div>
        <div className="grid grid-cols-2 justify-items-center gap-y-6 md:flex justify-between mb-[10dvh]">
          {navigationButtons.map((btn, idx) => (
            <NavigationButton
              key={idx}
              img={btn.img}
              title={btn.mainTitle}
              subtitle={btn.subTitle}
              description={btn.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
