import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ItemType } from "../../../schema/item.schema";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { UpdateFields } from "./AddOrEditItem";
import { categories } from "../../../utils/categories";

export const ItemInfoForm: React.FunctionComponent<
  Partial<ItemType> & UpdateFields
> = ({ title, description, category, subcategory, updateFields }) => {
  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>();

  const categoryNames = [];
  for (const category in categories) {
    categoryNames.push(category);
  }

  const categoryIndex = categoryNames.indexOf(category as string);

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
        options={categoryNames}
        validationSchema={{ required: "You must select category" }}
        onChange={(e) => updateFields({ category: e.target.value })}
      />

      {category && (
        <Select
          register={register}
          name="subcategory"
          // value={category as string}
          categoryIndex={categories[category].indexOf(subcategory)}
          options={categories[category]}
          validationSchema={{ required: "You must select subcategory" }}
          onChange={(e) => updateFields({ subcategory: e.target.value })}
        />
      )}

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
