import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";

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
  const [images, setImages] = useState<any>();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({ reValidateMode: "onSubmit" });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    // const images = getValues("root.images");

    formData.append("images", data.images[0]);
    // formData.append("images", images);
    console.log("data", data);
    reset();
  };

  // const getFiles = () => {
  //   const files = (
  //     (document.getElementById("itemImages") as HTMLInputElement) || null
  //   ).files;
  //   const imagesArray = [];
  //   let image = {};

  //   if (!files) return;
  //   for (let i = 0; i < files.length; i++) {
  //     image = {
  //       name: files[i]?.name,
  //       size: files[i]?.size,
  //     };

  //     imagesArray.push(image);
  //   }
  //   console.log(JSON.stringify(imagesArray));
  // };

  // const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // if (e.target.files) {
  //   const imageArray = Array.from(e.target.files).map((file) =>
  //     URL.createObjectURL(file)
  //   );
  //   setImages((prevImages: any) => [...prevImages, imageArray]);
  // }
  // };

  return (
    <div className="bg-gray-200 mx-auto	my-[15rem] flex w-[40rem] flex-col justify-center rounded-md border-[2px] border-solid border-green p-12 ">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
        {/* <Input
          element="file"
          name="images"
          register={register}
          errors={errors}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue("images", e.target.files)
          }
        /> */}

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
