"use client";

import { useCart } from "@/hooks/useCart";
import { useManageCart } from "@/hooks/useManageCart";
import { ShoppingCartIcon } from "@/assets/icons";

interface ProductCardMenuProps {
  slug: string;
  name: string;
  prices: {
    amount: number;
    currency: string;
    locale: string;
  }[];
  image: string;
  variantId?: string | number;
}

export const ProductCardMenu = ({ slug, name, prices, image, variantId }: ProductCardMenuProps) => {
  const { cart } = useCart();
  const product = cart.find((item) => item.slug === slug);

  const { handleAddToCart, count } = useManageCart({
    productSlug: slug!,
    ...(product && { quantity: product.quantity }),
    productInfo: {
      name,
      prices,
      image,
      variantId,
    },
  });

  const productMenu = [
    {
      onClick: () => handleAddToCart((product?.quantity ?? count - 1) + 1),
      icon: <ShoppingCartIcon />,
    },
  ];

  return (
    <ul className="action flex items-center gap-2 opacity-0 transition-all group-hover:opacity-100">
      {productMenu.map((menu, index) => (
        <li key={index} className="list-item">
          <button
            onClick={menu.onClick}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-secondary hover:bg-secondary hover:text-white"
          >
            {menu.icon}
          </button>
        </li>
      ))}
    </ul>
  );
};
