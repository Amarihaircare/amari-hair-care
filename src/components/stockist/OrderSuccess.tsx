import en from "@/language/en";
import { Button } from "../ui/button";
import { CopyIconO } from "@/assets/icons";
import { useState } from "react";

interface TOrderSuccess {
  stockistId: string;
}

export default function OrderSuccess({ stockistId }: TOrderSuccess) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(stockistId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-primary lg:text-4xl">
        {en.orderReceived}
      </h2>
      <p className="mt-4 max-w-[500px] text-center">
        {en.orderReceivedDescriptionBeforeId}{" "}
        <span className="font-semibold">{stockistId}</span>{" "}
        {en.orderReceivedDescriptionAfterId}
      </p>
      <Button className="mt-8 min-w-[150px] gap-4" onClick={copyToClipboard}>
        {copied ? en.copied : stockistId}
        <CopyIconO />
      </Button>
    </div>
  );
}
