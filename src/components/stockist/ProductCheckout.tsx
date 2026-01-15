import en from "@/language/en";
import ProductItem from "./ProductItem";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCart } from "@/hooks/useCart";

interface ProductCheckoutProps {
  handleNext: () => void;
}

export default function ProductCheckout({ handleNext }: ProductCheckoutProps) {
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
              prices={product.prices}
              quantity={product.quantity}
              slug={product.slug}
              index={index}
              length={cart.length}
            />
          ))
        ) : (
          <div className="mt-10 flex flex-col items-center">
            <p className="max-w-[300px] px-4 text-center text-sm">
              {en.emptyQuote}
            </p>

            <Link
              data-search="true"
              href="/catalogue"
              className="items-center justify-between border-b-2 border-primary font-medium hover:border-secondary lg:p-4"
            >
              {en.checkoutOurProducts}
            </Link>
          </div>
        )}
      </div>
      <Button
        onClick={handleNext}
        type="button"
        className="mt-10 gap-4 rounded bg-primary py-5 text-white"
        disabled={cart.length === 0}
      >
        {en.proceedToForm}
      </Button>
    </div>
  );
}
