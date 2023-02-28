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
  placeholder?: string;
  value?: string;
  label?: string;
  checked?: boolean;
  name: string;
  isPasswordField?: boolean;
  register: UseFormRegister<FieldValues>;

  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  validationSchema?: {
    validate?: { passwordEqual: (val: string) => boolean | string };
    required?: Message | ValidationRule<boolean>;
    minLength?: ValidationRule<number>;
    pattern?: ValidationRule<RegExp>;
  };
  errors?: Partial<FieldErrorsImpl<{ [x: string]: string }>>;
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
      checked,
      onChange,
      validationSchema,
      errors,
      ...props
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);

    return (
      <div className="box-border flex flex-col py-4 px-0 text-[1.5rem]">
        {element !== "checkbox" && label && (
          <label className="ml-1 mb-1">{label}</label>
        )}
        {element === "input" && (
          <input
            className="relative box-border w-full rounded-md border border-solid border-green p-4 px-4"
            type={isPasswordField && !passwordIsVisible ? "password" : "text"}
            placeholder={placeholder}
            id={name}
            defaultValue={value}
            {...register(name, validationSchema)}
            {...props}
            onChange={onChange}
          />
        )}
        {element === "textarea" && (
          <textarea
            className="w-full rounded-md border border-solid border-green p-4"
            id={name}
            placeholder={placeholder}
            rows={8}
            value={value}
            {...register(name, validationSchema)}
            {...props}
            onChange={onChange}
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
        {element === "checkbox" && (
          <div className="flex">
            <input
              type="checkbox"
              {...register(name)}
              name={name}
              id={name}
              value={value}
              onChange={onChange}
              checked={checked}
            />
            <label className="ml-4">{label}</label>
          </div>
        )}
        {errors && (
          <p className="pt-2 text-[1.4rem] text-red">{errors[name]?.message}</p>
        )}
        {isPasswordField && value && value.length > 0 ? (
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
