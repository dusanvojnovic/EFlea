/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ItemType } from "../../../schema/item.schema";
import { Input } from "../Input/Input";
import { UpdateFields } from "./AddNewItemForm";

export const PricingInfoForm: React.FunctionComponent<
  Partial<ItemType> & UpdateFields
> = ({ price, acceptExchange, fixedPrice, updateFields }) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [exchange, setExchange] = useState<boolean>(acceptExchange!);
  const [fixed, setFixed] = useState<boolean>(fixedPrice!);

  return (
    <>
      <Input
        name="price"
        placeholder="Price"
        register={register}
        validationSchema={{
          required: "Price is required",
        }}
        errors={errors}
        value={price}
        onChange={(e) => {
          updateFields({ price: e.target.value });
        }}
      />

      <Input
        element="checkbox"
        register={register}
        name="acceptExchange"
        label="Accept Exchange"
        checked={exchange}
        onChange={() => {
          setExchange((prevState) => !prevState);
          updateFields({ acceptExchange: !exchange });
        }}
      />
      <Input
        element="checkbox"
        register={register}
        name="fixedPrice"
        label="Fixed Price"
        checked={fixed}
        onChange={() => {
          setFixed((prevState) => !prevState);
          updateFields({ fixedPrice: !fixed });
        }}
      />
    </>
  );
};
