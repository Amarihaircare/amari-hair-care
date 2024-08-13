import { MinusIcon, PlusIcon } from "@/assets/icons";
import { Input } from "./input";
import { MINIMUM_QUANTITY } from "@/lib/constants";

interface TIncrementCart {
  count: number;
  handleCount: (value: number) => void;
}

export default function IncrementCart({ count, handleCount }: TIncrementCart) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    if (value >= MINIMUM_QUANTITY) {
      handleCount(parseInt(e.target.value) - count);
    }
  }
  return (
    <div className="flex gap-2 rounded-full border border-gray-200 bg-white px-4 shadow">
      <button onClick={() => handleCount(-1)}>
        <MinusIcon />
      </button>
      <Input
        type="text"
        pattern="[0-9]*"
        className="max-w-14 border-none p-0 text-center text-lg font-medium outline-none focus:border-none focus:outline-none lg:text-xl"
        value={count}
        onChange={handleChange}
      />

      <button onClick={() => handleCount(1)}>
        <PlusIcon />
      </button>
    </div>
  );
}
