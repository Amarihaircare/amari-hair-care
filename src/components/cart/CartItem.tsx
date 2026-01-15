"use client";

import Image, { StaticImageData } from "next/image";
import { useCart } from "@/hooks/useCart";
import { useManageCart } from "@/hooks/useManageCart";
import { formatCurrency } from "@/lib/utils";
import IncrementCart from "@/components/ui/IncrementCart";
import { Button } from "@/components/ui/button";
import { DeleteIcon } from "@/assets/icons";
import { TLocalProduct } from "@/@types";

interface CartItemProps {
  item: TLocalProduct;
}

export default function CartItem({ item }: CartItemProps) {
  const { currency } = useCart();
  const { count, handleCount, handleRemoveFromCart } = useManageCart({
    productSlug: item.slug,
    quantity: item.quantity,
    productInfo: {
      name: item.name,
      prices: item.prices,
      image: item.image,
      variantId: item.variantId,
    },
  });

  const priceObj = item.prices.find((p) => p.currency === currency);
  const price = priceObj?.amount || 0;
  const locale = priceObj?.locale || "en-NG";

  return (
    <div className="flex w-full flex-col gap-4 border-b border-gray-200 py-6 last:border-b-0">
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain object-center"
              unoptimized={true}
              quality={100}
              style={{
                objectFit: 'contain',
                imageRendering: 'crisp-edges'
              }}
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{priceObj?.currency}</p>
            </div>
            <div className="flex items-center gap-4">
               <p className="font-medium text-gray-900">
                {formatCurrency({
                    amount: price,
                    currency: currency,
                    locale: locale,
                })}
               </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
           <IncrementCart count={count} handleCount={handleCount} />
           <Button
            type="button"
            variant="ghost"
            onClick={handleRemoveFromCart}
            className="text-sm font-medium text-red-600 hover:text-red-500 p-0 h-auto"
          >
            <DeleteIcon className="mr-1 h-4 w-4" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
