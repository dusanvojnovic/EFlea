import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Input } from "../Input/Input";
import { storage } from "../../../utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

export const UploadImagesForm: React.FunctionComponent = ({}) => {
  const [images, setImages] = useState<any>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({ reValidateMode: "onSubmit" });

  const uploadImages = (files: any) => {
    const promises: any[] = [];
    files.map((image: any) => {
      const imageRef = ref(storage, `images/${v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((urls) => {
            setUrls((prevState) => [...prevState, urls]);
          });
        }
      );
    });
    Promise.all(promises)
      .then(() => console.log("all images uploaded"))
      .catch((err) => console.error(err));
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setImages((prevState: any) => [...prevState, newImage]);
    }
  }

  return (
    <>
      <Input
        element="file"
        name="images"
        register={register}
        errors={errors}
        onChange={handleChange}
      />
    </>
  );
};
