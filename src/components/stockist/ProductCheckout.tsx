import en from "@/language/en";
import ProductItem from "./ProductItem";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCart } from "@/hooks/useCart";

export default function ProductCheckout() {
  const { cart } = useCart();

  return (
    <div className="flex w-full max-w-[600px] flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{en.productCheckout}</h1>
        <Link href="/catalogue" className="font-semibold text-green-700">
          {en.addProduct}
        </Link>
      </div>
      <div className="flex flex-col">
        {cart.map((product, index) => (
          <ProductItem
            key={product.slug}
            name={product.name}
            image={product.image}
            price={product.price}
            discount={product.discount}
            quantity={product.quantity}
            slug={product.slug}
            index={index}
            length={cart.length}
          />
        ))}
      </div>
      <Button
        type="button"
        className="mt-10 rounded bg-primary py-5 text-white"
        disabled={cart.length === 0} // Disable button if the cart is empty
      >
        {en.placeOrder}
      </Button>
    </div>
  );
}
