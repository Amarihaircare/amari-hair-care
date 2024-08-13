"use client";
import { Button } from "../ui/button";
import { useManageCart } from "@/hooks/useManageCart";
import { useCart } from "@/hooks/useCart";
import { DocumentIcon } from "@/assets/icons";

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
      className="absolute bottom-0 flex h-10 w-10 items-center justify-center self-end p-0 font-semibold lg:hidden"
    >
      <DocumentIcon />
    </Button>
  );
}
