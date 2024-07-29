import {
  EmployeeIcon,
  EnvironmentalIcon,
  InnovationIcon,
} from "@/assets/icons";
import en from "@/language/en";
import { Heart } from "lucide-react";
import Image from "next/image";
import productGroup from "../../assets/images/produc-group.webp";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

export default function HomeHero() {
  const ourValues = [
    {
      name: en.customerSatisfaction,
      icon: <Heart />,
    },
    {
      name: en.employeeSatisfaction,
      icon: <EmployeeIcon />,
    },
    {
      name: en.environmentalSustainability,
      icon: <EnvironmentalIcon />,
    },
    {
      name: en.qualityAndInnovation,
      icon: <InnovationIcon />,
    },
  ];
  return (
    <section className="overflow-hidden hero section pb-20 lg:min-h-[800px] flex flex-col-reverse lg:flex-row justify-center lg:justify-normal items-center w-full">
      <div className="hero_content max-w-[90%] lg:max-w-[50%] w-full lg:ml-20 flex flex-col gap-4 px-4">
        <div className="hero_content-header flex flex-col gap-4">
          <h1 className="hero_content-header_title text-center lg:text-left text-3xl lg:text-6xl font-black">
            {en.heroTitle}
          </h1>
          <p className="hero_content-header_text text-center lg:text-left">
            {en.heroDescription}
          </p>
        </div>
        <Button asChild>
          <Link
            href="/stockist"
            className={`${buttonVariants({
              variant: "secondary",
            })} mt-6 px-6 self-center lg:self-start font-semibold py-6 mb-14 hover:bg-[#C6E749]/80`}
          >
            {en.becomeAStockist}
          </Link>
        </Button>

        <div
          className="features-list_item aos-init aos-animate grid lg:grid-cols-2 gap-y-8 gap-x-20"
          data-order="1"
          data-aos="fade-up"
        >
          {ourValues.map((value, index) => (
            <div
              key={index}
              className="wrapper flex flex-col lg:flex-row items-center gap-4"
            >
              <span className="w-16 h-16 rounded-full bg-white shadow flex items-center justify-center">
                {value.icon}
              </span>
              <h5 className="title font-semibold lg:max-w-[150px]">
                {value.name}
              </h5>
            </div>
          ))}
        </div>
      </div>
      <div className="hero_media">
        <Image
          src={productGroup}
          alt="media"
          width={700}
          height={700}
          className="w-full lg:w-auto lg:scale-125"
        />
      </div>
    </section>
  );
}
