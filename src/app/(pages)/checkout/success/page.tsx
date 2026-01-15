"use client";

import OtherPageHero from "@/components/shared/OtherPageHero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const [method, setMethod] = useState<string>("");
  const [statusText, setStatusText] = useState<string>(
    "We have received your order and are confirming it. Please check your email for your order details.",
  );
  const { clearCart } = useCart();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const oid = sp.get("order_id") || "";
      const ref = sp.get("reference") || "";
      const coid = sp.get("checkout_id") || "";
      const amt = sp.get("amount");
      const curr = sp.get("currency") || "";
      const mth = sp.get("method") || "";
      setOrderId(oid);
      setAmount(amt ? Number(amt) : 0);
      setCurrency(curr);
      setMethod(mth);

      const verifyIfNeeded = async () => {
        try {
          if (ref && coid) {
            const vres = await fetch(`/api/paystack/verify?reference=${encodeURIComponent(ref)}&checkout_id=${encodeURIComponent(coid)}`);
            const vdata = await vres.json();
            if (vres.ok && vdata?.success) {
              setOrderId(vdata.order_id || "");
              setStatusText("Your order has been confirmed. Please check your email for the full details.");
              try { clearCart(); } catch {}
              return true;
            }
          } else if (coid) {
            const ores = await fetch(`/api/checkout/verify?checkout_id=${encodeURIComponent(coid)}`);
            const odata = await ores.json();
            if (ores.ok && odata?.success) {
              setOrderId(odata.order_id || "");
              setStatusText("Your order has been confirmed. Please check your email for the full details.");
              try { clearCart(); } catch {}
              return true;
            }
          }
        } catch {}
        return false;
      };

      const poll = async () => {
        try {
          const verified = await verifyIfNeeded();
          if (verified) return;
          setStatusText(
            "Your order is pending and awaiting confirmation. We will notify you once it is confirmed. Please check your email for your order details.",
          );
        } catch {
          setStatusText(
            "We are unable to confirm your order right now. Please check your email for any updates or contact support if needed.",
          );
        }
      };
      poll();
    }
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <OtherPageHero heading="Order Confirmed" />
      <section className="flex w-full justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-xl rounded-lg border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <CheckIcon className="h-8 w-8 text-green-600" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Order received
          </h1>
          <p className="mt-3 text-sm text-gray-600 sm:text-base">
            {statusText}
          </p>

          {orderId && (
            <div className="mt-6 space-y-2 text-left text-sm text-gray-800 sm:text-base">
              <p>
                <span className="font-semibold">Order ID:</span>{" "}
                <span>{orderId}</span>
              </p>
              <p>
                <span className="font-semibold">Bill Amount:</span>{" "}
                <span>
                  {currency} {amount.toLocaleString()}
                </span>
              </p>
              {method && (
                <p>
                  <span className="font-semibold">Payment Method:</span>{" "}
                  <span>
                    {method === "cash_on_delivery" ? "Bank Transfer" : method}
                  </span>
                </p>
              )}
            </div>
          )}

          <div className="mt-8">
            <Link href="/catalogue">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
