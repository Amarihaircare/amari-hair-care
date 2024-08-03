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
      <div className="flex flex-col items-center gap-2">
        {cart?.length ? (
          cart.map((product, index) => (
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
          ))
        ) : (
          <>
            <p className="max-w-[300px] px-4 text-center text-sm">
              {en.emptyCart}
            </p>

            <Link
              data-search="true"
              href="/catalogue"
              className="items-center justify-between font-medium lg:p-4"
            >
              {en.catalogue}
            </Link>
          </>
        )}
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
