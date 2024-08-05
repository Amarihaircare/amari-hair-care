import en from "@/language/en";
import type { Metadata } from "next";
import Image from "next/image";
import amariProcess from "../../../assets/images/amari-process.jpg";
import {
  CaretRight,
  EmployeeIcon,
  EnvironmentalIcon,
  HeartIconOutline,
  InnovationIcon,
} from "@/assets/icons";
import OurOfferings from "@/components/about/OurOfferings";
import NewsletterSection from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: en.aboutPageMetaTitle,
  description: en.aboutPageMetaDescription,
};

export default function About() {
  return (
    <>
      <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
        <div className="flex w-full flex-col px-4 md:max-w-[95%] lg:px-0 2xl:max-w-screen-xl">
          <div className="flex flex-col justify-between gap-10 lg:flex-row">
            <div className="flex flex-col gap-6 lg:w-[48%]">
              <h2 className="text-center text-2xl font-bold lg:text-left lg:text-4xl">
                {en.aboutUsPageHeading}
              </h2>
              <p className="text-center lg:text-left">
                {en.aboutUsPageDescription}
              </p>
              <div className="flex flex-col gap-4">
                {marketDifferentiators.map((differentiator, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CaretRight />
                    <p className="text-center lg:text-left">{differentiator}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:w-[48%]">
              <Image
                width={800}
                height={600}
                src={amariProcess}
                alt="women farming"
                className="h-full w-full rounded"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-10 py-40">
            <div className="heading flex max-w-[500px] flex-col items-center justify-center gap-4">
              <h2 className="text-center text-2xl font-bold lg:text-4xl">
                {en.ourCoreValues}
              </h2>
              <p className="text-center">{en.ourCoreValuesDescription}</p>
            </div>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-between gap-4"
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gray-200 bg-background shadow hover:bg-primary hover:text-white">
                    {value.icon}
                  </div>
                  <h4 className="text-center text-xl font-bold">
                    {value.title}
                  </h4>
                  <p className="text-center">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          <OurOfferings />
        </div>
      </section>
      <NewsletterSection />
    </>
  );
}

const marketDifferentiators = [
  en.naturalPlantBasedIngredientesDescription,
  en.focusOnAfricanWomenDescription,
  en.comprehensiveServiceDescription,
  en.socialResponsibilityDescription,
  en.qualityAndInnovationDescription,
];

const coreValues = [
  {
    title: en.customerSatisfaction,
    description: en.customerSatisfactionDescription,
    icon: <HeartIconOutline className="text-3xl" />,
  },
  {
    title: en.employeeSatisfaction,
    description: en.employeeSatisfactionDescription,
    icon: <EmployeeIcon className="text-3xl" />,
  },
  {
    title: en.communityAndEnvironmentalService,
    description: en.communityAndEnvironmentalServiceDescription,
    icon: <EnvironmentalIcon className="text-5xl" />,
  },
  {
    title: en.qualityAndInnovation,
    description: en.qualityAndInnovationDescription,
    icon: <InnovationIcon className="text-3xl" />,
  },
];
