"use client";

import en from "@/language/en";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Description from "./Description";
import Reviews from "./Reviews";
import AdditionalInformation from "./AdditionalInformation";
import { TProduct } from "@/assets/data/products";

interface ProductDetailsProps {
  description: string;
  reviews: TProduct["reviews"];
  additionalInformation: {
    key: string;
    value: string;
  }[];
}

export default function ProductDetails({
  description,
  reviews,
  additionalInformation,
}: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    en.description,
    `${en.reviews} (${reviews.length})`,
    en.additionalInformation,
  ];

  return (
    <div className="bg-white border border-gray-200 shadow py-10 lg:py-20 px-4 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-8 lg:max-w-[70%] w-full">
        <div className="lg:hidden flex flex-col gap-2 items-center">
          <p className="font-semibold items-center text-center">
            {tabs[activeTab]}
          </p>
          <div className="flex items-center gap-2">
            {tabs.map((_tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={cn("w-4 h-4 rounded-full bg-gray-200", {
                  "bg-primary": activeTab === index,
                })}
              />
            ))}
          </div>
        </div>

        <ul className="lg:grid grid-cols-3 hidden border-b border-gray-200 w-full">
          {tabs.map((tab, index) => (
            <li
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={tab}
              aria-label="tab"
              key={index}
              className={cn(
                "flex font-semibold items-center justify-center py-4 cursor-pointer text-center",
                {
                  "border-b-2 border-green-700 text-green-700":
                    activeTab === index,
                }
              )}
            >
              {tab}
            </li>
          ))}
        </ul>
        {activeTab === 0 && <Description description={description} />}
        {activeTab === 1 && <Reviews reviews={reviews} />}
        {activeTab === 2 && (
          <AdditionalInformation
            additionalInformation={additionalInformation}
          />
        )}
      </div>
    </div>
  );
}
