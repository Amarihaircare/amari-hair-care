import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const currencySymbols: { [key: string]: string } = {
  NGN: "₦",
  USD: "$",
  EUR: "€",
};

export const formatCurrency = (amount: number, currency: string) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);

  if (currency in currencySymbols) {
    return formattedAmount.replace(currency, currencySymbols[currency]);
  }
  return formattedAmount;
};
