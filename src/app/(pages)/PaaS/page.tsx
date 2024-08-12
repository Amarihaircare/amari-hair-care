import type { Metadata } from "next";

import en from "@/language/en";
import paas from "@/assets/images/paas.png";
import Image from "next/image";
import { CheckIcon, UsersIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: en.paasPageMetaTitle,
  description: en.paasPageMetaDescription,
};

export default function PaaS() {
  return (
    <section className="flex w-full flex-col items-center justify-center overflow-hidden bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col px-4 md:max-w-[95%] lg:px-0 2xl:max-w-screen-xl">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="flex flex-col gap-6 lg:w-[48%]">
            <h2 className="text-center text-2xl font-bold lg:text-left lg:text-4xl">
              {en.paasPageIntroduction}
            </h2>

            {paasPageDescriptions.map((description, index) => (
              <p
                key={index}
                className={cn("text-center lg:text-left", {
                  "font-bold": index === 1,
                })}
              >
                {description}
              </p>
            ))}
          </div>
          <div data-aos="fade-left" className="flex flex-col gap-6 lg:w-[48%]">
            <Image
              width={800}
              height={600}
              src={paas}
              alt="women farming"
              className="h-full w-full rounded"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 py-40">
          <h2
            data-aos="fade-up"
            className="max-w-[600px] text-center text-2xl font-bold lg:text-4xl"
          >
            {en.paasKeyBenefitsHeading}
          </h2>

          <div className="grid gap-10 lg:grid-cols-2">
            {paasKeyBenefits.map((value, index) => (
              <div
                key={index}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                className="flex flex-col items-center gap-4 lg:flex-row"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <CheckIcon />
                </div>
                <div className="max-w-[500px]">
                  <h3 className="text-center text-lg font-bold lg:text-left">
                    {value.title}
                  </h3>
                  <p className="text-center lg:text-left">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-10 pb-40">
          <h2
            data-aos="fade-up"
            className="max-w-[600px] text-center text-2xl font-bold lg:text-4xl"
          >
            {en.customerBenefitsHeading}
          </h2>

          <div className="grid gap-10 lg:grid-cols-2">
            {customerBenefits.map((value, index) => (
              <div
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                key={index}
                className="flex flex-col items-center gap-4"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <UsersIcon className="text-xl" />
                </div>
                <div className="flex max-w-[500px] flex-col gap-4">
                  <h3 className="text-center text-lg font-bold">
                    {value.title}
                  </h3>
                  <p className="text-center">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const paasPageDescriptions = [
  en.paasPageDescriptionOne,
  en.paasPageDescriptionTwo,
  en.paasPageDescriptionThree,
];

const paasKeyBenefits = [
  {
    title: en.paasBenefitTitleOne,
    description: en.paasBenefitDescriptionOne,
  },
  {
    title: en.paasBenefitTitleTwo,
    description: en.paasBenefitDescriptionTwo,
  },
  {
    title: en.paasBenefitTitleThree,
    description: en.paasBenefitDescriptionThree,
  },
  {
    title: en.paasBenefitTitleFour,
    description: en.paasBenefitDescriptionFour,
  },
  {
    title: en.paasBenefitTitleFive,
    description: en.paasBenefitDescriptionFive,
  },
  {
    title: en.paasBenefitTitleSix,
    description: en.paasBenefitDescriptionSix,
  },
  {
    title: en.paasBenefitTitleSeven,
    description: en.paasBenefitDescriptionSeven,
  },
];

const customerBenefits = [
  {
    title: en.customerBenefitTitleOne,
    description: en.customerBenefitDescriptionOne,
  },
  {
    title: en.customerBenefitTitleTwo,
    description: en.customerBenefitDescriptionTwo,
  },
  {
    title: en.customerBenefitTitleThree,
    description: en.customerBenefitDescriptionThree,
  },
  {
    title: en.customerBenefitTitleFour,
    description: en.customerBenefitDescriptionFour,
  },
];
