import en from "@/language/en";
import InputFieldset from "../ui/InputFieldset";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { TFormValues } from "@/@types";
import { useState } from "react";
import { SpinnerIcon } from "@/assets/icons";
import { generateId } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { sendEmail } from "@/api";
import { useModal } from "@/hooks/useModal";
import OrderSuccess from "./OrderSuccess";
import { toast } from "../ui/use-toast";

type TNewStockistValues = Pick<
  TFormValues,
  "companyName" | "contactName" | "phone" | "email" | "address" | "comments"
>;

export default function NewStockist() {
  const [isLoading, setIsLoading] = useState(false);
  const { cart } = useCart();
  const { setModal } = useModal();
  const [stockistId, setStockistId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TNewStockistValues>();

  const onSubmit: SubmitHandler<TNewStockistValues> = async (data) => {
    const formData = new FormData();
    const stockistId = generateId();
    setIsLoading(true);

    for (const key in data) {
      // @ts-expect-error
      formData.append(key, data[key]);
    }
    formData.append("stockistId", stockistId);

    formData.append(
      "products",
      JSON.stringify(
        cart.map((product) => ({
          name: product.name,
          price: product.price,
        })),
      ),
    );
    formData.append("_subject", `New Order From ${data.contactName}`);

    await sendEmail(formData)
      .then(() => {
        setModal({
          description: en.orderReceivedDescription,
          title: en.thankYou,
          variant: "success",
        });
        setStockistId(stockistId);
      })
      .catch(() => {
        toast({
          title: en.somethingWentWrong,
          description: en.somethingWentWrongDescription,
          variant: "destructive",
        });
      });

    setIsLoading(false);
  };

  return stockistId.length > 0 ? (
    <OrderSuccess stockistId={stockistId} />
  ) : (
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
  name: keyof TNewStockistValues;
  label: string;
  type: string;
  placeholder: string;
  required?: string;
}[] = [
  {
    name: "companyName",
    label: en.companyName,
    type: "text",
    placeholder: en.enterYourCompanyName,
    required: en.enterYourCompanyName,
  },
  {
    name: "contactName",
    label: en.contactName,
    type: "text",
    placeholder: en.enterYourContactName,
    required: en.enterYourContactName,
  },
  {
    name: "phone",
    label: en.phone,
    type: "tel",
    placeholder: en.enterYourPhone,
    required: en.enterYourPhone,
  },
  {
    name: "email",
    label: en.email,
    type: "email",
    placeholder: en.enterYourEmail,
    required: en.enterYourEmail,
  },
  {
    name: "address",
    label: en.address,
    type: "textarea",
    placeholder: en.enterYourAddress,
    required: en.enterYourAddress,
  },
  {
    name: "comments",
    label: en.comments,
    type: "textarea",
    placeholder: en.enterYourComments,
  },
];
