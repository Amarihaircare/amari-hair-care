import en from "@/language/en";
import InputFieldset from "../ui/InputFieldset";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { TStockistValues } from "@/@types";

type TNewStockistValues = Pick<
  TStockistValues,
  "companyName" | "contactName" | "phone" | "email" | "address" | "comments"
>;

interface TNewStockistForm {
  setShowCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewStockist({ setShowCheckout }: TNewStockistForm) {
  const stockist = localStorage.getItem("stockist");
  const stockistData = stockist
    ? (JSON.parse(stockist) as TNewStockistForm)
    : {};
  console.log(stockistData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TNewStockistValues>({
    defaultValues: stockistData,
  });

  const onSubmit: SubmitHandler<TNewStockistValues> = (data) => {
    localStorage.setItem("stockist", JSON.stringify(data));
    console.log(data);
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
