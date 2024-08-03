import { MINIMUM_QUANTITY } from "@/lib/constants";
import { useState, useCallback, useEffect } from "react";

type TUseManageCart = {
  quantity?: number;
  productSlug: string;
  addToCart(productSlug: string, count: number): void;
  removeFromCart(productSlug: string): void;
};

export const useManageCart = ({
  quantity = MINIMUM_QUANTITY,
  productSlug,
  addToCart,
  removeFromCart,
}: TUseManageCart) => {
  const [count, setCount] = useState(quantity);

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  const handleCount = useCallback(
    (value: number) => {
      if (value === -1 && count === MINIMUM_QUANTITY) return;
      const newCount = count + value;
      setCount(newCount);
      addToCart(productSlug, newCount);
    },
    [count, addToCart, productSlug],
  );

  const handleAddToCart = useCallback(() => {
    addToCart(productSlug, count);
  }, [count, addToCart, productSlug]);

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
