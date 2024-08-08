import en from "@/language/en";
import InputFieldset from "../ui/InputFieldset";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { TFormValues } from "@/@types";
import { useEffect } from "react";

type TNewStockistValues = Pick<
  TFormValues,
  "companyName" | "contactName" | "phone" | "email" | "address" | "comments"
>;

interface TNewStockistForm {
  setShowCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewStockist({ setShowCheckout }: TNewStockistForm) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TNewStockistValues>({
    defaultValues: {
      address: "",
      comments: "",
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<TNewStockistValues> = (data) => {
    localStorage.setItem("stockist", JSON.stringify(data));
    setShowCheckout(true);
  };

  useEffect(() => {
    // Ensure code only runs in the browser
    if (typeof window !== "undefined") {
      const stockist = localStorage.getItem("stockist");
      if (stockist) {
        try {
          const stockistData = JSON.parse(stockist) as TNewStockistValues;
          reset(stockistData);
        } catch (error) {
          console.error(
            "Failed to parse stockist data from localStorage:",
            error,
          );
        }
      }
    }
  }, [reset]);

  return (
    <form
      className="flex w-full max-w-[500px] flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
    >
      <h1 className="text-2xl font-semibold">{en.newStockistForm}</h1>
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
        />
      ))}
      <input type="text" name="_honey" hidden />

      <Button
        type="submit"
        className="mt-10 rounded bg-primary py-5 text-white"
      >
        {en.proceedToViewStock}
      </Button>
    </form>
  );
}

const inputFieldset: {
  name: keyof TNewStockistValues;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "companyName",
    label: en.companyName,
    type: "text",
    placeholder: en.enterYourCompanyName,
  },
  {
    name: "contactName",
    label: en.contactName,
    type: "text",
    placeholder: en.enterYourContactName,
  },
  {
    name: "phone",
    label: en.phone,
    type: "tel",
    placeholder: en.enterYourPhone,
  },
  {
    name: "email",
    label: en.email,
    type: "email",
    placeholder: en.enterYourEmail,
  },
  {
    name: "address",
    label: en.address,
    type: "textarea",
    placeholder: en.enterYourAddress,
  },
  {
    name: "comments",
    label: en.comments,
    type: "textarea",
    placeholder: en.enterYourComments,
  },
];
