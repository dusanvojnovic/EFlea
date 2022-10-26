import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { IconContext } from "react-icons";

interface InputProps {
  id: string;
  element?: string;
  placeholder: string;
  name: string;
  type?: string;
  isPasswordField?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      element = "input",
      placeholder,
      type = "text",
      isPasswordField = false,
      name,
      onChange,
      ...props
    },
    ref
  ) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);

    return (
      <div className="flex p-4 text-[1.5rem]">
        {element === "input" ? (
          <input
            onChange={onChange}
            className="w-full rounded-md border-solid border-color-blue p-4"
            type={isPasswordField && !passwordIsVisible ? "password" : "text"}
            placeholder={placeholder}
            id={id}
            name={name}
            {...props}
          />
        ) : (
          <textarea id={id} name={id} placeholder={placeholder} rows={6} />
        )}

        {isPasswordField ? (
          <IconContext.Provider value={{ size: "1.5rem", color: "black" }}>
            <i
              onClick={() => setPasswordIsVisible(!passwordIsVisible)}
              className="mt-4 ml-[-2.5rem] cursor-pointer"
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
