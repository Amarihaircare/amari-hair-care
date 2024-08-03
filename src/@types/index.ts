import { StaticImageData } from "next/image";

export type TLocalProduct = {
  name: string;
  slug: string;
  price: number;
  discount?: number;
  quantity: number;
  image: StaticImageData;
};

export type TStockistValues = {
  companyName?: string;
  contactName?: string;
  phone?: string;
  email: string;
  address?: string;
  comments: string;
  stokistId?: string;
};
