"use client";

import en from "@/language/en";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Reviews from "./Reviews";
import AdditionalInformation from "./AdditionalInformation";
import PurifiedHtml from "../shared/PurifiedHtml";

// Update interface to be more flexible with Zoho's API response
interface ProductDetailsProps {
  description: string; // This will map to long_description from Zoho
  reviews?: any[];
  additionalInformation?: {
    key: string;
    value: string;
  }[];
}

export default function ProductDetails({
  description,
  reviews = [], // Default to empty array to prevent .length errors
  additionalInformation = [],
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
        {/* Mobile Tab Indicator */}
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
                  "bg-green-700": activeTab === index, // Match your theme color
                })}
              />
            ))}
          </div>
        </div>

        {/* Desktop Tabs */}
        <ul className="hidden w-full grid-cols-3 border-b border-gray-200 lg:grid">
          {tabs.map((tab, index) => (
            <li
              key={index}
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={activeTab === index}
              className={cn(
                "flex cursor-pointer items-center justify-center py-4 text-center font-semibold transition-colors",
                {
                  "border-b-2 border-green-700 text-green-700": activeTab === index,
                  "text-gray-500 hover:text-green-600": activeTab !== index,
                }
              )}
            >
              {tab}
            </li>
          ))}
        </ul>

        {/* Tab Content Rendering */}
        <div className="mt-4">
          {activeTab === 0 && (
            <div className="prose max-w-none">
              <PurifiedHtml html={description || "<p>No description available.</p>"} />
            </div>
          )}

          {activeTab === 1 && <Reviews reviews={reviews} />}

          {activeTab === 2 && (
            <AdditionalInformation
              additionalInformation={additionalInformation}
            />
          )}
        </div>
      </div>
    </div>
  );
}