/* eslint-disable react/jsx-key */
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMultistepForm } from "../../../hooks/useMultistepForm";
import { ItemType } from "../../../schema/item.schema";
import { validateFormData } from "../../../utils/multistepFormValidator";
import { trpc } from "../../../utils/trpc";
import { DragAndDrop } from "./DragAndDrop";
import { ItemInfoForm } from "./ItemInfoForm";
import { PricingInfoForm } from "./PricingInfoForm";

interface AddOrEditItemProps {
  itemData: ItemType;
  formAction: "add" | "edit";
  itemId?: string;
}

export type UpdateFields = {
  updateFields: (fields: Partial<ItemType>) => void;
};

export const AddOrEditItemForm: React.FunctionComponent<AddOrEditItemProps> = ({
  itemData,
  formAction,
  itemId,
}) => {
  const [data, setData] = useState(itemData);
  const [formIsValid, setFormIsValid] = useState<boolean>(true);
  const router = useRouter();

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
    <DragAndDrop {...data} updateFields={updateFields} />,
  ]);

  const { handleSubmit } = useForm<FieldValues>();

  const { data: session } = useSession();
  const { mutateAsync: addItem } = trpc.item.addItem.useMutation();
  const { mutateAsync: editItem } = trpc.item.editItem.useMutation();

  const onSubmit = () => {
    if (validateFormData(data)) {
      if (formAction === "add") {
        addItem(data, {
          onSuccess: () => {
            router.push(`/user/${session?.user?.id}`);
          },
        });
      } else if (formAction === "edit") {
        if (!itemId) return;
        editItem(
          { ...data, itemId },
          {
            onSuccess: () => {
              router.push(`/category/${itemData.category}/${itemId}`);
            },
          }
        );
      }
    } else {
      setFormIsValid(false);
    }
  };

  return (
    <div className="bg-gray-200 relative	mx-auto my-[15rem] flex w-[40rem] flex-col justify-center rounded-md border-[2px] border-solid border-green p-12 ">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
        <button type="submit">submit</button>
      </form>
      {!formIsValid ? (
        <p className="mt-2 text-2xl text-red">Please fill up entire form!</p>
      ) : null}
    </div>
  );
};
