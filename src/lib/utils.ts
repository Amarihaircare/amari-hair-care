import { nanoid } from "nanoid";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = ({
  amount,
  currency = "NGN",
  locale = "en-NG",
}: {
  amount: number;
  currency?: string;
  locale?: string;
}) => {
  return amount.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
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

export const convertToGram = (weight: string) => {
  const units: Record<string, number> = {
    g: 1,
    kg: 1000,
    mg: 0.001,
    ml: 1,
  };

  const [value, unit] = weight
    .trim()
    .match(/^(\d+(?:\.\d+)?)([a-zA-Z]+)$/)
    ?.slice(1) ?? ["0", "g"];

  return parseFloat(value) * (units[unit] ?? 1);
};

export const normalizePrice = ({
  min,
  max,
  value,
}: {
  min: number;
  max: number;
  value: number;
}) => {
  return Math.abs((value - min) / (max - min));
};
