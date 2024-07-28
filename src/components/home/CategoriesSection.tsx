import Image from "next/image";
import moisturizers from "../../assets/images/mosturizer.webp";
import cleansers from "../../assets/images/cleanser.webp";
import serum from "../../assets/images/growth-serum.webp";
import oil from "../../assets/images/oil.webp";
import treatments from "../../assets/images/treatment.webp";
import shampoo from "../../assets/images/shampoo.webp";
import en from "@/language/en";

export default function CategoriesSection() {
  return (
    <div className="categories section--nopb bg-white w-full py-40">
      <div className="container">
        <ul className="categories_list grid grid-cols-6 gap-10">
          {categories.map((category, index) => (
            <li
              key={index}
              className="flex flex-col items-center"
              data-order="1"
            >
              <Image
                src={category.image}
                alt="media"
                width={200}
                height={200}
                className="w-[200px] h-[200px] rounded object-cover"
              />
              <h4 className="text-lg text-clip font-semibold mt-4">
                {category.name}
              </h4>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const categories = [
  {
    name: en.moisturizers,
    image: moisturizers,
  },
  {
    name: en.cleansers,
    image: cleansers,
  },
  {
    name: en.oil,
    image: oil,
  },
  {
    name: en.serums,
    image: serum,
  },
  {
    name: en.treatments,
    image: treatments,
  },
  {
    name: en.shampoo,
    image: shampoo,
  },
];
