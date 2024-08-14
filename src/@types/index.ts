import { StaticImageData } from "next/image";

export type TLocalProduct = {
  name: string;
  slug: string;
  prices: {
    amount: number;
    currency: string;
    locale: string;
  }[];
  quantity: number;
  image: StaticImageData;
};

export type TFormValues = {
  companyName?: string;
  contactName?: string;
  phone?: string;
  address?: string;
  comments?: string;
  stockistId?: string;
  name?: string;
  email?: string;
  message?: string;
};
