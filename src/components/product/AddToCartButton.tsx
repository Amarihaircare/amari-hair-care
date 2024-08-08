"use client";
import en from "@/language/en";
import { Button } from "../ui/button";
import { useManageCart } from "@/hooks/useManageCart";
import { useCart } from "@/hooks/useCart";

interface IAddToCartActionProps {
  slug?: string;
}

export default function AddToCartAction({ slug }: IAddToCartActionProps) {
  const { cart } = useCart();
  const product = cart.find((item) => item.slug === slug);

  const { handleAddToCart, count } = useManageCart({
    productSlug: slug!,
    ...(product && { quantity: product.quantity }),
  });

  return (
    <Button
      onClick={() => handleAddToCart((product?.quantity ?? count - 1) + 1)}
      variant={"secondary"}
      className="absolute bottom-0 self-end font-semibold lg:hidden"
    >
      {en.addToQuote}
    </Button>
  );
}
