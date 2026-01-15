"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { TFormValues } from "@/@types";
import InputFieldset from "@/components/ui/InputFieldset";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export default function CheckoutForm() {
  const { cart, cartTotal, currency, clearCart } = useCart();
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<TFormValues>();
  const router = useRouter();
  const { toast } = useToast();
  
  // State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  
  // Checkout Data
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'cash_on_delivery'>('paystack');
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [selectedShippingId, setSelectedShippingId] = useState<string>("");
  const [couponCode, setCouponCode] = useState("");
  const [orderSummary, setOrderSummary] = useState<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [shippingStates, setShippingStates] = useState<any[]>([]);
  const [billingStates, setBillingStates] = useState<any[]>([]);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [checkoutTasks, setCheckoutTasks] = useState<any>(null);
  const [offlineEligible, setOfflineEligible] = useState<boolean>(false);
  const [zohoError, setZohoError] = useState<string>("");
  
  const [submittedData, setSubmittedData] = useState<Partial<TFormValues>>({});
  
  const selectedCountry = watch("country");
  const selectedBillingCountry = watch("billing_country");

  useEffect(() => {
    if (selectedCountry && countries.length > 0) {
        const country = countries.find((c: any) => (c.country_code || c.code) === selectedCountry);
        setShippingStates(country?.states || []);
        // Optional: clear state if country changes, but be careful on initial load
        // setValue("state", ""); 
    } else {
        setShippingStates([]);
    }
  }, [selectedCountry, countries, setValue]);

  useEffect(() => {
    if (selectedBillingCountry && countries.length > 0) {
        const country = countries.find((c: any) => (c.country_code || c.code) === selectedBillingCountry);
        setBillingStates(country?.states || []);
    } else {
        setBillingStates([]);
    }
  }, [selectedBillingCountry, countries]);
  
  const locale = cart.length > 0 ? cart[0].prices.find(p => p.currency === currency)?.locale || "en-NG" : "en-NG";

  useEffect(() => {
    const initOnly = async () => {
      if (checkoutId) {
        setIsInitializing(false);
        return;
      }
      if (cart.length === 0) {
        setIsInitializing(false);
        return;
      }
      try {
        const initRes = await fetch('/api/checkout/init');
        if (initRes.ok) {
          const initData = await initRes.json();
          if (initData.checkout_id) {
            setCheckoutId(initData.checkout_id);
            if (initData.countries) setCountries(initData.countries);
            if (initData.completed_tasks) setCheckoutTasks(initData.completed_tasks);
            if (typeof initData.is_offline_payment_eligible !== 'undefined') setOfflineEligible(!!initData.is_offline_payment_eligible);
            
            // Check for potential configuration errors from Zoho
            if (initData.error_message) {
                setZohoError(initData.error_message);
                console.warn("Zoho Checkout Warning:", initData.error_message);
                toast({ 
                    title: "Store Configuration Notice", 
                    description: initData.error_message, 
                    variant: "default" // Warning level
                });
            } else {
                setZohoError("");
            }
          }
        } else {
          const errorData: any = await initRes.json().catch(() => ({}));
          if (initRes.status === 400 && errorData.code === 'EMPTY_CART') {
            clearCart();
            toast({
              title: "Cart session expired",
              description: "Your cart has been cleared. Please add your items again.",
              variant: "default",
              duration: 2000,
            });
            router.push('/cart');
            return;
          }
          toast({
            title: "Checkout Error",
            description: errorData.error || "Could not initialize checkout.",
            variant: "destructive",
          });
        }
      } catch (e) {
        console.error("Checkout init failed", e);
      } finally {
        setIsInitializing(false);
      }
    };
    initOnly();
  }, [cart, router, toast, checkoutId]);

  // Step 1: Submit Address
  const onAddressSubmit = async (data: TFormValues) => {
    if (!checkoutId) {
        toast({ title: "Session Error", description: "Checkout session missing. Refreshing...", variant: "destructive" });
        window.location.reload();
        return;
    }

    setIsSubmitting(true);
    try {
        const shippingAddress = {
            name: data.name,
            email: data.email,
            address: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip,
            country: data.country,
            phone: data.phone
        };

        const billingAddress = billingSameAsShipping ? shippingAddress : {
            name: data.name,
            email: data.email,
            address: data.billing_address,
            city: data.billing_city,
            state: data.billing_state,
            zip: data.billing_zip,
            country: data.billing_country,
            phone: data.billing_phone || data.phone
        };

        const res = await fetch('/api/checkout/address', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                checkout_id: checkoutId,
                shipping_address: shippingAddress,
                billing_address: billingAddress
            })
        });

        const resData = await res.json();
        if (!res.ok) throw new Error(resData.error || "Address update failed");

        setSubmittedData(data);
        setShippingMethods(resData.shipping_methods || []);
        if (resData.checkout) setOrderSummary(resData.checkout);
        if (resData.checkout?.completed_tasks) setCheckoutTasks(resData.checkout.completed_tasks);
        if (typeof resData.checkout?.is_offline_payment_eligible !== 'undefined') setOfflineEligible(!!resData.checkout.is_offline_payment_eligible);
        
        // Auto-select first method if available
        if (resData.shipping_methods?.length > 0) {
          const first = resData.shipping_methods[0];
          setSelectedShippingId(first.shipping_id || first.id);
        }

        setStepIndex(1);
    } catch (e: any) {
        toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
        setIsSubmitting(false);
    }
  };

  // Step 2: Select Shipping
  const onShippingSubmit = async () => {
    if (!checkoutId || !selectedShippingId) return;

    setIsSubmitting(true);
    try {
        const res = await fetch('/api/checkout/shipping', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                checkout_id: checkoutId,
                shipping_method_id: selectedShippingId
            })
        });
        
        const resData = await res.json();
        if (!res.ok) throw new Error("Failed to set shipping method");

        if (resData.checkout) setOrderSummary(resData.checkout);
        if (resData.checkout?.completed_tasks) setCheckoutTasks(resData.checkout.completed_tasks);
        if (typeof resData.checkout?.is_offline_payment_eligible !== 'undefined') setOfflineEligible(!!resData.checkout.is_offline_payment_eligible);
        
        setStepIndex(2);
      } catch (e: any) {
        toast({ title: "Error", description: e.message, variant: "destructive" });
      } finally {
        setIsSubmitting(false);
    }
  };

  // Step 3: Apply Coupon
  const applyCoupon = async () => {
    if (!checkoutId || !couponCode) return;
    
    try {
        const res = await fetch('/api/checkout/coupons', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                checkout_id: checkoutId,
                coupon_code: couponCode
            })
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Invalid coupon");
        
        if (data.checkout) setOrderSummary(data.checkout);
        toast({ title: "Coupon Applied", description: "Discount applied successfully." });
    } catch (e: any) {
        toast({ title: "Coupon Failed", description: e.message, variant: "destructive" });
    }
  };

  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
  };

  // Step 4: Final Payment
  const onFinalPayment = async () => {
    if (!checkoutId) return;
    
    setIsSubmitting(true);
    try {
        // Strict Rule: Read csrfp cookie first
        const csrfp = getCookie('csrfp');
        const csrfc = getCookie('csrfc');
        const lsCsrf = getCookie('LS_CSRF_TOKEN');
        
        // Priority: csrfp > csrfc > LS_CSRF_TOKEN
        const csrfToken = csrfp || csrfc || lsCsrf;
        
        console.log('[Checkout] CSRF Extraction:', { csrfp, csrfc, lsCsrf, selected: csrfToken });
        
        const headers: any = { 
            'Content-Type': 'application/json',
            'domain-name': 'amariscalpcare.zohoecommerce.com' 
        };
        
        // Strict Rule: Add Header X-ZCSRF-TOKEN
        if (csrfToken) headers['X-ZCSRF-TOKEN'] = `csrfp=${csrfToken}`;
        
        // Determine Endpoint based on Payment Method
        const isOffline = paymentMethod === 'cash_on_delivery';
        const endpoint = isOffline 
            ? '/api/checkout/offline-payment' 
            : '/api/paystack/initialize';

        console.log(`[Checkout] Calling API: ${endpoint}`);
        let res: Response;
        if (isOffline) {
          res = await fetch(`${endpoint}?t=${Date.now()}`, {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify({
              checkout_id: checkoutId,
              payment_gateway: paymentMethod
            })
          });
        } else {
          const emailForPaystack = String(submittedData.email || '');
          const amountForPaystack = Number(grandTotal || 0);
          res = await fetch(`${endpoint}?t=${Date.now()}`, {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify({
              email: emailForPaystack,
              amount: amountForPaystack,
              currency,
              checkout_id: checkoutId
            })
          });
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Payment initiation failed");

        const redirectUrl = data.redirect_url || data.payment_url || data.authorization_url;
        
        // Fix: Ignore redirect URL for offline payments to prevent 404 errors (Zoho returns a broken internal URL)
        // Online payments (Paystack) MUST redirect to authorization_url.
        if (redirectUrl && !isOffline) {
          console.log('[Checkout] Redirecting to:', redirectUrl);
          window.location.href = redirectUrl;
        } else if (data.success === true && data.order_id) {
          clearCart();
          const amountParam = typeof grandTotal === 'number' ? grandTotal : 0;
          const methodParam = paymentMethod;
          const currencyParam = currency;
          const oid = data.order_id || '';
          const qs = new URLSearchParams({
            ...(oid ? { order_id: String(oid) } : {}),
            amount: String(amountParam),
            currency: String(currencyParam),
            method: String(methodParam),
          }).toString();
          router.push(`/checkout/success?${qs}`);
        } else if (isOffline) {
          if (data.success === false) {
             throw new Error(data.error || "Offline payment processing failed. Please try again.");
          }
          
          // Clear cart on successful offline order placement
          clearCart();
          
          const amountParam = typeof grandTotal === 'number' ? grandTotal : 0;
          const qs = new URLSearchParams({
            checkout_id: String(checkoutId),
            amount: String(amountParam),
            currency: String(currency),
            method: String(paymentMethod),
          }).toString();
          router.push(`/checkout/success?${qs}`);
        } else {
          throw new Error("Order not created yet. Please try again.");
        }

    } catch (e: any) {
        toast({ title: "Payment Failed", description: e.message, variant: "destructive" });
        try {
          const statusRes = await fetch('/api/checkout/init');
          const statusData = await statusRes.json();
          if (statusRes.ok) {
            if (statusData.completed_tasks) setCheckoutTasks(statusData.completed_tasks);
            if (typeof statusData.is_offline_payment_eligible !== 'undefined') setOfflineEligible(!!statusData.is_offline_payment_eligible);
          }
        } catch {}
    } finally {
        setIsSubmitting(false);
    }
  };


  if (cart.length === 0) {
      return (
          <div className="text-center py-12">
              <p className="text-lg text-gray-500">Your cart is empty.</p>
              <Button onClick={() => router.push("/catalogue")} className="mt-4">Go to Catalogue</Button>
          </div>
      )
  }

  if (isInitializing) {
      return (
          <div className="flex flex-col items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-gray-500">
                  {"Initializing checkout..."}
              </p>
          </div>
      )
  }

  const pick = (obj: any, keys: string[]) => {
    if (!obj) return undefined;
    for (const k of keys) {
      if (obj[k] !== undefined) return obj[k];
    }
    return undefined;
  };
  const subTotal =
    pick(orderSummary, ['sub_total']) ??
    pick(orderSummary?.order, ['sub_total']) ??
    pick(orderSummary?.pricing_details, ['sub_total']) ??
    cartTotal;
  const shippingCharge =
    pick(orderSummary, ['shipping_amount', 'shipping_charge']) ??
    pick(orderSummary?.order, ['shipping_amount']) ??
    pick(orderSummary?.pricing_details, ['shipping_amount', 'shipping_charge']) ??
    0;
  const taxTotal =
    pick(orderSummary, ['tax_amount', 'tax_total']) ??
    pick(orderSummary?.order, ['tax_amount']) ??
    pick(orderSummary?.pricing_details, ['tax_amount', 'tax_total']) ??
    0;
  const discountAmount =
    pick(orderSummary, ['discount_amount']) ??
    pick(orderSummary?.order, ['discount_amount']) ??
    pick(orderSummary?.pricing_details, ['discount_amount']) ??
    0;
  const grandTotal =
    pick(orderSummary, ['total', 'grand_total']) ??
    pick(orderSummary?.order, ['total', 'grand_total']) ??
    pick(orderSummary?.pricing_details, ['total', 'grand_total']) ??
    subTotal + shippingCharge + taxTotal - discountAmount;

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
      <div>
        {/* Steps Indicator */}
        <div className="mb-6 flex items-center gap-6 text-sm">
          <span className={stepIndex === 0 ? "font-semibold text-black" : "text-gray-500"}>Address</span>
          <span className={stepIndex === 1 ? "font-semibold text-black" : "text-gray-500"}>Dispatch</span>
          <span className={stepIndex === 2 ? "font-semibold text-black" : "text-gray-500"}>Payment</span>
        </div>

        {/* Step 1: Address Form */}
        {stepIndex === 0 && (
          <form onSubmit={handleSubmit(onAddressSubmit)} className="mt-4">
              <div className="flex flex-col gap-4">
                  <InputFieldset name="email" label="Email address" type="email" register={register} required="Email is required" error={errors.email?.message} />
                  <InputFieldset name="name" label="Full Name" type="text" register={register} required="Name is required" error={errors.name?.message} />
                  <InputFieldset name="phone" label="Phone Number" type="tel" register={register} required="Phone Number is required" error={errors.phone?.message} />
              </div>

              <h2 className="mt-10 text-lg font-medium text-gray-900">Shipping information</h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                      <InputFieldset name="address" label="Address" type="text" register={register} required="Address is required" error={errors.address?.message} />
                  </div>
                  <InputFieldset name="city" label="City" type="text" register={register} required="City is required" error={errors.city?.message} />
                        
                        {shippingStates.length > 0 ? (
                            <div className="flex w-full flex-col gap-2">
                                <label htmlFor="state" className="text-sm font-medium">State / Province</label>
                                <select
                                    id="state"
                                    className="flex h-10 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...register("state", { required: "State is required" })}
                                >
                                    <option value="">Select State</option>
                                    {shippingStates.map((s: any) => (
                                        <option key={s.code} value={s.code}>{s.name}</option>
                                    ))}
                                </select>
                                {errors.state && <p className="text-sm italic text-red-500">{errors.state.message}</p>}
                            </div>
                        ) : (
                            <InputFieldset name="state" label="State / Province" type="text" register={register} required="State is required" error={errors.state?.message} />
                        )}

                        <InputFieldset name="zip" label="Postal code" type="text" register={register} required="Postal code is required" error={errors.zip?.message} />
                {countries.length > 0 ? (
                    <div className="flex w-full flex-col gap-2">
                        <label htmlFor="country" className="text-sm font-medium">Country</label>
                        <select
                            id="country"
                            className="flex h-10 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...register("country", { required: "Country is required" })}
                        >
                            <option value="">Select Country</option>
                            {countries.map((c: any) => (
                                <option key={c.country_code || c.code} value={c.country_code || c.code}>{c.country_name || c.name}</option>
                            ))}
                        </select>
                        {errors.country && <p className="text-sm italic text-red-500">{errors.country.message}</p>}
                    </div>
                ) : (
                    <InputFieldset name="country" label="Country" type="text" register={register} required="Country is required" error={errors.country?.message} />
                )}
            </div>

            <div className="mt-6 flex items-center">
                <input
                    id="billingSameAsShipping"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={billingSameAsShipping}
                    onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                />
                <label htmlFor="billingSameAsShipping" className="ml-2 block text-sm text-gray-900">
                    Billing Address is same as Shipping Address
                </label>
            </div>

            {!billingSameAsShipping && (
                <div className="mt-6">
                    <h2 className="text-lg font-medium text-gray-900">Billing information</h2>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div className="sm:col-span-2">
                            <InputFieldset name="billing_address" label="Address" type="text" register={register} required="Billing Address is required" error={errors.billing_address?.message} />
                        </div>
                        <InputFieldset name="billing_city" label="City" type="text" register={register} required="Billing City is required" error={errors.billing_city?.message} />
                        
                        {billingStates.length > 0 ? (
                            <div className="flex w-full flex-col gap-2">
                                <label htmlFor="billing_state" className="text-sm font-medium">State / Province</label>
                                <select
                                    id="billing_state"
                                    className="flex h-10 w-full rounded-[10px] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...register("billing_state", { required: "Billing State is required" })}
                                >
                                    <option value="">Select State</option>
                                    {billingStates.map((s: any) => (
                                        <option key={s.code} value={s.code}>{s.name}</option>
                                    ))}
                                </select>
                                {errors.billing_state && <p className="text-sm italic text-red-500">{errors.billing_state.message}</p>}
                            </div>
                        ) : (
                            <InputFieldset name="billing_state" label="State / Province" type="text" register={register} required="Billing State is required" error={errors.billing_state?.message} />
                        )}

                        <InputFieldset name="billing_zip" label="Postal code" type="text" register={register} required="Billing Postal code is required" error={errors.billing_zip?.message} />
                        {countries.length > 0 ? (
                            <div className="flex w-full flex-col gap-2">
                                <label htmlFor="billing_country" className="text-sm font-medium">Country</label>
                                <select
                                    id="billing_country"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...register("billing_country", { required: "Billing Country is required" })}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((c: any) => (
                                        <option key={c.country_code || c.code} value={c.country_code || c.code}>{c.country_name || c.name}</option>
                                    ))}
                                </select>
                                {errors.billing_country && <p className="text-sm italic text-red-500">{errors.billing_country.message}</p>}
                            </div>
                        ) : (
                            <InputFieldset name="billing_country" label="Country" type="text" register={register} required="Billing Country is required" error={errors.billing_country?.message} />
                        )}
                        <InputFieldset name="billing_phone" label="Phone Number" type="tel" register={register} required="Billing Phone Number is required" error={errors.billing_phone?.message} />
                    </div>
                </div>
            )}

              <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
                  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? "Saving Address..." : "Continue to Shipping"}
                  </Button>
              </div>
          </form>
        )}

        {/* Step 2: Shipping Method */}
        {stepIndex === 1 && (
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-900">Shipping Methods</h2>
            <div className="mt-4 space-y-4">
              {shippingMethods.length === 0 ? (
                  <p className="text-sm text-gray-500">No shipping methods available for this address.</p>
              ) : (
                  shippingMethods.map((method: any) => (
                    <label key={method.id || method.shipping_id} className="flex items-center gap-3 border p-4 rounded cursor-pointer hover:bg-gray-50">
                        <input
                        type="radio"
                        name="shipping"
                        checked={selectedShippingId === (method.id || method.shipping_id)}
                        onChange={() => {
                            setSelectedShippingId(method.id || method.shipping_id);
                        }}
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                        />
                        <div className="flex-1">
                            <span className="block text-sm font-medium text-gray-900">{method.name || method.shipping_carrier}</span>
                            <span className="block text-sm text-gray-500">{method.description || method.delivery_days}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                            {formatCurrency({ amount: method.rate || method.cost || method.shipping_rate || 0, currency, locale })}
                        </span>
                    </label>
                  ))
              )}
            </div>
            <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
              <Button variant="outline" onClick={() => setStepIndex(0)} className="mr-4">Back</Button>
              <Button onClick={onShippingSubmit} disabled={isSubmitting || !selectedShippingId} className="w-full sm:w-auto">
                {isSubmitting ? "Saving..." : "Continue to Payment"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment & Review */}
        {stepIndex === 2 && (
          <div className="mt-4 space-y-8">
             {/* Address Section */}
             <div className="border-b pb-6">
                <div className="flex justify-between items-start">
                   <div>
                       <h3 className="text-base font-medium text-gray-900">{submittedData.name}</h3>
                       <p className="mt-1 text-sm text-gray-500">
                           {submittedData.address}, {submittedData.city}<br/>
                           {submittedData.state}, {submittedData.country}<br/>
                           {submittedData.phone}
                       </p>
                   </div>
                   <Button variant="outline" size="sm" onClick={() => setStepIndex(0)}>Change</Button>
                </div>
             </div>
 
             {/* Shipping Method Section */}
             <div className="border-b pb-6">
                <div className="flex justify-between items-start">
                   <div>
                       <h3 className="text-base font-medium text-gray-900">Shipping Methods</h3>
                       {(() => {
                           const method = shippingMethods.find(m => (m.id || m.shipping_id) === selectedShippingId);
                           if (!method) {
                             return <p className="text-sm text-red-500">No method selected</p>;
                           }
                           const methodAmount = formatCurrency({
                             amount: method.rate || method.cost || method.shipping_rate || 0,
                             currency,
                             locale,
                           });
                           const detail = method.description || method.delivery_days;
                           return (
                             <div className="mt-1 text-sm text-gray-500">
                               <p className="font-medium text-gray-900">
                                 {method.name || method.shipping_carrier}
                               </p>
                               <p>
                                 {methodAmount}
                                 {detail ? ` (${detail})` : ""}
                               </p>
                             </div>
                           );
                       })()}
                   </div>
                   <Button variant="outline" size="sm" onClick={() => setStepIndex(1)}>Change</Button>
                </div>
             </div>

             <div className="border-b pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                <div className="space-y-4">
                    <label className={`flex items-center gap-3 border p-4 rounded-[10px] cursor-pointer bg-gray-50 border-black`}>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="paystack"
                            checked={true}
                            readOnly
                            className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                        />
                        <div className="flex-1">
                            <span className="block text-sm font-medium text-gray-900">Online Payment</span>
                            <span className="block text-xs text-gray-500">Pay securely with Card, Bank Transfer, or USSD via Paystack</span>
                        </div>
                    </label>
                </div>
             </div>

             {/* Items Review */}
             <div>
                 <h3 className="text-lg font-medium text-gray-900 mb-4">Review Order & Make Payment</h3>
                 <div className="overflow-hidden border rounded-[10px]">
                     <table className="min-w-full divide-y divide-gray-200">
                         <thead className="bg-gray-50">
                             <tr>
                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                 <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                             </tr>
                         </thead>
                         <tbody className="bg-white divide-y divide-gray-200">
                             {cart.map((product) => (
                                 <tr key={product.slug}>
                                     <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 relative">
                            <Image src={product.image} alt={product.name} fill className="rounded-[10px] object-cover" />
                        </div>
                                             <div className="ml-4">
                                                 <div className="text-sm font-medium text-gray-900 text-wrap max-w-[150px]">{product.name}</div>
                                             </div>
                                         </div>
                                     </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                         {product.quantity}
                                     </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                         {formatCurrency({ 
                                             amount: (product.prices.find(p => p.currency === currency)?.amount || 0) * product.quantity, 
                                             currency, 
                                             locale 
                                         })}
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
                 <div className="mt-6 bg-gray-50 p-6 rounded-[10px] border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Subtotal</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency({ amount: subTotal, currency, locale })}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Shipping</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency({ amount: shippingCharge, currency, locale })}
                      </span>
                    </div>
                    {taxTotal > 0 && (
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Tax</span>
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency({ amount: taxTotal, currency, locale })}
                        </span>
                      </div>
                    )}
                    {discountAmount > 0 && (
                      <div className="mt-3 flex items-center justify-between text-green-700">
                        <span className="text-sm font-medium">Discount</span>
                        <span className="text-sm font-medium">
                          -{formatCurrency({ amount: discountAmount, currency, locale })}
                        </span>
                      </div>
                    )}
                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                      <span className="text-base font-bold text-gray-900">Total</span>
                      <span className="text-base font-bold text-gray-900">
                        {formatCurrency({ amount: grandTotal, currency, locale })}
                      </span>
                    </div>
                 </div>
             </div>
 


             {/* Action Button */}
             <div className="pt-4">
                 <Button 
                   onClick={onFinalPayment} 
                   disabled={isSubmitting} 
                   className="w-full sm:w-auto px-8 py-6 text-base bg-black hover:bg-gray-800"
                 >
                   {isSubmitting ? "Processing..." : "Place Order"}
                 </Button>
             </div>
           </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="mt-10 lg:mt-0">
        
        {/* Coupon Section - Moved here */}
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter Coupon Code</label>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="block w-full rounded-[10px] border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
                    placeholder="Coupon Code"
                />
                <Button onClick={applyCoupon} className="bg-black text-white hover:bg-gray-800">Apply</Button>
            </div>
        </div>

        <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
             {/* Only show details toggle or similar if needed, keeping simple for now */}
        </div>

        <div className="rounded-[10px] border border-gray-200 bg-white shadow-sm">
          {stepIndex !== 2 && (
              <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
                {cart.map((product) => (
                  <li key={product.slug} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0 relative h-20 w-20">
                      <Image src={product.image} alt={product.name} fill className="rounded-[10px] object-cover" />
                    </div>
                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">{product.name}</h4>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                            {formatCurrency({ 
                                amount: product.prices.find(p => p.currency === currency)?.amount || 0, 
                                currency, 
                                locale 
                            })}
                        </p>
                         <p className="text-sm text-gray-500">Qty {product.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
          )}
          <dl className="space-y-6 px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-600">Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} Items)</dt>
              <dd className="text-sm font-medium text-gray-900">
                  {formatCurrency({ amount: subTotal, currency, locale })}
              </dd>
            </div>
             <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-600">Shipping</dt>
              <dd className="text-sm font-medium text-gray-900">
                  {formatCurrency({ amount: shippingCharge, currency, locale })}
              </dd>
            </div>
            {discountAmount > 0 && (
                <div className="flex items-center justify-between text-green-600">
                    <dt className="text-sm font-medium">Discount</dt>
                    <dd className="text-sm font-medium">
                        -{formatCurrency({ amount: discountAmount, currency, locale })}
                    </dd>
                </div>
            )}
            {taxTotal > 0 && (
                <div className="flex items-center justify-between">
                    <dt className="text-sm font-medium text-gray-600">Tax</dt>
                    <dd className="text-sm font-medium text-gray-900">
                        {formatCurrency({ amount: taxTotal, currency, locale })}
                    </dd>
                </div>
            )}
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <dt className="text-base font-bold text-gray-900">Total</dt>
              <dd className="text-base font-bold text-gray-900">
                  {formatCurrency({ amount: grandTotal, currency, locale })}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
