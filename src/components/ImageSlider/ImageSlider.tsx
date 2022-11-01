import { useState } from "react";
import { ImageSliderControls } from "./ImageSliderControls";
import { ImageSliderIndicators } from "./ImageSliderIndicators";
import { SliderItem } from "./SliderItem";

interface ImageSliderProps {
  images: string[];
}

export const ImageSlider: React.FunctionComponent<ImageSliderProps> = ({
  images,
}) => {
  const [current, setCurrent] = useState<number>(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const switchSlide = (index: number) => {
    setCurrent(index);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <div className="flex min-h-[100vh] items-center justify-center">
      <div className="relative z-50 my-0 mx-auto max-w-[1000px]">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className={`${
                index === current ? "opacity-1" : "opacity-0 "
              } transition-opacity duration-300`}
            >
              {index === current && <SliderItem key={index} image={image} />}
            </div>
          );
        })}
        <ImageSliderIndicators
          images={images}
          currentIndex={current}
          switchSlide={switchSlide}
        />
        <ImageSliderControls previous={prevSlide} next={nextSlide} />
      </div>
    </div>
  );
};
