import Image, { StaticImageData } from "next/image";
import Rating from "../ui/Rating";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import { ProductCardMenu } from "./ProductCardMenu";
import AddToCartAction from "./AddToCartButton";

interface ProductCardProps {
  image: StaticImageData;
  rating: number;
  price: number;
  slug: string;
  name: string;
  discount?: number;
}

export default function ProductCard({
  image,
  rating,
  price,
  slug,
  name,
  discount,
}: ProductCardProps) {
  const discountedPrice = price - (price * (discount ?? 0)) / 100;

  return (
    <>
      <div className="media relative w-full overflow-hidden rounded">
        <Image
          src={image}
          alt="media"
          width={320}
          height={220}
          className="h-[220px] w-full rounded object-cover"
        />
        {discount && (
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-700">
            <p className="text-sm font-semibold text-white">-{discount}%</p>
          </div>
        )}

        <div className="overlay group absolute top-0 hidden h-full w-full flex-col items-center justify-center transition-all hover:bg-[#284721]/60 lg:flex">
          <ProductCardMenu slug={slug} />
        </div>
      </div>
      <div className="main relative flex flex-col gap-2">
        <div className="main_rating">
          <Rating value={rating} />
        </div>
        <Link
          className="main_title max-w-[70%] font-semibold text-black lg:max-w-[90%]"
          href={`/product/${slug}`}
          rel="noopener norefferer"
        >
          {name}
        </Link>
        <div className="main_price flex items-center gap-4">
          {discount && (
            <p
              className={cn("price font-bold text-green-800", {
                "text-gray-400 line-through": discount,
              })}
            >
              {formatCurrency(price, "NGN")}
            </p>
          )}
          <p className="price font-bold text-green-800">
            {formatCurrency(discountedPrice, "NGN")}
          </p>
        </div>
        <AddToCartAction slug={slug} />
      </div>
    </>
  );
}
