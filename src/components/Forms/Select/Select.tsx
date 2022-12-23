import { ChangeEventHandler } from "react";
import { FieldValues, UseFormRegister, ValidationRule } from "react-hook-form";

export interface SelectProps {
  name: string;
  value?: string;
  options: string[];
  register: UseFormRegister<FieldValues>;
  validationSchema?: {
    required?: string | ValidationRule<boolean>;
  };
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
}

export const Select: React.FunctionComponent<SelectProps> = ({
  register,
  options,
  validationSchema,
  name,
  onChange,
}) => {
  return (
    <select
      {...register(name, validationSchema)}
      onChange={onChange}
      className="relative w-full rounded-md border border-solid border-green p-4 text-[1.5rem]"
    >
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};
