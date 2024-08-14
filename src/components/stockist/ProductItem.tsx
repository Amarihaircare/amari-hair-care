import en from "@/language/en";
import { cn, formatCurrency } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import IncrementCart from "../ui/IncrementCart";
import { useManageCart } from "@/hooks/useManageCart";
import { Button } from "../ui/button";
import { DeleteIcon } from "@/assets/icons";
import { TProduct } from "@/assets/data/products";

interface ProductItemProps {
  name: string;
  image: StaticImageData;
  prices: TProduct["prices"];
  quantity: number;
  slug: string;
  index: number;
  length: number;
}

export default function ProductItem({
  name,
  image,
  prices,
  quantity,
  slug,
  index,
  length,
}: ProductItemProps) {
  const { count, handleCount, handleRemoveFromCart } = useManageCart({
    productSlug: slug,
    quantity,
  });

  return (
    <div
      key={name}
      className={cn("flex w-full flex-col gap-4 border-gray-200 py-4", {
        "border-b": index !== length - 1,
      })}
    >
      <div className="flex justify-between gap-3">
        <div className="flex gap-4">
          <div className="h-[70px] w-[100px] lg:h-[100px]">
            <Image
              width={100}
              height={100}
              src={image}
              alt={name}
              className="h-full w-full rounded object-cover"
            />
          </div>
          <div className="flex max-w-[60%] flex-col gap-2">
            <h2 className="font-semibold lg:text-lg">{name}</h2>
            <p>{en.inStock}</p>
          </div>
        </div>
        <div className="flex flex-col items-end lg:gap-2">
          {prices?.map((price, index) => (
            <p
              className="flex gap-2 font-bold text-green-700"
              key={price.currency}
            >
              <span>
                {formatCurrency({
                  amount: price.amount,
                  currency: price.currency,
                  locale: price.locale,
                })}
              </span>
              <span>{index < prices.length - 1 ? "||" : ""}</span>
            </p>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Button
          onClick={handleRemoveFromCart}
          variant={"outline"}
          className="gap-3 border-red-500 bg-transparent text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-400 lg:text-base"
        >
          <DeleteIcon className="lg:text-xl" />
          Remove
        </Button>
        <IncrementCart count={count} handleCount={handleCount} />
      </div>
    </div>
  );
}
