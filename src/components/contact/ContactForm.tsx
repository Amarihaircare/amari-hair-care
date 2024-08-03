"use client";

import { TFormValues } from "@/@types";
import InputFieldset from "../ui/InputFieldset";
import en from "@/language/en";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

type TContactFormValue = Pick<TFormValues, "email" | "name" | "message">;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TContactFormValue>();

  function onSubmit(data: TContactFormValue) {
    console.log(data);
  }

  return (
    <form
      action=""
      className="flex w-full max-w-[500px] flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {inputFieldset.map((input) => (
        <InputFieldset
          key={input.name}
          name={input.name}
          label={input.label}
          type={input.type}
          placeholder={input.placeholder}
          error={errors[input.name]?.message}
          register={register}
          required={input.placeholder}
          textAreaStyles="h-60"
        />
      ))}
      <Button
        type="submit"
        className="mt-10 rounded bg-primary py-5 text-white"
      >
        {en.sendAMessage}
      </Button>
    </form>
  );
}

const inputFieldset: {
  name: keyof TContactFormValue;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "name",
    label: en.yourName,
    type: "text",
    placeholder: en.yourName,
  },
  {
    name: "email",
    label: en.yourEmail,
    type: "text",
    placeholder: en.yourEmailAddres,
  },
  {
    name: "message",
    label: en.message,
    type: "textarea",
    placeholder: en.typeYourMessage,
  },
];
