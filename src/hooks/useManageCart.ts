import { MINIMUM_QUANTITY } from "@/lib/constants";
import { useState, useCallback, useEffect } from "react";
import { useCart } from "./useCart";

type TUseManageCart = {
  quantity?: number;
  productSlug: string;
  productInfo?: {
    name: string;
    prices: {
      amount: number;
      currency: string;
      locale: string;
    }[];
    image: string | import("next/image").StaticImageData;
    variantId?: string | number;
  };
};

export const useManageCart = ({
  quantity = MINIMUM_QUANTITY,
  productSlug,
  productInfo,
}: TUseManageCart) => {
  const [count, setCount] = useState(quantity);
  const { addToCart, removeFromCart } = useCart();

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  const handleCount = useCallback(
    (value: number) => {
      if (value === -1 && count === MINIMUM_QUANTITY) return;
      const newCount = count + value;
      setCount(newCount);
      addToCart(productSlug, newCount, productInfo);
    },
    [count, addToCart, productSlug, productInfo],
  );

  const handleAddToCart = useCallback(
    (quantity = count) => {
      addToCart(productSlug, quantity, productInfo);
    },
    [addToCart, productSlug, count, productInfo],
  );

  const handleRemoveFromCart = useCallback(() => {
    removeFromCart(productSlug);
  }, [removeFromCart, productSlug]);

  return {
    count,
    handleCount,
    handleAddToCart,
    handleRemoveFromCart,
  };
};
