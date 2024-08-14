import { cn } from "@/lib/utils";

interface AdditionalInformationProps {
  additionalInformation: {
    key: string;
    value: string;
  }[];
}
export default function AdditionalInformation({
  additionalInformation,
}: AdditionalInformationProps) {
  return (
    <div className="border border-gray-500">
      {additionalInformation.map((info, index) => {
        return (
          <div
            key={index}
            className={cn("grid lg:grid-cols-[40%_1fr] border-gray-500", {
              "border-b": index !== additionalInformation.length - 1,
            })}
          >
            <h3 className="font-semibold p-4">{info.key}</h3>
            <p className="border-t border-l-0 lg:border-t-0 lg:border-l border-gray-500 p-4">
              {info.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
