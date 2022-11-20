import React, { ChangeEvent, useState } from "react";
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
  placeholder?: string;
  value?: string;
  label?: string;
  name: string;
  isPasswordField?: boolean;
  register: UseFormRegister<FieldValues>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validationSchema?: {
    validate?: { passwordEqual: (val: string) => boolean | string };
    required?: Message | ValidationRule<boolean>;
    minLength?: ValidationRule<number>;
    pattern?: ValidationRule<RegExp>;
  };
  errors?: Partial<FieldErrorsImpl<{ [x: string]: string }>>;
  isDirty?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      element = "input",
      placeholder,
      isPasswordField = false,
      name,
      value,
      label,
      register,
      onChange,
      validationSchema,
      isDirty = false,
      errors,
      ...props
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);

    return (
      <div className="box-border flex flex-col py-4 px-0 text-[1.5rem]">
        {element === "input" && (
          <input
            className="relative box-border w-full rounded-md border border-solid border-green p-4 px-4"
            type={isPasswordField && !passwordIsVisible ? "password" : "text"}
            placeholder={placeholder}
            id={name}
            {...register(name, validationSchema)}
            {...props}
          />
        )}
        {element === "textarea" && (
          <textarea
            className="w-full rounded-md border border-solid border-green p-4"
            id={name}
            placeholder={placeholder}
            rows={8}
            {...register(name, validationSchema)}
            {...props}
          />
        )}
        {element === "file" && (
          <input
            type="file"
            {...register(name)}
            name={name}
            id={name}
            multiple
            onChange={onChange}
          />
        )}
        {element === "radio" && (
          <div className="flex">
            <input
              type="radio"
              {...register(name)}
              name={name}
              id={name}
              value={value}
              onChange={onChange}
            />
            <label className="ml-4">{label}</label>
          </div>
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
