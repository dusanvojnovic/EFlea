/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { trpc } from "../../../utils/trpc";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { storage } from "../../../utils/firebase";
import { ItemType } from "../../../schema/item.schema";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { useMultistepForm } from "../../../hooks/useMultistepForm";

const options = [
  "antiques",
  "bicycles",
  "books and comics",
  "clothes",
  "computers",
  "games and toys",
  "garden and yard",
  "home appliances",
  "music and music gear",
  "photo cameras",
  "shoes",
  "telephones",
  "tools and equipment",
  "watches",
  "other",
];

export const AddNewItemForm: React.FunctionComponent = () => {
  const { steps, currentStepIndex, isFirstStep, isLastStep, next, back, goTo } =
    useMultistepForm([]);
  const [images, setImages] = useState<any>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>();
  const { data: session } = useSession();
  console.log(session);

  const {
    register,
    handleSubmit,
    // reset,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({ reValidateMode: "onSubmit" });

  // const { mutateAsync: uploadImage } = trpc.item.addItem.useMutation();

  const onSubmit = () => {
    const promises: any[] = [];
    images.map((image: any) => {
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
    <div className="bg-gray-200 relative	mx-auto my-[15rem] flex w-[40rem] flex-col justify-center rounded-md border-[2px] border-solid border-green p-12 ">
      <form
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        encType="multipart/form-data"
      >
        <div className="absolute top-2 right-2 text-2xl">
          {currentStepIndex + 1} / {steps.length}
        </div>

        <Input
          name="title"
          placeholder="Title"
          register={register}
          validationSchema={{
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title name must be at least 3 characters long",
            },
          }}
          errors={errors}
        />

        <Select
          register={register}
          name="category"
          options={options}
          validationSchema={{ required: "You must select category" }}
        />

        <Input
          element="textarea"
          name="description"
          placeholder="Describe item..."
          register={register}
          validationSchema={{
            required: "Description is required",
            minLength: {
              value: 20,
              message: "Description must be at least 20 characters long",
            },
          }}
          errors={errors}
        />
        <Input
          name="price"
          placeholder="Price"
          register={register}
          validationSchema={{
            required: "Price is required",
          }}
          errors={errors}
        />
        {/* <input
          type="file"
          id="itemImages"
          onChange={getFiles}
          required
          multiple
        /> */}
        <Input
          element="file"
          name="images"
          register={register}
          errors={errors}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          //   setImages(e.target.files!)
          // }
          // onChange={(event: any) => setImages(event?.target.files)}
          onChange={handleChange}
          // onChange={handleFileSelected}
        />

        <button
          className="mx-auto my-8 flex w-[80%] cursor-pointer justify-center self-center rounded-md border-none bg-red p-4 text-[1.5rem] text-white hover:bg-red disabled:cursor-not-allowed"
          type="submit"
        >
          add item
        </button>
      </form>
    </div>
  );
};
