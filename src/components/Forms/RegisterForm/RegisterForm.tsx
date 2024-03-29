import Link from "next/link";
import React, { useState } from "react";
import { Input } from "../Input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../../utils/trpc";
import { signIn } from "next-auth/react";
import { CreateUserType } from "../../../schema/user.schema";

export const RegisterForm: React.FunctionComponent = () => {
  const [passwodFieldValues, setPasswordFieldValues] = useState<{
    password: string;
    confirmPassword: string;
  }>({ password: "", confirmPassword: "" });

  const { password, confirmPassword } = passwodFieldValues;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    reValidateMode: "onSubmit",
  });

  const { mutateAsync } = trpc.user.registerUser.useMutation();

  const onSubmit = async (data: CreateUserType) => {
    await mutateAsync(data);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="bg-gray-200 mx-auto my-28 flex w-[40rem] flex-col justify-center rounded-md border-[2px] border-solid border-green p-12">
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
        <Input
          name="firstName"
          placeholder="First Name"
          register={register}
          validationSchema={{
            required: "First Name is required",
            minLength: {
              value: 2,
              message: "First name must be at least 2 characters long",
            },
          }}
          errors={errors}
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          register={register}
          validationSchema={{
            required: "Last Name is required",
            minLength: {
              value: 2,
              message: "Last name must be at least 2 characters long",
            },
          }}
          errors={errors}
        />
        <Input
          name="email"
          placeholder="Email"
          register={register}
          validationSchema={{
            required: "Email is required",
            pattern: {
              message: "Enter valid email address",
              value:
                /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            },
          }}
          errors={errors}
        />
        <Input
          name="phoneNumber"
          placeholder="Phone Number"
          register={register}
          errors={errors}
        />
        <Input
          name="city"
          placeholder="City"
          register={register}
          validationSchema={{
            required: "City is required",
            minLength: {
              value: 2,
              message: "City name must be at least 2 characters long",
            },
          }}
          errors={errors}
        />
        <Input
          name="password"
          isPasswordField
          placeholder="Password"
          register={register}
          validationSchema={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          }}
          errors={errors}
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordFieldValues({
              ...passwodFieldValues,
              password: event.currentTarget.value,
            });
          }}
        />
        <Input
          name="confirmPassword"
          isPasswordField
          placeholder="Confirm Password"
          register={register}
          validationSchema={{
            validate: {
              passwordEqual: (value: string) =>
                value === getValues("password") || "Password not match",
            },
          }}
          errors={errors}
          value={confirmPassword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordFieldValues({
              ...passwodFieldValues,
              confirmPassword: event.currentTarget.value,
            });
          }}
        />
        <button
          className="mx-auto my-8 flex w-[80%] cursor-pointer justify-center self-center rounded-md border-none bg-red p-4 text-[1.5rem] text-white hover:bg-red disabled:cursor-not-allowed"
          type="submit"
        >
          Register
        </button>
      </form>
      <div className="self-center text-[1.5rem]">
        <p>
          Already have account? Login &nbsp;
          <Link href="/login">
            <a className="text-green">here.</a>
          </Link>
        </p>
      </div>
    </div>
  );
};
