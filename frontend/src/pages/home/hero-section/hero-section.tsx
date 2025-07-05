import { useEffect, useState } from "react";
import clsx from "clsx";
import { publicRqClient } from "@/shared/api/instance";
import { NavigationButton } from "./ui";
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
    <section
      className={clsx(
        "relative w-full h-[calc(100dvh-64px)] bg-cover bg-center bg-no-repeat",
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
      <div className="container-base flex flex-col align-center gap-0 h-full">
        <div className="z-10 mt-[6dvh]">
          <h1 className="text-4xl md:text-7xl xl:text-8xl  font-bold -tracking-tighter">
            EVERY GIANT LEAP STARTS WITH ONE SMALL STEP
          </h1>
          <h2 className="mt-4 text-base md:text-2xl leading-6 font-bold tracking-[0.12em]">
            EVERY GIANT LEAP STARTS WITH ONE SMALL STEP EVERY{" "}
          </h2>
        </div>
        <div className="grid grid-cols-2 justify-items-center gap-2 md:flex justify-between mt-auto">
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
        <Arrow className="mx-auto mb-6 mt-20 animate-bounce" />
      </div>
    </section>
  );
}
