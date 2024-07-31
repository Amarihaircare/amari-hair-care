import { categories } from "@/assets/data/products";
import Image from "next/image";

export default function CategoriesSection() {
  return (
    <section className="categories bg-white w-full py-20 lg:py-40 flex items-center justify-center">
      <ul className="categories_list grid-cols-2 md:grid-cols-3 grid lg:grid-cols-6 gap-4 lg:gap-8 md:max-w-screen-sm w-full px-4 xl:max-w-screen-lg 2xl:max-w-screen-xl">
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex flex-col items-center w-full"
            data-aos="fade-up"
          >
            <Image
              src={category.image}
              alt="media"
              width={200}
              height={200}
              className="w-full h-[200px] rounded object-cover"
            />
            <h4 className="text-lg text-clip font-semibold mt-4">
              {category.name}
            </h4>
          </li>
        ))}
      </ul>
    </section>
  );
}
