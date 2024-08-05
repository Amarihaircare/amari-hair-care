"use client";

import { TFormValues } from "@/@types";
import InputFieldset from "../ui/InputFieldset";
import en from "@/language/en";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useState } from "react";
import { SpinnerIcon } from "@/assets/icons";
import { sendEmail } from "@/api";
import { toast } from "../ui/use-toast";

type TContactFormValue = Pick<TFormValues, "email" | "name" | "message">;

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TContactFormValue>();

  async function onSubmit(data: TContactFormValue) {
    setIsLoading(true);
    const formData = new FormData();
    for (const key in data) {
      // @ts-expect-error ignore
      formData.append(key, data[key]);
    }
    await sendEmail(formData)
      .then(() => {
        toast({
          title: en.messageSent,
          description: en.messageSentDescription,
        });
      })
      .catch(() => {
        toast({
          title: en.somethingWentWrong,
          description: en.somethingWentWrongDescription,
          variant: "destructive",
        });
      });
    setIsLoading(false);
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
      <input type="text" name="_honey" hidden />

      <Button
        type="submit"
        className="mt-10 gap-4 rounded bg-primary py-5 text-white"
      >
        {en.sendAMessage}
        {isLoading && <SpinnerIcon className="animate-spin" />}
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
