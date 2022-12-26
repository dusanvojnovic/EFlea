/* eslint-disable react/jsx-key */
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { trpc } from "../../../utils/trpc";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { ItemType } from "../../../schema/item.schema";
import { useMultistepForm } from "../../../hooks/useMultistepForm";
import { ItemInfoForm } from "./ItemInfoForm";
import { PricingInfoForm } from "./PricingInfoForm";
import { DropFile } from "./DropFile";
import { validateFormData } from "../../../utils/multistepFormValidator";

const INITIAL_DATA: ItemType = {
  title: "",
  category: "",
  price: "",
  description: "",
  imgFiles: [],
  imagesUrl: "",
  acceptExchange: false,
  fixedPrice: false,
};

export type UpdateFields = {
  updateFields: (fields: Partial<ItemType>) => void;
};

export const NewForm: React.FunctionComponent = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const { data: session } = useSession();
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const updateFields = (fields: Partial<ItemType>) => {
    setData((previousState) => {
      return { ...previousState, ...fields };
    });
  };

  const {
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    next,
    back,
    formStep,
  } = useMultistepForm([
    <ItemInfoForm {...data} updateFields={updateFields} />,
    <PricingInfoForm {...data} updateFields={updateFields} />,
    <DropFile {...data} updateFields={updateFields} />,
  ]);

  // console.log(session);
  console.log("DATA", data);

  const { handleSubmit } = useForm<FieldValues>();

  const { mutateAsync: addItem } = trpc.item.addItem.useMutation();

  const onSubmit = () => {
    if (validateFormData(data)) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
    if (formIsValid) {
      addItem({ ...data, imagesUrl: data.imagesUrl.toString() });
    } else {
      console.log("invalid form");
    }
  };

  return (
    <div className="bg-gray-200 relative	mx-auto my-[15rem] flex w-[40rem] flex-col justify-center rounded-md border-[2px] border-solid border-green p-12 ">
      <form
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        encType="multipart/form-data"
      >
        <div className="absolute top-2 right-2 text-2xl">
          {currentStepIndex + 1} / {steps.length}
        </div>

        {formStep}

        <div className="mt-4 flex justify-end gap-2">
          {!isFirstStep && (
            <button type="button" onClick={back}>
              back
            </button>
          )}
          {!isLastStep && (
            <button type="button" onClick={next}>
              next
            </button>
          )}
        </div>
        <button onClick={onSubmit}>submit</button>
      </form>
    </div>
  );
};