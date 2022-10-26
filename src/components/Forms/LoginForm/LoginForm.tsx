import Link from "next/link";
import React from "react";
import { Input } from "../Input/Input";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please provide valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export const LoginForm: React.FunctionComponent = () => {
  return (
    <div className="mx-auto my-[15rem] flex w-[40rem] flex-col justify-center rounded-md border-[2px] border-solid border-color-blue bg-gray-200 p-8">
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
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            {touched.email && errors.email ? (
              <div className="pl-4 text-[1.4rem] text-red-400">
                {errors.email}
              </div>
            ) : null}

            <Input
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              isPasswordField={dirty.valueOf()}
            />
            {touched.password && errors.password ? (
              <div className="pl-4 text-[1.4rem] text-red-400">
                {errors.password}
              </div>
            ) : null}

            <button
              className="mx-auto my-8 flex w-[80%] cursor-pointer justify-center self-center rounded-md border-none bg-color-violet p-4 text-[1.5rem] text-white hover:bg-color-violet-light disabled:cursor-not-allowed"
              type="submit"
              disabled={!isValid}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
      <div className="self-center text-[1.5rem]">
        <p style={{ textAlign: "center" }}>
          <Link href="/login">
            <a className="text-color-blue">Forgotten password?</a>
          </Link>
        </p>
        <p>
          Dont have account? Register &nbsp;
          <Link href="/register">
            <a className="text-color-blue">here</a>
          </Link>
        </p>
      </div>
    </div>
  );
};
