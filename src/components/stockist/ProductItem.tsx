import en from "@/language/en";
import { cn, formatCurrency } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import IncrementCart from "../ui/IncrementCart";
import { useManageCart } from "@/hooks/useManageCart";
import { Button } from "../ui/button";
import { DeleteIcon } from "@/assets/icons";

interface ProductItemProps {
  name: string;
  image: StaticImageData;
  price: number;
  discount?: number;
  quantity: number;
  slug: string;
  index: number;
  length: number;
  addToCart: (slug: string) => void;
  removeFromCart: (slug: string) => void;
}

export default function ProductItem({
  name,
  image,
  price,
  discount,
  quantity,
  slug,
  index,
  length,
  addToCart,
  removeFromCart,
}: ProductItemProps) {
  const { count, handleCount, handleRemoveFromCart } = useManageCart({
    productSlug: slug,
    quantity,
    addToCart,
    removeFromCart,
  });
  const discountedPrice = price - (price * (discount ?? 0)) / 100;

  return (
    <div
      key={name}
      className={cn("flex w-full flex-col gap-4 border-gray-200 py-4", {
        "border-b": index !== length - 1,
      })}
    >
      <div className="flex items-center justify-between">
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
          <div>
            <h2 className="font-semibold lg:text-lg">{name}</h2>
            <p>{en.inStock}</p>
          </div>
        </div>
        <div className="flex w-full flex-col items-end gap-2">
          <p className="text-xl font-bold text-green-700">
            {formatCurrency(discountedPrice, "NGN")}
          </p>
          {discount && (
            <div className="flex items-center gap-1">
              <p className="text-xl font-bold text-gray-400 line-through">
                {formatCurrency(price, "NGN")}
              </p>
              <p className="rounded bg-red-200 p-1 text-xs text-red-400">
                -{discount}%
              </p>
            </div>
          )}
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
