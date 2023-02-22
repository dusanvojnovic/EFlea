import Link from "next/link";
import React, { useState } from "react";
import { Input } from "../Input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { LoginUserInput } from "../../../schema/user.schema";

export const LoginForm: React.FunctionComponent = () => {
  const [passwordFieldValue, setPasswordFieldValue] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: LoginUserInput) => {
    await signIn("credentials", { ...data, callbackUrl: "/" });
  };

  return (
    <div className="bg-gray-200 mx-auto my-[15rem] flex w-[40rem] flex-col justify-center rounded-md border-[2px] border-solid border-green p-12">
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
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
          value={passwordFieldValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordFieldValue(event.currentTarget.value);
          }}
        />
        <button
          className="mx-auto my-8 flex w-[80%] cursor-pointer justify-center self-center rounded-md border-none bg-red p-4 text-[1.5rem] text-white hover:bg-red disabled:cursor-not-allowed"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="self-center text-[1.5rem]">
        <p style={{ textAlign: "center" }}>
          <Link href="/login">
            <a className="text-green">Forgotten password?</a>
          </Link>
        </p>
        <p>
          Dont have account? Register &nbsp;
          <Link href="/register">
            <a className="text-green">here.</a>
          </Link>
        </p>
      </div>
    </div>
  );
};
