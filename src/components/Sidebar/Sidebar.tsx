import React, { ChangeEvent } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Input } from "../Forms/Input/Input";
import { Select } from "../Forms/Select/Select";

const options = ["Newest", "Lower Prices First", "Higher Prices First"];

export const Sidebar: React.FunctionComponent = ({}) => {
  const { register, handleSubmit } = useForm<FieldValues>({});

  const formSubmitHandler = (data: any) => {
    console.log(data);
  };

  const selectValueHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };

  const radioValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <div className="mt-60 mr-20 rounded-md border border-red py-8 px-16">
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Select
          register={register}
          options={options}
          name="sortBy"
          onChange={selectValueHandler}
        />
        <div className="mt-8">
          <p className="text-2xl">Price Range: </p>
          <Input
            element="radio"
            register={register}
            name="priceRange"
            value="0-4000"
            label="0-4000"
            onChange={radioValueHandler}
          />
          <Input
            element="radio"
            register={register}
            name="priceRange"
            value="4000-8000"
            label="4000-8000"
            onChange={radioValueHandler}
          />
          <Input
            element="radio"
            register={register}
            name="priceRange"
            value="8000-12000"
            label="8000-12000"
            onChange={radioValueHandler}
          />
          <Input
            element="radio"
            register={register}
            name="priceRange"
            value="12000-16000"
            label="12000-16000"
            onChange={radioValueHandler}
          />
        </div>
      </form>
    </div>
  );
};
