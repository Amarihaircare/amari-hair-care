"use client";
import en from "@/language/en";
import { Button } from "./button";
import IncrementCart from "./IncrementCart";
import { useManageCart } from "@/hooks/useManageCart";
import { useCart } from "@/hooks/useCart";

interface IAddToCartActionProps {
  productSlug?: string;
  variantId?: string | number;
  productName?: string;
  productPrices?: {
    amount: number;
    currency: string;
    locale: string;
  }[];
  productImage?: string;
}

export default function AddToCartAction({
  productSlug,
  variantId,
  productName,
  productPrices,
  productImage,
}: IAddToCartActionProps) {
  const { cart } = useCart();
  const product = cart.find((item) => item.slug === productSlug);

  const { handleCount, count, handleAddToCart } = useManageCart({
    productSlug: productSlug!,
    ...(product && { quantity: product.quantity }),
    ...(productName && productPrices && productImage
      ? {
          productInfo: {
            name: productName,
            prices: productPrices,
            image: productImage,
            variantId: variantId,
          },
        }
      : {}),
  });

  return (
    <div className="flex items-center gap-4">
      <IncrementCart count={count} handleCount={handleCount} />
      {!product && (
        <Button
          onClick={() => handleAddToCart(count)}
          variant={"secondary"}
          className="py-6 font-semibold"
        >
          {en.addToCart}
        </Button>
      )}
      {product && (
        <p>
          {product.quantity} {en.itemAdded}
        </p>
      )}
    </div>
  );
}
