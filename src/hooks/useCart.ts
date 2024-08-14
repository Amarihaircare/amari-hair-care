import { TLocalProduct } from "@/@types";
import { useContext, createContext } from "react";

// Define the context type
interface CartContextType {
  cart: TLocalProduct[];
  addToCart: (productSlug: string, count: number) => void;
  removeFromCart: (productSlug: string) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
