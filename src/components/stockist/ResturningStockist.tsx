import en from "@/language/en";
import InputFieldset from "../ui/InputFieldset";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { TFormValues } from "@/@types";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { SpinnerIcon } from "@/assets/icons";
import { sendEmail } from "@/api";
import { useModal } from "@/hooks/useModal";
import { toast } from "../ui/use-toast";
import OrderSuccess from "./OrderSuccess";

type TReturningStockistValues = Pick<
  TFormValues,
  "email" | "comments" | "stockistId"
>;

export default function ReturningStockist() {
  const { cart } = useCart();
  const { setModal } = useModal();
  const [stockistId, setStockistId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TReturningStockistValues>();

  const onSubmit: SubmitHandler<TReturningStockistValues> = async (data) => {
    const formData = new FormData();
    setIsLoading(true);

    for (const key in data) {
      // @ts-expect-error
      formData.append(key, data[key]);
    }

    formData.append(
      "products",
      JSON.stringify(
        cart.map((product) => ({
          name: product.name,
          price: product.price,
        })),
      ),
    );
    formData.append("_subject", `New Order From ${data.stockistId}`);

    await sendEmail(formData)
      .then(() => {
        setModal({
          description: en.orderReceivedDescription,
          title: en.thankYou,
          variant: "success",
        });
        setStockistId(data.stockistId!);
        setIsLoading(false);
      })
      .catch(() => {
        toast({
          title: en.somethingWentWrong,
          description: en.somethingWentWrongDescription,
          variant: "destructive",
        });
        setIsLoading(false);
      });
  };

  return stockistId.length > 0 ? (
    <OrderSuccess stockistId={stockistId} />
  ) : (
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
          required={input.required}
        />
      ))}
      <input type="text" name="_honey" hidden />

      <Button
        type="submit"
        className="mt-10 gap-4 rounded bg-primary py-5 text-white"
      >
        {en.requestQuote}
        {isLoading && <SpinnerIcon className="animate-spin" />}
      </Button>
    </form>
  );
}

const inputFieldset: {
  name: keyof TReturningStockistValues;
  label: string;
  type: string;
  placeholder: string;
  required?: string;
}[] = [
  {
    name: "stockistId",
    label: en.stockistId,
    type: "text",
    placeholder: en.enterYourStockistId,
    required: en.enterYourStockistId,
  },
  {
    name: "email",
    label: en.email,
    type: "email",
    placeholder: en.enterYourEmail,
    required: en.enterYourEmail,
  },
  {
    name: "comments",
    label: en.comments,
    type: "textarea",
    placeholder: en.enterYourComments,
  },
];
