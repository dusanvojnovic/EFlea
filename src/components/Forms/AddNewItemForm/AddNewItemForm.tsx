import { Form, Formik } from "formik";
import React from "react";
import { Input } from "../Input/Input";
import * as Yup from "yup";

const initialValues = {
  title: "",
  category: "",
  description: "",
  price: "",
  images: [],
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Item's title must be at least 2 characters long")
    .required("Item's name is required"),
  category: Yup.string()
    .min(2, "Last name must be at least 2 characters long")
    .required("Last name is required"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters long")
    .required("Description is required"),
  price: Yup.string().required("Price is required"),
  images: Yup.array().required("Please provide at least one image"),
});

export const AddNewItemForm: React.FunctionComponent = () => {
  return (
    <div className="bg-gray-200 mx-auto	my-[15rem] flex w-[40rem] flex-col justify-center rounded-md border-[2px] border-solid border-green p-8 ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setErrors }) => {
          console.log(values);
        }}
      >
        {({ isSubmitting, isValid, dirty, handleChange, errors, touched }) => (
          <Form>
            <Input
              id="title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
            {touched.title && errors.title ? (
              <div className="text-red-400 pl-4 text-[1.4rem]">
                {errors.title}
              </div>
            ) : null}
            <select
              id="category"
              name="category"
              onChange={handleChange}
              className="box-border w-full rounded-md border-solid border-green p-4 text-[1.5rem]"
            >
              <option value="">Select a Category</option>
              <option value="red">red</option>
              <option value="blue">blue</option>
              <option value="green">green</option>
            </select>
            {errors.category && (
              <div className="input-feedback">{errors.category}</div>
            )}
            <Input
              element="textarea"
              id="description"
              placeholder="Describe Item..."
              name="description"
              onChange={handleChange}
            />
            {touched.description && errors.description ? (
              <div className="text-red-400 pl-4 text-[1.4rem]">
                {errors.description}
              </div>
            ) : null}
            <Input
              id="price"
              placeholder="Price"
              name="price"
              type="price"
              onChange={handleChange}
            />
            {touched.price && errors.price ? (
              <div className="text-red-400 pl-4 text-[1.4rem]">
                {errors.price}
              </div>
            ) : null}

            <button
              className="mx-auto my-8 flex w-[80%] cursor-pointer justify-center self-center rounded-md border-none bg-red p-4 text-[1.5rem] text-white hover:bg-red disabled:cursor-not-allowed"
              type="submit"
              disabled={!isValid}
            >
              Add Item
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
