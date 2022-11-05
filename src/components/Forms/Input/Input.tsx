import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { IconContext } from "react-icons";
import {
  UseFormRegister,
  FieldValues,
  ValidationRule,
  Message,
  FieldErrorsImpl,
} from "react-hook-form";

interface InputProps {
  element?: string;
  placeholder: string;
  name: string;
  type?: string;
  isPasswordField?: boolean;
  register: UseFormRegister<FieldValues>;
  validationSchema?: {
    validate?: { passwordEqual: (val: string) => boolean | string };
    required?: Message | ValidationRule<boolean>;
    minLength?: ValidationRule<number>;
    pattern?: ValidationRule<RegExp>;
  };
  errors: Partial<FieldErrorsImpl<{ [x: string]: string }>>;
  isDirty?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      element = "input",
      placeholder,
      type = "text",
      isPasswordField = false,
      name,
      register,
      validationSchema,
      isDirty = false,
      errors,
      ...props
    },
    ref
  ) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);

    return (
      <div className="flex flex-col p-4 text-[1.5rem]">
        {element === "input" ? (
          <input
            className="relative w-full rounded-md border border-solid border-green p-4"
            type={isPasswordField && !passwordIsVisible ? "password" : "text"}
            placeholder={placeholder}
            id={name}
            {...register(name, validationSchema)}
            {...props}
          />
        ) : (
          <textarea
            className="w-full border border-solid border-green p-4"
            name={name}
            placeholder={placeholder}
            rows={8}
          />
        )}
        {errors && (
          <p className="pt-2 text-[1.4rem] text-red">{errors[name]?.message}</p>
        )}

        {isPasswordField && isDirty ? (
          <IconContext.Provider value={{ size: "1.5rem", color: "black" }}>
            <i
              onClick={() => setPasswordIsVisible(!passwordIsVisible)}
              className="absolute mt-6 ml-[31rem] cursor-pointer"
            >
              {!passwordIsVisible ? <BsEyeSlash /> : <BsEye />}
            </i>
          </IconContext.Provider>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
