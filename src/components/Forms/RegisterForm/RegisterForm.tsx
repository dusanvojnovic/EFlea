import Link from "next/link";
import React from "react";
import { Input } from "../Input/Input";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  password: "",
  passwordConfirmed: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters long")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters long")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please provide valid email address")
    .required("Email is required"),
  city: Yup.string()
    .min(2, "City name must be at least 2 characters long")
    .required("City name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  passwordConfirmed: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Passwords doesn't match, please try again"
    )
    .required("Password confirmation is required"),
});

export const RegisterForm: React.FunctionComponent = () => {
  return (
    <div className="mx-auto my-[15rem] flex w-[40rem] flex-col justify-center rounded-md border-[2px] border-solid border-color-blue bg-gray-200 p-8 ">
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
              id="firstName"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
            />
            {touched.firstName && errors.firstName ? (
              <div className="pl-4 text-[1.4rem] text-red-400">
                {errors.firstName}
              </div>
            ) : null}
            <Input
              id="lastName"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
            />
            {touched.lastName && errors.lastName ? (
              <div className="pl-4 text-[1.4rem] text-red-400">
                {errors.lastName}
              </div>
            ) : null}
            <Input
              id="email"
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleChange}
            />
            {touched.email && errors.email ? (
              <div className="pl-4 text-[1.4rem] text-red-400">
                {errors.email}
              </div>
            ) : null}
            <Input
              id="city"
              placeholder="City"
              name="city"
              onChange={handleChange}
            />
            {touched.city && errors.city ? (
              <div className="pl-4 text-[1.4rem] text-red-400">
                {errors.city}
              </div>
            ) : null}
            <Input
              onChange={handleChange}
              id="password"
              placeholder="Password"
              name="password"
              type="password"
              isPasswordField
            />
            {touched.password && errors.password ? (
              <div className="pl-4 text-[1.4rem] text-red-400">
                {errors.password}
              </div>
            ) : null}
            <Input
              onChange={handleChange}
              id="passwordConfirmed"
              placeholder="Password Confirmed"
              name="passwordConfirmed"
              type="password"
              isPasswordField
            />
            {touched.passwordConfirmed && errors.passwordConfirmed ? (
              <div className="pl-4 text-[1.4rem] text-red-400">
                {errors.passwordConfirmed}
              </div>
            ) : null}
            <button
              className="mx-auto my-8 flex w-[80%] cursor-pointer justify-center self-center rounded-md border-none bg-color-violet p-4 text-[1.5rem] text-white hover:bg-color-violet-light disabled:cursor-not-allowed"
              type="submit"
              disabled={!isValid}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
      <div className="self-center text-[1.5rem]">
        <p>
          Already have account? Login &nbsp;
          <Link href="/login">
            <a className="text-color-blue">here</a>
          </Link>
        </p>
      </div>
    </div>
  );
};
