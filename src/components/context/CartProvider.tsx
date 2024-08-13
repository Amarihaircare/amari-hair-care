"use client";
import { useState, useEffect, useCallback } from "react";
import { findProduct } from "@/assets/data/products";
import { useToast } from "@/components/ui/use-toast";
import { TLocalProduct } from "@/@types";
import { CartContext } from "@/hooks/useCart";

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { toast } = useToast();
  const [cart, setCart] = useState<TLocalProduct[] | []>([]);

  useEffect(() => {
    const cartStorage = localStorage.getItem("cart");
    if (cartStorage) {
      try {
        const cartData = JSON.parse(cartStorage);
        setCart(cartData);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        setCart([]);
      }
    }
  }, []);

  const addToCart = useCallback(
    (productSlug: string, count: number) => {
      const product = findProduct(productSlug);

      if (!product) {
        toast({
          title: "Product not found",
          description: "Product not found, please try again.",
          variant: "destructive",
        });
        return;
      }

      const newProduct = {
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: count,
        slug: productSlug,
      };
      const existingProductIndex = cart.findIndex(
        (item) => item.slug === productSlug,
      );
      let newCart = [...cart];

      if (existingProductIndex === -1) {
        newCart = [...cart, newProduct];
      }
      if (existingProductIndex !== -1)
        newCart[existingProductIndex].quantity = count;

      try {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        toast({
          title: "Quote Requested",
          description:
            "Product added to list, Fill stockist form at check out to view list and complete request",
        });
      } catch (error) {
        console.error("Failed to update cart in localStorage:", error);
        toast({
          title: "Failed to add to product",
          description:
            "Failed to add product to quote, please try again later.",
          variant: "destructive",
        });
      }
    },
    [cart, toast],
  );

  const removeFromCart = useCallback(
    (productSlug: string) => {
      const filteredCart = cart.filter((item) => item.slug !== productSlug);

      try {
        localStorage.setItem("cart", JSON.stringify(filteredCart));
        setCart(filteredCart);
        toast({
          title: "Removed from cart",
          description: "Product removed from cart successfully.",
        });
      } catch (error) {
        console.error("Failed to update cart in localStorage:", error);
        toast({
          title: "Failed to remove from cart",
          description:
            "Failed to remove product from cart, please try again later.",
          variant: "destructive",
        });
      }
    },
    [cart, toast],
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
