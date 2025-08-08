import clsx from "clsx";
import type { RenderSliderProps, SliderItemProps } from "./types";

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
        src={sliderItem.image}
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

export { RenderSlider };
