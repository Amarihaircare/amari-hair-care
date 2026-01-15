import en from "@/language/en";
import type { Metadata } from "next";
import Image from "next/image";
import amariProcess from "../../../assets/images/amari-process.webp";
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
      <section className="flex w-full flex-col items-center justify-center overflow-hidden bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
        <div className="flex w-full flex-col px-4 md:max-w-[95%] lg:px-0 2xl:max-w-screen-xl">
          <div className="flex flex-col justify-between gap-10 lg:flex-row">
            <div className="flex flex-col gap-6 lg:w-[48%]">
              <h2 className="text-center text-2xl font-bold lg:text-left lg:text-4xl">
                {en.aboutUsPageHeading} 
              </h2>
              <p className="text-center lg:text-left">
                {en.aboutUsPageDescription}
              </p>

              <h2 className="text-center text-2xl font-bold lg:text-left lg:text-4xl">Our Approach: The Amari 2030 Model</h2>
              <div className="flex flex-col gap-4">
  {marketDifferentiators.map((differentiator, index) => (
    <div key={index} className="flex items-start gap-2">
      <CaretRight className="mt-1" />
      <p
        className="text-center lg:text-left"
        dangerouslySetInnerHTML={{ __html: differentiator }}
      />
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

// const marketDifferentiators = [
//   en.naturalPlantBasedIngredientesDescription,
//   en.focusOnAfricanWomenDescription,
//   en.comprehensiveServiceDescription,
//   en.socialResponsibilityDescription,
//   en.qualityAndInnovationDescription,
// ];
const marketDifferentiators = [
  "<strong>Research and Product Innovation:</strong> We formulate advanced hair and scalp care solutions by combining bioactive plant ingredients with modern hair science. Our innovation pipeline is guided by real customer feedback, expert insight, and ongoing testing.",

  "<strong>Professional Integration:</strong> Through our Products as a Service (PaaS) model, Àmàri partners directly with salons and stylists to embed professional-grade treatments into hair styling. We provide expert training, treatment protocols, and salon support to enhance client experiences and drive business growth.",

  "<strong>Education and Certification:</strong> We believe knowledge is foundational to better beauty outcomes. Our education programs train hairstylists, certify partner salons, and equip everyday users with the tools to practice intentional, science-backed hair care. By raising the standard of expertise across the industry, we are building a more confident and capable beauty community.",

  "<strong>Distribution and Accessibility:</strong> Àmàri focuses on multi-channel partnerships that expand access. Through salons, wellness centers, and digital platforms, we are creating a distribution system that makes premium hair and scalp care easy to access and consistent to experience.",

  "<strong>Local Impact with a Global Vision:</strong> Our products are developed and manufactured in Africa using high-performance African botanicals and ethical production methods. We are committed to sustainability, fair labor, and reinvesting in local communities to ensure our growth creates long-term impact."
];


const coreValues = [
  {
    title: en.customerSatifaction,
    description: en.customerSatisfactionDescription,
    icon: <HeartIconOutline className="text-3xl" />,
  },
  {
    title: en.employeeSatisfaction,
    description: en.employeeSatisfactionDescription,
    icon: <EmployeeIcon className="text-3xl" />,
  },
  {
    title: en.environmentalSustainability,
    description: en.communityAndEnvironmentalServiceDescription,
    icon: <EnvironmentalIcon className="text-5xl" />,
  },
  {
    title: en.qualityAndInnovation,
    description: en.qualityAndInnovationDescription,
    icon: <InnovationIcon className="text-3xl" />,
  },
];
