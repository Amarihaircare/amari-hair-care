import {
  EmployeeIcon,
  EnvironmentalIcon,
  InnovationIcon,
} from "@/assets/icons";
import en from "@/language/en";
import { Heart } from "lucide-react";
import Image from "next/image";
import productGroup from "../../assets/images/produc-group.webp";

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
    <section className="overflow-hidden hero section min-h-[800px] flex justify-center lg:justify-normal items-center w-full">
      <div className="hero_content col-xl-6 max-w-[50%] lg:ml-20 flex flex-col gap-4">
        <div className="hero_content-header flex flex-col gap-4">
          <h1 className="hero_content-header_title text-6xl font-black">
            {en.heroTitle}
          </h1>
          <p className="hero_content-header_text">en.heroDescription</p>
        </div>
        <a
          className="hero_content-btn px-6 rounded-full self-start bg-secondary py-4 mb-14 font-semibold"
          href="/stockist"
        >
          {en.becomingStockist}
        </a>
        <div
          className="features-list_item aos-init aos-animate flex flex-wrap gap-y-8 gap-x-20"
          data-order="1"
          data-aos="fade-up"
        >
          {ourValues.map((value, index) => (
            <div key={index} className="wrapper flex items-center gap-4">
              <span className="w-16 h-16 rounded-full bg-white shadow flex items-center justify-center">
                {value.icon}
              </span>
              <h5 className="title font-semibold max-w-[150px]">
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
          className="scale-125"
        />
      </div>
    </section>
  );
}
