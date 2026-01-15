import Image, { StaticImageData } from "next/image";
import Rating from "../ui/Rating";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { ProductCardMenu } from "./ProductCardMenu";
import AddToCartAction from "@/components/ui/AddToCartAction";
import { useState, useEffect } from "react";

interface ProductCardProps {
  image: string | StaticImageData;
  name: string;
  prices: {
    amount: number;
    currency: string;
    locale: string;
  }[];
  rating: number;
  slug: string;
  discount?: number;
  variantId?: string | number;
  cf_cdn_image_url?: string;
  zoho_token?: string;
}

export default function ProductCard({
  image,
  rating,
  prices,
  slug,
  name,
  discount,
  variantId,
  cf_cdn_image_url,
  zoho_token,
}: ProductCardProps) {
  // Use the image prop directly. If it's a relative path, it should be a local API route or static asset.
  const imageSrc = typeof image === "string" ? image : (image as StaticImageData).src;
  const imageStr = typeof imageSrc === "string" ? imageSrc : (imageSrc as StaticImageData).src;

  const [blobSrc, setBlobSrc] = useState<string | null>(null);

  useEffect(() => {
    if (cf_cdn_image_url) {
      // Append res=original if missing to ensure high quality
      const targetUrl = cf_cdn_image_url.includes('res=original') 
        ? cf_cdn_image_url 
        : `${cf_cdn_image_url}${cf_cdn_image_url.includes('?') ? '&' : '?'}res=original`;
        
      // Use the proxy endpoint which handles the Zoho Books token securely
      const proxyUrl = `/api/books-image?url=${encodeURIComponent(targetUrl)}`;
      setBlobSrc(proxyUrl);
    }
  }, [cf_cdn_image_url]);

  const finalImageSrc = blobSrc || imageSrc;

  return (
    <div className="group flex flex-col gap-4">
      <div className="media relative w-full overflow-hidden rounded bg-gray-100">
        <Image
          src={finalImageSrc}
          alt={name}
          width={500}
          height={500}
          className="w-full rounded object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
          unoptimized={true}
          quality={90}
        />

        {discount && discount > 0 && (
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-700 shadow-md">
            <p className="text-xs font-bold text-white">-{discount}%</p>
          </div>
        )}

        {/* Hover Menu */}
        <div className="overlay absolute inset-0 hidden flex-col items-center justify-center bg-[#284721]/40 opacity-0 transition-opacity group-hover:opacity-100 lg:flex">
          <ProductCardMenu
            slug={slug}
            name={name}
            prices={prices}
            image={finalImageSrc as string}
            variantId={variantId}
          />
        </div>
      </div>

      <div className="main flex flex-col gap-1 px-1">
        <div className="main_rating">
          <Rating value={rating} />
        </div>

        <Link
          className="main_title line-clamp-1 text-sm font-semibold text-black hover:text-green-800 md:text-base lg:text-lg"
          href={`/product/${slug}`}
        >
          {name}
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {prices.map((price, index) => (
            <div key={`${price.currency}-${index}`} className="flex items-center gap-2">
              <p className="price text-sm font-bold text-green-800 md:text-base lg:text-lg">
                {formatCurrency({
                  amount: price.amount,
                  currency: price.currency,
                  locale: price.locale,
                })}
              </p>
              {index < prices.length - 1 && <span className="text-gray-300">|</span>}
            </div>
          ))}
        </div>

        <div className="mt-2">
          <AddToCartAction
            productSlug={slug}
            variantId={variantId}
            productName={name}
            productPrices={prices}
            productImage={imageStr}
          />
        </div>
      </div>
    </div>
  );
}
