import Link from "next/link";
import React from "react";
import { Input } from "../Input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../../utils/trpc";
import { CreateUserInput } from "../../../schema/user.schema";
import { useRouter } from "next/router";

export const RegisterForm: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm<FieldValues>({
    reValidateMode: "onSubmit",
    defaultValues: {
      password: "",
      passwordConfirmed: "",
    },
  });

  const router = useRouter();

  const { mutateAsync } = trpc.user.registerUser.useMutation();

  const onSubmit = async (data: CreateUserInput) => {
    await mutateAsync({ ...data });
    router.push("/");
  };

  return (
    <div className="bg-gray-200 mx-auto my-[15rem] flex w-[40rem] flex-col justify-center rounded-md border-[2px] border-solid border-green p-12">
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
          isDirty={dirtyFields.password}
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
        />
        <Input
          name="passwordConfirmed"
          isPasswordField
          isDirty={dirtyFields.passwordConfirmed}
          placeholder="Confirm Password"
          register={register}
          validationSchema={{
            validate: {
              passwordEqual: (value: string) =>
                value === getValues("password") || "Password not match",
            },
          }}
          errors={errors}
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
