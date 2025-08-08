interface SliderData {
  id?: number;
  image?: string;
}

export interface RenderSliderProps {
  className?: string;
  sliderData: SliderData[];
}

export interface SliderItemProps {
  className?: string;
  sliderItem: SliderData;
}
