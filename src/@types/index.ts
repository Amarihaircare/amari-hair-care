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
  image: string | StaticImageData;
  variantId?: string | number;
  productId?: string | number;
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
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  paymentMethod?: string;
  billing_name?: string;
  billing_email?: string;
  billing_address?: string;
  billing_city?: string;
  billing_state?: string;
  billing_zip?: string;
  billing_country?: string;
  billing_phone?: string;
};
