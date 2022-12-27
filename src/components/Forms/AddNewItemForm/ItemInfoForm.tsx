import { Input } from "../Input/Input";
import React from "react";
import { Select } from "../Select/Select";
import { useForm, FieldValues } from "react-hook-form";
import { ItemType } from "../../../schema/item.schema";
import { UpdateFields } from "./AddNewItemForm";

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
> = ({ title, description, updateFields }) => {
  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>();

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
