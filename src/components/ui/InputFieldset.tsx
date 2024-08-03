import { UseFormRegister } from "react-hook-form";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { TStockistValues } from "@/@types";

interface IInputFieldset {
  name: keyof TStockistValues;
  label: string;
  type: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegister<TStockistValues>;
  required?: string;
}
export default function InputFieldset({
  name,
  label,
  type,
  placeholder,
  error,
  register,
  required,
}: IInputFieldset) {
  return (
    <fieldset className="flex w-full flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {type === "textarea" ? (
        <Textarea
          id={name}
          placeholder={placeholder}
          className="resize-none rounded"
          {...register(name, {
            ...(required && { required }),
          })}
        />
      ) : (
        <Input
          type={type}
          id={name}
          placeholder={placeholder}
          className="rounded"
          {...register(name, {
            ...(required && { required }),
          })}
        />
      )}
      {error && <p className="text-sm italic text-red-500">{error}</p>}
    </fieldset>
  );
}
