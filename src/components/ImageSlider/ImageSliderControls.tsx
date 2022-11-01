import React from "react";

interface ImageSliderControlsProps {
  next: () => void;
  previous: () => void;
}

export const ImageSliderControls: React.FunctionComponent<
  ImageSliderControlsProps
> = ({ previous, next }) => {
  return (
    <div>
      <button
        onClick={previous}
        className=" absolute left-0 top-[calc(50%-25px)] z-20 inline-block h-14 w-20 translate-y-[50%] cursor-pointer border-none bg-black/50 text-2xl text-light"
      >
        prev
      </button>
      <button
        onClick={next}
        className=" absolute right-0 top-[calc(50%-25px)] z-20 inline-block h-14 w-20 translate-y-[50%] cursor-pointer border-none bg-black/50 text-2xl text-light"
      >
        next
      </button>
    </div>
  );
};
