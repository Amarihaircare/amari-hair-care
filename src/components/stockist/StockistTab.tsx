"use client";
import en from "@/language/en";
import { cn } from "@/lib/utils";
import { useState } from "react";
import NewStockist from "./NewStockist";
import ReturningStockist from "./ResturningStockist";
import ProductCheckout from "./ProductCheckout";

export default function StockistTab() {
  const [activeTab, setActiveTab] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const tabs = [en.newStockist, en.returningStockist];

  function handleTabClick(index: number) {
    setActiveTab(index);
    setShowCheckout(false);
  }

  return (
    <>
      <div className="grid w-full grid-cols-2 lg:max-w-[500px]">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={cn(
              "flex h-12 w-full items-center justify-center bg-primary text-sm font-medium text-white",
              {
                "bg-secondary text-primary": activeTab === index,
              },
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex w-full flex-col items-center py-10 lg:py-20">
        {activeTab === 0 && !showCheckout && (
          <NewStockist setShowCheckout={setShowCheckout} />
        )}
        {activeTab === 1 && !showCheckout && (
          <ReturningStockist setShowCheckout={setShowCheckout} />
        )}
        {showCheckout && <ProductCheckout />}
      </div>
    </>
  );
}
