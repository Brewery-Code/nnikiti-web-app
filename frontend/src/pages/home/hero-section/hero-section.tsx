import { useEffect, useState } from "react";
import clsx from "clsx";
import { publicRqClient } from "@/shared/api/instance";
import { SearchBar } from "./ui";
import { Arrow, student } from "./icons";

const navigationButtons = [
  {
    img: student,
    mainTitle: "Student",
    subTitle: "Secondary Title",
    description: "Description for student",
  },
  {
    img: student,
    mainTitle: "Teacher",
    subTitle: "Secondary Title",
    description: "Description for teacher",
  },
  {
    img: student,
    mainTitle: "Parent",
    subTitle: "Secondary Title",
    description: "Description for parent",
  },
  {
    img: student,
    mainTitle: "Guest",
    subTitle: "Secondary Title",
    description: "Description for guest",
  },
];

export default function HeroSection({ className = "" }: { className?: string }) {
  const sliderImg = publicRqClient.useQuery("get", "/core/main-slider-items/");
  const [currentImg, setCurrentImg] = useState(0);
  const [nextImg, setNextImg] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!sliderImg.data || sliderImg.data.length === 0) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const runSlider = () => {
      setIsTransitioning(true);
      setNextImg((prev) => (prev + 1 < sliderImg.data.length ? prev + 1 : 0));

      timeoutId = setTimeout(() => {
        setCurrentImg((prev) => (prev + 1 < sliderImg.data.length ? prev + 1 : 0));
        setIsTransitioning(false);

        timeoutId = setTimeout(runSlider, 4000);
      }, 1000);
    };

    timeoutId = setTimeout(runSlider, 5000);

    return () => clearTimeout(timeoutId);
  }, [sliderImg.data]);

  return (
    <section
      className={clsx(
        "relative h-[calc(100dvh-64px)] bg-cover bg-center bg-no-repeat",
        "before:absolute before:-top-16 before:h-16 before:w-full before:bg-black",
        "after:absolute after:-bottom-32 after:h-32 after:w-full after:bg-gradient-to-b after:from-black after:to-transparent",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 2%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,1) 100%),
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
          linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 2%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,1) 100%),
          url(${sliderImg.data?.[nextImg]?.image})
          `,
        }}
      />
      <div className="container-base flex h-full flex-col items-center justify-between gap-0">
        <div className="z-10 mt-16 flex flex-col items-center">
          <h1 className="text-center text-4xl font-bold -tracking-tighter md:text-7xl xl:text-8xl">
            EVERY GIANT LEAP STARTS WITH ONE SMALL STEP
          </h1>
          <h2 className="mt-4 text-center text-base leading-6 font-bold tracking-[0.12em] md:text-2xl">
            EVERY GIANT LEAP STARTS WITH ONE SMALL STEP EVERY{" "}
          </h2>
        </div>
        <SearchBar className={"mt-0 flex justify-center"} />

        <div className="flex justify-center gap-2"></div>
        <Arrow className="mx-auto mt-32 mb-6 animate-bounce" />
      </div>
    </section>
  );
}
