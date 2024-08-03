import { StaticImageData } from "next/image";

export type TLocalProduct = {
  name: string;
  slug: string;
  price: number;
  discount?: number;
  quantity: number;
  image: StaticImageData;
};

export type TFormValues = {
  companyName?: string;
  contactName?: string;
  phone?: string;
  address?: string;
  comments?: string;
  stokistId?: string;
  name?: string;
  email?: string;
  message?: string;
};
