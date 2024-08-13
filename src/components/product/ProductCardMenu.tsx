"use client";

import { useCart } from "@/hooks/useCart";
import { useManageCart } from "@/hooks/useManageCart";
import { DocumentIcon } from "@/assets/icons";

interface ProductCardMenuProps {
  slug: string;
}

export const ProductCardMenu = ({ slug }: ProductCardMenuProps) => {
  const { cart } = useCart();
  const product = cart.find((item) => item.slug === slug);

  const { handleAddToCart, count } = useManageCart({
    productSlug: slug!,
    ...(product && { quantity: product.quantity }),
  });

  const productMenu = [
    {
      onClick: () => handleAddToCart((product?.quantity ?? count - 1) + 1),
      icon: <DocumentIcon />,
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
