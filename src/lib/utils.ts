import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (
  amount: number,
  currency = "NGN",
  locale?: Intl.LocalesArgument
) => {
  return amount.toLocaleString(locale ?? "en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });
};
