import { useRouter } from "next/router";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { EditUserType } from "../../../schema/user.schema";
import { trpc } from "../../../utils/trpc";
import { Input } from "../Input/Input";

interface EditUserFormProps {
  userId: string;
}

export const EditUserForm: React.FunctionComponent<EditUserFormProps> = ({
  userId,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    reValidateMode: "onSubmit",
  });

  const { data: user } = trpc.user.getUserById.useQuery({ id: userId });
  const { mutateAsync: editUser } = trpc.user.editUser.useMutation({
    onSettled: () => {
      router.push(`/user/${userId}`);
    },
  });

  const onSubmit = async (data: EditUserType) => {
    await editUser({ ...data });
  };

  return (
    <div className="bg-gray-200 mx-auto my-[15rem] flex w-[40rem] flex-col justify-center rounded-md border-[2px] border-solid border-green p-12">
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
        <Input
          name="firstName"
          placeholder="First Name"
          label="First Name"
          register={register}
          validationSchema={{
            required: "First Name is required",
            minLength: {
              value: 2,
              message: "First name must be at least 2 characters long",
            },
          }}
          errors={errors}
          value={user?.firstName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue("firstName", event.currentTarget.value);
          }}
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          label="Last Name"
          register={register}
          validationSchema={{
            required: "Last Name is required",
            minLength: {
              value: 2,
              message: "Last name must be at least 2 characters long",
            },
          }}
          errors={errors}
          value={user?.lastName}
        />
        <Input
          name="phoneNumber"
          placeholder="Phone Number"
          label="Phone Number"
          register={register}
          errors={errors}
          value={user?.phoneNumber || ""}
        />
        <Input
          name="city"
          placeholder="City"
          label="City"
          register={register}
          validationSchema={{
            required: "City is required",
            minLength: {
              value: 2,
              message: "City name must be at least 2 characters long",
            },
          }}
          errors={errors}
          value={user?.city}
        />
        <button
          className="mx-auto my-8 flex w-[80%] cursor-pointer justify-center self-center rounded-md border-none bg-red p-4 text-[1.5rem] text-white hover:bg-red disabled:cursor-not-allowed"
          type="submit"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};
