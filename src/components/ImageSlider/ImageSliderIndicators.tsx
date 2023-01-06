import { Image } from "@prisma/client";
import React from "react";

interface ImageSliderIndicatorsProps {
  images: Image[];
  currentIndex: number;
  switchSlide: (index: number) => void;
}

export const ImageSliderIndicators: React.FunctionComponent<
  ImageSliderIndicatorsProps
> = ({ images, currentIndex, switchSlide }) => {
  return (
    <div className="absolute left-[50%] bottom-[1.5em] z-30 -translate-x-[50%]">
      {images.map((_, index) => {
        return (
          <button
            key={index}
            className={`m-2 h-4 w-4 cursor-pointer rounded-[50%] border-none bg-[#fff] opacity-50 ${
              currentIndex === index ? "opacity-100" : ""
            }`}
            onClick={() => switchSlide(index)}
          ></button>
        );
      })}
    </div>
  );
};
