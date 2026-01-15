"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
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
  const [currency, setCurrency] = useState("NGN");

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
    (
      productSlug: string,
      count: number,
      productOverride?: Pick<TLocalProduct, "name" | "prices" | "image" | "variantId">,
    ) => {
      const product = findProduct(productSlug);

      const existingItem = cart.find(item => item.slug === productSlug);

      const newProduct: TLocalProduct = {
        name: productOverride?.name ?? existingItem?.name ?? product?.name ?? "",
        prices: productOverride?.prices ?? existingItem?.prices ?? product?.prices ?? [],
        image: productOverride?.image ?? existingItem?.image ?? (product?.images?.[0] || ""),
        quantity: count,
        slug: productSlug,
        variantId: productOverride?.variantId ?? existingItem?.variantId,
      };
      
      if (!newProduct.name || !newProduct.prices?.length) {
        toast({
          title: "Product not found",
          description: "Product not found, please try again.",
          variant: "destructive",
        });
        return;
      }
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
        
        // Sync with Zoho API and always include cart_id per docs
        if (newProduct.variantId) {
            (async () => {
              try {
                const cartRes = await fetch('/api/cart');
                let serverItems: any[] = [];
                let serverCartId = "";
                if (cartRes.ok) {
                  const data = await cartRes.json();
                  serverItems = data?.payload?.cart?.items || data?.cart?.items || data?.data?.cart?.items || [];
                  serverCartId = data?.payload?.cart?.id || data?.cart?.id || data?.cart_id || "";
                }
                const serverItem = serverItems.find((s: any) =>
                  String(s.variant_id) === String(newProduct.variantId) ||
                  String(s.product_variant_id) === String(newProduct.variantId)
                );
                const isUpdate = !!serverItem || existingProductIndex !== -1;
                const payload = {
                  product_variant_id: newProduct.variantId,
                  quantity: count,
                  ...(serverCartId ? { cart_id: serverCartId } : {})
                };
                const method = isUpdate ? 'PUT' : 'POST';
                const res = await fetch('/api/cart', {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                });
                console.log(`CartProvider: ${isUpdate ? 'Update' : 'Add'} response`, res.status);
              } catch (e) {
                console.error("Background Cart Sync Failed", e);
              }
            })();
        } else {
            console.warn("CartProvider: Missing variantId for", newProduct.name);
        }

        toast({
          title: "Added to Cart",
          description: `${newProduct.name} has been added to your cart.`,
        });
      } catch (error) {
        console.error("Failed to update cart in localStorage:", error);
        toast({
          title: "Failed to add to product",
          description:
            "Failed to add product to cart, please try again later.",
          variant: "destructive",
        });
      }
    },
    [cart, toast],
  );

  const removeFromCart = useCallback(
    (productSlug: string) => {
      // Find item to get variantId before removing
      const itemToRemove = cart.find(item => item.slug === productSlug);
      const filteredCart = cart.filter((item) => item.slug !== productSlug);

      try {
        localStorage.setItem("cart", JSON.stringify(filteredCart));
        setCart(filteredCart);
        
        // Sync with Zoho API (include cart_id when available)
        if (itemToRemove?.variantId) {
            (async () => {
              try {
                const cartRes = await fetch('/api/cart');
                let serverCartId = "";
                if (cartRes.ok) {
                  const data = await cartRes.json();
                  serverCartId = data?.payload?.cart?.id || data?.cart?.id || data?.cart_id || "";
                }
                const params = new URLSearchParams();
                params.append('product_variant_id', String(itemToRemove.variantId));
                if (serverCartId) params.append('cart_id', serverCartId);
                await fetch(`/api/cart?${params.toString()}`, { method: 'DELETE' });
              } catch (e) {
                console.error("Background Cart Sync (Delete) Failed", e);
              }
            })();
        }

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

  const clearCart = useCallback(() => {
    try {
      localStorage.removeItem("cart");
      setCart([]);
      
      // Sync with Zoho API (Clear server cart)
      fetch('/api/cart/clear', { method: 'POST' })
        .then(res => res.json())
        .then(data => console.log("CartProvider: Clear response", data))
        .catch(e => console.error("Background Cart Sync (Clear) Failed", e));

      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  }, [toast]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = item.prices.find((p) => p.currency === currency)?.amount || 0;
      return total + price * item.quantity;
    }, 0);
  }, [cart, currency]);

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        currency,
        setCurrency,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
