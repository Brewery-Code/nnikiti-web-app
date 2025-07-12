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

export default function HeroSection({
  className = "",
}: {
  className?: string;
}) {
  const sliderImg = publicRqClient.useQuery("get", "/core/main-slider-item/");
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
        setCurrentImg((prev) =>
          prev + 1 < sliderImg.data.length ? prev + 1 : 0
        );
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
        "fade-out-animation relative h-[calc(100dvh-64px)] bg-cover bg-center bg-no-repeat",
        "before:absolute before:-top-16 before:w-full before:h-16 before:bg-black",
        "after:absolute after:-bottom-32 after:w-full after:h-32 after:bg-gradient-to-b after:from-black after:to-transparent",
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
      <div className="container-base flex flex-col justify-between items-center gap-0 h-full">
        <div className="flex flex-col items-center z-10 mt-16">
          <h1 className="text-4xl md:text-7xl xl:text-8xl  font-bold -tracking-tighter text-center">
            EVERY GIANT LEAP STARTS WITH ONE SMALL STEP
          </h1>
          <h2 className="mt-4 text-base md:text-2xl leading-6 font-bold tracking-[0.12em] text-center">
            EVERY GIANT LEAP STARTS WITH ONE SMALL STEP EVERY{" "}
          </h2>
        </div>
        <SearchBar className={"flex justify-center mt-0"} />

        <div className="flex gap-2 justify-center"></div>
        <Arrow className="mx-auto mb-6 mt-32 animate-bounce" />
      </div>
    </section>
  );
}
