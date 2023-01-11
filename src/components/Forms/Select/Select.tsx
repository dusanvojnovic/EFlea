import { ChangeEventHandler } from "react";
import { FieldValues, UseFormRegister, ValidationRule } from "react-hook-form";

export interface SelectProps {
  name: string;
  options: string[];
  categoryIndex?: number;
  register: UseFormRegister<FieldValues>;
  validationSchema?: {
    required?: string | ValidationRule<boolean>;
  };
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export const Select: React.FunctionComponent<SelectProps> = ({
  register,
  options,
  validationSchema,
  categoryIndex,
  name,
  onChange,
}) => {
  return (
    <select
      {...register(name, validationSchema)}
      onChange={onChange}
      className="relative w-full rounded-md border border-solid border-green p-4 text-[1.5rem]"
    >
      <option disabled selected>
        Select a category...
      </option>
      {options.map((value, index) => (
        <option key={value} value={value} selected={index === categoryIndex}>
          {value}
        </option>
      ))}
    </select>
  );
};
