import Image from "next/image";
import React, { useState } from "react";
import { trpc } from "../../../utils/trpc";

interface EditItemPhotosProps {
  images: string[];
}

export const EditItemPhotos: React.FunctionComponent<EditItemPhotosProps> = ({
  images,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const { mutateAsync: deleteImages } = trpc.image.removePictures.useMutation();

  function toggleSelection(img: string) {
    if (selectedImages.includes(img)) {
      setSelectedImages(selectedImages.filter((image) => image !== img));
    } else {
      setSelectedImages((prevImages) => [...prevImages, img]);
    }
  }

  function removeImages() {
    deleteImages({ urls: selectedImages });
  }

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {images.map((image) => {
          return (
            <div key={image} className="relative h-[12rem] w-[14rem]">
              <Image
                className={selectedImages.includes(image) ? "opacity-80" : ""}
                src={image}
                alt="item image"
                layout="fill"
              />
              <span
                className={`absolute right-1 top-1 flex
                  h-8 w-8 cursor-pointer items-center justify-center rounded-[50%]
                  ${
                    selectedImages.includes(image)
                      ? "bg-stone-600"
                      : "bg-stone-200"
                  }`}
                onClick={() => toggleSelection(image)}
              />
            </div>
          );
        })}
      </div>
      <button onClick={removeImages}>remove images</button>
    </>
  );
};
