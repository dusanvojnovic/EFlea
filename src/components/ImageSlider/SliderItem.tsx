import Image from "next/future/image";
import React from "react";

interface SliderItemProps {
  image: string;
}

export const SliderItem: React.FunctionComponent<SliderItemProps> = ({
  image,
}) => {
  return (
    <Image
      src={image}
      alt="image"
      width={1000}
      height={1000}
      className={`object-contain`}
    />
  );
};
