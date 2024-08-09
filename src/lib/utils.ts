import { nanoid } from "nanoid";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (
  amount: number,
  currency = "NGN",
  locale?: Intl.LocalesArgument,
) => {
  return amount.toLocaleString(locale ?? "en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to capitalize text based on sentence boundaries
export function capitalize(text: string, locale = "en") {
  const segmenter = new Intl.Segmenter(locale, { granularity: "sentence" });
  const segments = segmenter.segment(text);

  let capitalizedText = "";
  for (const segment of segments) {
    capitalizedText += capitalizeFirstLetter(segment.segment);
  }

  return capitalizedText;
}

export const generateId = (length = 10) => {
  return nanoid(length);
};

export const returnRandomSlice = <T>(array: T[], length: number) => {
  const randomArray = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return randomArray.slice(0, length);
};
