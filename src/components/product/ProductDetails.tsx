"use client";

import en from "@/language/en";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Reviews from "./Reviews";
import AdditionalInformation from "./AdditionalInformation";
import { TProduct } from "@/assets/data/products";
import PurifiedHtml from "../shared/PurifiedHtml";

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
    <div className="flex flex-col items-center justify-center border border-gray-200 bg-white px-4 py-10 shadow lg:py-20">
      <div className="flex w-full flex-col gap-8 lg:max-w-[70%]">
        <div className="flex flex-col items-center gap-2 lg:hidden">
          <p className="items-center text-center font-semibold">
            {tabs[activeTab]}
          </p>
          <div className="flex items-center gap-2">
            {tabs.map((_tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={cn("h-4 w-4 rounded-full bg-gray-200", {
                  "bg-primary": activeTab === index,
                })}
              />
            ))}
          </div>
        </div>

        <ul className="hidden w-full grid-cols-3 border-b border-gray-200 lg:grid">
          {tabs.map((tab, index) => (
            <li
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={tab}
              aria-label="tab"
              key={index}
              className={cn(
                "flex cursor-pointer items-center justify-center py-4 text-center font-semibold",
                {
                  "border-b-2 border-green-700 text-green-700":
                    activeTab === index,
                },
              )}
            >
              {tab}
            </li>
          ))}
        </ul>
        {activeTab === 0 && <PurifiedHtml html={description} />}
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
