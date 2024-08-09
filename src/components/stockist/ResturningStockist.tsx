import en from "@/language/en";
import InputFieldset from "../ui/InputFieldset";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { TFormValues } from "@/@types";
import { useEffect } from "react";

type TReturningStockistValues = Pick<
  TFormValues,
  "email" | "comments" | "stokistId"
>;

interface TNewStockistForm {
  setShowCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReturningStockist({
  setShowCheckout,
}: TNewStockistForm) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TReturningStockistValues>({
    defaultValues: {
      email: "",
      comments: "",
      stokistId: "",
    },
  });

  const onSubmit: SubmitHandler<TReturningStockistValues> = (data) => {
    localStorage.setItem("stockist", JSON.stringify(data));
    setShowCheckout(true);
  };

  useEffect(() => {
    // Ensure code only runs in the browser
    if (typeof window !== "undefined") {
      const stockist = localStorage.getItem("stockist");
      if (stockist) {
        try {
          const stockistData = JSON.parse(stockist) as TReturningStockistValues;
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
    >
      <h1 className="text-2xl font-semibold">{en.returningStockistForm}</h1>
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
  name: keyof TReturningStockistValues;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "stokistId",
    label: en.stockistId,
    type: "text",
    placeholder: en.enterYourStockistId,
  },
  {
    name: "email",
    label: en.email,
    type: "email",
    placeholder: en.enterYourEmail,
  },
];
