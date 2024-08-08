import en from "@/language/en";
import ProductItem from "./ProductItem";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCart } from "@/hooks/useCart";
import { sendEmail } from "@/api";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { SpinnerIcon } from "@/assets/icons";

export default function ProductCheckout() {
  const { cart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  async function handlePlaceOrder() {
    setIsLoading(true);
    const formData = new FormData();
    const stockist = localStorage.getItem("stockist");
    const stockistData = stockist ? JSON.parse(stockist) : {};

    for (const key in stockistData) {
      formData.append(key, stockistData[key]);
    }
    formData.append(
      "products",
      JSON.stringify(
        cart.map((product) => ({
          name: product.name,
          price: product.price,
        })),
      ),
    );
    formData.append(
      "_subject",
      `New Order From ${stockistData.contactName || stockistData.stockistId}`,
    );

    await sendEmail(formData)
      .then(() => {
        toast({
          title: en.orderPlaced,
          description: en.orderPlacedDescription,
        });
      })
      .catch(() => {
        toast({
          title: en.somethingWentWrong,
          description: en.somethingWentWrongDescription,
          variant: "destructive",
        });
      });

    setIsLoading(false);
  }

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
              {en.emptyQuote}
            </p>

            <Link
              data-search="true"
              href="/catalogue"
              className="items-center justify-between border-b-2 border-primary font-medium hover:border-secondary lg:p-4"
            >
              {en.catalogue}
            </Link>
          </>
        )}
      </div>
      <Button
        onClick={handlePlaceOrder}
        type="button"
        className="mt-10 gap-4 rounded bg-primary py-5 text-white"
        disabled={cart.length === 0} // Disable button if the cart is empty
      >
        {en.requestQuote}
        {isLoading && <SpinnerIcon className="animate-spin" />}
      </Button>
    </div>
  );
}
