import en from "@/language/en";
import type { Metadata } from "next";
import Image from "next/image";
import hairRenewalTherapy from "@/assets/images/hair-therapy.webp";
import moistureTherapy from "@/assets/images/moisture-therapy.webp";
import scalpTherapy from "@/assets/images/scalp-therapy.webp";
import { cn } from "@/lib/utils";
import NewsletterSection from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: en.paasPageMetaTitle,
  description: en.paasPageMetaDescription,
};

export default function SalonServices() {
  return (
    <>
      <section className="flex w-full flex-col items-center justify-center overflow-hidden bg-white pb-20 pt-10 lg:pb-40 lg:pt-20">
        <div className="flex w-full flex-col gap-20 px-4 md:max-w-[95%] lg:gap-40 lg:px-0 2xl:max-w-screen-xl">
          {services.map((service, index) => {
            const isFlipped = index % 2 === 1;
            return (
              <div
                key={service.heading}
                className={cn(
                  "flex flex-col-reverse items-center justify-between gap-10 lg:flex-row",
                  {
                    "lg:flex-row-reverse": isFlipped,
                  },
                )}
              >
                <div className="flex flex-col gap-6 lg:w-[48%]">
                  <h2 className="text-center text-2xl font-bold lg:text-left lg:text-4xl">
                    {service.heading}
                  </h2>

                  <p className="text-center lg:text-left">
                    {service.description}
                  </p>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold">
                      {service.benefit.title}
                    </h3>

                    <div className="flex flex-col gap-4">
                      {service.benefit.benefits.map((benefit) => (
                        <div
                          key={benefit.title}
                          className="flex items-center gap-4"
                        >
                          <div className="flex flex-col gap-2">
                            <h3 className="font-bold">{benefit.title}</h3>
                            <p>{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 lg:w-[48%]">
                  <Image
                    width={800}
                    height={400}
                    src={service.image}
                    alt="women farming"
                    className="w-full rounded lg:h-[600px]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <NewsletterSection />
    </>
  );
}

const services = [
  {
    heading: en.hairRenewalTherapy,
    description: en.hairRenewalTherapyDescription,
    image: hairRenewalTherapy,

    benefit: {
      title: en.keyFeaturesAndBenefits,
      benefits: [
        {
          title: en.hairTherapyBenefitTitleOne,
          description: en.hairTherapyBenefitDescriptionOne,
        },
        {
          title: en.hairTherapyBenefitTitleTwo,
          description: en.hairTherapyBenefitDescriptionTwo,
        },
        {
          title: en.hairTherapyBenefitTitleThree,
          description: en.hairTherapyBenefitDescriptionThree,
        },
      ],
    },
  },
  {
    heading: en.moistureTherapy,
    description: en.moistureTherapyDescription,
    image: moistureTherapy,

    benefit: {
      title: en.keyFeaturesAndBenefits,
      benefits: [
        {
          title: en.moistureTherapyBenefitTitleOne,
          description: en.moistureTherapyBenefitDescriptionOne,
        },
        {
          title: en.moistureTherapyBenefitTitleTwo,
          description: en.moistureTherapyBenefitDescriptionTwo,
        },
        {
          title: en.moistureTherapyBenefitTitleThree,
          description: en.moistureTherapyBenefitDescriptionThree,
        },
      ],
    },
  },
  {
    heading: en.scalpTherapy,
    description: en.scalpTherapyDescription,
    image: scalpTherapy,

    benefit: {
      title: en.keyFeaturesAndBenefits,
      benefits: [
        {
          title: en.scalpTherapyBenefitTitleOne,
          description: en.scalpTherapyBenefitDescriptionOne,
        },
        {
          title: en.scalpTherapyBenefitTitleTwo,
          description: en.scalpTherapyBenefitDescriptionTwo,
        },
      ],
    },
  },
];
