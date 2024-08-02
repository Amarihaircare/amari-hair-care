import Image, { StaticImageData } from "next/image";
import { HeartIcon, ShoppingBasket, EyeIcon } from "@/assets/icons";
import Rating from "../ui/Rating";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import en from "@/language/en";
import { Button } from "../ui/button";

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
      <div className="media w-full relative rounded overflow-hidden">
        <Image
          src={image}
          alt="media"
          width={320}
          height={220}
          className="w-full h-[220px] rounded object-cover"
        />
        {discount && (
          <div className="absolute w-10 h-10 top-4 right-4 rounded-full bg-green-700 flex items-center justify-center">
            <p className="font-semibold text-white text-sm">-{discount}%</p>
          </div>
        )}

        <div className="overlay hidden lg:flex flex-col items-center justify-center absolute w-full h-full top-0 hover:bg-[#284721]/60 transition-all group">
          <ul className="action flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
            {productMenu.map((menu, index) => (
              <li key={index} className="list-item">
                <button className="w-10 h-10 rounded-full bg-white hover:bg-secondary flex items-center justify-center text-secondary hover:text-white">
                  {menu.icon}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="main flex flex-col gap-2 relative">
        <div className="main_rating ">
          <Rating value={rating} />
        </div>
        <Link
          className="main_title max-w-[70%] lg:max-w-[90%] font-semibold text-black"
          href={`/product/${slug}`}
          rel="noopener norefferer"
        >
          {name}
        </Link>
        <div className="main_price flex items-center gap-4">
          {discount && (
            <p
              className={cn("price font-bold text-green-800", {
                "line-through text-gray-400": discount,
              })}
            >
              {formatCurrency(price, "NGN")}
            </p>
          )}
          <p className="price font-bold text-green-800">
            {formatCurrency(discountedPrice, "NGN")}
          </p>
        </div>
        <Button
          variant={"secondary"}
          className="font-semibold absolute self-end bottom-0 lg:hidden"
        >
          {en.addToCart}
        </Button>
      </div>
    </>
  );
}

const productMenu = [
  {
    icon: <HeartIcon />,
  },
  {
    icon: <ShoppingBasket />,
  },
  {
    icon: <EyeIcon />,
  },
];
