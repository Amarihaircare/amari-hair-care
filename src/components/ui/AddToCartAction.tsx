"use client";
import en from "@/language/en";
import { Button } from "./button";
import IncrementCart from "./IncrementCart";
import { useManageCart } from "@/hooks/useManageCart";
import { useCart } from "@/hooks/useCart";

interface IAddToCartActionProps {
  productSlug?: string;
}

export default function AddToCartAction({
  productSlug,
}: IAddToCartActionProps) {
  const { cart } = useCart();
  const product = cart.find((item) => item.slug === productSlug);

  const { handleCount, count, handleAddToCart } = useManageCart({
    productSlug: productSlug!,
    ...(product && { quantity: product.quantity }),
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
          {en.requestQuote}
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
