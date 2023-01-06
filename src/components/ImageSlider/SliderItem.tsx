import { Image as ImageType } from "@prisma/client";
import Image from "next/future/image";
import React from "react";

interface SliderItemProps {
  image: ImageType;
}

export const SliderItem: React.FunctionComponent<SliderItemProps> = ({
  image,
}) => {
  return (
    <Image
      src={image.url}
      alt="image"
      width={1000}
      height={1000}
      className={`object-contain`}
    />
  );
};
