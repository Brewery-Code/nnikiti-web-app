import clsx from "clsx";
import type { RenderSliderProps, SliderItemProps } from "./types";

function SliderItem({ className, sliderItem }: SliderItemProps) {
  return (
    <div
      className={clsx(
        "h-28 w-48 grow shadow-[0px_2px_8px_rgba(255,255,255,0.15)] sm:h-38 sm:w-68",
        className
      )}
    >
      <img className="h-full w-full rounded-md object-cover" src={sliderItem.image} alt="" />
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
