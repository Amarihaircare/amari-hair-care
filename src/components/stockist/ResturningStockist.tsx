import en from "@/language/en";
import InputFieldset from "../ui/InputFieldset";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { TStockistValues } from "@/@types";

type TReturningStockistValues = Pick<
  TStockistValues,
  "email" | "comments" | "stokistId"
>;

interface TNewStockistForm {
  setShowCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReturningStockist({
  setShowCheckout,
}: TNewStockistForm) {
  const stockist = localStorage.getItem("stockist");
  const stockistData = stockist
    ? (JSON.parse(stockist) as TReturningStockistValues)
    : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TReturningStockistValues>({
    defaultValues: stockistData,
  });

  const onSubmit: SubmitHandler<TReturningStockistValues> = (data) => {
    localStorage.setItem("stockist", JSON.stringify(data));
    setShowCheckout(true);
  };

  return (
    <form
      className="flex w-full max-w-[500px] flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
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

      <Button
        type="submit"
        className="mt-10 rounded bg-primary py-5 text-white"
      >
        {en.continueToCheckout}
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
