import Image from "next/image";
import React, { useState } from "react";
import { trpc } from "../../../utils/trpc";

interface EditItemPhotosProps {
  images: string[];
  setDeletedImages: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditItemPhotos: React.FunctionComponent<EditItemPhotosProps> = ({
  images,
  setDeletedImages,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [displayedImages, setDisplayedImages] = useState<string[]>(images);

  const { mutateAsync: deleteImages } = trpc.image.removePictures.useMutation();

  function toggleSelection(img: string) {
    if (selectedImages.includes(img)) {
      setSelectedImages(selectedImages.filter((image) => image !== img));
    } else {
      setSelectedImages((prevImages) => [...prevImages, img]);
    }
  }

  function removeImages(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (selectedImages.length == images.length) {
      alert("there must be at least one picture");
      return;
    }
    const remainingImages = images.filter(
      (img) => !selectedImages.includes(img)
    );
    setDisplayedImages(remainingImages);
    setDeletedImages(true);
    deleteImages({ urls: selectedImages });
  }

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {displayedImages.map((image) => {
          const imageIsSelected = selectedImages.includes(image);
          return (
            <div key={image} className="relative h-[12rem] w-[14rem]">
              <Image
                className={imageIsSelected ? "opacity-80" : ""}
                src={image}
                alt="item image"
                layout="fill"
              />
              <span
                className={`absolute right-1 top-1 flex
                  h-7 w-7 cursor-pointer items-center justify-center rounded-[50%]
                  ${imageIsSelected ? "bg-stone-600" : "bg-stone-200"}`}
                onClick={() => toggleSelection(image)}
              >
                {imageIsSelected && (
                  <p className="select-none text-white">&#x2713;</p>
                )}
              </span>
            </div>
          );
        })}
      </div>
      <button onClick={removeImages}>remove images</button>
    </>
  );
};
