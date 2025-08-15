import clsx from "clsx";
import type { RenderSliderProps, SliderItemProps } from "./types";

function SliderItem({ className, sliderItem }: SliderItemProps) {
  return (
    <div
      className={clsx(
        "grow w-48 sm:w-68 h-28 sm:h-38 shadow-[0px_2px_8px_rgba(255,255,255,0.15)]",
        className
      )}
    >
      <img
        className="object-cover w-full h-full rounded-md"
        src={sliderItem.image}
        alt=""
      />
    </div>
  );
}

function RenderSlider({ className, sliderData }: RenderSliderProps) {
  return (
    <div className={clsx("flex gap-2 sm:gap-4", className)}>
      {sliderData.map((item) => (
        <SliderItem sliderItem={item} key={item.id} />
      ))}
      {sliderData.map((item) => (
        <SliderItem sliderItem={item} key={item.id} />
      ))}
    </div>
  );
}

export { RenderSlider };
