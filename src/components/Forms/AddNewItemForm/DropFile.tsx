import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { v4 } from "uuid";
import { ImageType, ItemType } from "../../../schema/item.schema";
import { storage } from "../../../utils/firebase";
import { ImageConfig } from "../../../utils/imageConfig";
import { trpc } from "../../../utils/trpc";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { UpdateFields } from "./NewForm";

export const DropFile: React.FunctionComponent<
  Partial<ItemType> & UpdateFields
> = ({ updateFields, imgFiles }) => {
  const [images, setImages] = useState<any>([]);
  const [imageFiles, setImageFiles] = useState<any>(imgFiles);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadingDone, setUploadingDone] = useState<boolean>(false);
  const [, setProgress] = useState<number>();
  const [dragEnter, setDragEnter] = useState<boolean>(false);
  const wrapperRef = useRef(null);

  const { mutateAsync: addImage } = trpc.item.addImage.useMutation();

  const onDragEnter = () => {
    setDragEnter(true);
  };

  const onDragLeave = () => {
    setDragEnter(false);
  };

  const onDrop = () => {
    setDragEnter(false);
  };

  const uploadImages = (files: any) => {
    const promises: any[] = [];
    // const imageUrls: string[] = [];
    const imageUrls: any = [];
    files.map((image: any) => {
      const imageRef = ref(storage, `images/${v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, image);
      promises.push(uploadTask);
      setIsUploading(true);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          image.progress = progress;
          setProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            imageUrls.push({ url });
            // setUrls((prevState) => [...prevState, url]);
          });
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        updateFields({ imagesUrl: imageUrls });
        setIsUploading(false);
        setUploadingDone(true);
      })
      .catch((err) => console.error(err));
  };

  const upd = () => {
    console.log("im called");
    // updateFields({ imgFiles: images });
    // setImages(images);
    setImageFiles(images);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imgF: any[] = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      imgF.push(newImage);
    }
    updateFields({ imgFiles: imgF });
  };

  const removeImage = (image: any) => {
    const updatedList = [...imgFiles];
    updatedList.splice(images.indexOf(image), 1);
    // setImages(updatedList);
    updateFields({ imgFiles: updatedList });
  };

  return (
    <>
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        ref={wrapperRef}
        className={`${
          dragEnter && "opacity-60"
        } relative my-0 mx-auto flex h-72 w-full items-center justify-center rounded-2xl border-2 border-dashed border-green hover:opacity-60`}
      >
        <div className="p-2 text-center font-bold ">
          <Image
            src={ImageConfig.uploadImage}
            alt=""
            width={"120px"}
            height={"120px"}
          />
          <p className="text-2xl">Drag & Drop your files here</p>
        </div>
        <input
          type="file"
          multiple
          className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleChange}
        />
      </div>
      {imgFiles.length > 0 ? (
        <div className="">
          <p className="my-5 text-2xl">
            {!isUploading && !uploadingDone && "Ready to upload"}
            {isUploading && "Uploading..."}
            {uploadingDone && "Successfully uploaded!"}
          </p>
          {imgFiles.map((img: any, index: number) => {
            return (
              <div
                key={index}
                className="group relative mb-4 flex rounded-2xl bg-gray p-4"
              >
                {!isUploading && !uploadingDone ? (
                  <>
                    <Image
                      width={"40px"}
                      height={"40px"}
                      src={
                        ImageConfig[img.type.split("/")[1]] ||
                        ImageConfig["default"]
                      }
                      alt=""
                    />
                    <div className="ml-3 flex flex-col justify-between text-xl">
                      <p>{img.name}</p>
                      <p>{(img.size / 1000000).toFixed(2)} MB</p>
                    </div>
                    <span
                      className="absolute right-2 top-2 flex
                        h-8 w-8 cursor-pointer items-center justify-center rounded-[50%] bg-stone-400
                        text-xl text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      onClick={() => removeImage(img)}
                    >
                      x
                    </span>
                  </>
                ) : (
                  <>
                    <ProgressBar completed={img.progress} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
      {!isUploading && !uploadingDone && (
        <button
          className="disabled:cursor-not-allowed"
          disabled={imgFiles.length === 0}
          onClick={() => uploadImages(imgFiles)}
        >
          upload
        </button>
      )}
      {uploadingDone && <button>submit</button>}
    </>
  );
};
