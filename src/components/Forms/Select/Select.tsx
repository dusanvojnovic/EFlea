import { ChangeEventHandler } from "react";
import { FieldValues, UseFormRegister, ValidationRule } from "react-hook-form";

export interface SelectProps {
  name: string;
  options: string[];
  categoryIndex?: number;
  subcategoryIndex?: number;
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
  subcategoryIndex,
  name,
  onChange,
}) => {
  return (
    <select
      {...register(name, validationSchema)}
      onChange={onChange}
      className="relative my-4 w-full rounded-md border border-solid border-green p-4 text-[1.5rem]"
    >
      <option disabled selected>
        Select a {name}...
      </option>
      {options.map((value, index) => (
        <option
          key={value}
          value={value}
          selected={index === categoryIndex || index === subcategoryIndex}
        >
          {value}
        </option>
      ))}
    </select>
  );
};
