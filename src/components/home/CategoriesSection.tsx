import Image from "next/image";
import moisturizers from "../../assets/images/mosturizer.png";
import cleansers from "../../assets/images/cleanser.jpeg";
import serum from "../../assets/images/growth-serum.jpeg";
import oil from "../../assets/images/oil.jpeg";
import treatments from "../../assets/images/treatment.jpg";
import shampoo from "../../assets/images/shampoo.jpg";

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
    name: "Moisturizers",
    image: moisturizers,
  },
  {
    name: "Cleansers",
    image: cleansers,
  },
  {
    name: "Oil",
    image: oil,
  },
  {
    name: "Serums",
    image: serum,
  },
  {
    name: "Treatments",
    image: treatments,
  },
  {
    name: "Shampoo",
    image: shampoo,
  },
];
