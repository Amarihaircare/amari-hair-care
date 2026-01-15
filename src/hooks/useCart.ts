import { TLocalProduct } from "@/@types";
import { useContext, createContext } from "react";

// Define the context type
interface CartContextType {
  cart: TLocalProduct[];
  addToCart: (
    productSlug: string,
    count: number,
    productOverride?: Pick<TLocalProduct, "name" | "prices" | "image" | "variantId">
  ) => void;
  removeFromCart: (productSlug: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  currency: string;
  setCurrency: (currency: string) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
