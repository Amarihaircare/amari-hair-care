"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Checkout</h1>
        <CheckoutForm />
      </div>
    </main>
  );
}
