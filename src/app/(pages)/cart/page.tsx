"use client";

import { useCart } from "@/hooks/useCart";
import CartItem from "@/components/cart/CartItem";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// Removed auto server sync on mount to prevent duplicate adds

export default function CartPage() {
  const { cart, cartTotal, currency, clearCart } = useCart();

  const locale = cart.length > 0 ? cart[0].prices.find(p => p.currency === currency)?.locale || "en-NG" : "en-NG";

  // Synchronization happens via CartProvider when items are added/updated.

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Shopping Cart</h1>

        {cart.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-12 text-center">
            <h2 className="text-xl font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-1 text-sm text-gray-500">
              Start shopping to add items to your cart.
            </p>
            <div className="mt-6">
              <Link href="/catalogue">
                <Button>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <div className="border-t border-gray-200">
                {cart.map((product) => (
                     <CartItem key={product.slug} item={product} />
                ))}
              </div>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                     {formatCurrency({ amount: cartTotal, currency, locale })}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    {formatCurrency({ amount: cartTotal, currency, locale })}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <Link href="/checkout">
                  <Button className="w-full">Checkout</Button>
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                 <button
                    type="button"
                    className="font-medium text-primary hover:text-primary/80"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
