import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ItemType } from "../../../schema/item.schema";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { UpdateFields } from "./AddOrEditItem";

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

export const ItemInfoForm: React.FunctionComponent<
  Partial<ItemType> & UpdateFields
> = ({ title, description, category, updateFields }) => {
  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>();

  const categoryIndex = options.indexOf(category as string);

  return (
    <>
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
        value={title}
        onChange={(e) => updateFields({ title: e.target.value })}
      />

      <Select
        register={register}
        name="category"
        // value={category as string}
        categoryIndex={categoryIndex}
        options={options}
        validationSchema={{ required: "You must select category" }}
        onChange={(e) => updateFields({ category: e.target.value })}
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
        value={description}
        onChange={(e) => updateFields({ description: e.target.value })}
      />
    </>
  );
};
