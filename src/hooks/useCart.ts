import { useCallback, useEffect, useState } from "react";
import { findProduct } from "@/assets/data/products";
import { useToast } from "@/components/ui/use-toast";
import { TLocalProduct } from "@/@types";

export const useCart = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<TLocalProduct[]>([]);
  console.log(cart, "in useCartG");

  // Initialize cart from localStorage on the client side
  useEffect(() => {
    const cartStorage = localStorage.getItem("cart");
    if (cartStorage) {
      try {
        const cartData = JSON.parse(cartStorage) as TLocalProduct[];
        setCart(cartData);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        setCart([]);
      }
    }
  }, [setCart]);

  const addToCart = useCallback(
    (productSlug: string, count: number) => {
      const product = findProduct(productSlug);

      if (!product) {
        console.error(`Product with slug ${productSlug} not found.`);
        toast({
          title: "Product not found",
          description: "Product not found, please try again.",
          variant: "destructive",
        });
        return;
      }

      const newProduct: TLocalProduct = {
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: count,
        slug: productSlug,
      };

      const filteredCart = cart.filter((item) => item.slug !== productSlug);
      const newCart = [...filteredCart, newProduct];

      try {
        setCart((prev) => [...prev, newProduct]);
        localStorage.setItem("cart", JSON.stringify(newCart));
        toast({
          title: "Added to cart",
          description:
            "Product added to cart successfully, view cart to checkout",
        });
      } catch (error) {
        console.error("Failed to update cart in localStorage:", error);
        toast({
          title: "Failed to add to cart",
          description: "Failed to add product to cart, please try again later.",
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
        setCart((prev) => prev.filter((item) => item.slug !== productSlug));
        console.log(cart, "in useCart");

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

  return { addToCart, removeFromCart, cart };
};
