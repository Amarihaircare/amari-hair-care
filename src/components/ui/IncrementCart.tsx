import { MinusIcon, PlusIcon } from "@/assets/icons";
import { Input } from "./input";

interface TIncrementCart {
  count: number;
  handleCount: (value: number) => void;
}

export default function IncrementCart({ count, handleCount }: TIncrementCart) {
  return (
    <div className="flex gap-2 rounded-full border border-gray-200 bg-white px-4 shadow">
      <button onClick={() => handleCount(-1)}>
        <MinusIcon />
      </button>
      <Input
        type="text"
        className="max-w-6 border-none p-0 text-center text-lg font-medium outline-none focus:border-none focus:outline-none lg:text-xl"
        readOnly
        value={count}
      />

      <button onClick={() => handleCount(1)}>
        <PlusIcon />
      </button>
    </div>
  );
}
